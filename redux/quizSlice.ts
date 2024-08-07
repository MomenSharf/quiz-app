import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EditorState {
  past: string[];
  present: string;
  future: string[];
}

const initialState: EditorState = {
  past: [],
  present: '',
  future: [],
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setText(state, action: PayloadAction<string>) {
      state.past.push(state.present);
      state.present = action.payload;
      state.future = [];
    },
    undo(state) {
      if (state.past.length) {
        state.future.push(state.present);
        state.present = state.past.pop()!;
      }
    },
    redo(state) {
      if (state.future.length) {
        state.past.push(state.present);
        state.present = state.future.pop()!;
      }
    },
  },
});

export const { setText, undo, redo } = editorSlice.actions;
export default editorSlice.reducer;
