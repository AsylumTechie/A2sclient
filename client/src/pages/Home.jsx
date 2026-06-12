import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useEffect, useState } from 'react';
import Stats from '../components/Stats';
import ServiceCard from '../components/ServiceCard';
import { loadServices } from '../api/serviceHelpers';
import SEO from '../components/SEO';
import { faqSchema } from '../seo/structuredData';
import {
  companyInfo,
  heroContent,
  whyChooseUs,
  whyChooseUsIntro,
  homepageServices,
  servicesSection,
  processSection,
  testimonialsSection,
  testimonials,
  ctaSection,
  homeFaqs,
} from '../data/siteData';

export default function Home() {
  const [featuredServices, setFeaturedServices] = useState([]);

  useEffect(() => {
    loadServices({ featured: 'true' })
      .then((data) => setFeaturedServices((Array.isArray(data) ? data : []).slice(0, 6)))
      .catch(() => setFeaturedServices([]));
  }, []);

  return (
    <>
      <SEO
        title="Digital Marketing & E-Commerce Agency in Jaipur"
        description="A2S Ecom Solutions — Jaipur's top digital marketing, SEO, website development, and Amazon Seller Central management agency. 500+ projects. Free consultation."
        path="/"
        jsonLd={faqSchema(homeFaqs)}
      />
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-brand-50">
        <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-orange-400/20 blur-3xl" />
        <div className="container-custom section-padding relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="mb-4 inline-block rounded-full bg-brand-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700">
                {heroContent.badge}
              </span>
              <h1 className="font-display text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
                {heroContent.title}{' '}
                <span className="gradient-text">{heroContent.titleHighlight}</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">{heroContent.subtitle}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary">
                  {heroContent.ctaPrimary} <ArrowRight size={18} />
                </Link>
                <Link to="/contact" className="btn-secondary">
                  {heroContent.ctaSecondary}
                </Link>
              </div>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 text-white shadow-2xl shadow-brand-600/30">
              <p className="text-sm font-medium text-brand-200">Comprehensive Digital Solutions</p>
              <h3 className="mt-2 font-display text-2xl font-bold">Your Growth Partner</h3>
              <ul className="mt-6 space-y-3">
                {homepageServices.map((item) => (
                  <li key={item.title} className="flex items-center gap-2 text-sm">
                    <CheckCircle size={16} className="text-brand-300" />
                    {item.title}
                  </li>
                ))}
              </ul>
              <Link
                to="/services"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
              >
                View All Services <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Stats />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">About Us</span>
              <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 md:text-4xl">Why Choose Us?</h2>
              <p className="mt-4 leading-relaxed text-slate-600">{whyChooseUsIntro}</p>
              <p className="mt-4 leading-relaxed text-slate-600">
                At {companyInfo.name}, we deliver innovative digital solutions that drive growth and exceed
                expectations — from marketing and web development to e-commerce management.
              </p>
              <Link to="/about" className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-600 hover:gap-3">
                Learn more about us <ArrowRight size={18} />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {whyChooseUs.map((item) => {
                const Icon = Icons[item.icon] || Icons.CheckCircle;
                return (
                  <div key={item.title} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                    <Icon size={20} className="mb-2 text-brand-600" />
                    <p className="text-sm font-medium text-slate-700">{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              {servicesSection.title}
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 md:text-4xl">
              {servicesSection.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">{servicesSection.subtitle}</p>
          </div>
          {featuredServices.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredServices.map((service) => (
                <ServiceCard key={service._id || service.slug} service={service} />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {homepageServices.map((svc) => {
                const Icon = Icons[svc.icon] || Icons.Globe;
                return (
                  <Link
                    key={svc.title}
                    to={`/services?category=${svc.category}`}
                    className="rounded-2xl border border-slate-100 bg-white p-6 card-hover"
                  >
                    <div
                      className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${svc.color} text-white`}
                    >
                      <Icon size={24} />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-slate-900">{svc.title}</h3>
                    <p className="mt-2 text-sm text-slate-500">{svc.description}</p>
                  </Link>
                );
              })}
            </div>
          )}
          <div className="mt-10 text-center">
            <Link to="/services" className="btn-primary">
              View All Services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">How We Work</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 md:text-4xl">
              {processSection.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">{processSection.subtitle}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSection.steps.map((step) => (
              <div
                key={step.step}
                className="relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm card-hover"
              >
                <span className="font-display text-3xl font-bold text-brand-100">{step.step}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">
              {testimonialsSection.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">{testimonialsSection.subtitle}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  {t.image && (
                    <img
                      src={t.image}
                      alt={`${t.name}, ${t.company}`}
                      loading="lazy"
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.company}</p>
                  </div>
                </div>
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-slate-600">&ldquo;{t.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">FAQ</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Common questions about our digital marketing and e-commerce services in Jaipur.
            </p>
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
            {homeFaqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <summary className="cursor-pointer font-display font-semibold text-slate-900 marker:content-none">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-r from-brand-700 to-brand-600">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">{ctaSection.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-100">{ctaSection.subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-brand-700 shadow-lg transition hover:bg-brand-50"
            >
              {ctaSection.primary} <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {ctaSection.secondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
