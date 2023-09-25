import { ENUM_USER_ROLE } from "../../../enum/userRole";

// Define your constants here
export const userRole = [ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER];

export const selectOptions = {
  id: true,
  name: true,
  email: true,
  role: true,
  contactNo: true,
  address: true,
  profileImg: true,
  createdAt: true,
  updatedAt: true,
};
