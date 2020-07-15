import {
  IMPORT_APP, LOCK_CONSTANTS, LOCK_FUNCTIONS, LOCK_PREDICATES, SET_CONSTANTS, SET_FUNCTIONS,
  SET_PREDICATES
} from "../constants/action_types";
import {RULE_CONSTANTS, RULE_FUNCTIONS, RULE_PREDICATES} from "../constants/parser_start_rules";

let functions = require('./functions');

let state = {};
let structure = null;

function languageReducer(s, action, struct) {
  state = copyState(s);
  structure = struct;
  switch (action.type) {
    case SET_CONSTANTS:
      functions.parseText(action.value, state.constants, {startRule: RULE_CONSTANTS});
      setConstants();
      setPredicates();
      setFunctions();
      return state;
    case SET_PREDICATES:
      functions.parseText(action.value, state.predicates, {startRule: RULE_PREDICATES});
      setPredicates();
      setConstants();
      setFunctions();
      return state;
    case SET_FUNCTIONS:
      functions.parseText(action.value, state.functions, {startRule: RULE_FUNCTIONS});
      setFunctions();
      setPredicates();
      setConstants();
      return state;
    case LOCK_CONSTANTS:
      state.constants.locked = !state.constants.locked;
      return state;
    case LOCK_PREDICATES:
      state.predicates.locked = !state.predicates.locked;
      return state;
    case LOCK_FUNCTIONS:
      state.functions.locked = !state.functions.locked;
      return state;
    case IMPORT_APP:
      setConstants();
      setPredicates();
      setFunctions();
      return state;
    default:
      return state;
  }
}

function setConstants() {
  if (!state.constants.parsed) {
    return;
  }
  state.constants.errorMessage = structure.setLanguageConstants(state.constants.parsed);
}

function setPredicates() {
  if (!state.predicates.parsed) {
    return;
  }
  state.predicates.errorMessage = structure.setLanguagePredicates(state.predicates.parsed);
}

function setFunctions() {
  if (!state.functions.parsed) {
    return;
  }
  state.functions.errorMessage = structure.setLanguageFunctions(state.functions.parsed);
}

const copyState = (state) => ({
  ...state,
  constants: {...state.constants},
  predicates: {...state.predicates},
  functions: {...state.functions}
});

export default languageReducer;