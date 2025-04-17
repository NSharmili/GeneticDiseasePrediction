import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score, classification_report

# Load the dataset
file_path = r"c:\Users\sandh\Downloads\family_health_dataset_1000_rows_restecg_mapped.xlsx"
df = pd.read_excel(file_path)

# Convert categorical columns to lowercase before encoding
df["Relation"] = df["Relation"].str.lower()
df["RestECG"] = df["RestECG"].str.lower()

# Label Encoding for categorical variables
label_enc_relation = LabelEncoder()
label_enc_restecg = LabelEncoder()

df["Relation"] = label_enc_relation.fit_transform(df["Relation"])
df["RestECG"] = label_enc_restecg.fit_transform(df["RestECG"])

# Group dataset into families (3 rows per family)
families = [df.iloc[i:i+3] for i in range(0, len(df), 3)]

# Prepare training data
X = []
y = []

for family in families:
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

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Train XGBoost Classifier
model = XGBClassifier(n_estimators=200, use_label_encoder=False, eval_metric='logloss')
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"Accuracy: {acc*100:.2f}%")
print("\nClassification Report:\n", classification_report(y_test, y_pred))

# Function to predict risk
def predict_risk():
    print("\n---- Risk Prediction ----")
    print("Enter details for Grandfather/Grandmother:")
    gen1_relation = input("Relation (Grandfather/Grandmother): ").strip().lower()
    gen1_age = int(input("Age: "))
    gen1_bp = int(input("BP: "))
    gen1_chol = int(input("Cholesterol: "))
    gen1_restecg = input("RestECG (Normal/Abnormal/Hypertrophy): ").strip().lower()

    print("\nEnter details for Father/Mother:")
    gen2_relation = input("Relation (Father/Mother): ").strip().lower()
    gen2_age = int(input("Age: "))
    gen2_bp = int(input("BP: "))
    gen2_chol = int(input("Cholesterol: "))
    gen2_restecg = input("RestECG (Normal/Abnormal/Hypertrophy): ").strip().lower()

    print("\nEnter details for Son/Daughter:")
    gen3_relation = input("Relation (Son/Daughter): ").strip().lower()
    gen3_age = int(input("Age: "))
    gen3_bp = int(input("BP: "))
    gen3_chol = int(input("Cholesterol: "))
    gen3_restecg = input("RestECG (Normal/Abnormal/Hypertrophy): ").strip().lower()

    try:
        gen1_relation = label_enc_relation.transform([gen1_relation])[0]
        gen1_restecg = label_enc_restecg.transform([gen1_restecg])[0]
        gen2_relation = label_enc_relation.transform([gen2_relation])[0]
        gen2_restecg = label_enc_restecg.transform([gen2_restecg])[0]
        gen3_relation = label_enc_relation.transform([gen3_relation])[0]
        gen3_restecg = label_enc_restecg.transform([gen3_restecg])[0]
    except ValueError:
        print("Error: Invalid category entered.")
        return

    # Retrieve Risks from dataset
    try:
        gen1_risk = df[(df["Relation"] == gen1_relation) & (df["Age"] == gen1_age)]["Risk"].values[0]
        gen2_risk = df[(df["Relation"] == gen2_relation) & (df["Age"] == gen2_age)]["Risk"].values[0]
    except IndexError:
        print("Error: No matching data found for Relation and Age.")
        return

    input_data = np.array([
        gen1_relation, gen1_age, gen1_bp, gen1_chol, gen1_restecg, gen1_risk,
        gen2_relation, gen2_age, gen2_bp, gen2_chol, gen2_restecg, gen2_risk,
        gen3_relation, gen3_age, gen3_bp, gen3_chol, gen3_restecg
    ]).reshape(1, -1)

    predicted_risk = model.predict(input_data)[0]
    print("\nPredicted Risk for Son/Daughter:", predicted_risk)

# Run prediction function
predict_risk()
