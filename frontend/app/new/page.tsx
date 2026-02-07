"use client";

// Major concept to learn here: client component state, form flow, and async actions.
import { useState } from "react";
import toast from "react-hot-toast";
import CaseForm from "@/components/CaseForm";
import CasePreview from "@/components/CasePreview";
import { createCase } from "@/lib/api";
import { usePredict } from "@/hooks/usePredict";

export default function NewCasePage() {
  const [title, setTitle] = useState("");
  const [caseText, setCaseText] = useState("");
  const [savedId, setSavedId] = useState<number | null>(null);
  const { pred, scores, predict } = usePredict();

  async function handlePredict() {
    setSavedId(null);
    await predict(caseText);
  }

  async function handleSaveCase() {
    if (!title.trim() || !caseText.trim()) {
      toast.error("Title and case text are required");
      return;
    }

    try {
      const data = await createCase({
        title,
        case_text: caseText,
      });
      setSavedId(data.id);
      toast.success("Saved to DB");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Save failed";
      toast.error(message);
    }
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6 text-gray-100">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">New Legal Intake</h1>
        <p className="text-sm text-gray-400">
          Paste the case description, get an ML suggestion, then save it.
        </p>
      </header>

      <CaseForm
        title={title}
        caseText={caseText}
        onTitleChange={setTitle}
        onCaseTextChange={setCaseText}
        onPredict={handlePredict}
        onSave={handleSaveCase}
        canPredict={!!caseText.trim()}
        canSave={!!title.trim() && !!caseText.trim()}
      />

      <CasePreview pred={pred} scores={scores} savedId={savedId} />
    </main>
  );
}
