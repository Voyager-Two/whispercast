export const getCacheControl = () => {
  // https://vercel.com/guides/how-can-i-reduce-my-serverless-execution-usage-on-vercel
  // https://web.dev/stale-while-revalidate/
  // https://stackoverflow.com/questions/72642866/how-does-stale-while-revalidate-interact-with-s-maxage-in-cache-control-header
  const browserLocalCache = 30;
  const tellBrowserToRevalidate = 300; // Happens in the background
  const maxStale = (24 * 60 * 60) * 7; // 30 days
  // Important thing is to have a window between s-maxage and stale-while-revalidate
  // s-max-age is smaller than stale-while-revalidate, so that there are no blocking (slow) requests
  return `public, max-age=${browserLocalCache}, s-maxage=${tellBrowserToRevalidate}, stale-while-revalidate=${maxStale}`;
}

export const getPagination = (page: number, size: number) => {
  page = page ? page : 1;
  const limit = size ? +size : 15;
  const from = page && page !== 1 ? (page - 1) * limit : 0;
  const to = page ? from + size - 1 : size - 1

  return { from, to };
};
