export interface Author {
  name: string;
  bio: string;
  avatar: string;
}

export interface Category {
  title: string;
  description: string;
}

export interface Tag {
  name: string;
}

export interface Post {
  slug: string;
  title: string;
  publishedDate: string;
  excerpt: string;
  content: string;
  isFeatured?: boolean;
  featuredImage?: string;
  author?: Author;
  category?: Category;
  tags?: Tag[];
}
