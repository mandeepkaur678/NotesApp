import * as yup from "yup";

//LoginSchema

export const loginSchema = yup.object({
    email: yup
    .string()
    .email("Invalid Email")
    .required("Email is required"),

    password: yup
    .string()
    .min(6,"Password must be at least 6 characters")
    .required("Password is required"),

})

//Register schema

export const RegisterSchema = yup.object({
    name: yup
    .string()
    .min(3,"Nmae must be at least 3 characters")
    .required("Name is required"),


    email:yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),

    password: yup
    .string()
    .min(6,"Password must be at least 6 characters")
    .matches(/[A-Z]/,"Password must contain at least one Uppercase letter")
    .matches(/[a-z]/,"Password must contain at least one lowercase letter")
    .matches(/[0-9]/,"Password must contain at least one number")
    .matches(/[@#$%^&*(){}:"<>?;',.]/,"Password must contain at least one special character")
    .required("Password is required"),

    confirmpassword: yup
    .string()
    .oneOf([yup.ref("password")],"Passwords do not match")
    .required("Confirm Password is required")
    
})