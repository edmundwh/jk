import { useState, useEffect } from "react";

export default function Home() {
  const [url, setUrl] = useState("https://nextquantum.uk/webhook/youtube-summary");
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/watch?v=example");
  const [userId, setUserId] = useState("user123");
  const [response, setResponse] = useState("");
  const [parsedSummary, setParsedSummary] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const sendWebhook = async () => {
    const payload = JSON.stringify({ videoUrl, userId }, null, 2);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      });
      const data = await res.text();
      setResponse(data);

      try {
        const parsed = JSON.parse(data);
        setParsedSummary(parsed.summary || null);
        setKeywords(parsed.keywords || []);
        setTopics(parsed.topics || []);
      } catch (err) {
        setParsedSummary(null);
        setKeywords([]);
        setTopics([]);
      }
    } catch (err) {
      setResponse(`Error: ${err}`);
      setParsedSummary(null);
      setKeywords([]);
      setTopics([]);
    }
  };

  const copyResponse = () => {
    navigator.clipboard.writeText(response);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 py-12 px-4 text-white relative overflow-hidden">
      <div className="absolute inset-0 -z-10 animate-pulse-slow bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-800/20 via-purple-700/10 to-transparent"></div>

      <div className="max-w-2xl mx-auto bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-700 animate-fade-in">
        <h1 className="text-4xl font-bold mb-6 text-center text-white tracking-tight">
          📺 Youtube Summation
        </h1>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-300">Webhook URL</label>
          <input className="border border-gray-700 bg-gray-800 text-white rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" value={url} onChange={(e) => setUrl(e.target.value)} />
          <label className="block text-sm font-medium text-gray-300">YouTube Video URL</label>
          <input className="border border-gray-700 bg-gray-800 text-white rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
          <label className="block text-sm font-medium text-gray-300">User ID</label>
          <input className="border border-gray-700 bg-gray-800 text-white rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" value={userId} onChange={(e) => setUserId(e.target.value)} />

          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl transition transform hover:-translate-y-0.5 hover:scale-105 shadow-md hover:shadow-lg" onClick={sendWebhook}>
            🚀 Send Webhook
          </button>
        </div>

        {parsedSummary && (
          <div className="mt-8 bg-gray-800 border border-gray-700 rounded-xl p-4 animate-fade-in">
            <h2 className="text-lg font-semibold text-green-400 mb-2">🧠 AI Summary</h2>
            <p className="text-sm text-gray-100 whitespace-pre-wrap break-words mb-4">{parsedSummary}</p>
            {keywords.length > 0 && (
              <div className="mb-2">
                <h3 className="text-sm font-semibold text-blue-400 mb-1">🔑 Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((word, idx) => (
                    <span key={idx} className="bg-blue-700 text-white text-xs px-2 py-1 rounded-full">{word}</span>
                  ))}
                </div>
              </div>
            )}
            {topics.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-purple-400 mb-1">📌 Topics</h3>
                <ul className="list-disc list-inside text-sm text-gray-300">
                  {topics.map((topic, idx) => (
                    <li key={idx}>{topic}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {response && (
          <div className="mt-8 bg-gray-800 border border-gray-700 rounded-xl p-4 animate-fade-in">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-200">Raw Response</h2>
              <button onClick={copyResponse} className="text-sm text-blue-400 hover:text-blue-200">📋 Copy</button>
            </div>
            <pre className="text-sm text-gray-100 whitespace-pre-wrap break-words">{response}</pre>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0% { opacity: 0.3; }
          50% { opacity: 0.6; }
          100% { opacity: 0.3; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out both;
        }
      `}</style>
    </div>
  );
}
