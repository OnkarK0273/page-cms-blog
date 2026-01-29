---
title: React Server Components
slug: React-Server-Components
publishedDate: 2026-01-30
excerpt: Have you heard of React Server Components? You probably have. It’s
  everything anyone talks about in the React community in the last few years.
  It’s also the most misunderstood concept I feel.
author: content/authors/2026-01-29-onkar-k.md
category: content/blog-types/2026-01-29-front-end.md
tags:
  - content/tags/2026-01-29-devops.md
  - content/tags/2026-01-29-back-end.md
featuredImage: /media/case-study-origin.png
isFeatured: true
---
Have you heard of [React Server Components](https://react.dev/reference/rsc/server-components)? You probably have. It’s everything anyone talks about in the React community in the last few years. It’s also the most misunderstood concept I feel.

To be totally honest with you, I didn’t get their point for a while either. It’s way too conceptual for my practical mind. Plus, we could fetch data on the server with Next.js and APIs like [getServerSideProps](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props) waaay before any Server Components were introduced. So what’s the difference?

Only when I compared how all those patterns differ from an implementation point of view, how data is fetched across different rendering techniques, and when I traced the performance impact of each of them in different variations, it finally clicked.

So this is exactly what this article does. It looks into how Client-Side Rendering, Server-Side Rendering, and React Server Components are implemented, how JavaScript and data travel through the network for each of them, and the performance implications of migrating from CSR (Client-Side Rendering) to SSR (Server-Side Rendering) to RSC (React Server Components).  

1.  [Initial load performance for React developers: investigative deep dive](https://www.developerway.com/posts/initial-load-performance)
    
2.  [Client-Side Rendering in Flame Graphs](https://www.developerway.com/posts/client-side-rendering-flame-graph)
    
3.  [SSR Deep Dive for React Developers](https://www.developerway.com/posts/ssr-deep-dive-for-react-developers)
    

## **Defining What We Are Measuring**

When it comes to performance, there are a million and one things you can be measuring. It’s impossible to say “this website has good or bad performance” without defining what exactly we mean by “performance”, “good”, and “bad”.

For this particular experiment, I want to see the difference in _loading performance_ between different rendering and data fetching techniques, including React Server Components. For the purpose of understanding them all, and also answering the question: “React Server Components: are they worth it from a performance perspective?”