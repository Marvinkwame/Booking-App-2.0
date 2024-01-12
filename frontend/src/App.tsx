
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from "./layouts/Layout";
import './App.css'
import Register from './pages/Register';
import Login from './pages/Login';
import CreateHotel from './pages/CreateHotel';
import { useAppContext } from './context/AppContext';

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout>
          <p>Home Page</p>
        </Layout>} />
        <Route path="/search" element={<Layout>
          <p>Search Page</p>
        </Layout>} />
        <Route path='/register' element={<Layout> <Register /></Layout>} />
        <Route path="/login" element={<Layout> <Login /> </Layout>} />

        {isLoggedIn && <>
          <Route path="/add-hotel" element={<Layout> <CreateHotel /> </Layout>} />
        </>}

      </Routes>
    </Router>
  )
}

export default App
