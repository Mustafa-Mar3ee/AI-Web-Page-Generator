import Splash from "@/app/components/shared/SplashPage";

import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { GetStaticPropsContext, NextPage } from "next/types";

type PageProps = {
  data: any;
};

const Page: NextPage<PageProps> = (props) => {
  const router = useRouter();

  return router.isFallback ? (
    <Splash />
  ) : (
    <div>
      search page
    </div>
  );
};

export default Page;

export const getStaticProps: GetStaticProps<PageProps, any> = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  try {
    // const { data } = await client.query<CollectionShow>({
    //   query: _CollectionSchema.show,
    //   variables: { slug: params!.slug },
    // });

    return {
      props: { data: {} },
      revalidate: 60,
    };
  } catch (e) {
    return { notFound: true, revalidate: 60 };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {

  return { paths: [], fallback: true };
};

// Next.js ISR (Incremental Static Regeneration)

// fallback: blocking (preferred) – when a request is made to a page that hasn't
// been generated, Next.js will server-render the page on the first request.
// Future requests will serve the static file from the cache.

// fallback: true – when a request is made to a page that hasn't been generated,
// Next.js will immediately serve a static page with a loading state on the first
// request. When the data is finished loading,
// the page will re-render using this data and be cached.
// Future requests will serve the static file from the cache.

// fallback: false ,
// then any paths not returned by getStaticPaths will result in a 404 page.
