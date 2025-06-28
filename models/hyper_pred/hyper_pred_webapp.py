import streamlit as st
import numpy as np
import pickle
import warnings

warnings.filterwarnings("ignore")

# Load trained model
model = pickle.load(open("C:\Hackathon_Gwalior\diagnox\models\hyper_pred\hyper_pred.sav", 'rb'))  # Update with your actual model filename if different

# Prediction function
def predict_hypertension(input_data):
    input_np = np.asarray(input_data).reshape(1, -1)
    prediction = model.predict(input_np)[0]
    probability = model.predict_proba(input_np)[0][1]  # Probability of high risk
    return prediction, round(probability * 100, 2)

# Streamlit UI
def main():
    st.set_page_config(page_title="Hypertension Prediction", layout="centered")
    st.title("🫀 Hypertension Risk Prediction Web App")

    st.subheader("📋 Patient Health & Lifestyle Information")

    col1, col2 = st.columns(2)
    with col1:
        male = st.radio("Gender", [1, 0], format_func=lambda x: "Male" if x == 1 else "Female")
        age = st.slider("Age", 18, 100)
        currentSmoker = st.radio("Currently Smoking", [0, 1], format_func=lambda x: "Yes" if x == 1 else "No")
        cigsPerDay = st.slider("Cigarettes per Day", 0, 60)
        BPMeds = st.radio("Taking Blood Pressure Medication?", [0, 1], format_func=lambda x: "Yes" if x == 1 else "No")
        diabetes = st.radio("Diabetic", [0, 1], format_func=lambda x: "Yes" if x == 1 else "No")
        totChol = st.number_input("Total Cholesterol (mg/dL)")

    with col2:
        sysBP = st.number_input("Systolic BP (mmHg)")
        diaBP = st.number_input("Diastolic BP (mmHg)")
        BMI = st.number_input("Body Mass Index (BMI)")
        heartRate = st.number_input("Heart Rate (bpm)")
        glucose = st.number_input("Glucose Level (mg/dL)")

    # Feature vector in order
    input_data = [
        male, age, currentSmoker, cigsPerDay, BPMeds, diabetes,
        totChol, sysBP, diaBP, BMI, heartRate, glucose
    ]

    if st.button("Predict Hypertension Risk"):
        with st.spinner("Analyzing..."):
            prediction, prob = predict_hypertension(input_data)
            if prediction == 1:
                st.error(f"⚠️ High Risk of Hypertension — Probability: {prob}%")
            else:
                st.success(f"✅ Low Risk of Hypertension — Probability: {prob}%")

if __name__ == '__main__':
    main()
