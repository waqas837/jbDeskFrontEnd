import { AddSkills,RemoveSkills } from "./constants";
const addSkillsReducer = (state = [], action) => {
  switch (action.type) {
    case AddSkills:
      var data = [...state, action.addSkills];
      localStorage.setItem("addskills", JSON.stringify(data));
      return data;
      case RemoveSkills:
    const dataRomove = JSON.parse(localStorage.getItem("addskills"));
    var resulst = dataRomove.filter((val) => val.id !== action.id);
    localStorage.setItem("addskills", JSON.stringify(resulst));
    // whole data is managed by the return statement to the main store
      return resulst;
    default:
      return state;
  }
};
export default addSkillsReducer;
