import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { postsAPI, commentsAPI } from '../api/axios';
import api from '../api/axios';

const PostsContext = createContext();

export const usePosts = () => useContext(PostsContext);

const mapPost = (p, comments) => ({
  id: p._id,
  title: p.title,
  content: p.content,
  tag: p.category || 'General',
  createdAt: p.createdAt,
  authorId: p.author?._id,
  authorName: p.author?.name,
  authorProfilePic: p.author?.profilePic,
  image: p.image,
  likes: p.likes || [],
  comments: comments || []
});

const mapComment = (c) => {
  const mapped = {
    id: c._id,
    text: c.content,
    createdAt: c.createdAt,
    authorId: c.author?._id,
    authorName: c.author?.name,
    authorProfilePic: c.author?.profilePic
  };
  console.log('Mapped comment:', mapped);
  return mapped;
};

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const rawPosts = await postsAPI.getAll();
        
        const postsWithComments = await Promise.all(
          rawPosts.data.posts.map(async (p) => {
            try {
              const rawComments = await commentsAPI.getByPost(p._id);
              
              const comments = Array.isArray(rawComments.data.comments) 
                ? rawComments.data.comments.map(mapComment) 
                : [];
              
              return mapPost(p, comments);
            } catch (commentError) {
              console.error('Failed to load comments for post:', p._id, commentError);
              // If comments fail to load, still return the post without comments
              return mapPost(p, []);
            }
          })
        );

        setPosts(postsWithComments);
      } catch (error) {
        console.error('Failed to load posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const createPost = async ({ title, content, tag, image }) => {
    try {
      let response;
      
      if (image) {
        // Create post with image using FormData
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', tag || 'other');
        formData.append('image', image);
        
        response = await api.post('/posts', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        // Create post without image
        const postData = {
          title,
          content,
          category: tag || 'other'
        };
        response = await postsAPI.create(postData);
      }
      
      const mapped = mapPost(response.data.post, []);
      setPosts((prev) => [mapped, ...prev]);
      return mapped;
    } catch (error) {
      console.error('Create post error:', error);
      throw new Error(error.response?.data?.message || 'Failed to create post');
    }
  };

  const deletePost = async ({ postId }) => {
    try {
      await postsAPI.delete(postId);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete post');
    }
  };

  const addComment = async ({ postId, text }) => {
    try {
      const response = await commentsAPI.create(postId, { content: text });
      
      const comment = mapComment(response.data.comment);

      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, comments: [...(p.comments || []), comment] } : p))
      );

      return comment;
    } catch (error) {
      console.error('Add comment error:', error);
      throw new Error(error.response?.data?.message || 'Failed to add comment');
    }
  };

  const deleteComment = async ({ postId, commentId }) => {
    try {
      await commentsAPI.delete(commentId);

      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, comments: (p.comments || []).filter((c) => c.id !== commentId) } : p
        )
      );
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete comment');
    }
  };

  const likePost = async ({ postId }) => {
    try {
      const response = await postsAPI.like(postId);
      
      setPosts((prev) =>
        prev.map((p) => 
          p.id === postId 
            ? { ...p, liked: response.data.liked, likesCount: response.data.likesCount }
            : p
        )
      );
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to like post');
    }
  };

  const value = useMemo(
    () => ({
      posts,
      loading,
      createPost,
      deletePost,
      addComment,
      deleteComment,
      likePost
    }),
    [posts, loading]
  );

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>;
};
