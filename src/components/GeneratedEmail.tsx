import React, { useState } from 'react';
import { Copy, Download, Edit } from 'lucide-react';
import { EmailData } from '../types';

interface GeneratedEmailProps {
  emailData: EmailData;
  setEmailData: React.Dispatch<React.SetStateAction<EmailData | null>>;
}

const GeneratedEmail: React.FC<GeneratedEmailProps> = ({ emailData, setEmailData }) => {
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);
  const [editingSubject, setEditingSubject] = useState(false);
  const [editingBody, setEditingBody] = useState(false);
  const [subjectValue, setSubjectValue] = useState(emailData.subject || '');
  const [bodyValue, setBodyValue] = useState(emailData.body || '');
  
  const handleCopySubject = () => {
    navigator.clipboard.writeText(emailData.subject || '');
    setCopiedSubject(true);
    setTimeout(() => setCopiedSubject(false), 2000);
  };
  
  const handleCopyBody = () => {
    navigator.clipboard.writeText(emailData.body || '');
    setCopiedBody(true);
    setTimeout(() => setCopiedBody(false), 2000);
  };
  
  const handleCopyAll = () => {
    const fullEmail = `Subject: ${emailData.subject || ''}\n\n${emailData.body || ''}`;
    navigator.clipboard.writeText(fullEmail);
    setCopiedSubject(true);
    setCopiedBody(true);
    setTimeout(() => {
      setCopiedSubject(false);
      setCopiedBody(false);
    }, 2000);
  };
  
  const handleDownload = () => {
    const fullEmail = `Subject: ${emailData.subject || ''}\n\n${emailData.body || ''}`;
    const blob = new Blob([fullEmail], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `follow-up-email-${emailData.contactName.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleSaveSubject = () => {
    setEmailData(prev => prev ? { ...prev, subject: subjectValue } : null);
    setEditingSubject(false);
  };
  
  const handleSaveBody = () => {
    setEmailData(prev => prev ? { ...prev, body: bodyValue } : null);
    setEditingBody(false);
  };

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Generated Email</h2>
        <div className="flex space-x-2">
          <button 
            onClick={handleCopyAll}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded flex items-center transition-colors"
          >
            <Copy className="w-4 h-4 mr-2" />
            <span>Copy</span>
          </button>
          <button 
            onClick={handleDownload}
            className="bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 px-4 rounded flex items-center transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            <span>Download</span>
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Subject:</label>
          {!editingSubject && (
            <div className="flex items-center">
              <button 
                onClick={() => setEditingSubject(true)}
                className="text-gray-400 hover:text-gray-700 mr-1"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button 
                onClick={handleCopySubject}
                className="text-gray-400 hover:text-gray-700"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        
        {editingSubject ? (
          <div className="flex items-center">
            <input
              type="text"
              value={subjectValue}
              onChange={(e) => setSubjectValue(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
            />
            <button
              onClick={handleSaveSubject}
              className="ml-2 bg-green-100 hover:bg-green-200 text-green-700 py-2 px-4 rounded transition-colors"
            >
              Save
            </button>
          </div>
        ) : (
          <div className={`p-3 border border-gray-300 rounded-lg bg-white text-gray-900 ${copiedSubject ? 'border-green-500 bg-green-50' : ''}`}>
            {emailData.subject || ''}
            {copiedSubject && (
              <span className="ml-2 text-xs text-green-600 font-medium">Copied!</span>
            )}
          </div>
        )}
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Body:</label>
          {!editingBody && (
            <div className="flex items-center">
              <button 
                onClick={() => setEditingBody(true)}
                className="text-gray-400 hover:text-gray-700 mr-1"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button 
                onClick={handleCopyBody}
                className="text-gray-400 hover:text-gray-700"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        
        {editingBody ? (
          <div className="flex flex-col">
            <textarea
              value={bodyValue}
              onChange={(e) => setBodyValue(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[300px] bg-white text-gray-900"
            />
            <button
              onClick={handleSaveBody}
              className="mt-2 self-end bg-green-100 hover:bg-green-200 text-green-700 py-2 px-4 rounded transition-colors"
            >
              Save
            </button>
          </div>
        ) : (
          <div className={`p-3 border border-gray-300 rounded-lg bg-white text-gray-900 whitespace-pre-wrap min-h-[300px] ${copiedBody ? 'border-green-500 bg-green-50' : ''}`}>
            {emailData.body || ''}
            {copiedBody && (
              <div className="mt-2 text-xs text-green-600 font-medium">Copied!</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratedEmail;