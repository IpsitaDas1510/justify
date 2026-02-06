// Major concept to learn here: derived UI state, conditional rendering, and mapping data to display.
import { LEGAL_LABEL } from "@/lib/constants";
import { withBasePath } from "@/lib/routes";

// Props for showing the ML prediction results.
type CasePreviewProps = {
  pred: string | null;
  scores: Record<string, number> | null;
  savedId?: number | null;
};

// Shows the predicted category, confidence list, and link to saved case.
export default function CasePreview({
  pred,
  scores,
  savedId,
}: CasePreviewProps) {
  // Convert raw label to a friendly display name.
  const displayCategory = pred ? LEGAL_LABEL[pred] || pred : null;

  // If nothing predicted yet, render nothing.
  if (!displayCategory) {
    return null;
  }

  return (
    <section className="border border-gray-800 bg-gray-900 rounded p-4 space-y-3">
      <div>
        <p className="text-sm text-gray-400">Suggested A Lawyer</p>
        <p className="text-xl font-semibold text-gray-100">
          {displayCategory}
        </p>
      </div>

      {scores && (
        <div className="pt-2">
          <p className="text-sm font-medium mb-2 text-gray-300">
            Confidence
          </p>
          <ul className="text-sm space-y-1">
            {/* Sort by highest confidence first */}
            {Object.entries(scores)
              .sort((a, b) => b[1] - a[1])
              .map(([k, v]) => (
                <li key={k} className="flex justify-between text-gray-200">
                  <span>{LEGAL_LABEL[k] || k}</span>
                  <span>{(v * 100).toFixed(1)}%</span>
                </li>
              ))}
          </ul>
        </div>
      )}

      {savedId && (
        <a
          className="text-blue-400 hover:text-blue-300 underline"
          href={withBasePath(`/cases/${savedId}`)}
        >
          Open saved case #{savedId}
        </a>
      )}
    </section>
  );
}