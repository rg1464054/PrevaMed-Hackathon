import { feature } from '../constants'

const Features = () => {
  return (
    <div
      id="Features"
      className="relative mt-20 border-neutral-800 max-w-7xl mx-auto pt-20 px-6"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-xl lg:text-4xl tracking-wide font-bold underline">
          Features
        </h1>
      </div>

      {/* Row 1: 3 features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
        {feature.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-darkblue bg-opacity-40 rounded-3xl p-8 text-center"
          >
            <div className="flex justify-center items-center h-16 w-16 mb-4 bg-neutral-900 text-violet-700 rounded-full">
              {item.icon}
            </div>
            <h2 className="text-white text-xl font-semibold mb-4">
              {item.id}. {item.text}
            </h2>
            <p className="text-gray-400">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Row 2: 2 features centered */}
      {/* <div className="flex flex-wrap justify-center gap-10">
        {feature.slice(3).map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-darkblue bg-opacity-40 rounded-3xl p-8 text-center w-full sm:w-[45%] lg:w-[30%]"
          >
            <div className="flex justify-center items-center h-16 w-16 mb-4 bg-neutral-900 text-violet-700 rounded-full">
              {item.icon}
            </div>
            <h2 className="text-white text-xl font-semibold mb-4">
              {Number(item.id)}. {item.text}
            </h2>
            <p className="text-gray-400">{item.description}</p>
          </div>
        ))}
      </div> */}
    </div>
  )
}

export default Features
