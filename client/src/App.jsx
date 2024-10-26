import {Route, createBrowserRouter, RouterProvider, createRoutesFromElements} from 'react-router-dom';
import './App.css'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard'
import LandingPage from './pages/LandingPage';
import TestPage from './pages/TestPage';;
import MistakesPage from './pages/MistakesPage';

function App() {
  
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/test' element={<TestPage />} />
      <Route path='/mistakes' element={<MistakesPage />} />
    </>
  )
)

  return <RouterProvider router={router} />
}

export default App
