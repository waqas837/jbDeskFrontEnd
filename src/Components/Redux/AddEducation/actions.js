import {AddEducation,RemoveEducation} from "./constants";
export const addEducation = (addEducation) => ({
  type: AddEducation,
  addEducation,
});
//remove a single work
export const removeSinle = (id) => ({
  type: RemoveEducation,
  id,
});
