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
  imageUrl?: string;
}


export default function Feed() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { addPost } = usePostHandler();

  // Load posts from localStorage
  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');
    console.log(JSON.parse(storedPosts));
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  console.log({ posts });
  const handlePublish = async (
    content: string,
    emoji: string
  ) => {
    if (!isAuthenticated()) {
      return
    }
    const user: User = JSON.parse(localStorage.getItem('user'));

    const newPost: PostData = {
      id: Date.now(),
      author: user.name,
      imageUrl: user.imgUrl,
      content,
      emoji,
      timestamp: new Date().toISOString(),
    };
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    addPost(newPost);
  };


  return (
    <div className="forum-container">
      <Header />
      <div className="feed-container" onClick={() => {
        if (!isAuthenticated()) {
          setShowModal(true);
        }
      }}>
        <PostEditor onPublish={handlePublish} />
        <div className="posts-list">
          {posts.map((p) => (
            <PostCard key={p.id} {...p} />
          ))}
        </div>
        {showModal && <AuthModal onSubmit={() => setShowModal(false)} />}
      </div>
    </div>
  );
}
