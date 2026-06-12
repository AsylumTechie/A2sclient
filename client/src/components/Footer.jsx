import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Share2 } from 'lucide-react';
import { companyInfo, navLinks, serviceCategories } from '../data/siteData';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container-custom section-padding !pb-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-lg font-bold text-white">
                A2
              </div>
              <div>
                <p className="font-display text-lg font-bold text-white">A2S</p>
                <p className="text-xs text-slate-400">eCom Solutions</p>
              </div>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-slate-400">
              {companyInfo.tagline}. We deliver innovative digital solutions that drive growth and exceed
              expectations.
            </p>
            <div className="flex flex-wrap gap-2">
              {companyInfo.socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-2 text-xs text-slate-300 transition hover:bg-brand-600 hover:text-white"
                >
                  <Share2 size={14} />
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-display font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm hover:text-brand-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display font-semibold text-white">Our Services</h4>
            <ul className="space-y-2">
              {serviceCategories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/services?category=${cat.id}`} className="text-sm hover:text-brand-400">
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display font-semibold text-white">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 shrink-0 text-brand-400" />
                <a href={`tel:${companyInfo.phone}`} className="hover:text-brand-400">
                  {companyInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 shrink-0 text-brand-400" />
                <a href={`mailto:${companyInfo.email}`} className="hover:text-brand-400">
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand-400" />
                <span>{companyInfo.address}</span>
              </li>
            </ul>
            <p className="mt-4 text-xs text-slate-500">{companyInfo.san}</p>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} {companyInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
