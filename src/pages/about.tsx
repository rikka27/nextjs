import { QueryAPI } from '@root/access';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { TPost } from '@root/model/index';
import { GetServerSideProps, GetStaticProps } from 'next';
import qs from 'qs';

const Header = dynamic(() => import('@component/common/header'), {
  ssr: false,
});

const About = () => {
  console.log('Hi About');
  const router = useRouter();
  const [post, setPost] = useState<TPost[]>([]);

  let page = router.query?.page;

  console.log('query page: ', router.query);
  useEffect(() => {
    if (!page) return;
    (async () => {
      const data = await QueryAPI.Post.get<TPost>(
        qs.stringify({ _page: page, _limit: 5 })
      );
      setPost(data);
    })();
  }, [page]);

  const handleOnClick = () => {
    router.push(
      {
        pathname: '/about',
        query: {
          page: (Number(page) || 1) + 1,
        },
      },
      'hi',
      { shallow: true }
    );
  };

  return (
    <div>
      <h1>About</h1>
      <h1>List Post</h1>
      <ul>
        {post.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
      <button onClick={handleOnClick}>Increse Page {page}</button>
      <Header />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  console.log('GetStaticProps');

  return { props: {} };
};
export default About;
