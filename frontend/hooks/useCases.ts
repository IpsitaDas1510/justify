"use client";

// Major concept to learn here: custom hooks for data loading, side effects, and UI state.
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCases } from "@/lib/api";
import { Case } from "@/types/case";

// Hook files are `.ts` because they contain logic only (no JSX rendering).
// This hook loads the list of cases for the cases page.
export function useCases() {
  // Local state for list data + loading UI.
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all cases from the API.
  const load = async () => {
    setLoading(true);
    try {
      const data = await getCases();
      setCases(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load cases";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Load once on first render.
  useEffect(() => {
    load();
  }, []);

  // Expose list data and a reload helper.
  return { cases, loading, reload: load };
}
