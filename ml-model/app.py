"""
FinPulse ML Flask API
----------------------
POST /predict   →  returns financial health score + insights
GET  /health    →  liveness check
"""

from flask import Flask, request, jsonify
import numpy as np
import pickle, json, os

# ── Try to import flask_cors; gracefully skip if not installed ─────────────────
try:
    from flask_cors import CORS
    HAS_CORS = True
except ImportError:
    HAS_CORS = False

app = Flask(__name__)
if HAS_CORS:
    CORS(app)

# ── Load model artefacts ───────────────────────────────────────────────────────
BASE = os.path.dirname(__file__)

def load_artefacts():
    model_path  = os.path.join(BASE, "finpulse_model.pkl")
    scaler_path = os.path.join(BASE, "scaler.pkl")
    cols_path   = os.path.join(BASE, "feature_cols.json")

    if not all(os.path.exists(p) for p in [model_path, scaler_path, cols_path]):
        raise RuntimeError(
            "Model files not found. Run  python train_model.py  first."
        )

    model        = pickle.load(open(model_path,  "rb"))
    scaler       = pickle.load(open(scaler_path, "rb"))
    feature_cols = json.load(open(cols_path,     "r"))
    return model, scaler, feature_cols

model, scaler, FEATURE_COLS = load_artefacts()


# ── Helpers ────────────────────────────────────────────────────────────────────
def grade(score):
    if score >= 80: return "A", "Excellent",  "#22c55e"
    if score >= 65: return "B", "Good",        "#84cc16"
    if score >= 50: return "C", "Fair",        "#eab308"
    if score >= 35: return "D", "Poor",        "#f97316"
    return              "F",   "Critical",    "#ef4444"

def build_features(d):
    income   = float(d["income"])
    expenses = float(d["expenses"])
    savings  = float(d["savings"])
    debt     = float(d["debt"])

    return [
        income,
        expenses,
        savings,
        debt,
        savings  / income,                    # savings_rate
        expenses / income,                    # expense_ratio
        debt     / income,                    # debt_to_income
        income   - expenses,                  # net_cash_flow
        (income  - expenses) / income,        # disposable_ratio
        savings  / (debt + 1),                # debt_coverage
    ]

def insights(income, expenses, savings, debt, score):
    tips = []
    savings_rate    = savings  / income
    expense_ratio   = expenses / income
    debt_to_income  = debt     / income

    if savings_rate < 0.20:
        tips.append(
            f"Your savings rate is {savings_rate*100:.1f}%. "
            "Aim to save at least 20% of income."
        )
    else:
        tips.append(
            f"Great savings rate of {savings_rate*100:.1f}%! "
            "Keep it up."
        )

    if expense_ratio > 0.70:
        tips.append(
            f"Expenses consume {expense_ratio*100:.1f}% of your income. "
            "Try to cut non-essential spending below 70%."
        )

    if debt_to_income > 0.30:
        tips.append(
            f"Debt-to-income ratio is {debt_to_income*100:.1f}%. "
            "Focus on paying down high-interest debt first."
        )
    elif debt == 0:
        tips.append("Debt-free — excellent financial position!")

    if score >= 80:
        tips.append("You're in strong financial health. Consider investing surplus savings.")
    elif score < 40:
        tips.append("Prioritise building an emergency fund of 3–6 months' expenses.")

    return tips


# ── Routes ─────────────────────────────────────────────────────────────────────
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "model": "GradientBoostingRegressor"})


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(force=True)

    # Validate required fields
    required = ["income", "expenses", "savings", "debt"]
    missing  = [f for f in required if f not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {missing}"}), 400

    try:
        income   = float(data["income"])
        expenses = float(data["expenses"])
        savings  = float(data["savings"])
        debt     = float(data["debt"])
    except (ValueError, TypeError) as e:
        return jsonify({"error": f"Invalid numeric value: {e}"}), 400

    if income <= 0:
        return jsonify({"error": "income must be > 0"}), 400

    # Build feature vector & predict
    feat_vec = np.array(build_features(data)).reshape(1, -1)
    feat_scaled = scaler.transform(feat_vec)
    raw_score   = model.predict(feat_scaled)[0]
    score       = float(np.clip(round(raw_score, 1), 0, 100))

    letter, label, color = grade(score)

    # Breakdown ratios (useful for frontend charts)
    breakdown = {
        "savings_rate":    round(savings  / income * 100, 1),
        "expense_ratio":   round(expenses / income * 100, 1),
        "debt_to_income":  round(debt     / income * 100, 1),
        "net_cash_flow":   round(income   - expenses, 2),
    }

    return jsonify({
        "score":     score,
        "grade":     letter,
        "label":     label,
        "color":     color,
        "insights":  insights(income, expenses, savings, debt, score),
        "breakdown": breakdown,
    })


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    print(f"Starting FinPulse ML API on port {port}...")
    import sys
    sys.stdout.flush()
    app.run(host="0.0.0.0", port=port, debug=True, use_reloader=False)