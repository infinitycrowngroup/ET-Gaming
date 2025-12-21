import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Lock } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check admin status on mount and periodically
  useEffect(() => {
    const check = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setIsAdmin(false);
        return;
      }

      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
        const res = await fetch(`${apiUrl}/admin/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: "check_if_admin_exists" }) // Placeholder logic
        });
        if (res.ok) {
          const body = await res.json();
          setIsAdmin(!!body.valid);
        } else {
          setIsAdmin(false);
          localStorage.removeItem("adminToken");
        }
      } catch (e) {
        setIsAdmin(false);
      }
    };

    check();
    const checkInterval = setInterval(check, 5000); // Re-check every 5 seconds

    // Listen for storage changes (login/logout from other tabs)
    const handleStorageChange = () => {
      check();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      clearInterval(checkInterval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <nav className="site-nav text-white sticky top-0 z-50 py-3">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl brand site-title font-extrabold bg-clip-text text-transparent neon-title">
          ET Gaming - தமிழ்
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-lg font-medium">
          {[
            { to: "/", label: "Home", color: "green" },
            { to: "/about", label: "About", color: "blue" },
            { to: "/community", label: "Community", color: "red" },
            { to: "/contact", label: "Contact", color: "yellow" },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.to}
              className="relative group transition duration-300"
            >
              <span className={`hover:text-${item.color}-400 transition-colors duration-300`}>
                {item.label}
              </span>
              <span
                style={{
                  bottom: '-4px',
                  left: 0,
                  height: '2px',
                  width: '0',
                  display: 'block',
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
                }}
                className="group-hover:w-full transition-all duration-300"
              ></span>
            </Link>
          ))}
          {/* Admin Link */}
          {isAdmin && (
            <Link
              to="/admin"
              className="relative group transition duration-300 flex items-center gap-1 text-yellow-400 font-bold"
            >
              <Lock size={18} />
              Admin
              <span
                style={{
                  bottom: '-4px',
                  left: 0,
                  height: '2px',
                  width: '0',
                  display: 'block',
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
                }}
                className="group-hover:w-full transition-all duration-300"
              ></span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4 text-center text-lg font-medium">
          <Link to="/" onClick={() => setIsOpen(false)} className="block w-full hover:text-green-400">Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block w-full hover:text-blue-400">About</Link>
          <Link to="/community" onClick={() => setIsOpen(false)} className="block w-full hover:text-yellow-400">Community</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block w-full hover:text-yellow-400">Contact</Link>

          <Link to="/wallpapers" onClick={() => setIsOpen(false)} className="block hover:text-yellow-400">Wallpapers</Link>
          {isAdmin && (
            <Link to="/admin" onClick={() => setIsOpen(false)} className="block hover:text-yellow-400 font-bold text-yellow-400">
              🔒 Admin Panel
            </Link>
          )}
          <button className="mt-4 w-full px-5 py-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold shadow-lg hover:scale-105 transition duration-300">
            Join Now
          </button>
        </div>
      )}
    </nav>
  );
}
