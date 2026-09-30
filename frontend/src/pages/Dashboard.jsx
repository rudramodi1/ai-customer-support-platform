import { useState, useEffect } from 'react';
import axios from 'axios';
import TicketCard from '../components/TicketCard';
import { Filter, BarChart3, Users, CheckCircle, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/tickets/');
      setTickets(res.data);
    } catch (err) {
      console.error("Failed to fetch tickets", err);
    } finally {
      setLoading(false);
    }
  };

  const updateTicketStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/tickets/${id}`, { status: newStatus });
      setTickets(tickets.map(t => t.id === id ? { ...t, status: newStatus } : t));
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const filteredTickets = filter === 'All' ? tickets : tickets.filter(t => t.status === filter);
  
  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'Open').length,
    resolved: tickets.filter(t => t.status === 'Resolved').length,
    highPriority: tickets.filter(t => t.priority?.toLowerCase() === 'high' && t.status !== 'Resolved').length
  };

  if (loading) return <div className="flex justify-center items-center h-64">Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Overview of customer support automations and manual tickets.</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><BarChart3 className="w-6 h-6"/></div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Tickets</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-lg"><AlertTriangle className="w-6 h-6"/></div>
          <div>
            <p className="text-sm font-medium text-gray-500">High Priority</p>
            <p className="text-2xl font-bold text-gray-900">{stats.highPriority}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-100 text-orange-600 rounded-lg"><Users className="w-6 h-6"/></div>
          <div>
            <p className="text-sm font-medium text-gray-500">Open Issues</p>
            <p className="text-2xl font-bold text-gray-900">{stats.open}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg"><CheckCircle className="w-6 h-6"/></div>
          <div>
            <p className="text-sm font-medium text-gray-500">Resolved</p>
            <p className="text-2xl font-bold text-gray-900">{stats.resolved}</p>
          </div>
        </div>
      </div>

      {/* Filters and List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Recent Support Tickets</h2>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select 
              className="border border-gray-300 rounded-md text-sm py-1 px-2 outline-none focus:border-primary-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
        
        <div className="p-6">
          {filteredTickets.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No tickets found matching your filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredTickets.map(ticket => (
                <TicketCard 
                  key={ticket.id} 
                  ticket={ticket} 
                  onStatusChange={updateTicketStatus}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
