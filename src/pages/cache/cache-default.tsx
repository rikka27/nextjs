import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticProps,
} from 'next';
import React from 'react';

const CacheDefalt = () => {
  return <div>CacheDefalt</div>;
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  ctx.res.setHeader('cache-control', 's-maxage=10');
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {
    props: {},
  };
};
export default CacheDefalt;
