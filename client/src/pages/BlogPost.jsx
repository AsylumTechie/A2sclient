import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import SEO from '../components/SEO';
import { blogPosts } from '../data/blogPosts';
import { breadcrumbSchema } from '../seo/structuredData';
import { siteUrl, siteName } from '../seo/siteUrl';

function articleSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: siteName },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/favicon.svg` },
    },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };
}

function renderContent(content) {
  return content.split('\n\n').map((block) => {
    if (block.startsWith('## ')) {
      return (
        <h2 key={block} className="mt-8 font-display text-2xl font-bold text-slate-900">
          {block.replace('## ', '')}
        </h2>
      );
    }
    if (block.startsWith('**') && block.includes('** —')) {
      const [title, ...rest] = block.split('** — ');
      return (
        <p key={block} className="mt-4 leading-relaxed text-slate-600">
          <strong className="text-slate-900">{title.replace(/\*\*/g, '')}</strong> — {rest.join('')}
        </p>
      );
    }
    return (
      <p key={block.slice(0, 40)} className="mt-4 leading-relaxed text-slate-600">
        {block}
      </p>
    );
  });
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="section-padding text-center">
        <h1 className="font-display text-2xl font-bold text-slate-900">Article not found</h1>
        <Link to="/blog" className="btn-primary mt-6">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        keywords={`${post.category} Jaipur, ${post.title}, A2S Ecom Solutions blog`}
        jsonLd={[
          articleSchema(post),
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: post.title, url: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <Link to="/blog" className="mb-6 inline-flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              {post.category}
            </span>
            <h1 className="mt-2 font-display text-3xl font-bold text-slate-900 md:text-4xl">{post.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1">
                <User size={16} />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar size={16} />
                {new Date(post.date).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock size={16} />
                {post.readTime}
              </span>
            </div>
            <div className="prose-custom mt-8 border-t border-slate-100 pt-8">{renderContent(post.content)}</div>
            <div className="mt-12 rounded-2xl bg-brand-50 p-6 text-center">
              <h2 className="font-display text-xl font-bold text-slate-900">Need Help Growing Your Business?</h2>
              <p className="mt-2 text-sm text-slate-600">
                A2S Ecom Solutions offers digital marketing, SEO, and e-commerce services in Jaipur.
              </p>
              <Link to="/contact" className="btn-primary mt-4">
                Get a Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
