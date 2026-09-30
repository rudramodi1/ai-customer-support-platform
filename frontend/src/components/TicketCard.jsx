import { Mail, Tag, Clock } from 'lucide-react';

export default function TicketCard({ ticket, onStatusChange }) {
  const getPriorityColor = (priority) => {
    switch(priority?.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in progress': return 'bg-purple-100 text-purple-800';
      case 'resolved': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-gray-900">#{ticket.id} - {ticket.customer_name}</h3>
          <div className="flex items-center text-gray-500 text-sm gap-1 mt-1">
            <Mail className="w-3 h-3" /> {ticket.email}
          </div>
        </div>
        <div className="flex gap-2">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getPriorityColor(ticket.priority)}`}>
            {ticket.priority}
          </span>
          <select 
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold cursor-pointer outline-none ${getStatusColor(ticket.status)}`}
            value={ticket.status}
            onChange={(e) => onStatusChange(ticket.id, e.target.value)}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 text-sm line-clamp-2 mb-2">
          <span className="font-semibold">Query:</span> {ticket.issue_description}
        </p>
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
          <p className="text-gray-600 text-sm">
            <span className="font-semibold text-primary-700">AI Summary:</span> {ticket.ai_summary}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
        <div className="flex items-center gap-1">
          <Tag className="w-3 h-3" /> {ticket.category}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" /> {new Date(ticket.created_at).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
