import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8  font-cairo">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo + Description */}
        <div>
          <h2 className="text-3xl font-bold mb-4">نصار للعطور</h2>

          <p className="text-gray-400 leading-relaxed">
            متجر متخصص في بيع أفخم العطور الرجالي والحريمي بأفضل الأسعار وجودة
            عالية تدوم طوال اليوم.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">روابط سريعة</h3>

          <ul className="space-y-3 text-gray-300">
            <li>
              <Link href="/" className="hover:text-yellow-400 transition">
                الرئيسية
              </Link>
            </li>

            <li>
              <Link
                href="/perfumes"
                className="hover:text-yellow-400 transition"
              >
                العطور
              </Link>
            </li>

            <li>
              <Link href="/offers" className="hover:text-yellow-400 transition">
                العروض
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-yellow-400 transition">
                الأخبار
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className="hover:text-yellow-400 transition"
              >
                تواصل معنا
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold mb-4">تواصل معنا</h3>

          <a className="text-gray-400 mb-2" href="tel:+201004458695">
            📞 +201004458695
          </a>

          <p className="text-gray-400 mb-2">
            📍 قرية الإيمان ط -مركز بدر -البحيرة - مصر
          </p>

          <a
            className="text-gray-400 mt-2 block"
            href="mailto:mailto:omarnassar2002z@gmail.com"
          >
            ✉️ omarnassar2002z@gmail.com
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">
        © {new Date().getFullYear()} نصار للعطور - جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
