const allRoles = {
  user: [] as string[],
  admin: ["getUsers", "manageUsers"],
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
