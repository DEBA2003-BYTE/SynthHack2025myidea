
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PatientInfo = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [condition, setCondition] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store patient info in session storage
    sessionStorage.setItem('patientName', name);
    sessionStorage.setItem('patientAge', age);
    sessionStorage.setItem('patientCondition', condition);

    // Navigate to chatbot
    navigate('/chatbot');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-soft-blue-50 to-soft-purple-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-dark-purple">
          Patient Information
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input 
              type="text" 
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ocean-blue focus:ring focus:ring-ocean-blue/50"
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input 
              type="number" 
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              min="0"
              max="120"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ocean-blue focus:ring focus:ring-ocean-blue/50"
            />
          </div>

          <div>
            <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
              Current Medical Condition
            </label>
            <textarea 
              id="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ocean-blue focus:ring focus:ring-ocean-blue/50"
            />
          </div>

          <button 
            type="submit" 
            className="w-full flex items-center justify-center px-4 py-3 bg-ocean-blue text-white rounded-lg hover:bg-bright-blue transition-colors group"
          >
            Start Consultation
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientInfo;
