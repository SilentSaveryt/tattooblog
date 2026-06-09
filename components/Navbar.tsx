import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold"
        >
          Ink Guide
        </Link>

        <div className="flex gap-6">
          <Link href="/">Home</Link>

          <Link href="/blog">Blog</Link>

          <Link href="/category/tattoo-ideas">
            Tattoo Ideas
          </Link>

          <Link href="/category/styles">
            Styles
          </Link>

          <Link href="/category/aftercare">
            Aftercare
          </Link>

          <Link href="/about">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}