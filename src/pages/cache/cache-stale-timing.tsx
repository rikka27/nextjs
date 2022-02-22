import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React from 'react';

export const cacheStaleTiming = () => {
  return <div>cacheStaleTiming</div>;
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  ctx.res.setHeader('cache-control', 's-max-age=5, stale-while-revalidate=5');
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {
    props: {},
  };
};