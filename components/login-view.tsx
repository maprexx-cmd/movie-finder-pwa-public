"use client"

interface LoginViewProps {
  onModeSelect: (isPremium: boolean) => void
}

export function LoginView({ onModeSelect }: LoginViewProps) {
  return (
    <div className="h-[100dvh] elegant-stripes bg-[#000000] relative overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <img src="/background.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
      </div>

      {/* Radial gradient circles for depth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      ></div>

      <div className="relative flex flex-col items-center justify-center p-4 h-full">
        <div className="max-w-md w-full space-y-4 animate-fade-in">
          <div className="text-center">
            <div className="mb-3 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/30 to-orange-500/30 blur-2xl animate-pulse-glow"></div>
                <img
                  src="/icon-512-v6.png"
                  alt="Movie Finder"
                  className="relative w-20 h-20 rounded-2xl"
                  style={{
                    filter: "drop-shadow(0 15px 35px rgba(251, 191, 36, 0.4)) brightness(1.1)",
                  }}
                />
              </div>
            </div>
            <div className="relative mb-2">
              {/* Film strip background icon */}
              <svg
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 opacity-10"
                viewBox="0 0 200 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="10" y="20" width="180" height="60" fill="url(#filmGradient)" rx="4" />
                <rect x="10" y="20" width="12" height="10" fill="#000" />
                <rect x="10" y="34" width="12" height="10" fill="#000" />
                <rect x="10" y="48" width="12" height="10" fill="#000" />
                <rect x="10" y="62" width="12" height="10" fill="#000" />
                <rect x="178" y="20" width="12" height="10" fill="#000" />
                <rect x="178" y="34" width="12" height="10" fill="#000" />
                <rect x="178" y="48" width="12" height="10" fill="#000" />
                <rect x="178" y="62" width="12" height="10" fill="#000" />
                <line x1="26" y1="25" x2="26" y2="75" stroke="#000" strokeWidth="1" />
                <line x1="174" y1="25" x2="174" y2="75" stroke="#000" strokeWidth="1" />
                <defs>
                  <linearGradient id="filmGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#f97316" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#eab308" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Title text */}
              <h1 className="relative text-4xl font-black text-white tracking-[0.2em] uppercase mb-1 drop-shadow-2xl">
                MOVIE
              </h1>
              <h2 className="relative text-3xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent tracking-[0.25em] uppercase mb-2">
                FINDER
              </h2>
            </div>
            <p className="text-gray-400 text-xs tracking-[0.2em] uppercase font-semibold">Scegli La Tua Modalità</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => onModeSelect(true)}
              className="group w-full relative bg-gradient-to-r from-amber-500 via-yellow-500 to-yellow-400 hover:from-amber-400 hover:via-yellow-400 hover:to-yellow-300 text-black font-black py-3 px-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(251,191,36,0.4)] overflow-hidden"
            >
              <span className="relative z-10 tracking-wider text-sm uppercase drop-shadow-md">🚀 Accedi • Premium</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/10"></div>
            </button>

            <button
              onClick={() => onModeSelect(false)}
              className="group w-full relative bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-500 hover:from-cyan-500 hover:via-cyan-400 hover:to-blue-400 text-white border-2 border-cyan-400/30 font-black py-3 px-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(6,182,212,0.4)] overflow-hidden"
            >
              <span className="relative z-10 tracking-wider text-sm uppercase drop-shadow-md">🎬 Ospite • Basic</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>

          <div className="space-y-3 pt-2">
            <div className="bg-white/5 backdrop-blur-xl border-2 border-yellow-500/30 rounded-2xl p-4 shadow-[0_16px_56px_rgba(234,179,8,0.4)]">
              <h3 className="text-yellow-400 font-black mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                <span className="text-lg">⭐</span> Premium
              </h3>
              <ul className="text-gray-300 text-xs space-y-1.5 leading-relaxed font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-0.5">•</span>
                  <span>Ricerca illimitata senza restrizioni</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-0.5">•</span>
                  <span>Filtri avanzati di scelta tra 10 generi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-0.5">•</span>
                  <span>Scegli le tue piattaforme streaming preferite</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-0.5">•</span>
                  <span>Accesso alle classifiche mensili</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border-2 border-cyan-400/30 rounded-2xl p-4 shadow-[0_16px_56px_rgba(6,182,212,0.4)]">
              <h3 className="text-cyan-400 font-black mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                <span className="text-lg">🎬</span> Basic
              </h3>
              <ul className="text-gray-400 text-xs space-y-1.5 leading-relaxed font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>Scelta tra 4 generi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>Risultato: 3 film</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>1 possibilità di scelta al giorno</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-1 text-center">
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-400 text-xs uppercase tracking-widest transition-colors font-semibold"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
