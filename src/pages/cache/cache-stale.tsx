import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React from 'react';

const CacheStale = () => {
  return <div>CacheStale</div>;
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  ctx.res.setHeader('cache-control', 's-max-age=5, stale-while-revalidate');
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return { props: {} };
};

export default CacheStale;
