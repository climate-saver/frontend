import React from 'react';
import './App.css';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import ChatPage from './pages/Chat';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/chat" replace={true} />,
  },
  {
    path: '/chat',
    element: <ChatPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
