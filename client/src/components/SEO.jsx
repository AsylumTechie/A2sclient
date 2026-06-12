import { Helmet } from 'react-helmet-async';
import { siteUrl, siteName, defaultTitle, defaultDescription, jaipurKeywords } from '../seo/siteUrl';

export default function SEO({
  title,
  description = defaultDescription,
  path = '',
  keywords = jaipurKeywords,
  type = 'website',
  noindex = false,
  jsonLd,
}) {
  const pageTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const canonical = `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
  const ogImage = `${siteUrl}/favicon.svg`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <meta name="geo.region" content="IN-RJ" />
      <meta name="geo.placename" content="Jaipur" />

      {jsonLd &&
        (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((item) => (
          <script key={item['@type']} type="application/ld+json">
            {JSON.stringify(item)}
          </script>
        ))}
    </Helmet>
  );
}
