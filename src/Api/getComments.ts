import { GetServerSideProps } from 'next';
import { getPosts } from './getPosts';
import { Comment, PostDetailProps } from '@/types/types';




export const getServerSideProps: GetServerSideProps<PostDetailProps> = async (context) => {
  const postId = parseInt(context.params?.id as string, 10);

  const posts = await getPosts();
  const post = posts.find(p => p.id === postId);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  const comments: Comment[] = await res.json();

  return {
    props: {
      post,
      comments,
    },
  };
}
