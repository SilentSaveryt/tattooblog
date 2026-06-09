import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-2">
              Ink Guide
            </h3>

            <p>
              Tattoo ideas, styles, aftercare,
              and inspiration.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-2">
              Navigation
            </h3>

            <div className="flex flex-col gap-2">
              <Link href="/">Home</Link>

              <Link href="/blog/tattoo-aftercare-guide">
                Tattoo Aftercare Guide
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-2">
              Contact
            </h3>

            <p>
              contact@inkguide.com
            </p>
          </div>
        </div>

        <div className="mt-10 pt-4 border-t">
          © 2026 Ink Guide
        </div>
      </div>
    </footer>
  );
}