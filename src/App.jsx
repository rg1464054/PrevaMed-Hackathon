import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Section from './components/Section'
import Features from './components/Features'
import Footer from './components/Footer'
import Login from './components/Login'
import AdminLogin from './components/AdminLogin'
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard'
import AdminDashboard from './components/AdminDashboard'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <About />
                <Section />
                <Features />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/adminboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
