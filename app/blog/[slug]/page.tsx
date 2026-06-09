import { notFound } from "next/navigation";
import { articles } from "@/data/articles";
import Image from "next/image";
import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const article = articles.find(
    (article) => article.slug === slug
  );

  if (!article) {
    return {
      title: "Article Not Found | Ink Guide",
    };
  }

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    keywords: article.keywords,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = articles.find(
    (article) => article.slug === slug
  );

  if (!article) {
    notFound();
  }

  const relatedArticles = articles
    .filter(
      (item) =>
        item.category === article.category &&
        item.slug !== article.slug
    )
    .slice(0, 3);

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <Image
        src={article.image}
        alt={article.title}
        width={1200}
        height={600}
        className="w-full h-[400px] object-cover rounded-xl mb-8"
      />

      <div className="mb-4">
        <span className="inline-block px-3 py-1 rounded-full border text-sm capitalize">
          {article.category.replace("-", " ")}
        </span>
      </div>

      <h1 className="text-5xl font-bold mb-6">
        {article.title}
      </h1>

      <div className="flex flex-wrap gap-3 text-gray-500 mb-6">
        <span>{article.author}</span>
        <span>•</span>
        <span>{article.publishedDate}</span>
        <span>•</span>
        <span>{article.readingTime}</span>
      </div>

      <p className="text-xl mb-12">
        {article.description}
      </p>

      <article className="space-y-12 mb-16">
        {article.sections.map((section, index) => (
          <section key={index}>
            <h2 className="text-3xl font-bold mb-4">
              {section.heading}
            </h2>

            <p className="text-lg leading-8 text-gray-700">
              {section.content}
            </p>
          </section>
        ))}
      </article>

      {relatedArticles.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-8">
            Related Articles
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {relatedArticles.map((related) => (
              <ArticleCard
                key={related.slug}
                title={related.title}
                description={related.description}
                image={related.image}
                href={`/blog/${related.slug}`}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}