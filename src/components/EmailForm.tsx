import React, { useState, useRef } from 'react';
import { Send, Upload } from 'lucide-react';
import { FormData } from '../types';

interface EmailFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
  error: string | null;
}

const EmailForm: React.FC<EmailFormProps> = ({ onSubmit, isLoading, error }) => {
  const [formData, setFormData] = useState<FormData>({
    summary: '',
    transcript: '',
    contactName: '',
    companyName: '',
    tone: 'Friendly'
  });
  
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleToneSelect = (tone: 'Friendly' | 'Formal' | 'Concise') => {
    setFormData(prev => ({ ...prev, tone }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setFormData(prev => ({ ...prev, transcript: text }));
    };
    reader.readAsText(file);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };
  
  const activateFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 md:p-8">
      <h2 className="text-2xl font-semibold mb-6">Generate Follow-Up Email</h2>
      
      <div className="mb-6">
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
          Conversation Summary <span className="text-red-500">*</span>
        </label>
        <textarea
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          placeholder="Enter the key points from your conversation..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[120px] bg-white text-gray-900"
          required
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Chat Transcript (optional)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <textarea
            name="transcript"
            value={formData.transcript}
            onChange={handleChange}
            placeholder="Paste transcript here..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[120px] bg-white text-gray-900"
          />
          
          <div 
            className={`border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 transition-colors ${
              dragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={activateFileInput}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              accept=".txt"
              className="hidden"
            />
            <Upload className="w-10 h-10 text-gray-400 mb-3" />
            <p className="text-center text-gray-600">
              <span className="font-medium text-purple-600">Drag & drop</span> or <span className="font-medium text-purple-600">click to select</span> a file
            </p>
            <p className="text-xs text-gray-500 mt-2">(Supported: .txt)</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
            Contact Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="contactName"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            placeholder="John Smith"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
            required
          />
        </div>
        
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Acme Inc."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
            required
          />
        </div>
      </div>
      
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Tone <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className={`py-2 px-6 rounded-full text-sm font-medium transition-colors ${
              formData.tone === 'Friendly'
                ? 'bg-green-100 text-green-800 border border-green-300'
                : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
            }`}
            onClick={() => handleToneSelect('Friendly')}
          >
            Friendly
          </button>
          <button
            type="button"
            className={`py-2 px-6 rounded-full text-sm font-medium transition-colors ${
              formData.tone === 'Formal'
                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
            }`}
            onClick={() => handleToneSelect('Formal')}
          >
            Formal
          </button>
          <button
            type="button"
            className={`py-2 px-6 rounded-full text-sm font-medium transition-colors ${
              formData.tone === 'Concise'
                ? 'bg-purple-100 text-purple-800 border border-purple-300'
                : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
            }`}
            onClick={() => handleToneSelect('Concise')}
          >
            Concise
          </button>
        </div>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}
      
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 flex justify-center items-center rounded-lg text-white font-medium transition-colors ${
          isLoading 
            ? 'bg-purple-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600'
        }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Generate Email
          </>
        )}
      </button>
    </form>
  );
};

export default EmailForm;