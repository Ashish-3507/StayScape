import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { useFlash } from '../../context/FlashContext';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setCurrentUser } = useAuth();
    const { showFlash } = useFlash();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await authService.login(username, password);
            if (data.success) {
                setCurrentUser(data.user);
                showFlash('success', data.message || 'Welcome to StayScape!');
                navigate('/listings');
            } else {
                showFlash('error', data.error || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            showFlash('error', err.response?.data?.error || 'Invalid username or password');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center mt-5">
            <div className="card login-card shadow-lg p-4" style={{ width: '400px', maxWidth: '100%' }}>
                <h2 className="text-center mb-4 fw-bold">Login to StayScape</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label fw-semibold">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-semibold">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="d-grid mt-4">
                        <button className="btn btn-success btn-lg">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
