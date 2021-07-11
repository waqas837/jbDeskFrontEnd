import { Addwork,Removework } from "./constants";
const addWorkReducer = (state = [], action) => {
  switch (action.type) {
    case Addwork:
      var data = [...state, action.showWork];
      localStorage.setItem("addwork", JSON.stringify(data));
      return data;
      case Removework:
    const dataRomove = JSON.parse(localStorage.getItem("addwork"));
    var resulst = dataRomove.filter((val) => val.id !== action.id);
    localStorage.setItem("addwork", JSON.stringify(resulst));
    // whole data is managed by the return statement to the main store
      return resulst;
    default:
      return state;
  }
};
export default addWorkReducer;
