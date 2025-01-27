

const HeroBanner = ({ title, subtitle, image }: { title: string; subtitle: string; image: string }) => {
  return (
    <div className="relative w-full h-[500px]">
    {/* Background Image */}
    <img
        src={image}
        alt="Hero Illustration"
        className="w-full h-full object-cover"
    />

    {/* Text Content */}
    <div className="absolute inset-0 flex items-end justify-center text-black bg-gradient-to-t from-white/70 via-white/30 to-transparent">
        <div className="text-center pb-8">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg">{subtitle}</p>
        </div>
    </div>
    </div>

  );
};

export default HeroBanner;
