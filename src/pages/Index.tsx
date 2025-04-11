import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-soft-blue-50 to-soft-purple-100 p-4">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-5xl font-bold text-dark-purple tracking-tight">
          Memo Medi-Robot
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your Personal AI Treatment Assistant
        </p>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <p className="text-gray-700 leading-relaxed">
            Get personalized medical insights instantly. Talk to our AI-powered assistant for preliminary health advice.
          </p>

          <Link
            to="/patient-info"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-ocean-blue text-white rounded-lg hover:bg-bright-blue transition-colors group"
          >
            Start Consultation
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* ✅ New Button for Nearby Clinics */}
          <Link
            to="/nearby"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mt-4"
          >
            🏥 Find Nearby Clinics & Hospitals
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;

