// Major concept to learn here: controlled form inputs, props for state lifting, and button gating.
// Props for the main case submission form.
type CaseFormProps = {
  title: string;
  caseText: string;
  onTitleChange: (value: string) => void;
  onCaseTextChange: (value: string) => void;
  onPredict: () => void;
  onSave: () => void;
  canPredict: boolean;
  canSave: boolean;
};

// Controlled form: parent owns the state, this component renders inputs/buttons.
export default function CaseForm({
  title,
  caseText,
  onTitleChange,
  onCaseTextChange,
  onPredict,
  onSave,
  canPredict,
  canSave,
}: CaseFormProps) {
  return (
    <section className="space-y-3 border border-gray-800 bg-gray-900 rounded p-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-300">Title</label>
        <input
        suppressHydrationWarning 
          className="w-full border border-gray-700 rounded p-2 bg-gray-800 text-gray-100 placeholder-gray-400"
          value={title}
          // Bubble the new value up to the parent state.
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="e.g. Contract dispute about payment"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-300">Case Text</label>
        <textarea
          className="w-full border border-gray-700 rounded p-2 min-h-[160px] bg-gray-800 text-gray-100 placeholder-gray-400"
          value={caseText}
          // Bubble the new value up to the parent state.
          onChange={(e) => onCaseTextChange(e.target.value)}
          placeholder="Paste the case description here..."
        />
      </div>

      <div className="flex gap-3">
        <button
          className="bg-gray-100 text-black rounded px-4 py-2 disabled:opacity-50"
          onClick={onPredict}
          // Block until the form is valid enough to predict.
          disabled={!canPredict}
        >
          Predict Category
        </button>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 disabled:opacity-50"
          onClick={onSave}
          // Block until we have the required info to save.
          disabled={!canSave}
        >
          Save Case
        </button>
      </div>
    </section>
  );
}