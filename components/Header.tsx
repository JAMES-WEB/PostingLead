import Link from 'next/link';
import { Menu, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      {/* Top Bar / Ticker */}
      <div className="bg-blue-900 text-white text-xs py-1 px-4 flex justify-between items-center">
        <div className="flex gap-4 overflow-hidden whitespace-nowrap">
          <span className="font-bold text-yellow-400">LATEST NEWS</span>
          <span>KLCI opens higher on renewed buying interest</span>
          <span>|</span>
          <span>Ringgit opens slightly lower against US Dollar</span>
        </div>
        <div className="flex gap-2">
          <span>EN</span>
          <span>BM</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-blue-800 tracking-tighter">
          BERNAMA<span className="text-red-600">Biz</span>
        </Link>
        <div className="hidden md:block">
          <img src="https://placehold.co/728x90?text=Advertisement+Banner" alt="Ad" className="h-16 w-auto" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-100 border-t border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-6 text-sm font-medium text-gray-700 overflow-x-auto">
              <Link href="/" className="hover:text-blue-600 whitespace-nowrap">HOME</Link>
              <Link href="#" className="hover:text-blue-600 whitespace-nowrap">MARKET</Link>
              <Link href="#" className="hover:text-blue-600 whitespace-nowrap">ECONOMY</Link>
              <Link href="#" className="hover:text-blue-600 whitespace-nowrap">CORPORATE</Link>
              <Link href="#" className="hover:text-blue-600 whitespace-nowrap">CAREBIZ</Link>
              <Link href="/post" className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 whitespace-nowrap">POST AD / NEWS</Link>
            </div>
            <div className="flex items-center text-gray-500">
              <Search className="w-5 h-5 cursor-pointer" />
              <Menu className="w-5 h-5 ml-4 md:hidden cursor-pointer" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
