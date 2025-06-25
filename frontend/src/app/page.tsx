"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [currencies, setCurrencies] = useState<string[]>([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/currencies");
        const data = await res.json();
        setCurrencies(data);
      } catch (err) {
        console.error("Erro ao buscar moedas:", err);
      }
    };

    fetchCurrencies();
  }, []);

  const handleConvert = async () => {
    if (!from || !to || !amount) {
      alert("Please fill in all fields.");
      return;
    }

    const res = await fetch("http://localhost:8080/api/convert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, amount: Number(amount) }),
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Erro na conversão");
      return;
    }

    if (typeof data.result === "number") {
      // Always show two digits after the decimal point
      const str = data.result.toFixed(2);
      setResult(str);
    } else {
      setResult("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200" data-theme="dark">
      <div className="bg-base-100 p-8 rounded-2xl shadow-2xl w-full max-w-md border-4 border-primary/40 backdrop-blur-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-primary">Currency Converter</h1>
        <div className="mb-4">
          <select
            className="w-full p-2 mb-2 input input-bordered bg-white text-black"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            <option value="">Select source currency</option>
            {currencies.map((code) => (
              <option key={code} value={code}>{code}</option>
            ))}
          </select>

          <select
            className="w-full p-2 mb-2 input input-bordered bg-white text-black"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            <option value="">Select target currency</option>
            {currencies.map((code) => (
              <option key={code} value={code}>{code}</option>
            ))}
          </select>

          <input
            className="w-full p-2 border rounded input input-bordered bg-white text-black"
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button
          className="w-full btn btn-primary border rounded"
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