import Link from "next/link";
import { format } from "date-fns";
import { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="group flex flex-col gap-2 border-b pb-5">
      <Link href={`/posts/${post.slug}`} className="block">
        <h2 className="text-2xl font-semibold tracking-tight group-hover:underline decoration-2 underline-offset-4 decoration-primary/50">
          {post.title}
        </h2>
      </Link>
      <div className="text-sm text-muted-foreground">
        {format(new Date(post.publishedDate), "MMMM d, yyyy")}
      </div>
      <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
      <Link
        href={`/posts/${post.slug}`}
        className="text-sm font-medium text-primary hover:underline underline-offset-4 mt-2 inline-block"
      >
        Read more →
      </Link>
    </div>
  );
}
