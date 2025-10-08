import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PillNav from './components/PillNav';
import Home from './pages/Home';
import Products from './pages/Products';
import FAQ from './pages/FAQ';
import Claims from './pages/Claims';
import ClaimForm from './pages/ClaimForm';
import Enquiry from './pages/Enquiry';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Terms from './pages/Terms';

function App() {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Claims', href: '/claims' },
    { label: 'Enquiry', href: '/enquiry' },
    { label: 'Login', href: '/login' },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <PillNav
          items={navItems}
          baseColor="#ffffff"
          pillColor="#0ea5e9"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#000000"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/claims" element={<Claims />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/claimform" element={<ClaimForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
