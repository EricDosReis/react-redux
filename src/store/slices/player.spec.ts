import { describe, expect, it } from "vitest";

import type { PlayerState } from "./player";
import { next, play, player as reducer } from "./player";

const initialStateMock: PlayerState = {
  course: {
    id: 1,
    modules: [
      {
        id: 1,
        title: "Iniciando com React",
        lessons: [
          { id: "Jai8w6K_GnY", title: "CSS Modules", duration: "13:45" },
          {
            id: "w-DW4DhDfcw",
            title: "Estilização do Post",
            duration: "10:05",
          },
        ],
      },
      {
        id: 2,
        title: "Estrutura da aplicação",
        lessons: [
          {
            id: "gE48FQXRZ_o",
            title: "Componente: Comment",
            duration: "13:45",
          },
          { id: "Ng_Vk4tBl0g", title: "Responsividade", duration: "10:05" },
        ],
      },
    ],
  },
  currentLessonIndex: 0,
  currentModuleIndex: 0,
  isLoading: true,
};

describe("playe slice", () => {
  it("should be able to play", () => {
    const state = reducer(
      initialStateMock,
      play({ lessonIndex: 1, moduleIndex: 0 })
    );

    expect(state.currentLessonIndex).toEqual(1);
    expect(state.currentModuleIndex).toEqual(0);
  });

  it("should be able to play next video automatically", () => {
    const state = reducer(initialStateMock, next());

    expect(state.currentLessonIndex).toEqual(1);
    expect(state.currentModuleIndex).toEqual(0);
  });

  it("should be able to jump to the next module automatically", () => {
    const lastVideoOfTheFirstModuleMock = {
      ...initialStateMock,
      currentLessonIndex: 1,
    };
    const state = reducer(lastVideoOfTheFirstModuleMock, next());

    expect(state.currentLessonIndex).toEqual(0);
    expect(state.currentModuleIndex).toEqual(1);
  });

  it("should not update the current module and lesson index if there is no next lesson available", () => {
    const lastVideoOfTheLastModuleMock = {
      ...initialStateMock,
      currentLessonIndex: 1,
      currentModuleIndex: 1,
    };
    const state = reducer(lastVideoOfTheLastModuleMock, next());

    expect(state.currentLessonIndex).toEqual(1);
    expect(state.currentModuleIndex).toEqual(1);
  });
});
