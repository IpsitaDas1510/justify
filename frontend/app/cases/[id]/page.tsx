"use client";

// Major concept to learn here: dynamic routes, route params, and detail views with CRUD.
import { useParams } from "next/navigation";
import CaseStatusForm from "@/components/CaseStatusForm";
import { useCase } from "@/hooks/useCase";

export default function CaseDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const {
    data,
    status,
    setStatus,
    notes,
    setNotes,
    msg,
    loading,
    save,
    remove,
  } = useCase(id);

  if (loading || !data) {
    return (
      <main className="max-w-3xl mx-auto p-6 text-gray-100">Loading...</main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6 text-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Case #{data.id}</h1>
      </header>

      {msg && <p className="text-sm text-gray-300">{msg}</p>}

      {/* Case Info */}
      <div className="border border-gray-700 rounded p-4 space-y-2 bg-gray-900">
        <div className="text-xl font-semibold text-gray-100">{data.title}</div>
        <div className="text-sm text-gray-400">
          category: {data.predicted_category} • status: {data.status}
        </div>
        <pre className="whitespace-pre-wrap text-sm mt-3 border border-gray-700 rounded p-3 bg-gray-800 text-gray-100">
          {data.case_text}
        </pre>
      </div>

      <CaseStatusForm
        status={status}
        notes={notes}
        onStatusChange={setStatus}
        onNotesChange={setNotes}
        onSave={save}
        onDelete={remove}
      />
    </main>
  );
}
