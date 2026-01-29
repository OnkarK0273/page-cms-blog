import Link from "next/link";

export function Header() {
  return (
    <header className="py-6 border-b border-border/40 w-full mb-8">
      <div className="container max-w-4xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Minimalist.
        </Link>
        <nav className="flex gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Blog
          </Link>
          <Link
            href="/about"
            className="hover:text-foreground transition-colors"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
