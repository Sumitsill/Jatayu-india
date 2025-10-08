import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { supabase } from '../lib/supabase'; // ✅ added

interface NavItem {
  label: string;
  href: string;
}

interface PillNavProps {
  logo?: string;
  logoAlt?: string;
  items: NavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
}

export default function PillNav({
  logo,
  logoAlt = 'Logo',
  items,
  className = '',
  ease = 'power2.easeOut',
  baseColor = '#ffffff',
  pillColor = '#3b82f6',
  hoveredPillTextColor = '#ffffff',
  pillTextColor = '#000000',
}: PillNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const pillRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [session, setSession] = useState<any>(null); // ✅ added state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ✅ Check login session and listen to auth changes
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // ✅ If user logged in → replace Login with Dashboard
  const updatedItems = items.map((item) => {
    if (item.label === 'Login' && session) {
      return { label: 'Dashboard', href: '/dashboard' };
    }
    return item;
  });

  const activeIndex = updatedItems.findIndex((item) => item.href === location.pathname);

  useEffect(() => {
    const targetIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
    const targetElement = navRefs.current[targetIndex];

    if (targetElement && pillRef.current) {
      gsap.to(pillRef.current, {
        x: targetElement.offsetLeft,
        width: targetElement.offsetWidth,
        duration: 0.3,
        ease: ease,
      });
    }
  }, [hoveredIndex, activeIndex, ease]);

  // ✅ Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20"> {/* Modified justify-center to justify-between */}
          {logo && (
            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt={logoAlt} className="h-10 w-auto" />
            </Link>
          )}

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none focus:text-gray-300"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

          {/* Navigation Pills */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md rounded-full px-2 py-2 border border-white/10 mx-auto"> {/* Hidden on mobile, flex on desktop, centered */}
            <div
              ref={pillRef}
              className="absolute h-10 rounded-full transition-all duration-300"
              style={{
                backgroundColor: pillColor,
                zIndex: 0,
              }}
            />
            {updatedItems.map((item, index) => (
              <Link
                key={item.href}
                to={item.href}
                ref={(el) => (navRefs.current[index] = el)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative z-10 px-6 py-2 text-sm font-medium transition-colors duration-300 whitespace-nowrap"
                style={{
                  color:
                    hoveredIndex === index || activeIndex === index
                      ? hoveredPillTextColor
                      : baseColor,
                }}
              >
                {item.label}
              </Link>
            ))}

            {/* ✅ Show Logout button only when logged in */}
            {session && (
              <button
                onClick={handleLogout}
                className="relative z-10 px-6 py-2 text-sm font-medium transition-colors duration-300 whitespace-nowrap text-white hover:text-red-400"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="bg-white/5 backdrop-blur-md py-2 border-b border-white/10">
          {updatedItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="block px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)} // Close menu after click
            >
              {item.label}
            </Link>
          ))}
          {/* ✅ Show Logout button only when logged in */}
          {session && (
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false); // Close menu after logout
              }}
              className="block px-4 py-2 text-sm font-medium text-white hover:bg-red-500 hover:text-white"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}