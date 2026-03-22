import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 max-md:px-3 max-md:py-6 max-md:pb-20">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-[#F26522]">Home</Link>
        <span>&gt;</span>
        <span className="text-gray-600 font-medium">Contact Us</span>
      </nav>

      <div className="bg-white rounded-2xl p-8 max-md:p-5 border border-gray-100">
        <h1 className="text-2xl max-md:text-xl font-extrabold text-gray-900 mb-6">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <p className="text-gray-600 text-sm leading-relaxed">
              Have a question or need help with your order? We&apos;re here to help! Reach out to us through any of the channels below.
            </p>

            <div className="space-y-4">
              {[
                { icon: '💬', label: 'WhatsApp', value: '+971 58 550 1786', href: 'https://wa.me/971585501786', desc: 'Fastest response — typically within minutes' },
                { icon: '📧', label: 'Email', value: 'muhsilv@gmail.com', href: 'mailto:muhsilv@gmail.com', desc: 'We reply within 24 hours' },
                { icon: '📍', label: 'Location', value: 'Dubai, UAE', href: '#', desc: 'Delivery across all of Dubai' },
                { icon: '🕐', label: 'Business Hours', value: '9 AM – 9 PM', href: '#', desc: 'Saturday to Thursday' },
              ].map((item) => (
                <a key={item.label} href={item.href} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-[#FFF3EC] transition-colors group">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm group-hover:text-[#F26522] transition-colors">{item.label}</p>
                    <p className="text-[#F26522] font-semibold text-sm">{item.value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Help */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#F26522] to-[#FF4747] rounded-xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Need Quick Help?</h3>
              <p className="text-white/80 text-sm mb-4">
                WhatsApp is our fastest channel. Tap below to start a conversation with our support team.
              </p>
              <a
                href="https://wa.me/971585501786?text=Hello%2C%20I%20need%20help%20with%20my%20order"
                className="inline-block bg-white text-[#F26522] font-bold text-sm px-6 py-2.5 rounded-full hover:bg-gray-50 transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-3">Common Questions</h3>
              <div className="space-y-3">
                {[
                  { q: 'What is your delivery area?', a: 'We deliver across all areas of Dubai.' },
                  { q: 'Do you offer same-day delivery?', a: 'Yes! Order before 2 PM for same-day delivery.' },
                  { q: 'Can I customize my balloons?', a: 'Absolutely! Add custom text, choose colors, and select sizes.' },
                  { q: 'What payment methods do you accept?', a: 'We accept all major cards via Ziina secure payment.' },
                ].map((item) => (
                  <div key={item.q} className="border-b border-gray-50 last:border-0 pb-2 last:pb-0">
                    <p className="text-xs font-bold text-gray-800">{item.q}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.a}</p>
                  </div>
                ))}
              </div>
              <Link href="/faq" className="text-xs text-[#F26522] font-semibold mt-3 inline-block hover:underline">
                View all FAQs →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
