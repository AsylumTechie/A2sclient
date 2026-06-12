import { Helmet } from 'react-helmet-async';

export default function StructuredData({ data }) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <Helmet>
      {items.map((item) => (
        <script key={item['@type']} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}
