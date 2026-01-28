"use client";
import { useState, useEffect } from "react";
import { Quote } from "@/types/campaign";
import { getMotivationalQuote } from "@/services/api";

export default function QuoteDisplay() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const data = await getMotivationalQuote();
        setQuote(data);
      } catch (error) {
        console.error("Failed to fetch quote:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  if (loading) {
    return (
      <div className="bg-secondary text-black rounded-lg shadow-lg p-6 mb-8">
        <div className="text-center">
          <div className="loader mx-auto mb-2" />
          <p className="text-center">Loading inspiration...</p>
        </div>
      </div>
    );
  }

  if (!quote) {
    return null;
  }

  // console.log(quote);
  return (
    <div className="bg-secondary text-black rounded-lg border border-trinary shadow-lg p-6 mb-8">
      <div className="flex items-start space-x-4">
        <div className="text-4xl">"</div>
        <div className="flex-1">
          <p className="text-lg italic mb-2">{quote.quote}</p>
          <p className="text-right font-semibold">— {quote.author}</p>
        </div>
        <div className="text-4xl self-end">"</div>
      </div>
    </div>
  );
}
