import React, { useState } from 'react';
import { InfoIcon } from 'lucide-react';

interface MetricInfoTooltipProps {
  title: string;
  description: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const MetricInfoTooltip: React.FC<MetricInfoTooltipProps> = ({ 
  title, 
  description, 
  position = 'top' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full mb-2';
      case 'bottom':
        return 'top-full mt-2';
      case 'left':
        return 'right-full mr-2';
      case 'right':
        return 'left-full ml-2';
      default:
        return 'bottom-full mb-2';
    }
  };
  
  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="text-gray-400 hover:text-gray-600 focus:outline-none"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        aria-label={`Information about ${title}`}
      >
        <InfoIcon className="h-4 w-4" />
      </button>
      
      {isVisible && (
        <div 
          className={`absolute z-50 w-64 p-3 bg-white rounded-lg shadow-lg border border-gray-200 ${getPositionClasses()}`}
        >
          <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
          <p className="text-xs text-gray-600">{description}</p>
        </div>
      )}
    </div>
  );
};

export default MetricInfoTooltip;