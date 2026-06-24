---
title: React State Management in 2025
slug: React-State-Management-in-2025
publishedDate: 2026-01-30
excerpt: If you’ve read my blog long enough, you’ll know that I usually stay
  away from writing “opinion” articles. Most of my writing simply describes how
  things work. There is not much room for opinions there.
author: content/authors/2026-01-29-mayuresh.md
category: content/blog-types/2026-01-29-full-stack.md
tags:
  - content/tags/2026-01-29-devops.md
  - content/tags/2026-01-29-dd.md
  - content/tags/2026-01-29-back-end.md
featuredImage: /media/case-study-att.png
isFeatured: true
---
## **Why Do You Want to Make a State Management Decision?**

So, what is the best state management solution… First things first: why do you want to know? No, really.

There is no such thing as “the best” anything. It always, always depends. (Except for ice cream. Pistachio ice cream is the best).

If you simply want to learn something new to add to your CV and improve your job searching chances, then learn the most popular libraries. [“State of React”](https://stateofreact.com/en-US) and similar surveys are your friends here. Or even better — open the job descriptions of the company you’re trying to apply for and extract those names from there. Or even betterer (more better? 🤔) learn the [core](https://react.dev/) and [advanced](https://www.advanced-react.com/) React concepts, like how re-renders and reconciliation work, for example. All state management libraries then become the same to you, just a matter of expressing the same concept in a slightly different way.

If you work on an existing old and large project, are unhappy with your current state management solution being Redux, and want to introduce something better, then you also don’t need “the best” library. The most important thing in this case would be to understand why the current library makes you unhappy. The last thing you want to do is replace a well-known solution with something that does things very differently, requires a huge investment into upskilling colleagues, and doesn’t solve the problem you promised to solve. A good example here would be trying to replace Redux with something like XState in an attempt to solve the “Redux is too complicated” problem.

You might also feel like your existing library is bad for performance, and you need something better. In this case… Is the library itself problematic? How sure are you? With numbers, please. Because I can bet almost anything that the impact of the library itself will be negligible. More likely, the problem is unoptimized for re-renders code or some very slow calculations on the critical path. Those might be influenced by the way the library encourages you to write code. Or they might not! It could be a sign of a bigger engineering problem in your org. In any case, switching to something different without fully understanding the problem will most likely achieve nothing.

## **State Concerns That Don’t Need a State Management Library**

Essentially, it’s just data. Data that influences how your system works or behaves. When you’re eating ice cream, for example, the state of your mind as a system can be defined as:

1. In anticipation of eating ice cream.
2. Enjoying eating ice cream.
3. Satisfied after finishing ice cream.

Or, if we focus on React, it can be:

- The state of a modal dialog’s openness (open/closed).
- The state of data fetching from an endpoint (no data/loading data/error happened/successfully loaded data).
- The state of a component’s lifecycle (mounted or not mounted).

Or any other data that can influence how something is rendered on the screen or behaves in response to user interaction with the UI.

Speaking of data and React…

# code example

```tsx
import { getProductDetails } from "@/lib/api";
import { SITE_URL, staticRoutes } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticUrls = staticRoutes
    .filter((route) => route.path !== "/blog")
    .map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified,
      changeFrequency:
        route.path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: route.priority,
    }));

  const productUrls = getProductDetails().map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticUrls, ...productUrls] satisfies MetadataRoute.Sitemap;
}
```

