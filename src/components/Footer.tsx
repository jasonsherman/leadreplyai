import React from 'react';

const Footer: React.FC = () => (
    <footer className="bg-white/60 backdrop-blur text-gray-800 w-full">
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Section */}
                <div>
                    <div className="flex items-center mb-2">
                        <img
                            src="/lead-reply-ai-logo.png"
                            alt="Lead Reply AI"
                            className="h-8 mr-2"
                            style={{ filter: 'brightness(0) saturate(100%) invert(16%) sepia(98%) saturate(7472%) hue-rotate(247deg) brightness(90%) contrast(110%)' }}
                        />
                    </div>
                    <div className="text-sm text-gray-700 mb-1">
                        Turn Sales Conversations Into Follow-Up Emails in Seconds.
                    </div>
                    <div className="text-xs text-gray-500">
                        © {new Date().getFullYear()} <a href="https://vengoai.com" className="underline hover:text-purple-600" target="_blank" rel="noopener noreferrer">Vengo AI</a>
                    </div>
                </div>
                {/* Middle Section */}
                <div>
                    <div className="font-semibold mb-2 text-gray-800">Quick Links</div>
                    <ul className="text-sm text-gray-700 space-y-1 mb-3 text-center md:text-left">
                        <li><a href="https://vengoai.com" className="hover:text-purple-600 underline" target="_blank" rel="noopener noreferrer">Vengo AI Agents</a></li>
                        <li><a href="https://trendlyzer.com" className="hover:text-purple-600 underline" target="_blank" rel="noopener noreferrer">Trendlyzer</a></li>
                        <li><a href="https://sitetoagent.com" className="hover:text-purple-600 underline" target="_blank" rel="noopener noreferrer">Site to Agent</a></li>
                    </ul>
                </div>
                {/* Right Section */}
                <div className="md:text-right">
                    <div className="font-semibold mb-1 text-gray-800">Contact</div>
                    <div className="text-sm text-gray-700"><a href="mailto:info@vengoai.com" className="hover:text-purple-600 underline">info@vengoai.com</a></div>
                    <div className="text-xs text-gray-500">Philadelphia, PA</div>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer; 