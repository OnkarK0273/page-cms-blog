import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import ReactMarkdown from "react-markdown";
import { Header } from "@/components/ui/header";
import { format } from "date-fns";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = getPostSlugs();
  return posts.map((slug) => ({
    slug: slug.replace(/\.md$/, ""),
  }));
}

type Props = Promise<{ slug: string }>;

export default async function Post({ params }: { params: Props }) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  try {
    const post = getPostBySlug(slug);
    console.log("post", post);

    return (
      <div className="min-h-screen font-sans pb-20">
        <Header />
        <article className="container max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8 space-y-6 text-center">
            {post.category && (
              <div className="flex justify-center">
                <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  {post.category.title}
                </span>
              </div>
            )}

            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
              {post.title}
            </h1>

            <div className="flex items-center justify-center gap-4 text-muted-foreground text-sm">
              {post.author && (
                <div className="flex items-center gap-2">
                  {post.author.avatar && (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover border"
                    />
                  )}
                  <span className="font-medium text-foreground">
                    {post.author.name}
                  </span>
                </div>
              )}
              <span>•</span>
              <time dateTime={post.publishedDate}>
                {format(new Date(post.publishedDate), "MMMM d, yyyy")}
              </time>
            </div>
          </div>

          {post.featuredImage && (
            <div className="mb-10 rounded-xl overflow-hidden border bg-muted">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-auto object-cover max-h-[600px]"
              />
            </div>
          )}

          <div className="prose prose-neutral dark:prose-invert max-w-none mx-auto">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag.name}
                    className="bg-muted text-muted-foreground px-2.5 py-0.5 rounded text-xs font-medium"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
