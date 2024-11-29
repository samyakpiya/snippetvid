const HeroSection = () => {
  return (
    <section
      className="py-10 max-w-5xl mt-24 flex flex-col gap-8 items-center justify-center relative text-center mx-auto overflow-hidden"
      id="about"
    >
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-50 leading-tight tracking-tight relative z-10">
        Instant, Personalized{" "}
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          AI-Enhanced
        </span>{" "}
        Video Recording
      </h1>
      <p className="max-w-[856px] text-lg md:text-xl text-gray-300 leading-relaxed relative z-10">
        Record, stream and share personalized videos instantly. Perfect for
        freelancers, agencies and businesses. With real-time notifications and
        AI-powered features for titles, descriptions, summaries and transcripts
        - communicate more effectively than ever before.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-4 relative z-10">
        <button className="bg-[#7320DD] hover:bg-[#7320DD]/90 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:shadow-purple-500/20">
          Start Free Trial
        </button>
        <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:scale-105">
          See It In Action
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
