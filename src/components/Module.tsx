import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../store";
import { play } from "../store/slices/player";
import { Lesson } from "./Lesson";

interface ModuleProps {
  amountOfLessons: number;
  moduleIndex: number;
  title: string;
}

export function Module({ amountOfLessons, moduleIndex, title }: ModuleProps) {
  const { currentLessonIndex, currentModuleIndex } = useAppSelector((state) => {
    const { currentLessonIndex, currentModuleIndex } = state.player;

    return {
      currentLessonIndex,
      currentModuleIndex,
    };
  });

  const lessons = useAppSelector(
    (state) => state.player.course?.modules[moduleIndex].lessons
  );

  const dispatch = useAppDispatch();

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>

        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>

        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons &&
            lessons.map(({ duration, id, title }, index) => (
              <Lesson
                key={id}
                duration={duration}
                isCurrent={
                  currentModuleIndex === moduleIndex &&
                  currentLessonIndex === index
                }
                title={title}
                onPlay={() =>
                  dispatch(play({ moduleIndex, lessonIndex: index }))
                }
              />
            ))}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
