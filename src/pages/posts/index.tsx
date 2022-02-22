import { QueryAPI } from 'access';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import React from 'react';
import qs from 'qs';
import { TPost } from 'model';

type TPostPick = Pick<TPost, 'id' | 'title'>;

interface PostListPageProps {
  posts: TPostPick[];
}

const PostListPage = ({ posts }: PostListPageProps) => {
  return (
    <div>
      <h1>Post List</h1>
      <ul>
        {posts.map(({ id, title }: TPostPick) => (
          <li key={id}>
            <Link href={`/posts/${id}?number=${Math.random()}`}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<PostListPageProps> = async (
  ctx: GetStaticPropsContext
) => {
  const data = await QueryAPI.Post.get<TPost>(qs.stringify({ _limit: 10 }));
  const posts = data.map((post: TPostPick) => ({
    id: post.id,
    title: post.title,
  }));

  return {
    props: { posts },
  };
};

export default PostListPage;
