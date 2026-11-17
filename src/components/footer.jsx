import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 border-t border-gray-800 text-center">
      <div className="flex flex-wrap justify-center space-x-6 text-sm mb-4">
        
        <Link to="/premium" className="hover:text-white transition">Premium</Link>
        <Link to="/campaigns" className="hover:text-white transition">Campaigns</Link>
        <Link to="/blog" className="hover:text-white transition">Blog</Link>
        <Link to="/affiliate" className="hover:text-white transition">Affiliate Program</Link>
        <Link to="/faqs" className="hover:text-white transition">FAQs</Link>
       
      </div>
      <p className="text-xs text-gray-500">&copy; 2026 BookSales. All Rights Reserved.</p>
    </footer>
  );
}