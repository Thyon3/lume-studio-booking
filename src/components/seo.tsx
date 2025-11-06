import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  locale?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  articleSection?: string;
  tags?: string[];
  noIndex?: boolean;
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  siteName = 'Lume Studio',
  locale = 'en_US',
  author,
  publishedTime,
  modifiedTime,
  articleSection,
  tags,
  noIndex = false,
  canonical,
}) => {
  const router = useRouter();
  const currentUrl = url || `${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`;
  const currentImage = image || `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'WebPage',
    name: title,
    description,
    url: currentUrl,
    image: currentImage,
    author: author ? {
      '@type': 'Person',
      name: author,
    } : undefined,
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`,
      },
    },
    datePublished: publishedTime,
    dateModified: modifiedTime,
    articleSection,
    keywords: tags?.join(', '),
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={currentImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={currentImage} />
      <meta name="twitter:creator" content={author} />

      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' && articleSection && (
        <meta property="article:section" content={articleSection} />
      )}
      {type === 'article' && tags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
};

export default SEO;
