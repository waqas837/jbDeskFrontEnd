import { combineReducers } from "redux";
import addWorkReducer from "./Addwork/addWorkReducer";
import addEducationReducer from "./AddEducation/addEducationReducer";
import addSkillsReducer from "./AddSkills/addSkillsReducer";

export default combineReducers({
  addWorkReducer,
  addEducationReducer,
  addSkillsReducer,
});
