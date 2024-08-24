import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string().required("*Name is required"),
  email: yup
    .string()
    .required("*Email is required")
    .email("*Invalid email format"),
  gender: yup.string().required("*Gender is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "*Phone number must be 10 digits")
    .required("*Phone number is required"),
  password: yup
    .string()
    .required("*Password is required")
    .min(8, "*Password must be at least 8 characters")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "*Password must contain at least one symbol"
    )
    .matches(/[0-9]/, "*Password must contain at least one number")
    .matches(/[A-Z]/, "*Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "*Password must contain at least one lowercase letter"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "*Passwords must match")
    .required("*Confirm password is required"),
  accept: yup
    .boolean()
    .oneOf([true], "*You must accept the terms and conditions"),
});
