import React, { useEffect, useState } from 'react'
import { UserCircle, CalendarDays, Sparkles } from 'lucide-react'
import { auth, db } from './firebase'
import { doc, getDoc } from 'firebase/firestore'

function WelcomePanel() {
  const [userName, setUserName] = useState('User')
  const [lastLogin, setLastLogin] = useState(new Date().toLocaleDateString())

  useEffect(() => {
    const fetchUserData = async () => {
      // Check if we already have the name in localStorage
      const storedName = localStorage.getItem('username')
      if (storedName) {
        setUserName(storedName)
        return // No need to fetch again
      }

      if (auth.currentUser) {
        const uid = auth.currentUser.uid
        const userDoc = await getDoc(doc(db, 'users', uid))
        if (userDoc.exists()) {
          const data = userDoc.data()
          const name = data.firstName || 'User'
          setUserName(name)
          // Save to localStorage so it persists
          localStorage.setItem('username', name)
        }
      }
    }

    fetchUserData()
  }, [])

  const handleScrollToPrediction = () => {
    const section = document.getElementById('prediction-cards')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-700 to-gray-800 text-white p-8 rounded-3xl shadow-xl max-w-xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <UserCircle className="w-14 h-14 text-white/90" />
        <div>
          <h2 className="text-3xl font-bold leading-tight">
            Welcome back, <span className="text-blue-400">{userName}</span>!
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-2 text-gray-300 text-sm mb-6">
        <CalendarDays className="w-5 h-5" />
        <span>Last login: {lastLogin}</span>
      </div>

      <div className="bg-gray-600/50 p-4 rounded-2xl flex items-start gap-3">
        <Sparkles className="w-6 h-6 mt-1 text-blue-400" />
        <p className="text-gray-200 text-sm italic">
          💡 Tip: “Prevention is better than cure — check your health risks and
          stay ahead.”
        </p>
      </div>

      <button
        onClick={handleScrollToPrediction}
        className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-2xl transition-all duration-200 shadow-md"
      >
        ➜ Run New Prediction
      </button>
    </div>
  )
}

export default WelcomePanel
