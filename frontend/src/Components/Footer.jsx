export default function Footer() {
  return (
    <footer className="footer-glass text-gray-300 text-center py-6">
      <div className="container flex flex-col items-center justify-between align-center">
        <div className="mb-2">© {new Date().getFullYear()} ET Gaming. All rights reserved.</div>

        {/* Developer Credit */}
        <div className="flex items-center gap-2 text-sm text-gray-400 opacity-80 hover:opacity-100 transition-opacity">
          <span>Developed by</span>
          <a
            href="https://www.youtube.com/@thisisetgaming"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-bold text-yellow-500 hover:text-yellow-400 transition-colors"
          >
            {/* Minimal Logo (using a reliable asset or unicode if none) */}
            <span>Infinity Crown Web</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
