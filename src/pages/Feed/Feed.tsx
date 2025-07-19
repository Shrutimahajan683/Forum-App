import React, { useEffect, useState } from 'react';
import { User, isAuthenticated } from '../../utils/auth.tsx';
import { PostCard } from '../../components/Post/index.tsx';
import { PostEditor } from '../../components/Post/index.tsx';
import AuthModal from '../../components/AuthModal/AuthModal.tsx';
import Header from '../../components/Header/Header.tsx';
import { usePostHandler } from '../../hooks/usePostHandler.tsx';
import './index.css'

interface Base64Attachment {
  name: string;
  type: string;
  data: string;
}

interface PostData {
  id: number;
  author: string;
  content: string;
  emoji: string;
  timestamp: string;
  attachments: Base64Attachment[];
  imageUrl: string;
}


export default function Feed() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { addPost } = usePostHandler();

  // Load posts from localStorage
  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  const fileToBase64 = (file: File): Promise<{ name: string; type: string; data: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () =>
        resolve({ name: file.name, type: file.type, data: reader.result as string });
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };


  const handlePublish = async (
    content: string,
    attachments: File[],
    emoji: string
  ) => {
    if (!isAuthenticated()) {
      setShowModal(true);
      return;
    }
    const base64Attachments = await Promise.all(
      attachments.map(fileToBase64)
    );
    const user: User = JSON.parse(localStorage.getItem('user'));
    console.log({ user });

    const newPost: PostData = {
      id: Date.now(),
      author: user.name,
      imageUrl: user.imgUrl,
      content,
      emoji,
      timestamp: new Date().toISOString(),
      attachments: base64Attachments,
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    addPost(updatedPosts);
  };


  return (
    <div className="feed-container">
      <Header />
      <PostEditor onPublish={handlePublish} />
      <div className="posts-list">
        {posts.map((p) => (
          <PostCard key={p.id} {...p} />
        ))}
      </div>
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
