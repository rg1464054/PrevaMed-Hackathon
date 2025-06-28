import streamlit as st
import numpy as np
import pickle
import warnings

warnings.filterwarnings("ignore")

# Load trained model
model = pickle.load(open(r"C:\Hackathon_Gwalior\diagnox\models\ast_pred\ast_pred.sav", 'rb'))

# Mapping dictionaries for display
ethnicity_mapping = {0: "Caucasian", 1: "African American", 2: "Asian", 3: "Other"}
education_mapping = {0: "None", 1: "High School", 2: "Bachelor's", 3: "Higher"}

# Prediction function
def predict_asthma(input_data):
    input_np = np.asarray(input_data).reshape(1, -1)
    prediction = model.predict(input_np)[0]
    proba = model.predict_proba(input_np)[0][1]
    return prediction, round(proba * 100, 2)

# Streamlit UI
def main():
    st.set_page_config(page_title="Asthma Prediction", layout="centered")
    st.title("🫁 Asthma Prediction Web App")

    st.subheader("📋 Patient Details")

    col1, col2 = st.columns(2)
    with col1:
        Age = st.slider("Age", 5, 80)
        Gender = st.radio("Gender", [0, 1], format_func=lambda x: "Male" if x == 0 else "Female")
        Ethnicity = st.selectbox("Ethnicity", list(ethnicity_mapping.keys()), format_func=lambda x: ethnicity_mapping[x])
        EducationLevel = st.selectbox("Education Level", list(education_mapping.keys()), format_func=lambda x: education_mapping[x])
        BMI = st.slider("BMI", 15.0, 40.0)

        Smoking = st.radio("Smoking", [0, 1], format_func=lambda x: "No" if x == 0 else "Yes")
        PhysicalActivity = st.slider("Physical Activity (hrs/week)", 0.0, 10.0)
        DietQuality = st.slider("Diet Quality (0-10)", 0, 10)
        SleepQuality = st.slider("Sleep Quality (4-10)", 4, 10)

        PollutionExposure = st.slider("Pollution Exposure (0-10)", 0, 10)
        PollenExposure = st.slider("Pollen Exposure (0-10)", 0, 10)
        DustExposure = st.slider("Dust Exposure (0-10)", 0, 10)
        PetAllergy = st.radio("Pet Allergy", [0, 1], format_func=lambda x: "No" if x == 0 else "Yes")
    
    with col2:
        FamilyHistoryAsthma = st.radio("Family History of Asthma", [0, 1], format_func=lambda x: "No" if x == 0 else "Yes")
        HistoryOfAllergies = st.radio("History of Allergies", [0, 1])
        Eczema = st.radio("Eczema", [0, 1])
        HayFever = st.radio("Hay Fever", [0, 1])
        GastroesophagealReflux = st.radio("Gastroesophageal Reflux", [0, 1])

        LungFunctionFEV1 = st.slider("FEV1 (L)", 1.0, 4.0)
        LungFunctionFVC = st.slider("FVC (L)", 1.5, 6.0)

        Wheezing = st.radio("Wheezing", [0, 1])
        ShortnessOfBreath = st.radio("Shortness of Breath", [0, 1])
        ChestTightness = st.radio("Chest Tightness", [0, 1])
        Coughing = st.radio("Coughing", [0, 1])
        NighttimeSymptoms = st.radio("Nighttime Symptoms", [0, 1])
        ExerciseInduced = st.radio("Exercise Induced Symptoms", [0, 1])

    # Feature vector
    input_data = [
        Age, Gender, Ethnicity, EducationLevel, BMI, Smoking, PhysicalActivity,
        DietQuality, SleepQuality, PollutionExposure, PollenExposure, DustExposure,
        PetAllergy, FamilyHistoryAsthma, HistoryOfAllergies, Eczema, HayFever,
        GastroesophagealReflux, LungFunctionFEV1, LungFunctionFVC, Wheezing,
        ShortnessOfBreath, ChestTightness, Coughing, NighttimeSymptoms, ExerciseInduced
    ]

    if st.button("Predict Asthma Risk"):
        with st.spinner("Analyzing..."):
            prediction, probability = predict_asthma(input_data)
            if prediction == 1:
                st.error(f"⚠️ Likely Asthmatic ")
            else:
                st.success(f"✅ Unlikely to be Asthmatic")

if __name__ == '__main__':
    main()
