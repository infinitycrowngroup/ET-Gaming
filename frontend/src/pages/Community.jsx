import "./Community.css";


// Community testimonials
const TESTIMONIALS = [
  { name: "@aquayt525", quote: "imagination and reality blend so seamlessly. The way  into every scene, every character makes it feel. Your love for gaming and storytelling shines through with every frame you create, making each episode not just something to watch, but something to feel. You welcome us like old friends, giving us a place where we can escape, laugh, hurt, and grow together. Thank you for building a universe where our hearts can wander freely—we’ll always be here, cheering for you. ❤️✨", avatar: "A" },
  { name: "@Madman_37", quote: "Anna, the way you share stories, the emotions you put in every word… it feels like watching a movie, not just a game. You make us feel connected, like a family. Keep going, we’ll always stand by you. ❤️🎮", avatar: "M" },
  { name: "@anukriti3769", quote: "Where the stories come alive, each episode is an experience that's almost like I've entered the game and have felt every emotion with the characters. Your passion for gaming and telling stories is painted on every character you bring to life. Your narration and character emotions ignite the love which you show to each game. A good friend always makes you feel welcome, and that's the vibe I get whenever I watch your videos. Thank you for creating a world that lets us experience the rawness of life away from reality. We'll always support you❤", avatar: "A" },
];

// Social platforms
const SOCIAL_PLATFORMS = [
  { name: "Discord", desc: "Chat, voice calls, and real-time gaming sessions", icon: "💬", link: "https://discord.com/invite/rWdWBxqDWx", color: "from-indigo-600 to-blue-500" },
  { name: "Instagram", desc: "Gaming clips, behind-the-scenes, and community highlights", icon: "📸", link: "https://www.instagram.com/etgaming__/", color: "from-pink-600 to-purple-500" },
  { name: "WhatsApp", desc: "Quick updates, event notifications, and group chats", icon: "💚", link: "https://www.whatsapp.com/channel/0029Vap1go0HVvTTHVQRZV3e", color: "from-green-600 to-emerald-500" },
];

// Featured games (simplified: only name + youtube link; icon for visual)
const FEATURED_GAMES = [
  { name: "SuperSus", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcoL7knuS0-l8LkWS8Fi5m7puA4cOK2PuKkg&s", youtube: "https://youtube.com/playlist?list=PLHalQNocAOOqEqFPpJ8wT5dDX_BgoxUig&si=KrWPB3a2mip7N3SJ" },
  { name: "It Takes Two", img: "https://variety.com/wp-content/uploads/2022/01/It-Takes-Two-e1643647274115.jpg", youtube: "https://youtube.com/playlist?list=PLHalQNocAOOq_yxIUTaizirmFqVbZoVN6&si=mc_Vh4ht6aME1M4b" },
  { name: "Sons of Forest", img: "https://5.imimg.com/data5/SELLER/Default/2023/10/355908099/AW/IQ/AL/110396315/screenshot-2023-10-26-192931.png", youtube: "https://youtube.com/playlist?list=PLHalQNocAOOr3e7zP3E7yHavsd3XUUEF2&si=eeHnsUNVx2fKlzZO" },
  { name: "Valorant", img: "https://wallpapers.com/images/hd/black-red-valorant-champ-reyna-promo-tvihg2t8rhftt4ur.jpg", youtube: "https://youtube.com/playlist?list=PLHalQNocAOOptuxgcsNyqiJUs9Zn4s4mL&si=fNw4oRzLPhF4t6qq" },
  { name: "Stumble Guys", img: "https://m.media-amazon.com/images/I/71alG1LUQaL.png", youtube: "https://youtube.com/playlist?list=PLHalQNocAOOojQWgQliadKLjmSSXYu0AM&si=NZcJrT1EZjiAAwWW" },
  { name: "Marvel Rivals", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOj2ibAeTavCiE51gD_OwPun7wBgLh7iL4QUQ1JHa8qhP3iCmWvQC28X6TWYhFwobGJdg&usqp=CAU", youtube: "https://youtube.com/playlist?list=PLHalQNocAOOpHY_ECNw3VA1bJ8TDxxv2u&si=NsWS2pEE1SomvV7p" },
];

export default function Community() {
  return (
    <div className="min-h-screen text-white pb-0">
      {/* Hero Section */}
      <section className="community-hero py-20 px-6 text-center section-separated variant-community-hero">
        <h1 className="neon-title text-5xl md:text-6xl font-black mb-4">
          Join the ET Gaming Community
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
          Connect with fellow gamers, share your gameplay, and be part of our growing gaming family.
          We're a welcoming space for gamers of all skill levels to hang out, chat, and game together.
        </p>
      </section>

      {/* Social Platforms Section */}
      <section className="section-separated variant-community-social py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-12 text-center neon-title">Connect With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SOCIAL_PLATFORMS.map((platform, i) => (
              <a
                key={i}
                href={platform.link}
                className={`glass p-8 rounded-xl hover:scale-105 transition bg-gradient-to-br ${platform.color} bg-opacity-10`}
                style={{boxShadow: '0 8px 24px rgba(0,0,0,0.3)'}}
              >
                <div className="text-5xl mb-4">{platform.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{platform.name}</h3>
                <p className="text-gray-300 text-sm">{platform.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="section-separated variant-community-games py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-12 text-center neon-title">Featured Games</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
            {FEATURED_GAMES.map((game, i) => (
              <a
                key={i}
                href={game.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="game-square-card group"
              >
                <div className="game-square-image">
                  <img src={game.img} alt={`${game.name} logo`} />
                </div>
                <h3 className="game-square-title">{game.name}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-separated variant-community-testimonials py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-12 text-center neon-title">What Our Members Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, i) => (
              <div
                key={i}
                className="glass p-6 rounded-xl hover:scale-105 transition"
                style={{boxShadow: '0 8px 32px rgba(0,0,0,0.3)'}}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <span className="font-bold text-white">{testimonial.name}</span>
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-separated variant-community-cta py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-6 neon-title">Ready to Join?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Click the link below to hop into our Discord server. 
            Say hi in the general chat and introduce yourself. We can't wait to meet you!
          </p>
          <a href="https://discord.com/invite/rWdWBxqDWx" className="inline-block px-12 py-4 rounded-lg bg-gradient-to-r from-red-600 to-yellow-400 text-black font-bold text-lg hover:scale-110 transition">
            Enter Discord Server
          </a>
        </div>
      </section>
    </div>
  );
}
