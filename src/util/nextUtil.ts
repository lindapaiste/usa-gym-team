import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

/**
 * All detail pages have the same `Params` which is a `string` slug.
 */

export type Params = ParsedUrlQuery & {
    slug: string;
};

export function createGetStaticPaths(slugs: string[]): GetStaticPaths<Params> {
    return async () => {
        // When this is true (in preview environments) don't
        // prerender any static pages
        // (faster builds, but slower initial page load)
        if (process.env.SKIP_BUILD_STATIC_GENERATION) {
            return {
                paths: [],
                fallback: 'blocking',
            };
        }

        // Get the paths we want to prerender based on posts
        // In production environments, prerender all pages
        // (slower builds, but faster initial page load)
        // TODO: figure out what to do with empty club ''
        const paths = slugs.filter(Boolean).map((slug) => ({
            params: { slug },
        }));

        // { fallback: false } means other routes should 404
        return { paths, fallback: false };
    };
}

export function createGetStaticProps<P extends { [key: string]: any }>(
    slugToProps: (slug: string) => Promise<P> | P
): GetStaticProps<P, Params> {
    // This function gets called at build time on server-side.
    // It may be called again, on a serverless function, if
    // revalidation is enabled and a new request comes in
    return async (context) => {
        const slug = context.params!.slug;
        const props = await slugToProps(slug);
        return {
            props,
        };
    };
}
