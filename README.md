## Getting Started

First, run the development server:

```bash
npm run dev -- -p 3005
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Install the dependencies

```bash
npm install "@builder.io/react"
```

In the **`pages`** directory, rename the default _`index.tsx`_ to `[[...page]].tsx` . The double square brackets, `[[]]`, are how Next.js creates dynamic routes, which means you can create pages with different names in **Builder.io** and Next.js can see them all.

Replace the code in `[[...page]].tsx` with the following, making sure to add your **`Public API`** Key to the **`builder.init()`** method.

```javascript
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import DefaultErrorPage from "next/error";
import Head from "next/head";

// put your Public API Key you copied from Builder.io here
const BUILDER_API_KEY = "";
builder.init(BUILDER_API_KEY);

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ page: string[] }>) {
  const page =
    (await builder
      .get("page", {
        userAttributes: {
          urlPath: "/" + (params?.page?.join("/") || ""),
        },
      })
      .toPromise()) || null;

  return {
    props: {
      page,
    },
    revalidate: 5,
  };
}

export async function getStaticPaths() {
  const pages = await builder.getAll("page", {
    options: { noTargeting: true },
  });

  return {
    paths: pages.map((page) => `${page.data?.url}`),
    fallback: true,
  };
}

export default function Page({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  const isPreviewing = useIsPreviewing();
  if (!page && !isPreviewing) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <meta name="title"></meta>
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <BuilderComponent model="page" content={page} />
    </>
  );
}
```

- Have look at this [`documentation`](https://www.builder.io/blog/visual-next-js) for more information.
