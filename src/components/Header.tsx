import React, { useState } from 'react';
import { PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import VideoModal from './VideoModal';

const Header: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <header className="w-full bg-transparent">
      <div className="max-w-6xl mx-auto w-full flex justify-between items-center py-4 px-4 md:px-0">
        <div className="flex items-center">
          <Link to="/">
            <img
              src="/lead-reply-ai-logo.png"
              alt="Lead Reply AI"
              className="h-10"
            />
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <button
            className="bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg flex items-center transition-colors duration-200"
            onClick={() => setModalOpen(true)}
          >
            <PlayCircle className="w-5 h-5 mr-2" />
            <span>Watch Demo</span>
          </button>
          <a
            href="https://vengoai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors duration-200"
          >
            Vengo AI Agents
          </a>
        </div>
      </div>
      <VideoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </header>
  );
};

export default Header;