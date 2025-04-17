from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier

# Initialize FastAPI
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (can be restricted)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load dataset
file_path = r"c:\Users\sandh\Downloads\family_health_dataset_1000_rows_restecg_mapped.xlsx"
df = pd.read_excel(file_path)

# Convert categorical columns to lowercase before encoding
df["Relation"] = df["Relation"].str.lower()
df["RestECG"] = df["RestECG"].str.lower()

# Label Encoding
label_enc_relation = LabelEncoder()
label_enc_restecg = LabelEncoder()

df["Relation"] = label_enc_relation.fit_transform(df["Relation"])
df["RestECG"] = label_enc_restecg.fit_transform(df["RestECG"])

# Prepare training data
X, y = [], []

for i in range(0, len(df), 3):  # Ensuring groups of 3 generations
    family = df.iloc[i:i+3]
    if len(family) == 3:
        gen1, gen2, gen3 = family.iloc[0], family.iloc[1], family.iloc[2]
        features = [
            gen1["Relation"], gen1["Age"], gen1["BP"], gen1["Chol"], gen1["RestECG"], gen1["Risk"],
            gen2["Relation"], gen2["Age"], gen2["BP"], gen2["Chol"], gen2["RestECG"], gen2["Risk"],
            gen3["Relation"], gen3["Age"], gen3["BP"], gen3["Chol"], gen3["RestECG"]
        ]
        target = gen3["Risk"]
        X.append(features)
        y.append(target)

X = pd.DataFrame(X)
y = np.array(y)

# Train XGBoost Model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
model = XGBClassifier(n_estimators=200, use_label_encoder=False, eval_metric='logloss')
model.fit(X_train, y_train)

# Define Input Schema
class GenerationData(BaseModel):
    age: int
    bloodPressure: int
    cholesterol: int
    restECG: str

class PredictionRequest(BaseModel):
    gen1: GenerationData
    gen2: GenerationData
    gen3: GenerationData

@app.post("/predict")
async def predict_heart_disease(request: PredictionRequest):
    try:
        # Encode categorical inputs
        rest_ecg1 = label_enc_restecg.transform([request.gen1.restECG.lower()])[0]
        rest_ecg2 = label_enc_restecg.transform([request.gen2.restECG.lower()])[0]
        rest_ecg3 = label_enc_restecg.transform([request.gen3.restECG.lower()])[0]

        # Fetch risk values
        risk_value1 = df[df["Age"] == request.gen1.age]["Risk"].values
        risk_value2 = df[df["Age"] == request.gen2.age]["Risk"].values

        # Set default risk if missing
        risk_value1 = risk_value1[0] if len(risk_value1) > 0 else 0
        risk_value2 = risk_value2[0] if len(risk_value2) > 0 else 0

        # Prepare input for prediction
        input_data = np.array([
            0, request.gen1.age, request.gen1.bloodPressure, request.gen1.cholesterol, rest_ecg1, risk_value1,
            0, request.gen2.age, request.gen2.bloodPressure, request.gen2.cholesterol, rest_ecg2, risk_value2,
            0, request.gen3.age, request.gen3.bloodPressure, request.gen3.cholesterol, rest_ecg3
        ]).reshape(1, -1)

        # Predict risk
        predicted_risk = model.predict(input_data)[0]

        return {
            "prediction": int(predicted_risk),
            "message": "Prediction successful",
            "status": "success"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
 