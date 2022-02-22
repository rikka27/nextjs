import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React from 'react';

const CacheStaleTiming = () => {
  return <div>cacheStaleTiming</div>;
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  ctx.res.setHeader('cache-control', 's-maxage=5, stale-while-revalidate=5');
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {
    props: {},
  };
};

export default CacheStaleTiming;
