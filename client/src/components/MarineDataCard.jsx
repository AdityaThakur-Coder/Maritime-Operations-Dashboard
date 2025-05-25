import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

const MarineDataCard = ({ title, icon: Icon, value, description, link, linkText, color }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden border-t-4 ${color}`}>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {Icon && <Icon className="h-6 w-6 text-blue-600" />}
        </div>
        
        {value && (
          <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
        )}
        
        {description && (
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        )}
        
        {link && (
          <Link 
            to={link} 
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            {linkText || 'View Details'} 
            <ExternalLink className="ml-1 h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default MarineDataCard;