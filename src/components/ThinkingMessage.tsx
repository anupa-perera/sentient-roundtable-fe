import { getModelColor, getModelInitial, getModelShortName } from "../lib/colors";

/**
 * Inline thinking indicator shown in the chat timeline
 * when a model is active but hasn't started streaming tokens yet.
 */
export function ThinkingMessage({
  model,
  allModels
}: {
  model: string;
  allModels: string[];
}): JSX.Element {
  const color = getModelColor(model, allModels);
  const initials = getModelInitial(model);
  const shortName = getModelShortName(model);

  return (
    <div className="flex gap-3 animate-fade-in-fast">
      {/* Pulsing avatar */}
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${color.bg} animate-pulse-glow font-mono text-xs font-bold text-white`}
      >
        {initials}
      </div>

      {/* Thinking body */}
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className={`font-sans text-sm font-semibold ${color.text}`}>
            {shortName}
          </span>
          <span className="flex items-center gap-1 font-mono text-[10px] text-ember">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
            thinking
          </span>
        </div>
        <div className="rounded-xl rounded-tl-sm border border-ember/20 bg-ember/5 px-3.5 py-2.5 dark:border-ember/15 dark:bg-ember/5">
          <div className="flex items-center gap-1 py-1">
            <span className="h-2 w-2 animate-bounce rounded-full bg-ember/60 [animation-delay:0ms]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-ember/60 [animation-delay:150ms]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-ember/60 [animation-delay:300ms]" />
          </div>
        </div>
      </div>
    </div>
  );
}
