import pandas as pd
import xgboost as xgb
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
import uvicorn

# Initialize FastAPI app
app = FastAPI()

# Load dataset
file_path = "family_health_dataset_1000_rows_restecg_mapped.xlsx"
df = pd.read_excel(file_path)

# Mapping dictionaries
relation_mapping = {
    "Grandmother": 1, "Grandfather": 1,
    "Mother": 2, "Father": 2,
    "Daughter": 3, "Son": 3
}

restecg_mapping = {
    "normal": 0,
    "abnormal": 1,
    "hypertrophy": 2
}

# Convert categorical values to numeric
df["Relation"] = df["Relation"].map(relation_mapping)
df["RestECG"] = df["RestECG"].map(restecg_mapping)
df = df.dropna()

# Train ML models
def train_models():
    X = df.drop(columns=["Risk", "DOB"])
    y = df["Risk"]

    models = {
        "xgboost": xgb.XGBClassifier(use_label_encoder=False, eval_metric="logloss"),
        "svm": SVC(probability=True),
        "randomforest": RandomForestClassifier(n_estimators=100, random_state=42),
    }

    for model in models.values():
        model.fit(X, y)
    
    return models

models = train_models()

# Request model for input validation
class PatientInput(BaseModel):
    relation: str
    age: int
    bp: float
    chol: float
    restecg: str
    model_type: str  # xgboost, svm, or randomforest

@app.post("/predict")
def predict_risk(data: PatientInput):
    if data.model_type not in models:
        raise HTTPException(status_code=400, detail="Invalid model type")
    
    relation = relation_mapping.get(data.relation, 0)
    restecg = restecg_mapping.get(data.restecg, 0)
    
    df_input = pd.DataFrame([{ "Relation": relation, "Age": data.age, "BP": data.bp, "Chol": data.chol, "RestECG": restecg }])
    model = models[data.model_type]
    risk_score = model.predict(df_input)[0]
    
    return {
        "model": data.model_type,
        "predicted_risk": "High" if risk_score == 1 else "Low"
    }

# Run server
if _name_ == "_main_":
    uvicorn.run(app, host="0.0.0.0", port=8000)