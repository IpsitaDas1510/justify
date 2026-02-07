"use client";

// Major concept to learn here: encapsulating async actions + derived UI state in a custom hook.
import { useState } from "react";
import toast from "react-hot-toast";
import { predictCategory } from "@/lib/api";
import { PredictionResult } from "@/types/case";

// Hook files are `.ts` because they contain logic only (no JSX rendering).
// This hook handles ML prediction requests and stores results.
export function usePredict() {
  // Local state for prediction output.
  const [pred, setPred] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number> | null>(null);

  // Call the API and store the prediction.
  const predict = async (text: string) => {
    if (!text.trim()) {
      toast.error("Please enter case text");
      return;
    }

    try {
      const data: PredictionResult = await predictCategory(text);
      setPred(data.category);
      setScores(data.scores || null);
      toast.success("Prediction ready");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Prediction failed";
      toast.error(message);
    }
  };

  // Clear the prediction state.
  const reset = () => {
    setPred(null);
    setScores(null);
  };

  return { pred, scores, predict, reset };
}
