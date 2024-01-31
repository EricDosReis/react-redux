import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { api } from "../../lib/axios";

interface Lesson {
  id: string;
  title: string;
  duration: string;
}

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}
interface Course {
  id: number;
  modules: Module[];
}
export interface PlayerState {
  course: Course | null;
  currentLessonIndex: number;
  currentModuleIndex: number;
  isLoading: boolean;
}

const initialState: PlayerState = {
  course: null,
  currentLessonIndex: 0,
  currentModuleIndex: 0,
  isLoading: true,
};

export const loadCourse = createAsyncThunk("player/load", async () => {
  const response = await api.get("/courses/1");

  return response.data;
});

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    play(
      state,
      action: PayloadAction<{ lessonIndex: number; moduleIndex: number }>
    ) {
      state.currentModuleIndex = action.payload.moduleIndex;
      state.currentLessonIndex = action.payload.lessonIndex;
    },
    next(state) {
      const nextLessonIndex = state.currentLessonIndex + 1;
      const nextLesson =
        state.course?.modules[state.currentModuleIndex].lessons[
          nextLessonIndex
        ];

      if (nextLesson) {
        state.currentLessonIndex = nextLessonIndex;

        return;
      }

      const nextModuleIndex = state.currentModuleIndex + 1;
      const nextModule = state.course?.modules[nextModuleIndex];

      if (nextModule) {
        state.currentModuleIndex = nextModuleIndex;
        state.currentLessonIndex = 0;
      }

      return;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadCourse.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loadCourse.fulfilled, (state, action) => {
      state.course = action.payload;
      state.isLoading = false;
    });
  },
});

export const player = playerSlice.reducer;

export const { next, play } = playerSlice.actions;
