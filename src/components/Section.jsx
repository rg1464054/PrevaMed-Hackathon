import { whyData } from '../constants'
import Lottie from 'react-lottie-player'

const Section = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20 max-w-7xl mx-auto pt-20 px-6">
      {/* Header  */}
      <div className="text-center"></div>
      <h1 className="text-3xl sm:text-xl lg:text-4xl text-center tracking-wide font-bold underline">
        Why Choose PREVAMED?
      </h1>
      <div />

      {/* Why Section  */}
      <div className="flex flex-col gap-16 mb-8">
        <div className="flex flex-col items-center">
          {whyData.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col sm:flex-row items-center 
          ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''} gap-36 mb-16`}
            >
              {/* Lottie Animation */}
              <div className="md:w-1/2 mx-auto transform scale-140">
                <Lottie
                  loop
                  play
                  animationData={item.animation}
                  style={{ width: 300, height: 300 }}
                />
              </div>

              {/* Text & Description */}
              <div className="w-1/2 mx-auto bg-gray-700 rounded-3xl">
                <div className="bg-darkblue bg-opacity-40 flex flex-col gap-4 p-8 py-8 w-96 rounded-3xl">
                  <h1 className="text-white text-xl">{item.text}</h1>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Section
