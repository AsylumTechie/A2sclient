import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as Icons from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ServiceCard from '../components/ServiceCard';
import InquiryForm from '../components/InquiryForm';
import { loadServices } from '../api/serviceHelpers';
import SEO from '../components/SEO';
import { serviceCategories } from '../data/siteData';

const categorySeo = {
  'digital-marketing': {
    title: 'Digital Marketing Services in Jaipur',
    description: 'SEO, social media marketing, performance marketing & content marketing services in Jaipur by A2S Ecom Solutions.',
  },
  'ecommerce-setup': {
    title: 'E-Commerce Account Management in Jaipur',
    description: 'Amazon, Flipkart & Meesho account management services in Jaipur. Listings, inventory, ads & growth strategies.',
  },
  'website-development': {
    title: 'Website Development Company in Jaipur',
    description: 'Custom website, front-end, back-end & web app development in Jaipur. Responsive, fast & SEO-friendly sites.',
  },
  'graphic-branding': {
    title: 'Branding & Logo Design in Jaipur',
    description: 'Professional logo design and corporate branding services in Jaipur. Build a memorable brand identity.',
  },
  'business-growth': {
    title: 'Business Consulting & Sales Funnels in Jaipur',
    description: 'Business consulting and high-converting sales funnel services in Jaipur for startups and SMEs.',
  },
  'seller-central': {
    title: 'Seller Central Services in Jaipur',
    description: 'Complete Amazon Seller Central support in Jaipur — listings, pricing, ads, FBA & account health.',
  },
};

export default function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || '';
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = activeCategory ? { category: activeCategory } : {};
    loadServices(params)
      .then((data) => setServices(Array.isArray(data) ? data : []))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const activeCat = serviceCategories.find((c) => c.id === activeCategory);
  const seo = activeCategory
    ? categorySeo[activeCategory]
    : {
        title: 'Our Services — Digital & E-Commerce Solutions in Jaipur',
        description:
          'Explore 24+ digital marketing, SEO, website development, e-commerce, and branding services in Jaipur by A2S Ecom Solutions.',
      };

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        path={activeCategory ? `/services?category=${activeCategory}` : '/services'}
      />
      <PageHeader
        badge="Our Services"
        title={activeCat ? activeCat.title : 'Our Services'}
        subtitle={
          activeCat?.description ||
          'Comprehensive digital solutions tailored to your business needs'
        }
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setSearchParams({})}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                !activeCategory
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All
            </button>
            {serviceCategories.map((cat) => {
              const Icon = Icons[cat.icon] || Icons.Globe;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSearchParams({ category: cat.id })}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition ${
                    activeCategory === cat.id
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Icon size={16} />
                  {cat.title}
                </button>
              );
            })}
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-48 animate-pulse rounded-2xl bg-slate-100" />
              ))}
            </div>
          ) : services.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service._id || service.slug} service={service} />
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500">No services found for this category.</p>
          )}
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="mx-auto max-w-xl">
            <h2 className="mb-2 text-center font-display text-2xl font-bold text-slate-900">
              Request a Service Quote
            </h2>
            <p className="mb-8 text-center text-sm text-slate-500">
              Tell us what you need and our team will get back to you.
            </p>
            <InquiryForm defaultCategory={activeCategory} />
          </div>
        </div>
      </section>
    </>
  );
}
