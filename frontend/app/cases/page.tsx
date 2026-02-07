"use client";

// Major concept to learn here: list pages, data loading via hooks, and empty/loading states.
import CaseListItem from "@/components/CaseListItem";
import { useCases } from "@/hooks/useCases";

export default function CasesListPage() {
  const { cases, loading } = useCases();

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6 text-gray-100">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Cases</h1>
        <p className="text-sm text-gray-400">
          Recent saved cases. Click any case to open details.
        </p>
      </header>

      <section className="space-y-3">
        {loading ? (
          <div className="border border-gray-800 bg-gray-900 rounded p-4 text-sm text-gray-300">
            Loading cases...
          </div>
        ) : cases.length === 0 ? (
          <div className="border border-gray-800 bg-gray-900 rounded p-6 space-y-2">
            <p className="font-semibold">No cases yet</p>
            <p className="text-sm text-gray-400">
              Go to <span className="text-blue-400">New Case</span> to create
              your first one.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {cases.map((c) => (
              <CaseListItem key={c.id} item={c} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
