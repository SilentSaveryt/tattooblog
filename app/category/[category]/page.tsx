import { articles } from "@/data/articles";
import ArticleCard from "@/components/ArticleCard";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const filteredArticles = articles.filter(
    (article) => article.category === category
  );

  if (filteredArticles.length === 0) {
    notFound();
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold mb-10 capitalize">
        {category.replace("-", " ")}
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <ArticleCard
            key={article.slug}
            title={article.title}
            description={article.description}
            image={article.image}
            href={`/blog/${article.slug}`}
          />
        ))}
      </div>
    </main>
  );
}