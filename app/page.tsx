import Image from "next/image";
import ArticleCard from "@/components/ArticleCard";
import { articles } from "@/data/articles";

export default function Home() {
  const featuredArticles = articles.filter(
    (article) => article.featured === true
  );

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <Image
          src="/images/hero-tattoo.jpg"
          alt="Tattoo artwork"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-6xl font-bold mb-6">
              Ink Guide
            </h1>

            <p className="text-2xl max-w-2xl mx-auto">
              Tattoo ideas, styles, aftercare guides,
              and inspiration for your next piece.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">
          Featured Articles
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {featuredArticles.map((article) => (
            <ArticleCard
              key={article.slug}
              title={article.title}
              description={article.description}
              image={article.image}
              href={`/blog/${article.slug}`}
            />
          ))}
        </div>
      </section>

      {/* Latest Articles */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">
          Latest Articles
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              title={article.title}
              description={article.description}
              image={article.image}
              href={`/blog/${article.slug}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}