import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ChatSupport from './pages/ChatSupport';
import Dashboard from './pages/Dashboard';
import { MessageSquare, LayoutDashboard } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-primary-600 flex items-center gap-2">
              <MessageSquare className="w-6 h-6" />
              SupportAI
            </Link>
            <div className="flex gap-4">
              <Link to="/chat" className="text-gray-600 hover:text-primary-600 font-medium">Chat Support</Link>
              <Link to="/dashboard" className="flex items-center gap-1 text-gray-600 hover:text-primary-600 font-medium">
                <LayoutDashboard className="w-4 h-4" />
                Admin Dashboard
              </Link>
            </div>
          </div>
        </nav>
        
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatSupport />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
