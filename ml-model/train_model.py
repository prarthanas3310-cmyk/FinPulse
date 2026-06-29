"""
FinPulse ML Model Trainer
--------------------------
Trains on dataset.csv (income, expenses, savings, debt, score)
Saves: finpulse_model.pkl  scaler.pkl  feature_cols.json
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import LeaveOneOut
from sklearn.metrics import mean_absolute_error, r2_score
import pickle, json, warnings, os

warnings.filterwarnings("ignore")

# ── 1. Load your real dataset ──────────────────────────────────────────────────
CSV_PATH = os.path.join(os.path.dirname(__file__), "dataset.csv")

if not os.path.exists(CSV_PATH):
    raise FileNotFoundError(
        "dataset.csv not found. Place it in the same folder as train_model.py"
    )

df = pd.read_csv(CSV_PATH)
print(f"✅  Loaded dataset: {df.shape[0]} rows, columns: {list(df.columns)}")

required = {"income", "expenses", "savings", "debt", "score"}
if not required.issubset(df.columns):
    raise ValueError(f"dataset.csv must have columns: {required}")

# ── 2. Feature engineering ─────────────────────────────────────────────────────
df["savings_rate"]     = df["savings"]  / df["income"]           # % income saved
df["expense_ratio"]    = df["expenses"] / df["income"]           # % income spent
df["debt_to_income"]   = df["debt"]     / df["income"]           # debt burden
df["net_cash_flow"]    = df["income"]   - df["expenses"]         # leftover cash
df["disposable_ratio"] = df["net_cash_flow"] / df["income"]      # net margin
df["debt_coverage"]    = df["savings"]  / (df["debt"] + 1)       # can savings cover debt?

FEATURE_COLS = [
    "income", "expenses", "savings", "debt",
    "savings_rate", "expense_ratio", "debt_to_income",
    "net_cash_flow", "disposable_ratio", "debt_coverage",
]

X = df[FEATURE_COLS].values
y = df["score"].values

# ── 3. Scale ───────────────────────────────────────────────────────────────────
scaler  = StandardScaler()
X_scaled = scaler.fit_transform(X)

# ── 4. Evaluate with Leave-One-Out CV (ideal for small datasets) ───────────────
print("\n📊  Running Leave-One-Out cross-validation …")
loo = LeaveOneOut()
loo_preds, loo_true = [], []

for train_idx, test_idx in loo.split(X_scaled):
    m = GradientBoostingRegressor(
        n_estimators=200, max_depth=3, learning_rate=0.05, random_state=42
    )
    m.fit(X_scaled[train_idx], y[train_idx])
    loo_preds.append(m.predict(X_scaled[test_idx])[0])
    loo_true.append(y[test_idx[0]])

loo_mae = mean_absolute_error(loo_true, loo_preds)
loo_r2  = r2_score(loo_true, loo_preds)
print(f"   MAE : {loo_mae:.2f} points")
print(f"   R²  : {loo_r2:.3f}")

# ── 5. Train final model on ALL rows ──────────────────────────────────────────
model = GradientBoostingRegressor(
    n_estimators=200, max_depth=3, learning_rate=0.05, random_state=42
)
model.fit(X_scaled, y)

# ── 6. Save artefacts ──────────────────────────────────────────────────────────
BASE = os.path.dirname(__file__)
pickle.dump(model,  open(os.path.join(BASE, "finpulse_model.pkl"), "wb"))
pickle.dump(scaler, open(os.path.join(BASE, "scaler.pkl"),         "wb"))
json.dump(FEATURE_COLS, open(os.path.join(BASE, "feature_cols.json"), "w"))

print("\n✅  Saved: finpulse_model.pkl  scaler.pkl  feature_cols.json")
print("   Run  python app.py  to start the API.")