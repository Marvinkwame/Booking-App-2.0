
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from "./layouts/Layout";
import './App.css'
import Register from './pages/Register';
import Login from './pages/Login';
import CreateHotel from './pages/CreateHotel';
import { useAppContext } from './context/AppContext';
import MyHotels from './pages/MyHotels';
import EditHotel from './pages/EditHotel';
import SearchPage from './pages/SearchPage';
import DetailView from './pages/DetailView';
import Booking from './pages/Booking';
import MyBooking from './pages/MyBooking';
import Home from './pages/Home';

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout>
          <Home />
        </Layout>} />
        <Route path="/search" element={<Layout>
          <SearchPage />
        </Layout>} />
        <Route path='/register' element={<Layout> <Register /></Layout>} />
        <Route path="/login" element={<Layout> <Login /> </Layout>} />
        <Route path="/search" element={<Layout> <SearchPage /> </Layout>} />
        <Route path='/hotel-details/:hotelId' element={<Layout> <DetailView /> </Layout>}  />

        {isLoggedIn && <>
          <Route path="/add-hotel" element={<Layout> <CreateHotel /> </Layout>} />
          <Route path='/my-hotels' element={<Layout> <MyHotels /> </Layout>} />
          <Route path="/edit-hotel/:hotelId" element={<Layout> <EditHotel /> </Layout> } />
          <Route path="/hotel/:hotelId/booking" element={ <Layout> <Booking /> </Layout> } />
          <Route path="/my-bookings" element={ <Layout> <MyBooking /> </Layout> } />
        </>}

      </Routes>
    </Router>
  )
}

export default App
