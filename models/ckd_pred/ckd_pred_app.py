import streamlit as st
import numpy as np
import pandas as pd
import pickle
import warnings

warnings.filterwarnings("ignore")

# Load trained model
model = pickle.load(open("C:\Hackathon_Gwalior\diagnox\models\ckd_pred\ckd_model.sav", 'rb'))

# Label encodings for categorical columns
label_encodings = {
    'rbc': {"normal": 0, "abnormal": 1},
    'pc': {"normal": 0, "abnormal": 1},
    'pcc': {"notpresent": 0, "present": 1},
    'ba': {"notpresent": 0, "present": 1},
    'htn': {"no": 0, "yes": 1},
    'dm': {"no": 0, "yes": 1},
    'cad': {"no": 0, "yes": 1},
    'appet': {"good": 0, "poor": 1},
    'pe': {"no": 0, "yes": 1},
    'ane': {"no": 0, "yes": 1}
}

# Apply label encoding
def apply_label_encoding(df):
    for col, mapping in label_encodings.items():
        if col in df.columns:
            df[col] = df[col].astype(str).str.lower().map(mapping)
    return df

# Prediction function
def predict_ckd(input_data):
    input_np = np.asarray(input_data).reshape(1, -1)
    prediction = model.predict(input_np)[0]
    probability = model.predict_proba(input_np)[0][1]
    return prediction, round(probability * 100, 2)

# Streamlit App
def main():
    st.set_page_config(page_title="CKD Prediction", layout="centered")
    st.title("🩺 Coronary Kidney Disease (CKD) Prediction Web App")

    st.subheader("📁 Upload Patient Data (CSV or Excel)")
    uploaded_file = st.file_uploader("Upload CSV or Excel file with feature columns", type=["csv", "xlsx"])

    if uploaded_file is not None:
        if uploaded_file.name.endswith('.csv'):
            df = pd.read_csv(uploaded_file)
        else:
            df = pd.read_excel(uploaded_file)

        df = apply_label_encoding(df)

        st.write("✅ Uploaded Data Preview:")
        st.dataframe(df)

        if st.button("Predict CKD for Uploaded Data"):
            with st.spinner("Analyzing..."):
                preds = []
                for index, row in df.iterrows():
                    input_data = row.tolist()
                    pred, prob = predict_ckd(input_data)
                    preds.append({
                        "Index": index,
                        "Prediction": "High Risk" if pred == 1 else "Low Risk",
                        "Probability (%)": prob
                    })
                result_df = pd.DataFrame(preds)
                st.success("✅ Prediction complete.")
                st.dataframe(result_df)
        st.markdown("---")

    st.subheader("🧾 Or Enter Details Manually")

    col1, col2 = st.columns(2)
    with col1:
        age = st.slider("Age", 1, 100)
        blood_pressure = st.number_input("Blood Pressure (mmHg)")
        specific_gravity = st.slider("Specific Gravity", 1.000, 1.030, step=0.001)
        albumin = st.slider("Albumin", 0.0, 5.0)
        sugar = st.slider("Sugar", 0.0, 5.0)

        red_blood_cells = st.radio("Red Blood Cells", [0, 1], format_func=lambda x: "Normal" if x == 0 else "Abnormal")
        pus_cell = st.radio("Pus Cell", [0, 1], format_func=lambda x: "Normal" if x == 0 else "Abnormal")
        pus_cell_clumps = st.radio("Pus Cell Clumps", [0, 1], format_func=lambda x: "No" if x == 0 else "Yes")
        bacteria = st.radio("Bacteria", [0, 1], format_func=lambda x: "No" if x == 0 else "Yes")
        blood_glucose_random = st.number_input("Blood Glucose (mg/dL)")
        blood_urea = st.number_input("Blood Urea (mg/dL)")
        serum_creatinine = st.number_input("Serum Creatinine (mg/dL)")

    with col2:
        sodium = st.number_input("Sodium (mEq/L)")
        potassium = st.number_input("Potassium (mEq/L)")
        haemoglobin = st.number_input("Hemoglobin (g/dL)")
        packed_cell_volume = st.number_input("Packed Cell Volume")
        white_blood_cell_count = st.number_input("WBC Count (cells/cumm)")
        red_blood_cell_count = st.number_input("RBC Count (millions/cumm)")

        hypertension = st.radio("Hypertension", [0, 1], format_func=lambda x: "No" if x == 0 else "Yes")
        diabetes_mellitus = st.radio("Diabetes Mellitus", [0, 1], format_func=lambda x: "No" if x == 0 else "Yes")
        coronary_artery_disease = st.radio("Coronary Artery Disease", [0, 1], format_func=lambda x: "No" if x == 0 else "Yes")
        appetite = st.radio("Appetite", [0, 1], format_func=lambda x: "Good" if x == 0 else "Poor")
        peda_edema = st.radio("Pedal Edema", [0, 1], format_func=lambda x: "No" if x == 0 else "Yes")
        aanemia = st.radio("Anemia", [0, 1], format_func=lambda x: "No" if x == 0 else "Yes")

    input_data = [
        age, blood_pressure, specific_gravity, albumin, sugar,
        red_blood_cells, pus_cell, pus_cell_clumps, bacteria,
        blood_glucose_random, blood_urea, serum_creatinine, sodium,
        potassium, haemoglobin, packed_cell_volume,
        white_blood_cell_count, red_blood_cell_count, hypertension,
        diabetes_mellitus, coronary_artery_disease, appetite,
        peda_edema, aanemia
    ]

    if st.button("Predict CKD Risk (Manual Entry)"):
        with st.spinner("Analyzing..."):
            prediction, prob = predict_ckd(input_data)
            if prediction == 1:
                st.error(f"⚠️ High Risk of CKD — Probability: {prob}%")
            else:
                st.success(f"✅ Low Risk of CKD — Probability: {prob}%")

if __name__ == '__main__':
    main()
