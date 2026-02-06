// Major concept to learn here: list rendering, typed props, and linking to dynamic routes.
import { Case } from "@/types/case";
import { withBasePath } from "@/lib/routes";

// Props for a single item in the cases list.
type CaseListItemProps = {
  item: Case;
};

// Clickable list row that links to the case detail page.
export default function CaseListItem({ item }: CaseListItemProps) {
  return (
    <a
      href={withBasePath(`/cases/${item.id}`)}
      className="block border border-gray-800 bg-gray-900 rounded p-4 hover:border-blue-600 transition"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-semibold text-gray-100">
            {item.title}
          </div>
          <div className="mt-1 text-sm text-gray-400">
            category:{" "}
            <span className="text-gray-200">
              {item.predicted_category}
            </span>
            {" • "}
            status:{" "}
            <span className="text-gray-200">{item.status}</span>
          </div>
        </div>

        <div className="text-sm text-blue-400 shrink-0">Open →</div>
      </div>
    </a>
  );
}