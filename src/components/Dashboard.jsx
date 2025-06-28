import React from 'react'
import Lottie from 'react-lottie-player'
import Header from './Header'
import Footer from './Footer'
import { DashboardData } from '../constants'
import WelcomePanel from './WelcomePanel'

const Dashboard = () => {
  return (
    <body className="relative overflow-hidden max-h-screen">
      {/* Header Navbar */}
      <Header />

      {/* Dashboard Section  */}
      <main className="m-auto pt-16 max-h-screen overflow-auto text-white">
        <div className="p-8">
          <WelcomePanel />
        </div>
        <div
          id="prediction-cards"
          className="px-6 py-8 mx-auto rounded-3xl p-8 mb-5"
        >
          <h1 className="text-3xl font-bold mb-16 text-center">
            Start your Health Care Journey Today with PrevaMed{' '}
          </h1>

          <div className="flex flex-col gap-16 mb-8">
            <div className="flex flex-col items-center">
              {DashboardData.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col sm:flex-row items-center 
              ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''} gap-36 mb-16`}
                >
                  <div className="md:w-1/2 mx-auto transform scale-140">
                    <Lottie
                      loop
                      play
                      animationData={item.animation}
                      style={{ width: 300, height: 300 }}
                    />
                  </div>

                  <div className="w-1/2 mx-auto bg-gray-700 rounded-3xl">
                    <div className="bg-darkblue bg-opacity-40 flex flex-col gap-4 p-8 py-8 w-96 rounded-3xl">
                      <h1 className="text-white text-xl">
                        {index + 1}. {item.title}
                      </h1>
                      <p className="text-gray-400 ">{item.description}</p>
                      <button
                        onClick={() => (window.location.href = item.url)}
                        className="bg-blue-600 h-10 rounded-full hover:bg-blue-900 px-6"
                      >
                        {item.button}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Footer Section  */}
        <Footer />
      </main>
    </body>
  )
}

export default Dashboard
