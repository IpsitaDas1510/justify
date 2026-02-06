"use client";

// Major concept to learn here: custom hook for CRUD on a single resource and state syncing.
import { useEffect, useState } from "react";
import { deleteCase, getCase, updateCase } from "@/lib/api";
import { Case, CaseStatus } from "@/types/case";
import { withBasePath } from "@/lib/routes";

// Hook files are `.ts` because they contain logic only (no JSX rendering).
// This hook handles view/edit/delete for a single case.
export function useCase(id: string | undefined) {
  // Local state for the case details + UI status.
  const [data, setData] = useState<Case | null>(null);
  const [status, setStatus] = useState<CaseStatus>("new");
  const [notes, setNotes] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch a single case from the API.
  const load = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const body = await getCase(id);
      setData(body);
      setStatus(body.status || "new");
      setNotes(body.notes || "");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load case";
      setMsg(message);
    } finally {
      setLoading(false);
    }
  };

  // Save status/notes back to the API.
  const save = async () => {
    if (!id) return;
    setMsg("");

    try {
      const body = await updateCase(id, { status, notes });
      setData(body);
      setMsg("Updated");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Update failed";
      setMsg(message);
    }
  };

  // Delete the case, then redirect to the list page.
  const remove = async () => {
    if (!id) return;
    setMsg("");

    try {
      await deleteCase(id);
      window.location.href = withBasePath("/cases");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Delete failed";
      setMsg(message);
    }
  };

  // Load case data whenever the id changes.
  useEffect(() => {
    load();
  }, [id]);

  // Expose state + actions to the UI.
  return {
    data,
    status,
    setStatus,
    notes,
    setNotes,
    msg,
    loading,
    save,
    remove,
    reload: load,
  };
}