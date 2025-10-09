export type AdminUserType = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  profilePicture?: string | null;
  isAdmin: boolean;
  phone?: string;
  Address?: string;
  city?: string;
  country?: string;
  postcalcode?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
