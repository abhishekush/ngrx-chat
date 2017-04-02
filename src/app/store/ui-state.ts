export interface UiState{
  userId: number;
  currentThreadId: number;
}

export const INITIAL_UI_STATE: UiState = {
  userId: null,
  currentThreadId: null
}
