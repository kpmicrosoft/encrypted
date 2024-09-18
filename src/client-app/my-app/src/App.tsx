import './App.scss';
import Landing from './pages/landing/landing';
import Dashboard from './pages/dashboard/dashboard';
import Profile from './pages/profile/profile';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/error/error';
import { createTheme, ThemeProvider } from '@mui/material';
import PlanetPhish from './pages/planet-phish/planet-phish';

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
    },
    {
      path: "Level2",
      element: <PlanetPhish />
    }
  ])

  const theme = createTheme({
    palette: {
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;

