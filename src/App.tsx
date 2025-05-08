import React, { useState } from 'react';
import { Mail, Sparkles, FileText, ArrowRight, Copy, Download, ArrowLeft } from 'lucide-react';
import EmailForm from './components/EmailForm';
import GeneratedEmail from './components/GeneratedEmail';
import Header from './components/Header';
import { EmailData, FormData } from './types';
import { generateEmail } from './services/api';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailData, setEmailData] = useState<EmailData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateEmail = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const generatedEmail = await generateEmail(formData);
      setEmailData(generatedEmail);
    } catch (err) {
      setError('Failed to generate email. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setEmailData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col items-center p-4 md:p-8">
      <Header />
      
      <div className="w-full max-w-6xl mt-16 flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-4 items-center text-white text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Turn Sales Conversations Into Follow-Ups
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl">
            Just upload your sales lead summary, chat transcript, and
            company info. We'll do the rest!
          </p>
          
          <div className="w-full flex justify-center gap-12 mt-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-3">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm font-medium">Input</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-3">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm font-medium">AI Magic</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-3">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm font-medium">Output</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl bg-white rounded-xl shadow-xl mt-12 overflow-hidden transition-all duration-300 ease-in-out">
        {emailData ? (
          <div className="flex flex-col md:flex-row min-h-[500px]">
            <div className="w-full md:w-1/3 bg-gray-50 p-6 border-r border-gray-200">
              <button 
                onClick={handleReset}
                className="flex items-center text-gray-600 mb-6 hover:text-purple-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Form
              </button>
              <h2 className="text-xl font-semibold mb-4">Generate Follow-Up Email</h2>
              <div className="text-sm text-gray-500">
                <p className="mb-2">
                  <span className="font-medium text-gray-700">Conversation Summary:</span>
                </p>
                <p className="border border-gray-200 rounded p-3 mb-4 bg-white text-gray-700 max-h-32 overflow-y-auto">
                  {emailData.summary}
                </p>
                <p className="mb-2">
                  <span className="font-medium text-gray-700">Contact:</span> {emailData.contactName}
                </p>
                <p className="mb-2">
                  <span className="font-medium text-gray-700">Company:</span> {emailData.companyName}
                </p>
                <p className="mb-2">
                  <span className="font-medium text-gray-700">Tone:</span> {emailData.tone}
                </p>
              </div>
            </div>
            <GeneratedEmail emailData={emailData} setEmailData={setEmailData} />
          </div>
        ) : (
          <EmailForm 
            onSubmit={handleGenerateEmail} 
            isLoading={isLoading} 
            error={error}
          />
        )}
      </div>
    </div>
  );
}

export default App;