import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Ship, Calendar, Flag, Info, ArrowLeft, Anchor } from 'lucide-react';

function ShipDetails() {
  const { name } = useParams();
  const [ship, setShip] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (!name) return;

    async function getShip() {
      setIsLoading(true);
      setFetchError(null);

      try {
        const { data } = await axios.get(`http://localhost:5000/api/ships/${encodeURIComponent(name)}`);
        setShip(data);
      } catch {
        setFetchError('Could not load ship details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    getShip();
  }, [name]);

  // Use dummy data if API call fails (for demo)
  useEffect(() => {
    if (fetchError) {
      setShip({
        name,
        imo: "9619919",
        mmsi: "235117449",
        callSign: "VRLS8",
        flag: "Hong Kong",
        vesselType: "Container Ship",
        grossTonnage: 212963,
        deadweight: 199744,
        length: 400,
        beam: 59,
        yearBuilt: 2014,
        status: "Active",
        lastPort: "Rotterdam, Netherlands",
        destination: "Singapore",
        eta: "2023-11-25T14:30:00Z",
        owner: "Orient Overseas Container Line (OOCL)",
        manager: "OOCL Shipping Ltd.",
        classification: "DNV GL",
        insurers: ["Gard P&I Club", "North P&I Club"],
      });
    }
  }, [fetchError, name]);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
          </div>
        ) : fetchError && !ship ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
            {fetchError}
          </div>
        ) : ship ? (
          <>
            <section className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <header className="bg-blue-700 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center">
                  <Ship className="h-8 w-8 text-white mr-3" />
                  <h1 className="text-2xl font-bold text-white">{ship.name}</h1>
                </div>
                <div className="mt-2 md:mt-0 flex items-center">
                  <Flag className="h-5 w-5 text-white mr-2" />
                  <span className="text-white">{ship.flag}</span>
                </div>
              </header>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Info className="h-5 w-5 text-blue-600 mr-2" />
                    Vessel Info
                  </h2>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 text-sm text-gray-600">IMO Number</td>
                        <td className="py-2 text-sm font-medium text-gray-900">{ship.imo}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-sm text-gray-600">MMSI</td>
                        <td className="py-2 text-sm font-medium text-gray-900">{ship.mmsi}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-sm text-gray-600">Call Sign</td>
                        <td className="py-2 text-sm font-medium text-gray-900">{ship.callSign}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-sm text-gray-600">Type</td>
                        <td className="py-2 text-sm font-medium text-gray-900">{ship.vesselType}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-sm text-gray-600">Status</td>
                        <td className="py-2 text-sm font-medium">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            ship.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {ship.status}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Anchor className="h-5 w-5 text-blue-600 mr-2" />
                    Physical Specs
                  </h2>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 text-sm text-gray-600">Gross Tonnage</td>
                        <td className="py-2 text-sm font-medium text-gray-900">{ship.grossTonnage.toLocaleString()} GT</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-sm text-gray-600">Deadweight</td>
                        <td className="py-2 text-sm font-medium text-gray-900">{ship.deadweight.toLocaleString()} t</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-sm text-gray-600">Length</td>
                        <td className="py-2 text-sm font-medium text-gray-900">{ship.length} m</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-sm text-gray-600">Beam</td>
                        <td className="py-2 text-sm font-medium text-gray-900">{ship.beam} m</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-sm text-gray-600">Year Built</td>
                        <td className="py-2 text-sm font-medium text-gray-900">{ship.yearBuilt}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                    Voyage Details
                  </h2>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 text-sm text-gray-600">Last Port</td>
                        <td className="py-2 text-sm font-medium text-gray-900">{ship.lastPort}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-sm text-gray-600">Destination</td>
                        <td className="py-2 text-sm font-medium text-gray-900">{ship.destination}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-sm text-gray-600">ETA</td>
                        <td className="py-2 text-sm font-medium text-gray-900">
                          {new Date(ship.eta).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Ownership & Management</h2>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-sm text-gray-600">Owner</td>
                      <td className="py-2 text-sm font-medium text-gray-900">{ship.owner}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-sm text-gray-600">Manager</td>
                      <td className="py-2 text-sm font-medium text-gray-900">{ship.manager}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-sm text-gray-600">Classification</td>
                      <td className="py-2 text-sm font-medium text-gray-900">{ship.classification}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Insurance & Certificates</h2>
                <h3 className="text-sm font-medium text-gray-800 mb-2">Insurers:</h3>
                <ul className="list-disc pl-5">
                  {ship.insurers.map((insurer, i) => (
                    <li key={i} className="text-sm text-gray-900 mb-1">
                      {insurer}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </>
        ) : null}
      </main>
    </div>
  );
}

export default ShipDetails;
