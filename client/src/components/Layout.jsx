import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import StructuredData from './StructuredData';
import { organizationSchema, localBusinessSchema, websiteSchema } from '../seo/structuredData';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <StructuredData data={[organizationSchema(), localBusinessSchema(), websiteSchema()]} />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
