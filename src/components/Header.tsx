import React from 'react';
import { History } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="w-full max-w-6xl flex justify-between items-center py-4">
      <div className="flex items-center">
        <Link to="/">
          <img
            src="/lead-reply-ai-logo.png"
            alt="Lead Reply AI"
            className="h-10"
          />
        </Link>
      </div>

      <button className="bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg flex items-center transition-colors duration-200">
        <History className="w-4 h-4 mr-2" />
        <span>View History</span>
      </button>
    </header>
  );
};

export default Header;