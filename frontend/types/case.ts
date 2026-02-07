export type CaseStatus =
  | "new"
  | "reviewing"
  | "resolved"
  | "needs_clarification";

export type Case = {
  id: number;
  title: string;
  case_text: string;
  predicted_category: string;
  status: CaseStatus;
  notes?: string | null;
};

export type PredictionResult = {
  category: string;
  scores?: Record<string, number>;
};
