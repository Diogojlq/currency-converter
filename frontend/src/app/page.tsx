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
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200" data-theme="dark">
      <div className="bg-base-100 p-8 rounded-2xl shadow-2xl w-full max-w-md border-4 border-primary/40 backdrop-blur-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-primary">Currency Converter</h1>
        <div className="mb-4">
          <input
            className="w-full p-2 border rounded mb-2 input input-bordered"
            placeholder="From Currency (e.g. USD)"
            value={from}
            onChange={e => setFrom(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded mb-2 input input-bordered"
            placeholder="To Currency (e.g. EUR)"
            value={to}
            onChange={e => setTo(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded input input-bordered"
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>
        <button
          className="w-full btn btn-primary"
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