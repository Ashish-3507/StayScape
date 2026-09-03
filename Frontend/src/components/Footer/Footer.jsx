import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="mt-5">
            <div className="f-info">
                <div className="f-info-social">
                    <i className="fa-brands fa-facebook-f"></i>
                    <i className="fa-brands fa-square-instagram"></i>
                    <i className="fa-brands fa-linkedin"></i>
                </div>

                <div className="f-info-brand">
                    &copy; 2026 StayScape Private Limited
                </div>

                <div className="f-info-links">
                    <Link to="/privacy">Privacy</Link>
                    <Link to="/terms">Terms</Link>
                </div>
            </div>
        </footer>
    );
}
