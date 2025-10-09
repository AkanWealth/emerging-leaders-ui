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
  postalcode?: string | number;
  createdAt?: Date;
  updatedAt?: Date;
};
