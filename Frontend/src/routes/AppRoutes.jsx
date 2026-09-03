import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Listings from '../pages/Listings/Listings';
import ListingDetails from '../pages/ListingDetails/ListingDetails';
import NewListing from '../pages/NewListing/NewListing';
import EditListing from '../pages/EditListing/EditListing';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/listings" replace />} />
            <Route path="/listing" element={<Navigate to="/listings" replace />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/listings/new" element={<NewListing />} />
            <Route path="/listings/:id" element={<ListingDetails />} />
            <Route path="/listings/:id/edit" element={<EditListing />} />
            <Route path="/listing/:id" element={<ListingDetails />} />
            <Route path="/listing/:id/edit" element={<EditListing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signup" element={<Register />} />
            <Route path="*" element={<Navigate to="/listings" replace />} />
        </Routes>
    );
}
