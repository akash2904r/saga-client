const Hero = () => {
  return (
    <section className="w-full h-fit flex items-center justify-center py-14">
      <div className="xl:w-[35%] lg:w-[40%] md:w-[40%] sm:w-[35%] w-[25%] flex flex-col gap-5">
        <h1 className="lg:text-7xl sm:text-6xl xs:text-5xl max-xs:text-4xl font-bold text-dark-1 dark:text-lite-1/95">
          Let's&nbsp;
          <span className="grad-text">Read</span>&nbsp;
          Together
        </h1>
        <p className="text-dark-3 lg:text-base sm:text-[15px] text-sm dark:text-lite-1/50">Embark on a journey of inspiration and exploration. Our blog awaits, brimming with captivating stories and insightful perspectives. Discover the world anew, one click at a time.</p>
      </div>
      <div className="xl:w-[35%] lg:w-[40%] md:w-[50%] sm:w-[55%] w-[70%]">
        <img src="/imgs/Hero-img.png" alt="Hero-img" className="h-[475px] max-sm:h-[360px]" />
      </div>
    </section>
  );
};

export default Hero;
