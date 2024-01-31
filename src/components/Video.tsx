import ReactPlayer from "react-player";

import { Loader } from "lucide-react";

import { useCurrentLesson } from "../hooks/useCurrentLesson";
import { useAppDispatch, useAppSelector } from "../store";
import { next } from "../store/slices/player";

export function Video() {
  const { currentLesson } = useCurrentLesson();
  const isLoading = useAppSelector((state) => state.player.isLoading);

  const dispatch = useAppDispatch();

  function handlePlayNext() {
    dispatch(next());
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <ReactPlayer
          width="100%"
          height="100%"
          controls
          playing
          onEnded={handlePlayNext}
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
        />
      )}
    </div>
  );
}
