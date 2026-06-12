import { companyInfo } from '../data/siteData';
import { siteUrl, siteName } from './siteUrl';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/favicon.svg`,
    email: companyInfo.email,
    telephone: companyInfo.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyInfo.streetAddress,
      addressLocality: companyInfo.city,
      addressRegion: companyInfo.state,
      postalCode: companyInfo.postalCode,
      addressCountry: 'IN',
    },
    sameAs: companyInfo.socialLinks.map((s) => s.url).filter(Boolean),
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteName,
    image: `${siteUrl}/favicon.svg`,
    url: siteUrl,
    telephone: companyInfo.phone,
    email: companyInfo.email,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyInfo.streetAddress,
      addressLocality: companyInfo.city,
      addressRegion: companyInfo.state,
      postalCode: companyInfo.postalCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: companyInfo.geo.lat,
      longitude: companyInfo.geo.lng,
    },
    areaServed: {
      '@type': 'City',
      name: 'Jaipur',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/services?category={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function serviceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.shortDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: siteName,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Jaipur',
        addressRegion: 'Rajasthan',
        addressCountry: 'IN',
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'Jaipur',
    },
    url: `${siteUrl}/services/${service.slug}`,
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `${siteUrl}${item.url}` : undefined,
    })),
  };
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
