import { useCallback } from 'react';

export interface Base64Attachment {
  name: string;
  type: string;
  data: string;
}

export interface PostData {
  id: number;
  author: string;
  content: string;
  emoji: string;
  timestamp: string;
  attachments: Base64Attachment[];
}

export const usePostHandler = () => {
  const getPosts = useCallback((): PostData[] => {
    try {
      const stored = localStorage.getItem('posts');
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error('Error reading posts from localStorage:', err);
      return [];
    }
  }, []);

  const savePosts = useCallback((posts: PostData[]) => {
    try {
      localStorage.setItem('posts', JSON.stringify(posts));
    } catch (err) {
      console.error('Error saving posts to localStorage:', err);
    }
  }, []);

  const addPost = useCallback((newPost: PostData): PostData[] => {
    const currentPosts = getPosts();
    const updatedPosts = [newPost, ...currentPosts];
    savePosts(updatedPosts);
    return updatedPosts;
  }, [getPosts, savePosts]);

  return {
    getPosts,
    savePosts,
    addPost,
  };
};
