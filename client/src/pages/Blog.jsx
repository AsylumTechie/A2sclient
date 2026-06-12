import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { blogPosts } from '../data/blogPosts';

export default function Blog() {
  return (
    <>
      <SEO
        title="Blog — Digital Marketing & E-Commerce Tips for Jaipur"
        description="Expert insights on SEO, digital marketing, Amazon Seller Central, and e-commerce growth for businesses in Jaipur and across India. By A2S Ecom Solutions."
        path="/blog"
        keywords="digital marketing blog Jaipur, SEO tips Jaipur, Amazon seller guide, e-commerce blog India"
      />
      <PageHeader
        badge="Blog"
        title="Insights for Jaipur Businesses"
        subtitle="SEO, e-commerce, and digital marketing strategies to help your business grow online."
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-2">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm card-hover"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                  {post.category}
                </span>
                <h2 className="mt-2 font-display text-xl font-bold text-slate-900">
                  <Link to={`/blog/${post.slug}`} className="hover:text-brand-600">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(post.date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={14} />
                    {post.readTime}
                  </span>
                </div>
                <Link
                  to={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:gap-2"
                >
                  Read article <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
