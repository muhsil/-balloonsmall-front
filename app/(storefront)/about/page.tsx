import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 max-md:px-3 max-md:py-6 max-md:pb-20">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-[#F26522]">Home</Link>
        <span>&gt;</span>
        <span className="text-gray-600 font-medium">About Us</span>
      </nav>

      <div className="bg-white rounded-2xl p-8 max-md:p-5 border border-gray-100">
        <h1 className="text-2xl max-md:text-xl font-extrabold text-gray-900 mb-6">About BalloonsMall</h1>

        <div className="prose max-w-none text-gray-600 text-sm leading-relaxed space-y-4">
          <p>
            Welcome to <strong className="text-[#F26522]">BalloonsMall</strong> — Dubai&apos;s premier balloon decoration and delivery service.
            We specialize in creating stunning balloon arrangements for every occasion, from birthdays and weddings to corporate events and baby showers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            {[
              { icon: '🎈', title: 'Premium Quality', desc: 'We use only the finest quality latex and foil balloons sourced from top manufacturers worldwide.' },
              { icon: '🚚', title: 'Same-Day Delivery', desc: 'Order before 2 PM and get your balloons delivered the same day anywhere in Dubai.' },
              { icon: '🎨', title: 'Custom Designs', desc: 'Personalize your balloons with custom text, colors, and arrangements tailored to your event.' },
            ].map((item) => (
              <div key={item.title} className="bg-[#FFF3EC] rounded-xl p-4 text-center">
                <span className="text-3xl block mb-2">{item.icon}</span>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-lg font-bold text-gray-900 mt-6">Our Story</h2>
          <p>
            Founded in Dubai, BalloonsMall was born out of a passion for making celebrations truly special.
            We believe that the right balloon decoration can transform any space and create lasting memories.
            Our team of experienced decorators works tirelessly to bring your vision to life.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6">Why Choose Us?</h2>
          <ul className="list-disc ml-4 space-y-2">
            <li>Wide selection of balloon styles, colors, and arrangements</li>
            <li>Affordable prices with bundle discounts up to 20% off</li>
            <li>Free delivery on orders over AED 100</li>
            <li>Same-day delivery available (order before 2 PM)</li>
            <li>Custom text and color options for personalization</li>
            <li>Secure payment via Ziina</li>
            <li>Dedicated WhatsApp support for quick assistance</li>
          </ul>

          <div className="bg-gradient-to-r from-[#F26522] to-[#FF4747] rounded-xl p-6 text-center text-white mt-8">
            <h3 className="text-lg font-bold mb-2">Ready to Celebrate?</h3>
            <p className="text-white/80 text-sm mb-4">Browse our collection and find the perfect balloons for your occasion.</p>
            <Link href="/shop" className="inline-block bg-white text-[#F26522] font-bold text-sm px-6 py-2.5 rounded-full hover:bg-gray-50 transition-colors">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
