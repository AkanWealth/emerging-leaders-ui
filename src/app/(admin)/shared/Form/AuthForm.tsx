import React from "react";

export type AuthFormData<M extends "login" | "signup" | "forgot-password"> =
  M extends "signup"
    ? Omit<UserType, "id"> & { password: string }
    : M extends "login"
    ? { emailOrUsername: string; password: string }
    : Pick<UserType, "email">;

const AuthForm = <M extends "login" | "signup" | "forgot-password">({
  mode,
}: {
  mode: M;
}) => {
  return <div>AuthForm</div>;
};

export default AuthForm;
