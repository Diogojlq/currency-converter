"use client";
import { useState } from "react";

export default function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleConvert = async () => {
    // Replace with your backend API endpoint
    const res = await fetch("/api/convert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, amount }),
    });
    const data = await res.json();
    setResult(data.result);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Currency Converter</h1>
        <div className="mb-4">
          <input
            className="w-full p-2 border rounded mb-2"
            placeholder="From Currency (e.g. USD)"
            value={from}
            onChange={e => setFrom(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded mb-2"
            placeholder="To Currency (e.g. EUR)"
            value={to}
            onChange={e => setTo(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded"
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={handleConvert}
        >
          Convert
        </button>
        {result && (
          <div className="mt-4 text-center text-lg font-semibold">
            Result: {result}
          </div>
        )}
      </div>
    </div>
  );
}