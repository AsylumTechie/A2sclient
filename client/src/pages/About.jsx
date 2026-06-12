import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Heart } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Stats from '../components/Stats';
import SEO from '../components/SEO';
import { companyInfo, whyChooseUs, whyChooseUsIntro, processSection } from '../data/siteData';
import * as Icons from 'lucide-react';

export default function About() {
  return (
    <>
      <SEO
        title="About Us — Digital Agency in Jaipur"
        description={`Learn about ${companyInfo.name}, a Jaipur-based digital marketing and e-commerce agency with 500+ projects, expert team, and proven growth strategies across Rajasthan.`}
        path="/about"
      />
      <PageHeader
        badge="About Us"
        title="Your Growth Partners"
        subtitle={whyChooseUsIntro}
      />
      <Stats />

      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-slate-900">Welcome to {companyInfo.name}</h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Based in Jaipur, Rajasthan, we deliver innovative digital solutions that drive growth and exceed
              expectations — from digital marketing and website development to e-commerce management and branding
              for businesses across India.
            </p>
            <p className="mt-4 text-lg font-medium text-brand-600">{companyInfo.tagline}</p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
              <Target className="mx-auto mb-4 h-10 w-10 text-brand-600" />
              <h3 className="font-display text-xl font-semibold text-slate-900">Our Mission</h3>
              <p className="mt-3 text-sm text-slate-600">
                Deliver data-driven digital solutions that help businesses grow online with measurable,
                exceptional results.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
              <Eye className="mx-auto mb-4 h-10 w-10 text-brand-600" />
              <h3 className="font-display text-xl font-semibold text-slate-900">Our Vision</h3>
              <p className="mt-3 text-sm text-slate-600">
                To be the most trusted digital growth partner for e-commerce, marketing, and brand development.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
              <Heart className="mx-auto mb-4 h-10 w-10 text-brand-600" />
              <h3 className="font-display text-xl font-semibold text-slate-900">Our Values</h3>
              <p className="mt-3 text-sm text-slate-600">
                Transparent pricing, dedicated support, and long-term partnerships built on trust and quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <h2 className="mb-4 text-center font-display text-3xl font-bold text-slate-900">Why Choose Us?</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-slate-600">{whyChooseUsIntro}</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item) => {
              const Icon = Icons[item.icon] || Icons.CheckCircle;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-display text-sm font-semibold leading-snug text-slate-900">{item.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-slate-900">{processSection.title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">{processSection.subtitle}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSection.steps.map((step) => (
              <div key={step.step} className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
                <span className="font-display text-2xl font-bold text-brand-600">{step.step}</span>
                <h3 className="mt-2 font-display font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-r from-brand-700 to-brand-600">
        <div className="container-custom text-center">
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            Ready to transform your business?
          </h2>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 text-sm font-semibold text-brand-700"
          >
            Get Started Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
