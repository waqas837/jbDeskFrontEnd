import { AddSkills,RemoveSkills} from "./constants";
export const addSkills = (addSkills) => ({
  type: AddSkills,
  addSkills,
});
//remove a single work
export const removeSinle = (id) => ({
  type: RemoveSkills,
  id,
});
