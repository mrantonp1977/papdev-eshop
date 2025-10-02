import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="rounded-lg border-t-2 border-orange-300 dark:border-orange-700/50 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 mt-[90px]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              ShopItAll
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              High-quality products designed to make your life better.
            </p>
          </div>

          {/* Support (two columns) */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Support
            </h3>
            <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-primary">
                  Shipping
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Stay Updated
            </h3>
            <form className="mt-2 flex">
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-l-md px-2 py-1 text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-primary text-white px-3 py-1 text-sm rounded-r-md hover:bg-primary/80 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-6 pt-4 border-t border-gray-300 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center text-xs">
          <p className="text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} PapaioannouDev. All rights
            reserved.
          </p>

          <div className="flex items-center space-x-4 mt-3 md:mt-0">
            <Link href="#" className="hover:text-primary transition">
              <Facebook size={18} />
            </Link>
            <Link href="#" className="hover:text-primary transition">
              <Instagram size={18} />
            </Link>
            <Link href="#" className="hover:text-primary transition">
              <Twitter size={18} />
            </Link>
            <Link href="#" className="hover:text-primary transition">
              <Youtube size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
