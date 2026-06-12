import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { loadServiceBySlug } from '../api/serviceHelpers';
import InquiryForm from '../components/InquiryForm';
import SEO from '../components/SEO';
import { serviceSchema, breadcrumbSchema } from '../seo/structuredData';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadServiceBySlug(slug)
      .then((data) => {
        if (data) setService(data);
        else setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="section-padding text-center">
        <h2 className="font-display text-2xl font-bold text-slate-900">Service not found</h2>
        <Link to="/services" className="btn-primary mt-6">
          <ArrowLeft size={16} /> Back to Services
        </Link>
      </div>
    );
  }

  const Icon = Icons[service.icon] || Icons.Globe;
  const seoDescription = `${service.shortDescription} Professional ${service.title.toLowerCase()} services in Jaipur, Rajasthan by A2S Ecom Solutions.`;

  return (
    <>
      <SEO
        title={`${service.title} in Jaipur`}
        description={seoDescription.slice(0, 160)}
        path={`/services/${service.slug}`}
        type="article"
        keywords={`${service.title} Jaipur, ${service.title} Rajasthan, ${service.slug.replace(/-/g, ' ')}`}
        jsonLd={[
          serviceSchema(service),
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
            { name: service.title, url: `/services/${service.slug}` },
          ]),
        ]}
      />
      <section className="bg-gradient-to-br from-slate-900 via-brand-900 to-brand-800 py-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <Link to="/services" className="mb-6 inline-flex items-center gap-2 text-sm text-brand-200 hover:text-white">
            <ArrowLeft size={16} /> Back to Services
          </Link>
          <div className="flex items-start gap-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-500/30 text-white">
              <Icon size={32} />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-white md:text-4xl">{service.title}</h1>
              <p className="mt-2 text-lg text-brand-100">{service.shortDescription}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-slate-900">Overview</h2>
              <div className="mt-4 space-y-4">
                {service.description.split('\n\n').map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="leading-relaxed text-slate-600">
                    {paragraph}
                  </p>
                ))}
              </div>
              {service.features?.length > 0 && (
                <>
                  <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">Key Features</h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle size={18} className="shrink-0 text-brand-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
              <h3 className="font-display text-lg font-semibold text-slate-900">Get a Quote</h3>
              <p className="mt-2 text-sm text-slate-500">Interested in this service? Send us an inquiry.</p>
              <div className="mt-6">
                <InquiryForm defaultCategory={service.category} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
