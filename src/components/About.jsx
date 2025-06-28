const About = () => {
  return (
    <div
      id="About"
      className="relative mt-20 flex flex-col items-center max-w-7xl mx-auto pt-20 px-6"
    >
      {/* Header  */}
      <h1 className="text-3xl sm:text-xl lg:text-5xl text-center tracking-wide font-bold underline">
        About
      </h1>

      {/* Info  */}
      <p className="mt-10 text-lg text-center text-gray-200 max-w-4xl">
        Health isn't just about treating illness — it's about anticipating
        risks, making informed choices, and taking control before problems
        arise. At PrevaMed, we believe in the power of early action. We
        understand the uncertainties that come with managing your health,
        especially when symptoms are silent or risks are hidden. That’s why
        we’ve created a smart, data-driven platform to help you stay ahead. With
        personalized predictions, preventive insights, and user-friendly tools,
        PrevaMed makes your health journey clearer, smarter, and more proactive
        — every step of the way.
      </p>
      <p className="mt-10 text-xl text-center text-gray-200 max-w-4xl">
        “Predict, Prevent, and Personalize Your Healthcare”
      </p>
    </div>
  )
}

export default About
