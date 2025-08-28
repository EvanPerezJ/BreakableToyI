import { useState, useEffect } from "react";
import type { Metrics } from "./ColumnsM";

const API_URL = "http://localhost:9090";

export const useMetrics = () => {
  const [metrics, setMetrics] = useState<Metrics[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/metrics`)
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching metrics");
        return res.json();
      })
      .then(setMetrics)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { metrics, loading, error };
};