let undoStack = [];
let redoStack = [];
let currentState = getCurrentState();

function saveState() {
  undoStack.push(clone(currentState));
  // Clear redoStack after a new action
  redoStack = [];
}

function undo() {
  if (undoStack.length > 0) {
    redoStack.push(clone(currentState));
    currentState = undoStack.pop();
    applyState(currentState);
  }
}

function redo() {
  if (redoStack.length > 0) {
    undoStack.push(clone(currentState));
    currentState = redoStack.pop();
    applyState(currentState);
  }
}

function applyState(state) {
  // Code to apply the state to the quiz editor
}

function clone(state) {
  return JSON.parse(JSON.stringify(state)); // Deep copy the state
}

function onEditQuiz(newState) {
  saveState(); // Save the current state before making changes
  currentState = newState;
  applyState(currentState); // Apply the new state
}
