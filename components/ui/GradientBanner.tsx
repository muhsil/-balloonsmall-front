import Link from 'next/link';
import React from 'react';

interface BannerAction {
  label: string;
  href?: string;
  variant?: 'primary' | 'outline';
  external?: boolean;
}

interface GradientBannerProps {
  title: string;
  subtitle?: string;
  actions?: BannerAction[];
  gradient?: string;
}

export default function GradientBanner({
  title,
  subtitle,
  actions = [],
  gradient = 'linear-gradient(135deg, #7C3AED 0%, #DB2777 100%)',
}: GradientBannerProps) {
  return (
    <section className="py-20 max-md:py-12 px-4">
      <div
        className="max-w-4xl mx-auto text-center rounded-3xl max-md:rounded-2xl overflow-hidden relative"
        style={{ background: gradient, padding: '60px 40px' }}
      >
        <div className="absolute inset-0 opacity-10 max-md:hidden">
          {['\u{1F388}', '\u{1F38A}', '\u{1F380}', '\u2728', '\u{1F389}', '\u{1F388}'].map((e, i) => (
            <span
              key={i}
              className="absolute text-5xl"
              style={{
                top: `${[10, 60, 30, 70, 20, 50][i]}%`,
                left: `${[5, 85, 20, 65, 40, 75][i]}%`,
              }}
            >
              {e}
            </span>
          ))}
        </div>
        <div className="relative z-10 max-md:px-2">
          <h2 className="text-white font-extrabold text-4xl max-md:text-2xl mb-4">{title}</h2>
          {subtitle && (
            <p className="text-white/80 text-lg max-md:text-sm mb-8 max-md:mb-6 max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
          {actions.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 max-md:gap-3 justify-center">
              {actions.map((action) => {
                const className =
                  action.variant === 'outline'
                    ? 'border-2 border-white text-white font-bold py-4 px-8 max-md:py-3 max-md:px-6 rounded-full hover:bg-white/10 transition-all hover:-translate-y-1 max-md:text-sm'
                    : 'bg-white text-violet-700 font-bold py-4 px-8 max-md:py-3 max-md:px-6 rounded-full hover:shadow-xl transition-all hover:-translate-y-1 max-md:text-sm';

                if (action.external) {
                  return (
                    <a
                      key={action.label}
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      {action.label}
                    </a>
                  );
                }

                return (
                  <Link key={action.label} href={action.href || '#'} className={className}>
                    {action.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
