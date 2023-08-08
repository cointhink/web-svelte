import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
  const response = await fetch("https://cointhink.com/sql/pools")
  return {pools: response.json()}
})
