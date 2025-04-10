import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { StoreContext } from "../context/storeContext";
import { QRCodeCanvas } from "qrcode.react";
import { LogOut } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(localStorage.getItem("shortUrl") || "");
  const [mainUrl, setMainUrl] = useState(localStorage.getItem("mainUrl") || "");
  const [shortId, setShortId] = useState(localStorage.getItem("shortId") || "");
  const [analytics, setAnalytics] = useState(null);
  const { url , logout } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (shortId) {
      fetchAnalytics(shortId);
    }
  }, [shortId]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnalytics(null);

    try {
      const res = await axios.post(`${url}/api/url/shortId`, { url: longUrl });
      if (res.data.success) {
        const generatedShortId = res.data.id;
        const generatedShortUrl = `${url}/${generatedShortId}`;

        // Save to state
        setShortId(generatedShortId);
        setShortUrl(generatedShortUrl);
        setMainUrl(longUrl);

        // Save to localStorage
        localStorage.setItem("shortId", generatedShortId);
        localStorage.setItem("shortUrl", generatedShortUrl);
        localStorage.setItem("mainUrl", longUrl);


        // Get analytics
        fetchAnalytics(generatedShortId);
      }
    } catch (err) {
      console.error("Error:", err.response?.data?.message || err.message);
    }
  };

  const fetchAnalytics = async (shortIdToCheck) => {
    try {
      const res = await axios.get(`${url}/api/url/analytics/${shortIdToCheck}`);
      if (res.data.success) {
        setAnalytics(res.data);
      }
    } catch (err) {
      console.error("Error fetching analytics:", err.message);
    }
  };

  const handleRefreshClicks = () => {
    if (shortId) {
      fetchAnalytics(shortId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
     <div className="fixed top-4 right-4">
  <button
    onClick={logout}
    className="flex items-center gap-2 px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"


  >
    <LogOut size={18} />
    <span>Logout</span>
  </button>
</div>





      <div className="text-center mb-10">

        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800">
          🔗 TinyTrack
        </h1>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          Paste your long URL, get a short link, and track clicks.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-2xl space-y-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="url"
            required
            placeholder="https://example.com/your-link"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 shadow-sm"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold shadow-md"
          >
            ✂️ Shorten URL
          </button>
        </form>

      

{shortUrl && (
  <div className="text-center space-y-6 pt-8 border-t border-gray-300 mt-8">
    <h2 className="text-2xl font-bold text-blue-800 tracking-tight">🎯 Your Short URL</h2>

    <a
      href={shortUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-blue-50 text-blue-700 font-medium text-lg px-4 py-2 rounded-xl shadow hover:bg-blue-100 transition-all break-all max-w-full"
    >
      {shortUrl}
    </a>

    <button
      onClick={() => navigator.clipboard.writeText(shortUrl)}
      className="text-sm text-blue-700 border border-blue-300 px-4 py-2 rounded-lg hover:bg-blue-100 active:scale-95 transition"
    >
      📋 Copy to Clipboard
    </button>

    <div className="mt-6 flex flex-col items-center">
      <p className="text-gray-600 text-sm mb-2">📱 Scan this QR to access your link:</p>
      <div className="p-2 bg-white rounded-xl shadow-md">
        <QRCodeCanvas value={shortUrl} size={128} />
      </div>
    </div>
  </div>
)}

      </div>

      {analytics && (
        <div className="mt-12 w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">📊 Analytics Overview</h2>
            <button
              onClick={handleRefreshClicks}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm px-4 py-2 rounded-xl"
            >
              🔄 Refresh Clicks
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-gray-500">Total Clicks</p>
              <p className="text-2xl font-bold text-blue-700">{analytics.totalClicks}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 break-all">
              <p className="text-gray-500">Original URL</p>
              <p className="text-blue-700">{mainUrl  || "N/A"}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-gray-500">Short ID</p>
              <p className="text-blue-700">{shortId}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 break-all">
              <p className="text-gray-500">Short URL</p>
              <p className="text-blue-700">{shortUrl}</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">📅 Visit History</h3>
            {analytics.analytics.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full border text-sm text-gray-700">
                  <thead>
                    <tr className="bg-blue-100 text-left">
                      <th className="px-4 py-2">Time</th>
                      <th className="px-4 py-2">Browser</th>
                      <th className="px-4 py-2">Device</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.analytics.map((entry, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{new Date(entry.timestamp).toLocaleString()}</td>
                        <td className="px-4 py-2">{entry.browser || "Unknown"}</td>
                        <td className="px-4 py-2">{entry.device || "Unknown"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No visits yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
