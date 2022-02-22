import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { useEffect, useState } from 'react';

const CacheStaleTiming = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setCount((state) => state + 1);
    }, 1000);
  }, []);

  return (
    <div>
      {count}
      <h1>cacheStaleTiming</h1>
    </div>
  );
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
