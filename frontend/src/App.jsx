import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import "./App.css";
import "./index.css";

// Lazy Load Pages for Performance
const About = lazy(() => import("./Pages/About"));
const Community = lazy(() => import("./Pages/Community"));
const Contact = lazy(() => import("./Pages/Contact"));

// Simple Loading Fallback
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen text-yellow-400">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
  </div>
);

export default function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen flex flex-col w-full app-inner">
          <Navbar />
          <div className="flex-grow w-full">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/community" element={<Community />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  );
}