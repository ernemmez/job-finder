import * as yup from "yup";

export const LoginSchema = yup.object({
  email: yup.string().email("auth.validation.email.required").required("auth.validation.email.required"),
  password: yup.string().required("auth.validation.password.required"),
});
