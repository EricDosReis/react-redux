import { Video } from "lucide-react";

interface LessonProps {
  duration: string;
  onPlay: () => void;
  title: string;
}

export function Lesson({ duration, onPlay, title }: LessonProps) {
  return (
    <button
      className="flex items-center gap-3 text-sm text-zinc-400"
      onClick={onPlay}
    >
      <Video className="w-4 h-4 text-zinc-500" />

      <span>{title}</span>
      <span className="ml-auto font-mono text-xs text-zinc-500">
        {duration}
      </span>
    </button>
  );
}
