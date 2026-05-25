import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen bg-[#f5f5f7] flex flex-col font-almarai"
      dir="rtl"
    >
    

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-6 pt-6 pb-0">
        {/* 404 Number */}
        <h1 className="text-[110px] sm:text-[130px] font-black text-[#1a1a2e] leading-none tracking-tighter select-none">
          404
        </h1>

        {/* Title */}
        <h2 className="text-3xl font-bold text-[#1a1a2e] mt-2 mb-3">
          الصفحة غير موجودة
        </h2>

        {/* Subtitle */}
        <p className="text-base text-gray-500 text-center leading-8">
          عذراً، الصفحة التي تبحث عنها غير موجودة
          <br />
          أو ربما تم نقلها أو حذفها.
        </p>

        {/* Illustration */}
        <div className="w-full max-w-[500px] mt-4">
          <svg
            viewBox="0 0 500 300"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            {/* Clouds */}
            <ellipse
              cx="80"
              cy="60"
              rx="55"
              ry="22"
              fill="#dde8f0"
              opacity="0.7"
            />
            <ellipse
              cx="110"
              cy="50"
              rx="45"
              ry="20"
              fill="#e8eff5"
              opacity="0.8"
            />
            <ellipse
              cx="390"
              cy="55"
              rx="50"
              ry="20"
              fill="#dde8f0"
              opacity="0.7"
            />
            <ellipse
              cx="420"
              cy="45"
              rx="40"
              ry="18"
              fill="#e8eff5"
              opacity="0.8"
            />

            {/* Ground hills */}
            <ellipse
              cx="250"
              cy="290"
              rx="280"
              ry="50"
              fill="#dde8ef"
              opacity="0.5"
            />
            <ellipse cx="90" cy="270" rx="120" ry="35" fill="#ccdae6" />
            <ellipse cx="420" cy="268" rx="120" ry="35" fill="#ccdae6" />

            {/* Dotted path */}
            <path
              d="M200 260 Q250 240 300 260"
              stroke="#bbb"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="6,4"
            />

            {/* Left green plant */}
            <line
              x1="70"
              y1="240"
              x2="70"
              y2="200"
              stroke="#5a8a6a"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <ellipse
              cx="55"
              cy="210"
              rx="14"
              ry="22"
              fill="#6aab7a"
              transform="rotate(-20 55 210)"
            />
            <ellipse
              cx="85"
              cy="205"
              rx="12"
              ry="20"
              fill="#5a9a6a"
              transform="rotate(15 85 205)"
            />
            <ellipse
              cx="70"
              cy="198"
              rx="10"
              ry="18"
              fill="#7abb8a"
              transform="rotate(-5 70 198)"
            />

            {/* Right blue plant */}
            <line
              x1="430"
              y1="238"
              x2="430"
              y2="205"
              stroke="#3a5aaa"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <ellipse
              cx="418"
              cy="215"
              rx="11"
              ry="18"
              fill="#4a6abb"
              transform="rotate(-15 418 215)"
            />
            <ellipse
              cx="442"
              cy="212"
              rx="10"
              ry="17"
              fill="#3a5aaa"
              transform="rotate(20 442 212)"
            />
            <ellipse
              cx="430"
              cy="203"
              rx="9"
              ry="16"
              fill="#5a7acc"
              transform="rotate(-5 430 203)"
            />

            {/* Sign post */}
            <rect x="228" y="185" width="8" height="80" rx="3" fill="#555" />
            {/* Sign arrow */}
            <polygon
              points="165,148 268,148 293,168 268,188 165,188"
              fill="#4361ee"
            />
            <text
              x="193"
              y="165"
              fontFamily="Arial"
              fontSize="11"
              fill="#a0b4ff"
              fontWeight="700"
            >
              x x
            </text>
            <line
              x1="193"
              y1="170"
              x2="223"
              y2="170"
              stroke="#a0b4ff"
              strokeWidth="1.5"
            />
            <text
              x="180"
              y="183"
              fontFamily="Arial"
              fontSize="11"
              fill="#fff"
              fontWeight="600"
            >
              الصفحة غير موجودة
            </text>

            {/* Person legs */}
            <rect x="330" y="220" width="14" height="40" rx="6" fill="#222" />
            <rect x="350" y="220" width="14" height="40" rx="6" fill="#222" />
            {/* Shoes */}
            <ellipse cx="337" cy="260" rx="11" ry="6" fill="#111" />
            <ellipse cx="357" cy="260" rx="11" ry="6" fill="#111" />
            {/* Torso */}
            <rect
              x="320"
              y="160"
              width="55"
              height="65"
              rx="14"
              fill="#4361ee"
            />
            {/* Left arm raised */}
            <path
              d="M320 175 Q295 160 300 145"
              stroke="#4361ee"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
            />
            {/* Right arm down */}
            <path
              d="M375 175 Q395 185 390 200"
              stroke="#4361ee"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
            />
            {/* Head */}
            <ellipse cx="347" cy="145" rx="28" ry="30" fill="#f5c5a3" />
            {/* Hair */}
            <ellipse cx="347" cy="118" rx="28" ry="14" fill="#222" />
            {/* Hand on head */}
            <ellipse cx="303" cy="142" rx="10" ry="8" fill="#f5c5a3" />

            {/* Question mark */}
            <text
              x="392"
              y="136"
              fontFamily="Georgia, serif"
              fontSize="38"
              fill="#333"
              fontWeight="700"
            >
              ?
            </text>
          </svg>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link
            href="/"
            className="flex items-center gap-2 bg-[#4361ee] hover:bg-[#3451d1] text-white rounded-xl px-7 py-3.5 text-sm font-semibold transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              viewBox="0 0 24 24"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            العودة إلى الصفحة الرئيسية
          </Link>

         
        </div>
      </main>

  
    </div>
  );
}
