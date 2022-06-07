import React from 'react';
import logo from './logo.svg';
import './App.css';
import PostProvider from './Providers/Posts/posts.provider'
import PostsList from './Pages/PostsList';

function App() {

  return (
    <PostProvider>
      <PostsList />
    </PostProvider>
  );
}

export default App;
