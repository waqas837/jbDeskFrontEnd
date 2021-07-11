import { AddEducation,RemoveEducation } from "./constants";
const addEducationReducer = (state = [], action) => {
  switch (action.type) {
    case AddEducation:
      var data = [...state, action.addEducation];
      localStorage.setItem("addEducation", JSON.stringify(data));
      return data;
      case RemoveEducation:
    const dataRomove = JSON.parse(localStorage.getItem("addEducation"));
    var resulst = dataRomove.filter((val) => val.id !== action.id);
    localStorage.setItem("addEducation", JSON.stringify(resulst));
    // whole data is managed by the return statement to the main store
      return resulst;
    default:
      return state;
  }
};
export default addEducationReducer;
