import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFlash } from '../../context/FlashContext';
import authService from '../../services/authService';

export default function Navbar() {
    const { currentUser, setCurrentUser } = useAuth();
    const { showFlash } = useFlash();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const data = await authService.logout();
            setCurrentUser(null);
            showFlash('success', data.message || 'You are logged out!');
            navigate('/listings');
        } catch (err) {
            console.error('Logout error:', err);
            setCurrentUser(null);
            navigate('/listings');
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm sticky-top">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/listings">
                    <i className="fa-solid fa-house-circle-check me-1"></i>
                    StayScape
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav">
                        <Link className="nav-link fw-semibold" to="/listings">
                            Explore
                        </Link>
                    </div>

                    <div className="ms-auto d-flex align-items-center gap-2">
                        <Link className="nav-link fw-semibold" to="/listings/new">
                            Add Listing
                        </Link>

                        {!currentUser ? (
                            <>
                                <Link to="/login" className="btn btn-outline-success">
                                    <b>Login</b>
                                </Link>

                                <Link to="/register" className="btn btn-success">
                                    <b>Signup</b>
                                </Link>
                            </>
                        ) : (
                            <button onClick={handleLogout} className="btn btn-success">
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
