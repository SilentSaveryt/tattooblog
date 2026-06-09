import { notFound } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!article) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {article.image && (
        <Image
          src={article.image}
          alt={article.title}
          width={1200}
          height={600}
          className="w-full h-[400px] object-cover rounded-xl mb-8"
        />
      )}

      <div className="mb-4">
        <span className="inline-block px-3 py-1 rounded-full border text-sm capitalize">
          {article.category}
        </span>
      </div>

      <h1 className="text-5xl font-bold mb-6">
        {article.title}
      </h1>

      <div className="flex flex-wrap gap-3 text-gray-500 mb-6">
        <span>{article.author}</span>
        <span>•</span>
        <span>{article.published_date}</span>
        <span>•</span>
        <span>{article.reading_time}</span>
      </div>

      <p className="text-xl mb-12">
        {article.description}
      </p>

      <article className="space-y-12">
        {article.content?.map(
          (section: any, index: number) => (
            <section key={index}>
              <h2 className="text-3xl font-bold mb-4">
                {section.heading}
              </h2>

              {section.image && (
                <Image
                  src={section.image}
                  alt={section.heading}
                  width={1000}
                  height={600}
                  className="w-full rounded-xl my-6"
                />
              )}

              <p className="text-lg leading-8 whitespace-pre-line">
                {section.content}
              </p>
            </section>
          )
        )}
      </article>
    </main>
  );
}