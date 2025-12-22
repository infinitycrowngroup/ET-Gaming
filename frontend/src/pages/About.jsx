import { useEffect, useState } from "react";
import io from 'socket.io-client';
import FinishedGames from "../Components/FinishedGames";
import PCSpecs from "../Components/PCSpecs";
import "./About.css";

const TIMELINE_EVENTS = [
  {
    year: 2021,
    title: "Channel Launch",
    desc: "ET Gaming officially began its journey with a passion for gaming and building a strong community.",
    icon: "🎮"
  },
  {
    year: 2022,
    title: "First 100 Subscribers",
    desc: "Hit the first major milestone with 100 amazing supporters who believed in the content.",
    icon: "🚀"
  },
  {
    year: 2022,
    title: "Highest Viewed Video – 3878 Views",
    desc: "One of the gameplay videos went viral and crossed 3878 views, marking a big achievement.",
    icon: "🔥"
  },
  {
    year: 2022,
    title: "Highest Viewed Live – 1536 Views",
    desc: "Live stream achieved a peak of 1536 views, showing strong audience engagement.",
    icon: "🎥"
  },
  {
    year: 2023,
    title: "Highest Viewed Shorts – 3244 Views",
    desc: "A short video gained massive attention and reached 3244 views, boosting channel growth.",
    icon: "📈"
  },

  {
    year: 2024,
    title: "PC Build Upgrade",
    desc: "Upgraded to a new custom-built PC to deliver better streams, videos, and overall performance.",
    icon: "💻"
  },
  {
    year: 2025,
    title: "First 500 Subscribers",
    desc: "Achieved 500 subscribers with consistent content and community support.",
    icon: "⭐"
  },
  {
    year: 2025,
    title: "First 1000 Subscribers",
    desc: "Achieved 1000 subscribers with consistent content and community support.",
    icon: "✨"
  }

];

// Fallback / Initial Schema
const INITIAL_STATS = [
  { key: "subscribers", label: "Subscribers", value: "-", color: "from-red-600 to-red-400" },
  { key: "total_views", label: "Total Views", value: "-", color: "from-yellow-600 to-yellow-400" },
  { key: "community_members", label: "Community Members", value: "100", color: "from-red-500 to-yellow-500" },
  { key: "videos_published", label: "Videos Published", value: "-", color: "from-red-400 to-yellow-400" },
];

export default function About() {
  const [stats, setStats] = useState(INITIAL_STATS);

  useEffect(() => {
    // 1. Prevent multiple initializations in Strict Mode
    // Check if socket already exists or if we should skip
    let socket;

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "https://et-gaming.onrender.com/";
      socket = io(apiUrl, {
        // Remove 'transports' to allow automatic upgrade from polling (fixes ERR_CONNECTION_REFUSED)
        withCredentials: true,
        reconnectionAttempts: 3, // Limit retries to prevent endless loops
        timeout: 5000,
        autoConnect: true,
      });

      // 2. Guarded Connection Logic
      socket.on("connect", () => {
        // Connected
      });

      socket.on("disconnect", () => {
        // Silent handling - reset to placeholder
        resetStats();
      });

      socket.on("connect_error", (err) => {
        // Silent failure - do not spam console with stack traces
        // Just reset stats and stop if necessary
        resetStats();
      });

      // 3. Unified Data Handler
      const handleUpdate = (data) => {
        setStats((prevStats) =>
          prevStats.map((stat) => ({
            ...stat,
            value:
              data?.[stat.key] !== undefined
                ? Number(data[stat.key]).toLocaleString()
                : stat.value,
          }))
        );
      };

      socket.on("stats_update", handleUpdate);
      socket.on("metrics_update", handleUpdate);

    } catch (e) {
      // Catch synchronous initialization errors
      resetStats();
    }

    const resetStats = () => {
      setStats((prevStats) => prevStats.map((s) => ({ ...s, value: "-" })));
    };

    // 4. Cleanup
    return () => {
      if (socket) {
        socket.disconnect();
        socket.off(); // Remove listeners
      }
    };
  }, []);


  return (
    <div className="min-h-screen text-white pb-0">
      {/* Hero Section */}
      <section className="about-hero py-20 px-6 text-center section-separated variant-hero">
        <h1 className="neon-title text-5xl font-black mb-4">About ET Gaming</h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
          This channel is created by a group of friends who love gaming and having fun together!
          Watch our live streams, enjoy our videos, and stay tuned for more awesome moments and laughter!
        </p>
      </section>

      {/* Stats Section */}
      <section className="section-separated variant-stats py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-12 text-center neon-title">Our Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`glass p-6 rounded-2xl text-center transform hover:scale-105 transition`}
                style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}
              >
                <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-separated variant-timeline py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-16 text-center neon-title">Our Journey</h2>
          <div className="timeline">
            {TIMELINE_EVENTS.map((event, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-dot"></div>
                  <div className="timeline-line"></div>
                </div>
                <div className={`timeline-content glass p-6 rounded-xl ${i % 2 === 0 ? 'text-left' : 'text-right'}`}>
                  <div className="text-3xl mb-2">{event.icon}</div>
                  <div className="text-2xl font-bold text-yellow-400">{event.year}</div>
                  <h3 className="text-xl font-bold neon-title mb-2">{event.title}</h3>
                  <p className="text-gray-400">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Finished Games Section */}
      <div className="section-separated variant-finishedgames pt-12 pb-0">
        <FinishedGames />
      </div>

      {/* PC Specs Section */}
      <div className="section-separated variant-rig pt-8 pb-0">
        <PCSpecs />
      </div>

    </div>
  );
}
