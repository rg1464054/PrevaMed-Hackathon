import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, LockKeyhole, Mail } from 'lucide-react'
import { auth, db } from './firebase' // adjust path if needed
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
  // Form state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Form submit handler
  const handleRegister = async (e) => {
    e.preventDefault()

    if (!firstName || !lastName || !email || !password) {
      toast.error('Please fill all fields')
      return
    }

    try {
      // 1️⃣ Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      // 2️⃣ Save user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: user.email,
      })

      // 3️⃣ Show success toast
      toast.success('Registered successfully!')

      // 4️⃣ Clear form (optional)
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  return (
    <section className="relative lg:h-screen bg-gray-800 overflow-hidden">
      <ToastContainer /> {/* ✅ Toast container */}
      <div className="relative container px-4 mt-5 mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center -mx-4">
          {/* Left Section */}
          <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
            <div className="max-w-lg">
              <span className="text-4xl text-blue-400 font-bold">
                Welcome to PrevaMed
              </span>
              <h2 className="mt-8 mb-12 text-5xl font-semibold font-heading text-white">
                Start your new journey by creating an account.
              </h2>
              <p className="text-lg text-gray-200">
                <span>“Predict, Prevent, and Personalize Your Healthcare”</span>
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/2 px-4 mb-4">
            <div className="px-6 lg:px-10 py-12 lg:py-16 bg-gray-600 rounded-lg text-gray-800">
              <form onSubmit={handleRegister}>
                <h3 className="mb-10 text-2xl text-white font-bold font-heading text-center">
                  Register Account
                </h3>

                {/* First Name */}
                <div className="flex items-center pl-6 mb-4 bg-white rounded-full">
                  <span className="inline-block pr-3 py-2 border-r border-gray-500">
                    <User />
                  </span>
                  <input
                    className="w-full pl-4 pr-6 py-4 bg-white font-bold placeholder-gray-600 rounded-r-full focus:outline-none"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                {/* Last Name */}
                <div className="flex items-center pl-6 mb-4 bg-white rounded-full">
                  <span className="inline-block pr-3 py-2 border-r border-gray-500">
                    <User />
                  </span>
                  <input
                    className="w-full pl-4 pr-6 py-4 bg-white font-bold placeholder-gray-600 rounded-r-full focus:outline-none"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                {/* Email */}
                <div className="flex items-center pl-6 mb-4 bg-white rounded-full">
                  <span className="inline-block pr-3 py-2 border-r border-gray-500 ">
                    <Mail />
                  </span>
                  <input
                    className="w-full pl-4 pr-6 py-4 bg-white font-bold placeholder-gray-600 rounded-r-full focus:outline-none"
                    type="email"
                    placeholder="example@simigra.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password */}
                <div className="flex items-center pl-6 mb-4 bg-white rounded-full">
                  <span className="inline-block pr-3 py-2 border-r border-gray-500">
                    <LockKeyhole />
                  </span>
                  <input
                    className="w-full pl-4 pr-6 py-4 bg-white font-bold placeholder-gray-600 rounded-r-full focus:outline-none"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Checkbox */}
                <div className="inline-flex mb-10">
                  <input className="mr-4" type="checkbox" />
                  <p className="mt-3 text-sm text-gray-200">
                    By signing up, you agree to our Terms, Data Policy and
                    Cookies
                  </p>
                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  className="py-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition duration-200"
                >
                  Get started
                </button>

                {/* Login Link */}
                <p className="mt-4 text-lg text-gray-200 text-center">
                  Already have an account?
                  <Link
                    to="/login"
                    className="text-blue-400 hover:underline hover:text-violet-900"
                  >
                    {' '}
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
