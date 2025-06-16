
export default function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full px-10">
      <div className="text-left space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold text-rose-900">
          Welcome to <span className="text-rose-600 italic">Unisphere</span>
        </h1>
        <p className="text-lg md:text-xl text-rose-800">Companion in your student life</p>
      </div>
      <img src={logo} alt="Unisphere Logo" className="w-40 md:w-56 mt-6 md:mt-0" />
    </div>
  );
}
