import { Phone, Mail, MapPin, Globe } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';
import { companyInfo } from '../data/siteData';

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Us — Jaipur Office"
        description={`Contact A2S Ecom Solutions in Jaipur. Call ${companyInfo.phone} or email ${companyInfo.email} for SEO, digital marketing, and e-commerce services.`}
        path="/contact"
      />
      <PageHeader
        badge="Contact Us"
        title="Get In Touch"
        subtitle="Let's create something amazing together. Start your journey with us today."
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900">Contact Information</h2>
              <p className="mt-4 text-slate-600">
                Reach us via phone, email, or fill out the form. We typically respond within 24 hours.
              </p>

              <ul className="mt-8 space-y-6">
                <li className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Phone size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Phone</p>
                    <a href={`tel:${companyInfo.phone}`} className="font-semibold text-slate-900 hover:text-brand-600">
                      {companyInfo.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Mail size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Email</p>
                    <a
                      href={`mailto:${companyInfo.email}`}
                      className="font-semibold text-slate-900 hover:text-brand-600"
                    >
                      {companyInfo.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Globe size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Website</p>
                    <p className="font-semibold text-slate-900">{companyInfo.website}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Location</p>
                    <p className="font-semibold text-slate-900">{companyInfo.address}</p>
                    <p className="mt-1 text-xs text-slate-500">{companyInfo.udyam}</p>
                    <p className="text-xs text-slate-500">{companyInfo.san}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
              <h2 className="font-display text-xl font-bold text-slate-900">Send a Message</h2>
              <p className="mt-2 text-sm text-slate-500">Fill out the form and we&apos;ll get back to you shortly.</p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
