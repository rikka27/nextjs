import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from 'next';
import { useRouter } from 'next/router';
import React from 'react';

type PostDetailPageProps = { post: any };

const PostDetailPage = ({ post }: PostDetailPageProps) => {
  const router = useRouter();
  console.log(process.env.NEXT_PUBLIC_USERNAME);

  if (!post) return null;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <pre>{JSON.stringify(router.query, null, 4)}</pre>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async (
  ctx: GetStaticPathsContext
) => {
  let posts = await (
    await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10`)
  ).json();

  posts = posts.map((post: any) => ({
    params: {
      postId: typeof post.id === 'number' ? post.id.toString() : post.id,
    },
  }));
  return {
    paths: posts,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostDetailPageProps> = async (
  ctx: GetStaticPropsContext
) => {
  console.table(ctx.params);

  const post = await (
    await fetch(
      `https://jsonplaceholder.typicode.com/posts/${ctx.params?.postId}`
    )
  ).json();
  console.log(JSON.stringify(post, null, 4));

  return {
    props: {
      post,
    },
  };
};

export default PostDetailPage;
