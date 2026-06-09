import Link from "next/link";
import Image from "next/image";

type ArticleCardProps = {
  title: string;
  description: string;
  image: string;
  href: string;
};

export default function ArticleCard({
  title,
  description,
  image,
  href,
}: ArticleCardProps) {
  return (
    <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition">
      <Image
        src={image}
        alt={title}
        width={600}
        height={400}
        className="w-full h-56 object-cover"
      />

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">
          {title}
        </h3>

        <p className="mb-4">
          {description}
        </p>

        <Link
          href={href}
          className="font-semibold underline"
        >
          Read Article →
        </Link>
      </div>
    </div>
  );
}