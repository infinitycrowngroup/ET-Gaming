import { ChevronDown } from "lucide-react";
import About from "./About";
import Community from "./Community";
import Contact from "./Contact";

export default function Home() {
  return (
    <div className="home-container">
      {/* Home / Hero Section */}
      <div id="home">
        <section className="home-hero">
          <div className="hero-inner container">
            <h1 className="home-title neon-title">
              <span className="home-line home-line-top">Welcome to the world</span>
              <span className="home-line home-line-center">Of</span>
              <span className="home-line home-line-brand">ET Gaming - தமிழ்</span>
            </h1>

            <div className="home-logo mx-auto mb-6">
              <a href="https://www.youtube.com/@thisisetgaming" target="_blank" rel="noreferrer" aria-label="ET Gaming YouTube channel">
                <img
                  src="/assets/Screenshot 2025-11-17 012413.png"
                  alt="ET Gaming Logo"
                  style={{ width: '100%', height: '100%', cursor: 'pointer' }}
                  loading="eager"
                  fetchPriority="high"
                  width="500"
                  height="500"
                />
              </a>
            </div>
          </div>
          {/* Scroll Down Indicator */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce z-10">
            <button
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="text-white opacity-70 hover:opacity-100 transition-opacity focus:outline-none"
              aria-label="Scroll down"
            >
              <ChevronDown size={40} className="drop-shadow-lg" />
            </button>
          </div>
        </section>
      </div>

      {/* About Section */}
      <div id="about">
        <About />
      </div>

      {/* Community Section */}
      <div id="community">
        <Community />
      </div>

      {/* Contact Section */}
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
}
