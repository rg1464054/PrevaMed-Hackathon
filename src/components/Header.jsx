import React from 'react'
import logo from '../assets/prevamed.jpg'
import { auth } from './firebase' // adjust path if needed
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      // ✅ Clear saved name from localStorage
      localStorage.removeItem('username')
      navigate('/')
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return (
    <div className="sticky top-0 z-50 py-3 border-b bg-black shadow">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
            <span className="text-xl font-bold text-white">PrevaMed</span>
          </div>

          {/* Centered Title with Gradient */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              HealthCare Analytics
            </h1>
          </div>

          {/* Logout */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
