import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, LockKeyhole } from 'lucide-react'

const AdminLogin = () => {
  const navigate = useNavigate()

  // Controlled input states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Hardcoded admin credentials
  const ADMIN_USERNAME = 'admin123'
  const ADMIN_PASSWORD = 'securepass'

  const handleLogin = (e) => {
    e.preventDefault()

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      navigate('/adminboard')
    } else {
      setError('Invalid credentials. Please try again or use User Login.')
    }
  }

  return (
    <div className="w-full flex justify-center items-center lg:h-screen bg-gray-800 overflow-hidden">
      {/* Login Section */}
      <div className="w-full lg:w-2/5 px-4 m-4">
        <div className="px-6 lg:px-20 py-12 lg:py-20 bg-gray-600 rounded-lg text-gray-800">
          <form onSubmit={handleLogin}>
            <h3 className="mb-10 text-3xl text-white font-bold text-center">
              Admin Login
            </h3>
            {/* Show error */}
            {error && (
              <p className="mb-4 text-red-400 text-center font-semibold">
                {error}
              </p>
            )}
            {/* Username */}
            <div className="flex items-center pl-6 mb-6 bg-white rounded-full">
              <span className="inline-block pr-3 py-2 border-r border-gray-500">
                <User />
              </span>
              <input
                className="w-full pl-4 pr-6 py-4 bg-white text-black font-bold placeholder-gray-600 rounded-r-full focus:outline-none"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            {/* Password */}
            <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
              <span className="inline-block pr-3 py-2 border-r border-gray-500">
                <LockKeyhole />
              </span>
              <input
                className="w-full pl-4 pr-6 py-4 bg-white text-black font-bold placeholder-gray-600 rounded-r-full focus:outline-none"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <br /> <br />
            <button
              type="submit"
              className="py-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition duration-200"
            >
              Login
            </button>
            <p className="mt-4 text-lg text-gray-200 text-center">
              Not an admin?
              <Link
                to="/login"
                className="text-blue-400 hover:underline hover:text-violet-900"
              >
                {' '}
                User Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
