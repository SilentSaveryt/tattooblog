"use client";

import { useState } from "react";

type Section = {
  heading: string;
  content: string;
};

export default function ArticleGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [copied, setCopied] = useState(false);

  const [sections, setSections] = useState<Section[]>([
    {
      heading: "",
      content: "",
    },
  ]);

  const generateDraft = () => {
    if (!topic.trim()) return;

    setTitle(
      topic
        .split(" ")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() +
            word.slice(1)
        )
        .join(" ")
    );

    setCategory("tattoo-ideas");

    setDescription(
      `Learn everything you need to know about ${topic}.`
    );

    setSections([
      {
        heading: "Introduction",
        content: `An introduction to ${topic}.`,
      },
      {
        heading: `Why ${topic} Matters`,
        content: `Important information about ${topic}.`,
      },
      {
        heading: "Tips and Recommendations",
        content: `Helpful advice related to ${topic}.`,
      },
      {
        heading: "Common Mistakes",
        content: `Mistakes people often make regarding ${topic}.`,
      },
      {
        heading: "Conclusion",
        content: `Final thoughts on ${topic}.`,
      },
    ]);
  };

  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  const addSection = () => {
    setSections([
      ...sections,
      {
        heading: "",
        content: "",
      },
    ]);
  };

  const updateSection = (
    index: number,
    field: "heading" | "content",
    value: string
  ) => {
    const updated = [...sections];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setSections(updated);
  };

  const sectionsCode = sections
    .map(
      (section) => `
    {
      heading: "${section.heading}",
      content:
        "${section.content}"
    }`
    )
    .join(",");

  const articleObject = `
{
  featured: false,

  slug: "${slug}",
  category: "${category}",

  title: "${title}",

  seoTitle:
    "${title}",

  seoDescription:
    "${description}",

  keywords: [],

  author: "Ink Guide Team",
  publishedDate: "${new Date().toLocaleDateString()}",
  readingTime: "5 min read",

  description:
    "${description}",

  image: "/images/article-image.jpg",

  sections: [${sectionsCode}
  ]
},
`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(
      articleObject
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold mb-4">
        Article Generator
      </h1>

      <p className="text-lg text-gray-600 mb-10">
        Create article objects for Ink Guide.
      </p>

      <div className="border rounded-xl p-6 space-y-6">
        <div>
          <label className="block mb-2 font-semibold">
            Article Topic
          </label>

          <div className="flex gap-3">
            <input
              type="text"
              value={topic}
              onChange={(e) =>
                setTopic(e.target.value)
              }
              placeholder="tattoo sleeve ideas"
              className="flex-1 border rounded-lg p-3"
            />

            <button
              onClick={generateDraft}
              className="px-6 py-3 border-2 border-black rounded-lg font-semibold"
            >
              Generate Draft
            </button>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Article Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Category
          </label>

          <input
            type="text"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows={4}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="pt-4 border-t">
          <h2 className="text-2xl font-bold mb-4">
            Article Sections
          </h2>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <div
                key={index}
                className="border rounded-lg p-4"
              >
                <input
                  type="text"
                  value={section.heading}
                  onChange={(e) =>
                    updateSection(
                      index,
                      "heading",
                      e.target.value
                    )
                  }
                  placeholder="Section Heading"
                  className="w-full border rounded-lg p-3 mb-3"
                />

                <textarea
                  value={section.content}
                  onChange={(e) =>
                    updateSection(
                      index,
                      "content",
                      e.target.value
                    )
                  }
                  rows={5}
                  placeholder="Section Content"
                  className="w-full border rounded-lg p-3"
                />
              </div>
            ))}
          </div>

          <button
            onClick={addSection}
            className="mt-6 px-6 py-3 border rounded-lg font-semibold"
          >
            + Add Section
          </button>
        </div>

        <button
          onClick={copyToClipboard}
          className="px-6 py-3 border-2 border-black rounded-lg font-semibold"
        >
          {copied
            ? "Copied!"
            : "Copy Article Object"}
        </button>

        <div className="bg-gray-100 rounded-lg p-4">
          <h2 className="font-bold mb-3">
            Generated Article Object
          </h2>

          <pre className="whitespace-pre-wrap text-sm overflow-auto">
            {articleObject}
          </pre>
        </div>
      </div>
    </main>
  );
}