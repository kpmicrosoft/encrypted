import './App.scss';
import Landing from './pages/landing/landing';
import Dashboard from './pages/dashboard/dashboard';
import Profile from './pages/profile/profile';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/error/error';
import { createTheme, ThemeProvider } from '@mui/material';
import Decrypt from './pages/decrypt/decrypt';
import GameOver from './common/components/GameOver/game-over';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
      errorElement: <ErrorPage />,
    },
    {
      path: "Level2",
      element: <Landing />,
      errorElement: <ErrorPage />,
    },
    {
      path: "Dashboard",
      element: <Dashboard />,
    },
    {
      path: "Profile",
      element: <Profile />,
    },
    {
      path: "Level3",
      element: <Decrypt />,
    },
    {
      path: "GameOver",
      element: <GameOver />,
    },
  ]);

  const theme = createTheme({
    palette: {
      primary: {
        light: "#0c1624",
        main: "#0c1624",
        dark: "#0c1624",
        contrastText: "#add2ee",
      },
      secondary: {
        light: "#add2ee",
        main: "#add2ee",
        dark: "",
        contrastText: "#0c1624",
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

