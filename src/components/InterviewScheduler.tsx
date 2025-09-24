import React, { useState } from 'react';
import { XIcon, CalendarIcon, ClockIcon, CheckIcon } from 'lucide-react';
import { Candidate } from '../types';
import {   updateCandidateInFirebase } from '../services/candidateService';

interface InterviewSchedulerProps {
  candidate: Candidate;
  onClose: () => void;
  onScheduled: () => void;
}

const InterviewScheduler: React.FC<InterviewSchedulerProps> = ({ 
  candidate, 
  onClose,
  onScheduled
}) => {
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Generate available dates (next 14 days)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          })
        });
      }
    }
    
    return dates;
  };
  
  // Generate available time slots
  const generateTimeSlots = () => {
    const times = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM
    
    for (let hour = startHour; hour <= endHour; hour++) {
      // Add hour:00
      times.push({
        value: `${hour}:00`,
        label: `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`
      });
      
      // Add hour:30 if not the end hour
      if (hour < endHour) {
        times.push({
          value: `${hour}:30`,
          label: `${hour > 12 ? hour - 12 : hour}:30 ${hour >= 12 ? 'PM' : 'AM'}`
        });
      }
    }
    
    return times;
  };
  
  const availableDates = generateAvailableDates();
  const timeSlots = generateTimeSlots();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time) {
      setError('Please select both date and time');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Update candidate with interview details
      await updateCandidate(candidate.id, {
        status: 'scheduled',
        interviewDate: date,
        interviewTime: time,
        interviewNotes: notes
      });
      
      onScheduled();
    } catch (error) {
      console.error('Error scheduling interview:', error);
      setError('Failed to schedule interview. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Schedule Technical Interview</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <img 
                src={candidate.avatarUrl} 
                alt={candidate.name} 
                className="h-8 w-8 rounded-full mr-2"
              />
              <h3 className="font-medium text-gray-800">{candidate.name}</h3>
            </div>
            <p className="text-sm text-gray-600">@{candidate.githubUsername}</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              <CalendarIcon className="h-4 w-4 inline-block mr-1" />
              Select Date
            </label>
            <select
              id="date"
              className="w-full border border-gray-300 rounded-xl p-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            >
              <option value="">-- Select a date --</option>
              {availableDates.map((date) => (
                <option key={date.value} value={date.value}>
                  {date.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              <ClockIcon className="h-4 w-4 inline-block mr-1" />
              Select Time
            </label>
            <select
              id="time"
              className="w-full border border-gray-300 rounded-xl p-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            >
              <option value="">-- Select a time --</option>
              {timeSlots.map((time) => (
                <option key={time.value} value={time.value}>
                  {time.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              className="w-full border border-gray-300 rounded-xl p-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
              placeholder="Add any notes or special instructions for the interview"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Scheduling...
                </>
              ) : (
                <>
                  <CheckIcon className="h-4 w-4 mr-2" />
                  Schedule Interview
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterviewScheduler;