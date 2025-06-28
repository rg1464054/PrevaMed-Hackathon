import streamlit as st
import numpy as np
import pandas as pd
import pickle
import warnings

warnings.filterwarnings("ignore")

# Load trained model
model = pickle.load(open("C:\Hackathon_Gwalior\diagnox\models\cancer_pred\cancer_pred.sav", 'rb'))

# Feature names in exact order
feature_names = [
    'radius_mean', 'texture_mean', 'perimeter_mean', 'area_mean', 'smoothness_mean',
    'compactness_mean', 'concavity_mean', 'concave points_mean', 'symmetry_mean', 'fractal_dimension_mean',
    'radius_se', 'texture_se', 'perimeter_se', 'area_se', 'smoothness_se',
    'compactness_se', 'concavity_se', 'concave points_se', 'symmetry_se', 'fractal_dimension_se',
    'radius_worst', 'texture_worst', 'perimeter_worst', 'area_worst', 'smoothness_worst',
    'compactness_worst', 'concavity_worst', 'concave points_worst', 'symmetry_worst', 'fractal_dimension_worst'
]

# Prediction function
def predict_cancer(input_data):
    input_np = np.asarray(input_data).reshape(1, -1)
    prediction = model.predict(input_np)[0]
    return prediction

# Streamlit UI
def main():
    st.set_page_config(page_title="Cancer Prediction", layout="centered")
    st.title("🧬 Breast Cancer Prediction Web App")

    st.subheader("📋 Upload File (Optional)")
    uploaded_file = st.file_uploader("Upload a CSV or Excel file with 30 features", type=["csv", "xlsx"])

    user_inputs = {}

    if uploaded_file:
        try:
            if uploaded_file.name.endswith('.csv'):
                df = pd.read_csv(uploaded_file)
            else:
                df = pd.read_excel(uploaded_file)

            if all(feature in df.columns for feature in feature_names):
                row = df.iloc[0]
                st.success("✅ File loaded successfully! Values autofilled below.")
                for feat in feature_names:
                    user_inputs[feat] = float(row[feat])
            else:
                st.error("❌ File must contain all 30 required feature columns.")
        except Exception as e:
            st.error(f"Error processing file: {e}")

    st.subheader("🔢 Manual Entry (or edit autofilled values)")

    col1, col2 = st.columns(2)
    with col1:
        for feature in feature_names[:15]:
            user_inputs[feature] = st.number_input(feature.replace("_", " ").title(), value=user_inputs.get(feature, 0.0))

    with col2:
        for feature in feature_names[15:]:
            user_inputs[feature] = st.number_input(feature.replace("_", " ").title(), value=user_inputs.get(feature, 0.0))

    input_data = [user_inputs[feature] for feature in feature_names]

    if st.button("Predict Cancer"):
        with st.spinner("Analyzing..."):
            prediction = predict_cancer(input_data)
            if prediction == 1:
                st.error("⚠️ Tumor is likely **Malignant** (Cancer)")
                st.subheader("🔍 Recommendations:")
                st.markdown("""
                - Seek immediate consultation with an oncologist or cancer specialist.
                - Consider further diagnostic tests such as MRI, biopsy, or PET scans.
                - Discuss treatment options including surgery, chemotherapy, or radiation therapy.
                - Maintain a support system with family and mental health professionals.
                - Avoid smoking, alcohol, and manage stress levels.
                """)
            else:
                st.success("✅ Tumor is likely **Benign**")
                st.subheader("💡 Recommendations:")
                st.markdown("""
                - Continue routine medical checkups and breast self-examinations.
                - Maintain a healthy lifestyle with regular exercise and a balanced diet.
                - Reduce exposure to environmental risk factors.
                - Inform your doctor if you have a family history of cancer.
                - Schedule regular mammograms or screenings as recommended by your physician.
                """)

if __name__ == '__main__':
    main()
