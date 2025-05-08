import React from 'react';
import { Mail, History } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full max-w-6xl flex justify-between items-center py-4">
      <div className="flex items-center">
        <div className="bg-purple-600 p-2 rounded-lg shadow-md mr-3">
          <Mail className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white">Lead Reply AI</h1>
      </div>
      
      <button className="bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg flex items-center transition-colors duration-200">
        <History className="w-4 h-4 mr-2" />
        <span>View History</span>
      </button>
    </header>
  );
};

export default Header;