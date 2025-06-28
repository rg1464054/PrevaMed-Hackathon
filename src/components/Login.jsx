import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' // ✅ import useNavigate
import { User, LockKeyhole } from 'lucide-react'
import { auth } from './firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const navigate = useNavigate() // ✅ create navigate hook
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Please fill all fields')
      return
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('Logged in successfully!')

      // ✅ Redirect to dashboard
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  return (
    <div className="w-full flex justify-center items-center lg:h-screen bg-gray-800 overflow-hidden">
      <ToastContainer />
      {/* Login Section */}
      <div className="w-full lg:w-2/5 px-4 m-4">
        <div className="px-6 lg:px-20 py-12 lg:py-20 bg-gray-600 rounded-lg text-gray-800">
          <form onSubmit={handleLogin}>
            <h3 className="mb-10 text-3xl text-white font-bold font-heading text-center">
              User Login
            </h3>

            {/* Email Field */}
            <div className="flex items-center pl-6 mb-6 bg-white rounded-full">
              <span className="inline-block pr-3 py-2 border-r border-gray-500">
                <User />
              </span>
              <input
                className="w-full pl-4 pr-6 py-4 bg-white text-black font-bold placeholder-gray-600 rounded-r-full focus:outline-none"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
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
              />
            </div>

            {/* Remember Me */}
            {/* <div className="inline-flex mb-10">
              <input className="mr-4 mt-4" type="checkbox" />
              <p className="mt-4 text-base text-gray-200">Remember Me</p>
            </div> */}

            {/* Login Button */}
            <button
              type="submit"
              className="py-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition duration-200"
            >
              Login
            </button>

            {/* Sign Up Link */}
            <p className="mt-4 text-lg text-gray-200 text-center">
              Not a member?
              <Link
                to="/register"
                className="text-blue-400 hover:underline hover:text-violet-900"
              >
                {' '}
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
