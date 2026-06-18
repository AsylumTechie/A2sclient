import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  X,
  CheckCircle2,
  Phone,
  MessageCircle,
  Rocket,
  Target,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { companyInfo } from '../data/siteData';

const POPUP_DELAY_MS = 1200;

/** Pages where the consultation offer should auto-appear */
function isRelevantPage(pathname) {
  if (pathname.startsWith('/pay')) return false;
  return true;
}

const whatYouGet = [
  {
    title: 'Account Health Analysis',
    text: 'We thoroughly review your seller account and identify issues affecting your sales, visibility, and performance.',
  },
  {
    title: 'Product Listing Optimization',
    text: 'Improve your product titles, descriptions, keywords, images, and attributes to attract more customers and boost conversions.',
  },
  {
    title: 'Sales Growth Strategy',
    text: 'Receive personalized recommendations to increase product visibility, improve rankings, and drive more orders.',
  },
  {
    title: 'Marketplace Guidance',
    text: 'Expert consultation for Amazon Seller Central, Flipkart Seller Hub, Meesho Supplier Panel, JioMart Seller Portal, and other e-commerce platforms.',
  },
  {
    title: 'Pricing & Competition Analysis',
    text: 'Understand your competitors and optimize pricing strategies to improve profitability and market share.',
  },
  {
    title: 'Inventory & Order Management Advice',
    text: 'Learn best practices to manage stock levels, avoid cancellations, and improve customer satisfaction.',
  },
  {
    title: 'Advertising & Promotions Guidance',
    text: 'Recommendations for sponsored ads, PPC campaigns, deals, promotions, and seasonal sales strategies.',
  },
  {
    title: 'Performance Improvement Plan',
    text: 'A clear roadmap to improve product ranking, Buy Box performance, conversion rate, customer reviews, and seller rating.',
  },
];

const whoShouldChoose = [
  'New sellers starting their e-commerce journey',
  'Existing sellers facing low sales',
  'Businesses looking to scale online',
  'Brands launching new products',
  'Sellers facing account performance issues',
  'Entrepreneurs wanting professional guidance',
];

const whyChooseUs = [
  {
    title: 'Experienced E-Commerce Professionals',
    text: 'Hands-on experience managing and optimizing seller accounts across multiple marketplaces.',
  },
  {
    title: 'Practical Solutions',
    text: 'No complicated theories—only actionable recommendations you can implement immediately.',
  },
  {
    title: 'Affordable Pricing',
    text: 'Professional consultation at an unbeatable price of ₹999 only.',
  },
  {
    title: 'Personalized Support',
    text: 'Recommendations tailored to your unique business requirements and goals.',
  },
];

const processSteps = [
  { step: '01', title: 'Book your consultation' },
  { step: '02', title: 'Share your seller account details and business challenges' },
  { step: '03', title: 'Our experts analyze your account and business performance' },
  { step: '04', title: 'Receive a detailed consultation and growth strategy' },
  { step: '05', title: 'Implement recommendations and start growing your sales' },
];

const phoneDigits = companyInfo.phone.replace(/\D/g, '');
const whatsappUrl = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(
  'Hi A2S Ecom Solutions, I want to book the ₹999 E-Commerce Seller Growth Consultation.'
)}`;

export default function ConsultationPopup() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const dismissedPathRef = useRef(null);

  useEffect(() => {
    if (!isRelevantPage(location.pathname)) {
      setOpen(false);
      return undefined;
    }

    if (dismissedPathRef.current === location.pathname) {
      setOpen(false);
      return undefined;
    }

    setOpen(false);
    const timer = setTimeout(() => setOpen(true), POPUP_DELAY_MS);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const close = () => {
    setOpen(false);
    dismissedPathRef.current = location.pathname;
  };

  const reopen = () => {
    dismissedPathRef.current = null;
    setOpen(true);
  };

  const showFab = isRelevantPage(location.pathname) && !open;

  return (
    <>
      {showFab && (
        <button
          type="button"
          onClick={reopen}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-800 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-brand-600/30 transition hover:scale-105 hover:shadow-brand-700/40 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          aria-label="Open consultation offer"
        >
          <Sparkles size={18} />
          <span className="hidden sm:inline">₹999 Consultation</span>
          <span className="sm:hidden">₹999</span>
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="consultation-popup-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={close}
            aria-label="Close consultation popup"
          />

          <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
            <div className="relative shrink-0 overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 px-6 py-8 text-white sm:px-8">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-accent-500/20 blur-3xl" />
              <button
                type="button"
                onClick={close}
                className="absolute right-4 top-4 rounded-full bg-white/15 p-2 text-white transition hover:bg-white/25"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                <Target size={14} />
                Limited offer
              </span>
              <h2 id="consultation-popup-title" className="mt-4 font-display text-2xl font-bold leading-tight sm:text-3xl">
                E-Commerce Seller Growth Consultation
              </h2>
              <p className="mt-2 text-3xl font-bold text-brand-100 sm:text-4xl">₹999 Only</p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-100/95 sm:text-base">
                Grow your online sales with expert e-commerce consultation for Amazon, Flipkart, Meesho,
                JioMart, Myntra, and more.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                Are you struggling with low sales, poor product visibility, account issues, or marketplace
                management? Our professional consultation is designed to help sellers maximize growth and
                increase profits. For just <strong className="text-brand-700">₹999</strong>, get expert
                guidance and actionable strategies to improve your online business performance.
              </p>

              <SectionDivider />

              <section>
                <h3 className="font-display text-lg font-bold text-slate-900">What You Will Get</h3>
                <ul className="mt-4 space-y-3">
                  {whatYouGet.map((item) => (
                    <li
                      key={item.title}
                      className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-4"
                    >
                      <CheckCircle2 className="mt-0.5 shrink-0 text-brand-600" size={18} />
                      <div>
                        <p className="font-semibold text-slate-900">{item.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <SectionDivider />

              <section>
                <h3 className="font-display text-lg font-bold text-slate-900">Who Should Choose This Service?</h3>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {whoShouldChoose.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="mt-1 text-brand-600">✔</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <SectionDivider />

              <section>
                <h3 className="font-display text-lg font-bold text-slate-900">Why Choose Us?</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {whyChooseUs.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl border border-brand-100 bg-brand-50/50 p-4"
                    >
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <SectionDivider />

              <section>
                <h3 className="font-display text-lg font-bold text-slate-900">Consultation Process</h3>
                <ol className="mt-4 space-y-3">
                  {processSteps.map((item) => (
                    <li key={item.step} className="flex items-start gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                        {item.step}
                      </span>
                      <p className="pt-1.5 text-sm font-medium text-slate-700">{item.title}</p>
                    </li>
                  ))}
                </ol>
              </section>

              <SectionDivider />

              <div className="rounded-2xl border-2 border-dashed border-accent-400/50 bg-gradient-to-br from-amber-50 to-orange-50 p-5 text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-accent-600">Special Offer</p>
                <p className="mt-2 font-display text-xl font-bold text-slate-900">
                  Complete E-Commerce Seller Consultation for Just ₹999
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Get expert insights, marketplace strategies, listing optimization recommendations, and a
                  growth roadmap to help your business succeed online.
                </p>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-900 p-6 text-center text-white">
                <Rocket className="mx-auto text-brand-300" size={28} />
                <h3 className="mt-3 font-display text-xl font-bold">Ready to Grow Your E-Commerce Business?</h3>
                <p className="mt-2 text-sm text-slate-300">
                  Stop guessing and start growing with professional guidance.
                </p>
                <p className="mt-4 font-semibold text-brand-200">
                  Book Your E-Commerce Consultation Today – Only ₹999
                </p>
              </div>
            </div>

            <div className="shrink-0 border-t border-slate-100 bg-white px-6 py-4 sm:px-8">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/pay" onClick={close} className="btn-primary flex-1 justify-center">
                  Book Consultation – ₹999
                  <ChevronRight size={18} />
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:bg-brand-50"
                >
                  <Phone size={18} />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SectionDivider() {
  return (
    <div className="my-6 flex items-center gap-3">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <span className="text-xs text-slate-400">⸻</span>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </div>
  );
}
