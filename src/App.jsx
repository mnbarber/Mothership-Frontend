import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import PostList from './components/PostList/PostList';
import PostDetails from './components/PostDetails/PostDetails';
import PostForm from './components/PostForm/PostForm';
import CommentForm from './components/CommentForm/CommentForm';

import { UserContext } from './contexts/UserContext';
import * as postService from './services/postService';

const App = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const postsData = await postService.index();
      setPosts(postsData);
    };
    if(user) fetchAllPosts();
  }, [user]);

  const handleAddPost = async (postFormData) => {
    const newPost = await postService.create(postFormData);
    setPosts([newPost, ...posts]);
    navigate('/posts');
  };

  const handleDeletePost = async (postId) => {
    const deletedPost = await postService.deletePost(postId);
    setPosts(posts.filter((post) => post._id !== deletedPost._id));
    navigate('/posts');
  };

  const handleUpdatePost = async (postId, postFormData) => {
    const updatedPost = await postService.update(postId, postFormData);
    setPosts(posts.map((post) => (postId === post._id ? updatedPost : post)));
    navigate(`/posts/${postId}`);
  };
  
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path='/posts' element={<PostList posts={posts} />} />
            <Route path='/posts/:postId' element={<PostDetails handleDeletePost={handleDeletePost}/>} />
            <Route path='/posts/new' element={<PostForm handleAddPost={handleAddPost} />} />
            <Route path='/posts/:postId/edit' element={<PostForm handleUpdatePost={handleUpdatePost}/>} />
            <Route path='/posts/:postId/comments/:commentId/edit' element={<CommentForm />} />
          </>
        ) : (
          <>
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
