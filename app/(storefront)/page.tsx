import Link from 'next/link';
import { wooApi } from '@/lib/woocommerce';

export const revalidate = 60;

async function getFeaturedProducts() {
  try {
    const { data } = await wooApi.get('/products', {
      params: { per_page: 4, status: 'publish', featured: true }
    });
    // Fall back to latest products if no featured ones exist
    if (!data || data.length === 0) {
      const { data: latest } = await wooApi.get('/products', {
        params: { per_page: 4, status: 'publish', orderby: 'date', order: 'desc' }
      });
      return latest as any[];
    }
    return data as any[];
  } catch { return []; }
}

async function getCategories() {
  try {
    const { data } = await wooApi.get('/products/categories', {
      params: { per_page: 6, hide_empty: false }
    });
    return data as any[];
  } catch { return []; }
}

const STATIC_CATEGORIES = [
  { name: 'Birthday 🎂', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800', slug: 'birthday', color: 'from-orange-400 to-pink-500' },
  { name: 'Wedding 💍', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', slug: 'wedding', color: 'from-pink-400 to-rose-500' },
  { name: 'Baby Shower 👶', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', slug: 'baby-shower', color: 'from-sky-400 to-blue-500' },
  { name: 'Events 🎉', image: 'https://images.unsplash.com/photo-1574156993413-26bca01b4e2a?w=800', slug: 'events', color: 'from-violet-400 to-purple-600' },
];

const FEATURES = [
  { icon: '🎨', title: 'Live Customization', desc: 'Design your balloon in real-time with custom text & colors before you order.' },
  { icon: '⚡', title: 'Same-Day Delivery', desc: 'Order before 2 PM and get your balloons delivered the same day in Dubai.' },
  { icon: '🌟', title: 'Premium Quality', desc: 'Only the finest helium & foil balloons crafted for memorable celebrations.' },
  { icon: '💬', title: 'WhatsApp Orders', desc: 'Prefer chatting? Order directly via WhatsApp for instant personalized service.' },
];

const TESTIMONIALS = [
  { name: 'Sarah Al Maktoum', role: 'Birthday Party', text: 'Absolutely stunning! The balloon arch was the highlight of my daughter\'s birthday. 5 stars easily!', avatar: '👩‍🦱' },
  { name: 'Ahmed Hassan', role: 'Wedding Decoration', text: 'BalloonsMall transformed our wedding venue into a fairy-tale. The team was so professional and fast.', avatar: '👨' },
  { name: 'Priya Nair', role: 'Baby Shower', text: 'I loved how I could customize the balloons with my baby\'s name. Delivered on time – perfect!', avatar: '👩‍🦰' },
];

export default async function HomePage() {
  const [featured, categories] = await Promise.all([getFeaturedProducts(), getCategories()]);
  const displayCategories = categories.length > 0
    ? categories.slice(0, 4).map((c: any, i: number) => ({
        name: c.name,
        image: c.image?.src || STATIC_CATEGORIES[i % STATIC_CATEGORIES.length].image,
        slug: c.slug,
        color: STATIC_CATEGORIES[i % STATIC_CATEGORIES.length].color
      }))
    : STATIC_CATEGORIES;

  return (
    <div>
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #f5f3ff 0%, #fce7f3 50%, #fff7ed 100%)',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        {/* Background bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {['w-72 h-72 -top-16 -left-16', 'w-48 h-48 top-32 right-20', 'w-32 h-32 bottom-20 left-1/4', 'w-56 h-56 -bottom-10 right-10'].map((classes, i) => (
            <div key={i} className={`absolute ${classes} rounded-full opacity-20`}
              style={{ background: `linear-gradient(135deg, #7C3AED, #EC4899)`, animationDelay: `${i * 0.8}s` }} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
              <div className="badge badge-brand mb-6 text-sm">
                ✨ Dubai's #1 Balloon Studio
              </div>
              <h1 className="section-title gradient-text mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
                Make Every<br />Celebration<br />Unforgettable
              </h1>
              <p className="text-gray-500 text-lg mb-10 leading-relaxed max-w-md">
                Premium customized balloons and event decoration — designed live, delivered to your door across Dubai.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/shop" className="btn-primary text-base">
                  Explore Collection 🎈
                </Link>
                <Link href="/shop?customizable=true" className="btn-outline text-base">
                  Customize Now 🎨
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-10">
                {[['500+', 'Happy Clients'], ['1-Day', 'Delivery'], ['100%', 'Custom Made']].map(([val, label]) => (
                  <div key={label}>
                    <div className="text-2xl font-extrabold gradient-text">{val}</div>
                    <div className="text-xs text-gray-500 font-medium">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Hero image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative float">
                <img
                  src="https://images.unsplash.com/photo-1525286335722-c30c6b5df541?w=800"
                  alt="Premium Balloons"
                  className="w-full max-w-lg rounded-[3rem] shadow-2xl relative z-10"
                  style={{ filter: 'drop-shadow(0 20px 60px rgba(124,58,237,0.3))' }}
                />
                <div className="absolute -inset-4 bg-gradient-to-tr from-violet-200 to-pink-200 rounded-[3.5rem] -z-10 blur-2xl opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CATEGORIES ═══ */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="badge badge-accent mb-3">Our Collections</div>
          <h2 className="section-title">Shop By <span className="gradient-text">Occasion</span></h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">From intimate birthdays to grand weddings — we have the perfect balloons for every celebration.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {displayCategories.map((cat: any) => (
            <Link key={cat.slug} href={`/shop?category=${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-square shadow-md hover:shadow-xl transition-all hover:-translate-y-2">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-50 group-hover:opacity-70 transition-opacity`} />
              <div className="absolute inset-0 flex items-end p-5">
                <span className="text-white font-bold text-lg drop-shadow-md">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ FEATURED PRODUCTS ═══ */}
      {featured.length > 0 && (
        <section className="py-20 px-4" style={{ background: 'linear-gradient(180deg, #fafafa 0%, #f5f3ff10 100%)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="badge badge-pink mb-3">🔥 Trending Now</div>
                <h2 className="section-title">Featured <span className="gradient-text">Products</span></h2>
              </div>
              <Link href="/shop" className="text-violet-600 font-semibold hover:underline text-sm">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featured.map((product: any) => (
                <Link key={product.id} href={`/product/${product.slug}`} className="product-card group block">
                  <div className="aspect-square overflow-hidden bg-gray-50">
                    {product.images?.[0]?.src
                      ? <img src={product.images[0].src} alt={product.name} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center text-7xl">🎈</div>
                    }
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-violet-600 font-bold text-lg">AED {parseFloat(product.price || '0').toFixed(0)}</p>
                    <div className="mt-3 btn-primary w-full text-sm py-2.5 text-center group-hover:opacity-90">
                      Customize & Order ✨
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ FEATURES SECTION ═══ */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="badge badge-brand mb-3">Why BalloonsMall?</div>
          <h2 className="section-title">The <span className="gradient-text">Best Experience</span> Guaranteed</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((f) => (
            <div key={f.title} className="text-center p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-50">
              <div className="text-5xl mb-5">{f.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #fce7f3 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="badge badge-accent mb-3">Customer Love ❤️</div>
            <h2 className="section-title">What Our <span className="gradient-text">Customers Say</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-8 shadow-sm border border-white">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-amber-400">★</span>)}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-violet-100 flex items-center justify-center text-2xl">{t.avatar}</div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center rounded-3xl overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #DB2777 100%)', padding: '60px 40px' }}>
          <div className="absolute inset-0 opacity-10">
            {['🎈', '🎊', '🎀', '✨', '🎉', '🎈'].map((e, i) => (
              <span key={i} className="absolute text-5xl" style={{ top: `${[10,60,30,70,20,50][i]}%`, left: `${[5,85,20,65,40,75][i]}%` }}>{e}</span>
            ))}
          </div>
          <div className="relative z-10">
            <h2 className="text-white font-extrabold text-4xl mb-4">Ready to Celebrate? 🎉</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">Order your custom balloons today and make every moment extraordinary. Same-day delivery available across Dubai!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop" className="bg-white text-violet-700 font-bold py-4 px-8 rounded-full hover:shadow-xl transition-all hover:-translate-y-1">
                Shop Now 🛍️
              </Link>
              <a href="https://wa.me/971500000000?text=Hello, I want to order balloons!" target="_blank" rel="noopener noreferrer"
                className="border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white/10 transition-all hover:-translate-y-1">
                WhatsApp Us 💬
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
