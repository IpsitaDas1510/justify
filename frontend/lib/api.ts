// Major concept to learn here: data-access layer, typed responses, and centralized error handling.
import { API_BASE } from "@/lib/constants";
import { Case, CaseStatus, PredictionResult } from "@/types/case";

// Safely parse JSON responses (handles empty bodies and non-JSON text).
async function readJson(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

// Small fetch wrapper: builds the URL, parses JSON, and throws on non-OK.
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, options);
  const data = await readJson(res);

  if (!res.ok) {
    const message =
      typeof data?.error === "string" && data.error
        ? data.error
        : "Request failed";
    throw new Error(message);
  }

  return data as T;
}

// Ask the ML service to predict a legal category for the text.
export function predictCategory(text: string): Promise<PredictionResult> {
  return request<PredictionResult>("/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
}

// Create a new case record in the backend.
export function createCase(payload: {
  title: string;
  case_text: string;
}): Promise<{ id: number }> {
  return request<{ id: number }>("/cases", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// Fetch all cases for the list view.
export function getCases(): Promise<Case[]> {
  return request<Case[]>("/cases");
}

// Fetch a single case by id.
export function getCase(id: string): Promise<Case> {
  return request<Case>(`/cases/${id}`);
}

// Update the case status/notes.
export function updateCase(
  id: string,
  payload: { status: CaseStatus; notes: string }
): Promise<Case> {
  return request<Case>(`/cases/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// Delete a case by id.
export async function deleteCase(id: string): Promise<void> {
  await request<void>(`/cases/${id}`, { method: "DELETE" });
}