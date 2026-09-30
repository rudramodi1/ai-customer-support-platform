import Chatbot from '../components/Chatbot';

export default function ChatSupport() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Support</h1>
        <p className="text-gray-500">Ask our AI assistant any questions you have. If it can't solve your issue, it will automatically create a support ticket for our human agents.</p>
      </div>
      
      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Common Topics</h3>
            <ul className="space-y-2 text-sm text-primary-600">
              <li className="hover:underline cursor-pointer">Where is my order?</li>
              <li className="hover:underline cursor-pointer">How to reset password</li>
              <li className="hover:underline cursor-pointer">Payment issues</li>
              <li className="hover:underline cursor-pointer">Return policy</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <h3 className="font-semibold text-blue-900 mb-2">24/7 Availability</h3>
            <p className="text-sm text-blue-800">Our AI assistant is available around the clock to help you with immediate inquiries.</p>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <Chatbot />
        </div>
      </div>
    </div>
  );
}
