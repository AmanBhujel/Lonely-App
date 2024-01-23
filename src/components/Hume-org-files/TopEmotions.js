import { Emotion } from "./emotion";


export function TopEmotions({ className, emotions, numEmotions }) {
  className = className || "";

  return (
    <div className={`${className}`}>
      {emotions
        .sort((a, b) => b.score - a.score)
        .slice(0, numEmotions)
        .map((emotion, i) => (
          <div key={i} className="mb-3 flex rounded-full border border-neutral-200 text-sm shadow">
            <div className="flex w-10 justify-center rounded-l-full bg-white py-2 pl-5 pr-4 font-medium text-neutral-800">
              <span>{i + 1}</span>
            </div>
            <div className="w-48 bg-neutral-800 px-4 py-2 lowercase text-white">
              <span>{emotion.name}</span>
            </div>
            <div className="flex w-20 justify-center rounded-r-full bg-white py-2 pr-4 pl-3 font-medium text-neutral-800">
              <span>{emotion.score.toFixed(3)}</span>
            </div>
          </div>
        ))}
    </div>
  );
}

TopEmotions.defaultProps = {
  numEmotions: 3,
};


