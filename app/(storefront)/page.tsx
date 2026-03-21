import Link from 'next/link';
import { wooApi } from '@/lib/woocommerce';
import SectionHeader from '@/components/ui/SectionHeader';
import CategoryCard from '@/components/ui/CategoryCard';
import ProductCard from '@/components/ui/ProductCard';
import FeatureCard from '@/components/ui/FeatureCard';
import TestimonialCard from '@/components/ui/TestimonialCard';
import StatBadge from '@/components/ui/StatBadge';
import GradientBanner from '@/components/ui/GradientBanner';

export const revalidate = 60;

async function getFeaturedProducts() {
  try {
    const { data } = await wooApi.get('/products', {
      params: { per_page: 4, status: 'publish', featured: true }
    });
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

const STATS = [
  { value: '500+', label: 'Happy Clients' },
  { value: '1-Day', label: 'Delivery' },
  { value: '100%', label: 'Custom Made' },
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
        {/* Background bubbles - hidden on mobile for performance */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none max-md:hidden">
          {['w-72 h-72 -top-16 -left-16', 'w-48 h-48 top-32 right-20', 'w-32 h-32 bottom-20 left-1/4', 'w-56 h-56 -bottom-10 right-10'].map((classes, i) => (
            <div key={i} className={`absolute ${classes} rounded-full opacity-20`}
              style={{ background: `linear-gradient(135deg, #7C3AED, #EC4899)`, animationDelay: `${i * 0.8}s` }} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 max-md:py-10 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-md:gap-8 items-center">
            {/* Left: Text */}
            <div className="max-md:text-center">
              <div className="badge badge-brand mb-6 max-md:mb-4 text-sm">
                Dubai&apos;s #1 Balloon Studio
              </div>
              <h1 className="section-title gradient-text mb-6 max-md:mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}>
                Make Every<br className="max-md:hidden" />
                <span className="md:hidden"> </span>Celebration<br className="max-md:hidden" />
                <span className="md:hidden"> </span>Unforgettable
              </h1>
              <p className="text-gray-500 text-lg max-md:text-base mb-10 max-md:mb-6 leading-relaxed max-w-md max-md:max-w-sm max-md:mx-auto">
                Premium customized balloons and event decoration — designed live, delivered to your door across Dubai.
              </p>
              <div className="flex flex-wrap gap-4 max-md:gap-3 max-md:justify-center">
                <Link href="/shop" className="btn-primary text-base max-md:text-sm max-md:py-3 max-md:px-5">
                  Explore Collection 🎈
                </Link>
                <Link href="/shop?customizable=true" className="btn-outline text-base max-md:text-sm max-md:py-3 max-md:px-5">
                  Customize Now 🎨
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-10 max-md:mt-6 max-md:justify-center">
                {STATS.map((stat) => (
                  <StatBadge key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>
            </div>

            {/* Right: Hero image */}
            <div className="flex justify-center lg:justify-end max-md:px-8">
              <div className="relative float">
                <img
                  src="https://images.unsplash.com/photo-1525286335722-c30c6b5df541?w=800"
                  alt="Premium Balloons"
                  className="w-full max-w-lg max-md:max-w-xs rounded-[3rem] max-md:rounded-[2rem] shadow-2xl relative z-10"
                  style={{ filter: 'drop-shadow(0 20px 60px rgba(124,58,237,0.3))' }}
                />
                <div className="absolute -inset-4 bg-gradient-to-tr from-violet-200 to-pink-200 rounded-[3.5rem] -z-10 blur-2xl opacity-50 max-md:hidden" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CATEGORIES ═══ */}
      <section className="py-20 max-md:py-12 px-4 max-w-7xl mx-auto">
        <div className="mb-14 max-md:mb-8">
          <SectionHeader
            badge="Our Collections"
            badgeVariant="accent"
            title="Shop By"
            highlight="Occasion"
            subtitle="From intimate birthdays to grand weddings — we have the perfect balloons for every celebration."
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-md:gap-3">
          {displayCategories.map((cat: any) => (
            <CategoryCard
              key={cat.slug}
              name={cat.name}
              image={cat.image}
              slug={cat.slug}
              color={cat.color}
            />
          ))}
        </div>
      </section>

      {/* ═══ FEATURED PRODUCTS ═══ */}
      {featured.length > 0 && (
        <section className="py-20 max-md:py-12 px-4" style={{ background: 'linear-gradient(180deg, #fafafa 0%, #f5f3ff10 100%)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12 max-md:mb-6">
              <div>
                <div className="badge badge-pink mb-3">🔥 Trending Now</div>
                <h2 className="section-title">Featured <span className="gradient-text">Products</span></h2>
              </div>
              <Link href="/shop" className="text-violet-600 font-semibold hover:underline text-sm max-md:text-xs">
                View All →
              </Link>
            </div>

            {/* Desktop grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
              {featured.map((product: any) => (
                <ProductCard
                  key={product.id}
                  slug={product.slug}
                  name={product.name}
                  price={parseFloat(product.price || '0')}
                  imageSrc={product.images?.[0]?.src}
                  variant="default"
                />
              ))}
            </div>

            {/* Mobile horizontal scroll */}
            <div className="md:hidden mobile-scroll-x px-1">
              {featured.map((product: any) => (
                <div key={product.id} className="w-[70vw] min-w-[240px]">
                  <ProductCard
                    slug={product.slug}
                    name={product.name}
                    price={parseFloat(product.price || '0')}
                    imageSrc={product.images?.[0]?.src}
                    variant="compact"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ FEATURES SECTION ═══ */}
      <section className="py-20 max-md:py-12 px-4 max-w-7xl mx-auto">
        <div className="mb-14 max-md:mb-8">
          <SectionHeader
            badge="Why BalloonsMall?"
            badgeVariant="brand"
            title="The"
            highlight="Best Experience Guaranteed"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 max-md:gap-3">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.desc} />
          ))}
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-20 max-md:py-12 px-4" style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #fce7f3 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 max-md:mb-8">
            <SectionHeader
              badge="Customer Love"
              badgeVariant="accent"
              title="What Our"
              highlight="Customers Say"
            />
          </div>

          {/* Desktop grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.name} name={t.name} role={t.role} text={t.text} avatar={t.avatar} />
            ))}
          </div>

          {/* Mobile horizontal scroll */}
          <div className="md:hidden mobile-scroll-x px-1">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="w-[85vw] min-w-[280px]">
                <TestimonialCard name={t.name} role={t.role} text={t.text} avatar={t.avatar} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <GradientBanner
        title="Ready to Celebrate? 🎉"
        subtitle="Order your custom balloons today and make every moment extraordinary. Same-day delivery available across Dubai!"
        actions={[
          { label: 'Shop Now 🛍️', href: '/shop' },
          { label: 'WhatsApp Us 💬', href: 'https://wa.me/971500000000?text=Hello, I want to order balloons!', variant: 'outline', external: true },
        ]}
      />
    </div>
  );
}
