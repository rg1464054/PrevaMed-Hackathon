// Icons
import { ClipboardList } from 'lucide-react'
import { Cpu } from 'lucide-react'
import { HeartPulse } from 'lucide-react'
import { LayoutDashboard } from 'lucide-react'
import { SearchCheck } from 'lucide-react'
import { Languages } from 'lucide-react'

// Navbar Items
export const navItems = [
  { label: 'Home', href: '#Home' },
  { label: 'About', href: '#About' },
  { label: 'Features', href: '#Features' },
  { label: 'Contacts', href: '#Contacts' },
]

// Why Choose Simigra
import Riskdetection from '../animations/Riskdetection.json'
import Analysis from '../animations/Analysis.json'
import EasyPlatform from '../animations/EasyPlatform.json'

export const whyData = [
  {
    text: 'Early Risk Detection',
    description:
      'PrevaMed uses advanced machine learning to identify potential health risks before symptoms appear — empowering users to take preventive action early.',
    animation: Riskdetection,
  },
  {
    text: 'Personalized, Actionable Insights',
    description:
      'We analyze your medical history, lifestyle, and clinical data to deliver health predictions and recommendations tailored specifically to you.',
    animation: Analysis,
  },
  {
    text: 'Easy-to-Use Platform',
    description:
      'With a simple, intuitive dashboard and visual reports, PrevaMed makes complex health data easy to understand — for both patients and healthcare providers.',
    animation: EasyPlatform,
  },
]

// Features
export const feature = [
  {
    icon: <ClipboardList />,
    id: '1',
    text: 'Comprehensive Patient Data Analysis',
    description:
      'PrevaMed processes a wide range of medical inputs — including demographics, lifestyle factors, medical history, symptoms, and lab results. This holistic data integration ensures accurate and personalized health assessments for each user.',
  },
  {
    icon: <Cpu />,
    id: '2',
    text: 'Lightweight and Efficient Machine Learning Models',
    description:
      'The platform utilizes Logistic Regression and Decision Tree algorithms, offering fast and efficient predictions. These models are optimized for performance, making PrevaMed suitable for real-time or low-resource environments.',
  },
  // {
  //   icon: <HeartPulse />,
  //   id: '3',
  //   text: 'Personalized Risk Scoring System',
  //   description:
  //     'Users receive a detailed risk score based on their individual health profile. This score reflects the likelihood of developing specific diseases such as diabetes, cancer, hypertension, asthma, or chronic kidney disease.',
  // },
  {
    icon: <LayoutDashboard />,
    id: '3',
    text: 'Interactive and Visual Prediction Dashboard',
    description:
      'Through an easy-to-use web interface (powered by Streamlit), users can select a disease, input medical data, and instantly receive predictions. The dashboard also allows visualization of key risk factors and changes over time.',
  },
  // {
  //   icon: <SearchCheck />,
  //   id: '5',
  //   text: 'Explainable AI and Preventive Health Recommendations',
  //   description:
  //     "PrevaMed doesn't just predict — it explains. Users see which factors contributed most to their risk and receive actionable recommendations, like lifestyle changes or screening suggestions, to reduce health risks.",
  // },
]

//Footer Links
export const QuickLinks = [
  { href: '#', text: 'Home' },
  { href: '#', text: 'About' },
  { href: '#', text: 'Features' },
  { href: '#', text: 'Contacts' },
  { href: '#', text: 'FAQ' },
]

export const Contacts = [
  { href: '#', text: 'Email: support@prevamed.com' },
  { href: '#', text: 'Phone: +91 12345-67890' },
  { href: '#', text: 'Telephone: 0123-4567' },
  { href: '#', text: 'Address: 123 Migration Lane, Suite 456, City, Country' },
]

export const FollowUs = [
  { href: '#', text: 'Intagram' },
  { href: '#', text: 'Facebook' },
  { href: '#', text: 'Youtube' },
  { href: '#', text: 'Twitter' },
  { href: '#', text: 'LinkedIn' },
]

// Sidebar options
export const SidebarData = [
  { title: 'Dashboard', icon: <Languages /> },
  { title: 'Travel', icon: <Languages /> },
  { title: 'Food', icon: <Languages /> },
  { title: 'Cultural', icon: <Languages /> },
  { title: 'Accomodation', icon: <Languages /> },
]

//Dashboard Card

import CancerAnimation from '../animations/Cancer.json'
import DiabetesAnimation from '../animations/Diabetes.json'
import HypertensionAnimation from '../animations/Hypertension.json'
import AsthmaAnimation from '../animations/Asthma.json'
import CKDAnimation from '../animations/Ckd.json'

export const DashboardData = [
  {
    title: 'Cancer',
    description:
      'Assess your risk of various types of cancer using medical history, genetics, and lifestyle factors. Get personalized insights to take early preventive actions and plan screenings on time.',
    button: 'Predict Cancer Risk',
    animation: CancerAnimation,
    url: 'http://localhost:8502',
  },
  {
    title: 'Diabetes',
    description:
      'Predict your chances of developing diabetes based on key health markers and habits. Receive clear suggestions to adjust your diet, activity, and monitor blood sugar levels more effectively.',
    button: 'Predict Diabetes Risk',
    animation: DiabetesAnimation,
    url: 'http://localhost:8504',
  },
  {
    title: 'Hypertension',
    description:
      'Check your risk of high blood pressure using clinical and lifestyle data. Get tailored advice to manage stress, monitor vitals, and maintain a heart-healthy lifestyle.',
    button: 'Predict Hypertension Risk',
    animation: HypertensionAnimation,
    url: 'http://localhost:8505',
  },
  {
    title: 'Asthma',
    description:
      'Evaluate your susceptibility to asthma using respiratory patterns and personal data. Understand triggers and get recommendations to better manage breathing health.',
    button: 'Predict Asthma Risk',
    animation: AsthmaAnimation,
    url: 'http://localhost:8501',
  },
  {
    title: 'Chronic Kidney Disease (CKD)',
    description:
      'Get a personalized assessment of your risk for CKD based on lab results and health history. Learn how to protect kidney function through early detection and lifestyle changes.',
    button: 'Predict CKD Risk',
    animation: CKDAnimation,
    url: 'http://localhost:8503',
  },
]
