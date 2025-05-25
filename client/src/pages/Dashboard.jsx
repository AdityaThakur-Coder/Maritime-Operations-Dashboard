import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import MarineDataCard from '../components/MarineDataCard';
import ShipSearchForm from '../components/ShipSearchForm';
import { Ship, Anchor, Map, BarChart3, AlertTriangle, Users } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [recentShips, setRecentShips] = useState([]);
  
  // Dummy data for the dashboard
  const vesselStats = {
    totalVessels: 12875,
    activeVessels: 8943,
    portsVisited: 324,
    alerts: 17
  };
  
  // Chart data
  const chartData = {
    labels: ['Tanker', 'Cargo', 'Passenger', 'Fishing', 'Special', 'Other'],
    datasets: [
      {
        label: 'Vessel Distribution by Type',
        data: [4231, 3897, 2154, 1287, 842, 464],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(201, 203, 207, 0.7)'
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Vessel Distribution by Type',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  
  // Mock recent ships data
  useEffect(() => {
    // This would typically be an API call
    const mockRecentShips = [
      { id: 1, name: 'MAERSK ALABAMA', type: 'Container Ship', lastPort: 'Singapore' },
      { id: 2, name: 'QUEEN MARY 2', type: 'Passenger Ship', lastPort: 'Southampton' },
      { id: 3, name: 'EVER GIVEN', type: 'Container Ship', lastPort: 'Rotterdam' },
      { id: 4, name: 'MSC OSCAR', type: 'Container Ship', lastPort: 'Shanghai' },
    ];
    
    setRecentShips(mockRecentShips);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome, {user?.name || 'Mariner'}!
          </h1>
          <p className="text-gray-600 mt-2">
            Monitor your maritime operations and vessel data in real-time.
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MarineDataCard 
            title="Total Vessels" 
            icon={Ship} 
            value={vesselStats.totalVessels.toLocaleString()}
            description="Vessels in the global database"
            color="border-blue-500"
          />
          <MarineDataCard 
            title="Active Vessels" 
            icon={Anchor} 
            value={vesselStats.activeVessels.toLocaleString()}
            description="Currently at sea or in port"
            color="border-green-500"
          />
          <MarineDataCard 
            title="Ports Activity" 
            icon={Map} 
            value={vesselStats.portsVisited.toLocaleString()}
            description="Ports with recent vessel activity"
            color="border-purple-500"
          />
          <MarineDataCard 
            title="Alerts" 
            icon={AlertTriangle} 
            value={vesselStats.alerts.toLocaleString()}
            description="Requiring attention"
            color="border-red-500"
          />
        </div>
        
        {/* Ship Search */}
        <div className="mb-8">
          <ShipSearchForm />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <Bar data={chartData} options={chartOptions} />
          </div>
          
          {/* Recent Ships */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Recent Ships</h2>
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vessel Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Port
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentShips.map((ship) => (
                    <tr key={ship.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-blue-600 hover:text-blue-800">
                          <a href={`/ship/${encodeURIComponent(ship.name)}`}>
                            {ship.name}
                          </a>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{ship.type}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{ship.lastPort}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;