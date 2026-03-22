import Link from 'next/link';

export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 max-md:px-3 max-md:py-6 max-md:pb-20">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-[#F26522]">Home</Link>
        <span>&gt;</span>
        <span className="text-gray-600 font-medium">Shipping &amp; Delivery</span>
      </nav>

      <div className="bg-white rounded-2xl p-8 max-md:p-5 border border-gray-100">
        <h1 className="text-2xl max-md:text-xl font-extrabold text-gray-900 mb-6">Shipping &amp; Delivery</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: '🚚', title: 'Free Delivery', desc: 'On orders over AED 100', color: 'bg-[#E8F8F0]' },
            { icon: '⚡', title: 'Same-Day', desc: 'Order before 2 PM', color: 'bg-[#FFF3EC]' },
            { icon: '📍', title: 'All Dubai', desc: 'Full city coverage', color: 'bg-[#EEF2FF]' },
          ].map((item) => (
            <div key={item.title} className={`${item.color} rounded-xl p-5 text-center`}>
              <span className="text-3xl block mb-2">{item.icon}</span>
              <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="prose max-w-none text-gray-600 text-sm leading-relaxed space-y-6">
          <section>
            <h2 className="text-base font-bold text-gray-900">Delivery Areas</h2>
            <p>We deliver to all areas within Dubai, UAE. This includes Downtown, Dubai Marina, JBR, Palm Jumeirah, Business Bay, DIFC, Al Barsha, Jumeirah, Deira, and all other Dubai neighborhoods.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900">Delivery Options</h2>
            <div className="border border-gray-100 rounded-xl overflow-hidden mt-3">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-bold text-gray-900">Option</th>
                    <th className="text-left p-3 font-bold text-gray-900">Timing</th>
                    <th className="text-left p-3 font-bold text-gray-900">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-50">
                    <td className="p-3 font-medium">Same-Day Delivery</td>
                    <td className="p-3 text-gray-500">Order before 2 PM</td>
                    <td className="p-3 text-[#F26522] font-bold">FREE over AED 100</td>
                  </tr>
                  <tr className="border-t border-gray-50">
                    <td className="p-3 font-medium">Standard Delivery</td>
                    <td className="p-3 text-gray-500">Next day 10 AM – 8 PM</td>
                    <td className="p-3 text-[#F26522] font-bold">FREE over AED 100</td>
                  </tr>
                  <tr className="border-t border-gray-50">
                    <td className="p-3 font-medium">Scheduled Delivery</td>
                    <td className="p-3 text-gray-500">Choose date &amp; time slot</td>
                    <td className="p-3 text-[#F26522] font-bold">FREE over AED 100</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-gray-400">* AED 15 delivery fee applies to orders under AED 100</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900">Delivery Time Slots</h2>
            <p>Choose from the following time slots during checkout:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
              {['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM', '8:00 PM'].map((time) => (
                <div key={time} className="bg-gray-50 rounded-lg p-2.5 text-center text-xs font-medium text-gray-700">
                  {time}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900">Important Notes</h2>
            <ul className="list-disc ml-4 space-y-2">
              <li>Balloons are delivered inflated and ready to use</li>
              <li>Please ensure someone is available at the delivery address to receive the order</li>
              <li>Delivery times are estimates and may vary due to traffic conditions</li>
              <li>For event setups, we recommend scheduling delivery at least 2 hours before your event</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
