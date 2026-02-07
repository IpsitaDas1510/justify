// Major concept to learn here: form state via props, union types, and update callbacks.
import { CaseStatus } from "@/types/case";

// Props for the reviewer status/notes form.
type CaseStatusFormProps = {
  status: CaseStatus;
  notes: string;
  onStatusChange: (value: CaseStatus) => void;
  onNotesChange: (value: string) => void;
  onSave: () => void;
  onDelete: () => void;
};

// Form for reviewers to update status/notes on a case.
export default function CaseStatusForm({
  status,
  notes,
  onStatusChange,
  onNotesChange,
  onSave,
  onDelete,
}: CaseStatusFormProps) {
  return (
    <div className="border border-gray-700 rounded p-4 space-y-4 bg-gray-900">
      <h2 className="font-semibold text-gray-100">Reviewer Update</h2>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-300">Status</label>
        <select
          className="border border-gray-700 rounded p-2 bg-gray-800 text-gray-100"
          value={status}
          // Convert string from the select into our CaseStatus union.
          onChange={(e) => onStatusChange(e.target.value as CaseStatus)}
        >
          <option value="new">new</option>
          <option value="reviewing">reviewing</option>
          <option value="resolved">resolved</option>
          <option value="needs_clarification">needs_clarification</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-300">Notes</label>
        <textarea
          className="w-full border border-gray-700 rounded p-2 min-h-[120px] bg-gray-800 text-gray-100 placeholder-gray-400"
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Add internal review notes..."
        />
      </div>

      <div className="flex gap-3">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
          onClick={onSave}
        >
          Save
        </button>
        <button
          className="border border-gray-600 rounded px-4 py-2 text-gray-200 hover:bg-gray-800"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}