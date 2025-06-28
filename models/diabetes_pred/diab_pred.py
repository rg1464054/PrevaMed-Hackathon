import streamlit as st
import numpy as np
import pickle
import warnings

warnings.filterwarnings("ignore")

# Load the trained model
model = pickle.load(open("C:\Hackathon_Gwalior\diagnox\models\diabetes_pred\diabetes_model.sav", 'rb'))  # Update with correct path if needed

# Prediction function
def predict_diabetes(input_data):
    input_np = np.asarray(input_data).reshape(1, -1)
    prediction = model.predict(input_np)[0]
    return prediction

# Streamlit UI
def main():
    st.set_page_config(page_title="Diabetes Prediction", layout="centered")
    st.title("🧪 Diabetes Risk Prediction Web App")
    st.subheader("📋 Patient Medical Inputs")

    col1, col2 = st.columns(2)
    with col1:
        Pregnancies = st.number_input("Number of Pregnancies", min_value=0, step=1)
        Glucose = st.number_input("Plasma Glucose Concentration (mg/dL)", min_value=0.0)
        BloodPressure = st.number_input("Diastolic Blood Pressure (mm Hg)", min_value=0.0)
        SkinThickness = st.number_input("Triceps Skin Fold Thickness (mm)", min_value=0.0)
        Insulin = st.number_input("2-Hour Serum Insulin (mu U/ml)", min_value=0.0)

    with col2:
        BMI = st.number_input("Body Mass Index (BMI)", min_value=0.0)
        DiabetesPedigreeFunction = st.number_input("Diabetes Pedigree Function", min_value=0.0, format="%.4f")
        Age = st.slider("Age (years)", 10, 100)

    input_data = [
        Pregnancies, Glucose, BloodPressure, SkinThickness,
        Insulin, BMI, DiabetesPedigreeFunction, Age
    ]

    if st.button("Predict Diabetes Risk"):
        with st.spinner("Analyzing..."):
            prediction = predict_diabetes(input_data)

            if prediction == 1:
                st.error("⚠️ High Risk of Diabetes")
                st.subheader("🔍 Recommendations:")
                st.markdown("""
                - Consult an endocrinologist or primary care physician immediately.
                - Monitor blood sugar levels regularly.
                - Maintain a balanced, low-sugar and high-fiber diet.
                - Engage in regular physical activity (at least 30 mins/day).
                - Avoid smoking and limit alcohol consumption.
                - Track weight and aim for gradual weight loss if overweight.
                """)
            else:
                st.success("✅ Low Risk of Diabetes")
                st.subheader("💡 Recommendations:")
                st.markdown("""
                - Continue maintaining a healthy lifestyle.
                - Eat a balanced diet rich in vegetables, whole grains, and lean proteins.
                - Stay physically active most days of the week.
                - Go for periodic health check-ups, especially if you have a family history.
                - Avoid processed foods and sugary beverages.
                """)

if __name__ == '__main__':
    main()
