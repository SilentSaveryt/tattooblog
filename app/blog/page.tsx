import ArticleCard from "@/components/ArticleCard";
import { supabase } from "@/lib/supabase";

export default async function BlogPage() {
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold mb-4">
        Blog
      </h1>

      <p className="text-lg text-gray-600 mb-10">
        Browse all tattoo guides, aftercare tips,
        style inspiration, and tattoo advice.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {articles?.map((article) => (
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