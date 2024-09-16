import './App.scss';
import Landing from './pages/landing/landing';
import Dashboard from './pages/dashboard/dashboard';
import Profile from './pages/profile/profile';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/error/error';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
      errorElement: <ErrorPage />,
    },
    {
      path: "Dashboard",
      element: <Dashboard />
    },
    {
      path: "Profile",
      element: <Profile />
    }
  ])

  return <RouterProvider router={router} />;
}

export default App;

