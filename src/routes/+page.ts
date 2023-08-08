import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
  const colors = fetch("http://localhost:5173/zndex.html")
    return {
        pools: [{address: "acd"}]    };
}) satisfies PageLoad;
