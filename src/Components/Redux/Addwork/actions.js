import { Addwork,Removework} from "./constants";
export const addwork = (showWork) => ({
  type: Addwork,
  showWork,
});
//remove a single work
export const removeSinle = (id) => ({
  type: Removework,
  id,
});
