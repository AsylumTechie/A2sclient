import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you are looking for could not be found. Browse our digital marketing and e-commerce services in Jaipur."
        path="/404"
        noindex
      />
      <section className="section-padding">
        <div className="container-custom text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">404</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-slate-900">Page Not Found</h1>
          <p className="mx-auto mt-4 max-w-md text-slate-600">
            Sorry, we couldn&apos;t find that page. Explore our services or contact our Jaipur team for help.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/" className="btn-primary">
              <Home size={18} /> Go Home
            </Link>
            <Link to="/services" className="btn-secondary">
              <ArrowLeft size={18} /> View Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
