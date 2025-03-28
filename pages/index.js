import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("https://nextquantum.uk/webhook/youtube-summary");
  const [payload, setPayload] = useState(`{
  "videoUrl": "https://www.youtube.com/watch?v=example",
  "userId": "user123"
}`);
  const [response, setResponse] = useState("");

  const sendWebhook = async () => {
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
    } catch (err) {
      setResponse(`Error: ${err}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">n8n Webhook Tester</h1>
      <input
        className="border rounded w-full p-2 mb-4"
        placeholder="Webhook URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <textarea
        className="border rounded w-full p-2 mb-4 text-sm"
        rows={6}
        placeholder="JSON Payload"
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        onClick={sendWebhook}
      >
        Send Webhook
      </button>
      {response && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h2 className="font-semibold mb-2">Response</h2>
          <pre className="text-sm whitespace-pre-wrap break-words">{response}</pre>
        </div>
      )}
    </div>
  );
}
