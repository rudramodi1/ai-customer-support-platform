import { Link } from 'react-router-dom';
import { Bot, Zap, Clock, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-24 space-y-12">
      <div className="text-center space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-4">
          <Zap className="w-4 h-4" /> Wait times reduced by 80%
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
          Supercharge your <span className="text-primary-600">Customer Support</span> with AI
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Resolve tickets faster, automatically categorize issues, and provide instant answers 24/7 with our intelligent support platform.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link to="/chat" className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 shadow-md transition-all">
            Try AI Chatbot
          </Link>
          <Link to="/dashboard" className="bg-white text-gray-700 border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 shadow-sm transition-all">
            View Analytics
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16 w-full">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">Automated Resolutions</h3>
          <p className="text-gray-500">Our LLM-powered chatbot resolves common issues instantly without human intervention.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-4">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">Instant Ticket Routing</h3>
          <p className="text-gray-500">Automatically creates tickets and categorizes them by priority so agents know what to handle first.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">Enterprise Grade</h3>
          <p className="text-gray-500">Designed with a modern dashboard inspired by Zendesk and Freshdesk for high-volume support.</p>
        </div>
      </div>
    </div>
  );
}
