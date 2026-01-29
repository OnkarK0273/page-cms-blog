import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/types/post";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

function resolveContent<T>(filePath: string): T | undefined {
  try {
    // If path starts with content/, make it relative to process.cwd()
    const fullPath = path.join(process.cwd(), filePath);
    if (!fs.existsSync(fullPath)) return undefined;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return data as T;
  } catch (error) {
    console.error(`Error resolving content at ${filePath}:`, error);
    return undefined;
  }
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const author = data.author ? resolveContent<any>(data.author) : undefined;
  const category = data.category
    ? resolveContent<any>(data.category)
    : undefined;
  const tags = data.tags
    ? data.tags
        .map((tagPath: string) => resolveContent<any>(tagPath))
        .filter(Boolean)
    : [];

  return {
    slug: realSlug,
    title: data.title,
    publishedDate: data.publishedDate
      ? new Date(data.publishedDate).toISOString()
      : new Date().toISOString(),
    excerpt: data.excerpt,
    content,
    isFeatured: data.isFeatured,
    featuredImage: data.featuredImage,
    author: author,
    category: category,
    tags: tags,
  } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // Sort posts by date in descending order
    .sort((post1, post2) =>
      post1.publishedDate > post2.publishedDate ? -1 : 1,
    );
  return posts;
}
