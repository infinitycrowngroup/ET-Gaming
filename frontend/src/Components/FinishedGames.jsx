import { useState, useEffect } from "react";
import HologramCard from "./HologramCard";
import "./FinishedGames.css";

// 25 Completed Games Data with dummy images and links
const FINISHED_GAMES = [
  {
    id: 1,
    title: "A Way Out",
    completedDate: "12/01/2025",
    image: "/images/wayout.png",
    link: "https://youtube.com/playlist?list=PLHalQNocAOOrtZIgdW5vlzduZDPuVMqZk&si=pJOUarJ-Jb6NoBiT",
  },
  {
    id: 2,
    title: "Red Dead Redemption 1",
    completedDate: "09/03/2025",
    image: "/images/RDR.png",
    link: "https://youtube.com/playlist?list=PLHalQNocAOOpHEWattEpxPJSB8mhP94O7&si=EcM-JwpFtxw4xwJD",
  },
  {
    id: 3,
    title: "Mafia 1: Definitive Edition",
    completedDate: "14/03/2025",
    image: "/images/mafia1.png",
    link: "https://youtube.com/playlist?list=PLHalQNocAOOr3_nrRpUDwH5L0UAPJeH38&si=-ydzP_CPD7yzCS0p",
  },
  {
    id: 4,
    title: "Rise of the Tomb Raider",
    completedDate: "12/04/2025",
    image: "/images/RTR.png",
    link: "https://youtube.com/playlist?list=PLHalQNocAOOokWF9ipJnM-jygKpe293J4&si=wWtVuggyKhmNHZ39",
  },
  {
    id: 5,
    title: "Evil Within 1",
    completedDate: "17/04/2025",
    image: "/images/TEW1.png",
    link: "https://youtube.com/playlist?list=PLHalQNocAOOoKYKHpmlKve8DeidERNUaK&si=cmPxvZTubC24fRtq",
  },
  {
    id: 6,
    title: "Uncharted 4: A Thief's End",
    completedDate: "20/04/2025",
    image: "/images/uncharted ATE.png",
    link: "https://youtube.com/playlist?list=PLHalQNocAOOrT8A8l43VgaRv4bZUOSCuR&si=4hNyHvXebbXyy88G",
  },
  {
    id: 7,
    title: "Their Land",
    completedDate: "27/04/2025",
    image: "/images/their Land.png",
    link: "https://youtube.com/playlist?list=PLHalQNocAOOqQ5rjp2eX4-_nMQnVxBAM8&si=Lhi1G8jsQIxnlAut",
  },
  {
    id: 8,
    title: "Mafia 2: Definitive Edition",
    completedDate: "10/05/2025",
    image: "/images/Mafia 2 DE.png",
    link: "https://youtube.com/playlist?list=PLHalQNocAOOoBjKicvS5RKy5s20D_7_A1&si=9HDzzayRPsHToGk8",
  },
  {
    id: 9,
    title: "Watch Dogs 1",
    completedDate: "22/05/2025",
    image: "/images/WDogs.png",
    link: "https://youtube.com/playlist?list=PLHalQNocAOOpnb1iIfwOWJHGf55q4M4E4&si=9s12tPijewQkN08Q",
  },
  {
    id: 10,
    title: "Uncharted: The Lost Legacy",
    completedDate: "25/06/2025",
    image: "/images/Uncharted LL.png",
    link: "https://youtube.com/playlist?list=PLHalQNocAOOoKuR3a6Tp8SJbVnwy58E7L&si=EFCn5BgqIH43QA9f",
  },
  {
    id: 11,
    title: "Shadow of the Tomb Raider",
    completedDate: "04/06/2025",
    image: "/images/STR.png",
    link: "https://youtube.com/playlist?list=PLHalQNocAOOpYc9l2uoHB59Qk1p5gQPmT&si=gsQ8MESMcA3x23ez",
  },
  {
    id: 12,
    title: "Limbo",
    completedDate: "13/06/2025",
    image: "/images/limbo.png",
    link: "https://youtube.com/playlist?list=PLHalQNocAOOqvoEtdunOfCCBBCfIw5tOc&si=Y_vdYugRM0bkrk5k",
  },
  {
    id: 13,
    title: "Tomb Raider: Definitive Edition",
    completedDate: "20/07/2025",
    image: "/images/TRDE.png",
    link: "https://youtube.com/playlist?list=PLHalQNocAOOrYx672_lZ2IBZUnsZwxtJq&si=9SlSGz3A7l_3vKlG",
  },
  {
    id: 14,
    title: "Assassin's Creed Shadows",
    completedDate: "28/07/2025",
    image: "/images/ACS.jpg",
    link: "https://youtube.com/playlist?list=PLHalQNocAOOrR7lZr1MwhCYDoTeM6f5EU&si=ywQDLQLJnS2v7YuW",
  },
  {
    id: 15,
    title: "Watch Dogs 2",
    completedDate: "30/07/2025",
    image: "/images/WD2.png",
    link: "https://youtube.com/playlist?list=PLHalQNocAOOpLOZGPVMe03cQXkr8gbbNv&si=Kl77fAUXpoPyS2jW",
  },
  {
    id: 16,
    title: "Mafia 3",
    completedDate: "23/08/2025",
    image: "/images/mafia3.png",
    link: "https://youtube.com/playlist?list=PLHalQNocAOOp6jojYqpWmDUzuMWceTJtO&si=wqegE-sje1S4rW5q",
  },
  {
    id: 17,
    title: "Mafia: The Old Country",
    completedDate: "30/08/2025",
    image: "/images/MTOC.png",
    link: "https://youtube.com/playlist?list=PLHalQNocAOOoUpVQ5m3Pd8N9NBHAoAGi9&si=rYvSUzMf1F7K6XLr",
  },
  {
    id: 18,
    title: "Red Dead Redemption 2",
    completedDate: "08/09/2025",
    image: "https://wallpapercave.com/wp/wp3770534.jpg",
    link: "https://youtube.com/playlist?list=PLHalQNocAOOrIrvXMgurT3xGK4DTv6PpE&si=zltkQXrzD_P7vHKd",
  },
  {
    id: 19,
    title: "Far Cry 1",
    completedDate: "10/09/2025",
    image: "/images/Farcry.png",
    link: "https://youtube.com/playlist?list=PLHalQNocAOOppJqQVgfpEYETWDmcd49iu&si=MWQ_ik40yYGLDEpp",
  },
  {
    id: 20,
    title: "The Evil Within 2",
    completedDate: "03/10/2025",
    image: "/images/TEW2.png",
    link: "https://youtube.com/playlist?list=PLHalQNocAOOr_BOC8eRo51oYP5a90u-w4&si=4LEpFelJdK-WffHJ",
  },
  {
    id: 21,
    title: "Far Cry 4",
    completedDate: "17/10/2025",
    image: "/images/FC4.png",
    link: "https://youtube.com/playlist?list=PLHalQNocAOOqnMYaWlwc5RftasTtoWslr&si=3oc4JJ2ve-sUyaSb",
  },
  {
    id: 22,
    title: "Detroit: Become Human",
    completedDate: "24/10/2025",
    image: "/images/DBH.png",
    link: "https://youtube.com/playlist?list=PLHalQNocAOOp1BVpZKV3kjfKAiRkuVMNK&si=18eAEEoAVjc-A8p5",
  },
  {
    id: 23,
    title: "The Walking Dead",
    completedDate: "02/11/2025",
    image: "/images/TWDead.png",
    link: "https://youtube.com/playlist?list=PLHalQNocAOOrrIymfHouNieYVMKmYO2uN&si=-SGVvoaD9qO43OFH",
  },
  {
    id: 24,
    title: "Sifu",
    completedDate: "11/11/2025",
    image: "/images/sifu.png",
    link: "https://youtube.com/playlist?list=PLHalQNocAOOreHOnhkxF_Poidd3wWuF_-&si=cfrk17Y8ltpW51P4",
  },
];

export default function FinishedGames() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="finished-games-section w-full px-16 pt-12 pb-0">
      {/* Section Title */}
      <div className={`max-w-6xl mx-auto mb-16 transition-all duration-700 flex flex-col items-center justify-center text-center ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h2 className="w-full text-5xl md:text-6xl font-black mb-4 hologram-title bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 bg-clip-text text-transparent">
          Finished Games
        </h2>

        <p className="text-center text-gray-300 max-w-2xl mx-auto text-lg">
          A collection of epic adventures, thrilling experiences, and unforgettable journeys completed so far.
          Each hologram represents a milestone in our gaming legacy. Click any card to explore!
        </p>
      </div>

      {/* Games Grid */}
      <div className="games-grid">
        {FINISHED_GAMES.map((game, index) => (
          <div
            key={game.id}
            className="game-card-wrapper"
            style={{
              animation: `fadeInUp 0.6s ease-out forwards`,
              animationDelay: `${index * 0.05}s`,
            }}
          >
            <HologramCard game={game} />
          </div>
        ))}
      </div>



      <style jsx="true">{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
