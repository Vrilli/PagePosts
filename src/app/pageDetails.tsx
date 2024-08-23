import { PostDetailProps } from "@/types/types";
import { Button } from "antd";
import { useRouter } from 'next/router';

const PostDetailPage: React.FC<PostDetailProps> = ({ post, comments }) => {
    const router = useRouter();
    return (
        <div className="p-4">
            <Button onClick={() => router.back()}>Volver</Button>
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <p className="mt-2">{post.body}</p>
            <h2 className="text-xl font-semibold mt-4">Comentarios:</h2>
            <ul className="mt-2">
                {comments.map((comment) => (
                    <li key={comment.id} className="border-b mb-4 pb-2">
                        <p className="font-semibold">{comment.name}</p>
                        <p className="text-gray-600">{comment.email}</p>
                        <p>{comment.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostDetailPage;
