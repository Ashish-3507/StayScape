import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Flash from './components/Flash/Flash';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { FlashProvider } from './context/FlashContext';

function App() {
  return (
    <FlashProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <Flash />
            <main className="container flex-grow-1 mt-4">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </FlashProvider>
  );
}

export default App;
