import {Route, createBrowserRouter, RouterProvider, createRoutesFromElements} from 'react-router-dom';
import './App.css'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard'

function App() {
  
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/login' element={LoginPage} />
      <Route path='/register' element={RegisterPage} />
      <Route path='/dashboard' element={Dashboard} />
    </>
  )
)

  return <RouterProvider router={router} />
}

export default App
