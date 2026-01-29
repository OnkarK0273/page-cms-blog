import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { Header } from "@/components/ui/header";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen font-sans">
      <Header />
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4 mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Writing
          </h1>
          <p className="text-xl text-muted-foreground">
            Thoughts, ideas, and stories.
          </p>
        </div>

        <div className="grid gap-10">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
