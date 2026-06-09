"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NewArticlePage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  async function publishArticle() {
    const { error } = await supabase
      .from("articles")
      .insert([
        {
          title,
          slug,
          category,

          seo_title: title,
          seo_description: content.substring(0, 150),

          description: content.substring(0, 150),

          image: "/images/article-image.jpg",

          author: "Brandon from Ink Guide Team",

          featured: false,

          published_date: new Date().toLocaleDateString(),

          reading_time: "5 min read",

          content: [
            {
              heading: "Article",
              content,
            },
          ],
        },
      ]);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Article Published!");
  }

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        New Article
      </h1>

      <input
        className="border p-3 w-full mb-4"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border p-3 w-full mb-4"
        placeholder="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />

      <input
        className="border p-3 w-full mb-4"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <textarea
        className="border p-3 w-full mb-4 h-64"
        placeholder="Article Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
  onClick={publishArticle}
  style={{
    background: "red",
    color: "white",
    padding: "12px 24px",
    fontSize: "18px",
    marginTop: "20px",
  }}
>
  PUBLISH ARTICLE
</button>

      <p className="mt-4">{message}</p>
    </main>
  );
}