import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Clock, FileText } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import InquiryForm from '../components/InquiryForm';
import SEO from '../components/SEO';
import { sellerCentralServices, pricingPlans } from '../data/siteData';

export default function SellerCentral() {
  return (
    <>
      <SEO
        title="Amazon Seller Central Management in Jaipur"
        description="Professional Amazon Seller Central management in Jaipur — product listings, FBA, sponsored ads, feedback & claims. Plans from ₹999/month. A2S Ecom Solutions."
        path="/seller-central"
        keywords="Amazon seller central Jaipur, seller central management, Amazon account management Jaipur, FBA services Jaipur"
      />
      <PageHeader
        badge="E-Commerce Seller Central"
        title="Remote Seller Central Management"
        subtitle="Full-service remote assistance for your eCommerce seller central account — from listings to ads and brand protection."
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-slate-600">
              A2S provides remote assistance to manage your eCommerce seller central account. Our skilled
              remote assistants handle listings, inventory, feedback, claims, FBA shipments, advertising, and
              more — so you can focus on growing your business.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sellerCentralServices.map((svc) => (
              <div
                key={svc.no}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-brand-200 hover:shadow-md"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-sm font-bold text-brand-700">
                  {svc.no}
                </span>
                <h3 className="mt-3 font-display font-semibold text-slate-900">{svc.name}</h3>
                <p className="mt-2 text-sm text-slate-500">{svc.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-slate-900">Pricing Plans</h2>
            <p className="mt-2 text-slate-600">Transparent pricing for complete seller central management</p>
          </div>

          <div className="mx-auto grid max-w-lg gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl border-2 p-8 ${
                  plan.highlighted
                    ? 'border-brand-500 bg-white shadow-xl shadow-brand-500/10'
                    : 'border-slate-200 bg-white'
                }`}
              >
                {plan.highlighted && (
                  <span className="mb-4 inline-block rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-xl font-bold text-slate-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold text-brand-600">{plan.price}</span>
                  <span className="text-slate-500">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{plan.description}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle size={18} className="mt-0.5 shrink-0 text-brand-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {plan.note && <p className="mt-4 text-xs text-slate-400">{plan.note}</p>}
                <Link to="/contact" className="btn-primary mt-8 w-full">
                  Get Started <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-brand-50 p-6 text-center">
              <Shield className="mx-auto mb-3 h-10 w-10 text-brand-600" />
              <h3 className="font-display font-semibold text-slate-900">Secure & Confidential</h3>
              <p className="mt-2 text-sm text-slate-600">
                Passwords to login seller central are kept strictly confidential.
              </p>
            </div>
            <div className="rounded-2xl bg-brand-50 p-6 text-center">
              <Clock className="mx-auto mb-3 h-10 w-10 text-brand-600" />
              <h3 className="font-display font-semibold text-slate-900">Live Support</h3>
              <p className="mt-2 text-sm text-slate-600">
                Live support and conventional business hours assistance when you need it.
              </p>
            </div>
            <div className="rounded-2xl bg-brand-50 p-6 text-center">
              <FileText className="mx-auto mb-3 h-10 w-10 text-brand-600" />
              <h3 className="font-display font-semibold text-slate-900">Daily Reporting</h3>
              <p className="mt-2 text-sm text-slate-600">
                Daily and weekly reports to monitor your progress as your business grows.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="mx-auto max-w-xl">
            <h2 className="mb-2 text-center font-display text-2xl font-bold text-slate-900">
              Start Seller Central Management
            </h2>
            <p className="mb-8 text-center text-sm text-slate-500">
              Submit an inquiry for Premium Complete Boost or custom requirements.
            </p>
            <InquiryForm defaultCategory="seller-central" />
          </div>
        </div>
      </section>
    </>
  );
}
