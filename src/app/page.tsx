"use client";
import { Button, Card, Space, Input, Form, message, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { getPosts } from '../Api/getPosts';
import { Post } from '@/types/types';
import { useRouter } from 'next/navigation'



const PostCards: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalPosts, setTotalPosts] = useState(0);
  const [form] = Form.useForm();
  const router = useRouter()
  const [theme, setTheme] = useState<'light' | 'dark'>('light');


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getPosts();
        setTotalPosts(allPosts.length);
        const paginatedPosts = allPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize);
        setPosts(paginatedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [currentPage, pageSize]);

  const handleClick = (postId: number) => {
    router.push(`/pageDetails`)
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleChangeTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const onFinish = async (values: { title: string; body: string }) => {
    try {
      const newPost: Post = {
        id: posts.length + 1,
        title: values.title,
        body: values.body,
      };
      setPosts([newPost, ...posts]);
      form.resetFields();

      message.success('Post added successfully!');
    } catch (error) {
      console.error('Error adding post:', error);
      message.error('Failed to add post.');
    }
  };

  return (
    <div className='p-4'>
      <Button onClick={handleChangeTheme}>
        Cambiar a {theme === 'light' ? 'Dark' : 'Light'} Theme
      </Button>
      <div className='flex flex-col items-center p-6'>
        <h1 className='text-3xl py-6 text-center font-bold'>Agrega tu post aquí</h1>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="mb-8 mx-4 p-6 border border-gray-300 rounded-lg shadow-lg bg-white w-full max-w-md"
        >
          <Form.Item
            name="title"
            label="Título"
            rules={[{ required: true, message: 'Por favor ingresa un título' }]}
          >
            <Input placeholder="Ingresa el título del post" className='rounded-md border-gray-300' />
          </Form.Item>
          <Form.Item
            name="body"
            label="Cuerpo"
            rules={[{ required: true, message: 'Por favor ingresa el cuerpo del post' }]}
          >
            <Input.TextArea rows={4} placeholder="Ingresa el cuerpo del post" className='rounded-md border-gray-300' />
          </Form.Item>
          <Form.Item>
            <Button className='bg-[#ab82f68e] text-black border-none font-bold w-full' type="primary" htmlType="submit">
              Agregar Post
            </Button>
          </Form.Item>
        </Form>
      </div>

      <h1 className='text-4xl py-6 text-center font-bold'>Lista de Posts</h1>

      <Space className='flex-wrap justify-center items-center' direction="horizontal" size={16}>
        {posts.map((post) => (
          <Card className='w-full max-w-xs' key={post.id} title={post.title} style={{ width: 300 }}>
            <p className='pb-6 truncate'>{post.body}</p>
            <Button
              className='bg-[#ab82f68e] text-black border-none font-bold'
              type="primary"
              onClick={() => handleClick(post.id)}
            >
              Ver Detalles
            </Button>
          </Card>
        ))}
      </Space>

      <div className="flex justify-center mt-6">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalPosts}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          className="bg-white rounded-md shadow-sm"
        />
      </div>
    </div >
  );
};

export default PostCards;
