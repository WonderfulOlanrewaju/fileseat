import React, { useState } from "react";
import SignupMan from "../assets/images/one-happy-man.jpg";
import { Formik, Form, Field } from "formik";
import { RightNavbar, LeftNavbarWhite } from "./Navbar";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { Spinner } from "../utils/index";

const SignupStyles = {
  background: {
    backgroundImage: "url(" + SignupMan + ")"
  }
};

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "Fullname cannot be lower than 3 characters!")
    .max(50, "Fullname cannot be more than 50 characters!")
    .required("Fullname is required!!!"),
  email: Yup.string()
    .email("This is not a valid email")
    .required("Email is required!"),
  password: Yup.string()
    .min(8, "Password cannot be lower than 8 characters!")
    .max(35, "Password cannot be higher than 35 characters!")
    .matches(
      /^[A-Za-z0-9_@./#&"+-]*$/,
      "alphabets, characters and special characters"
    )
    .required("Password is required!"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords do not match"
  )
});

export const Signup = () => {
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState(null);
  const handleSignup = (values, { resetForm }) => {
    setSubmitting(true);
    axios
      .post("http://localhost:3005/api/v1/users/register", values, {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => {
        console.log(response);
        setTimeout(() => history.push("/auth"), 2000);
      })
      .catch(err => {
        if (err.response) {
          setSubmitting(false);
          setErr(err.response.data);
        } else {
          console.log(err);
          setErr("unable to connect to server");
        }
      });
  };
  let history = useHistory();
  return (
    <div className="h-full flex">
      <div className="bg-cover m-0 w-1/2" style={SignupStyles.background}>
        <div className="m-10">
          <LeftNavbarWhite />
          <div className="w-4/5 bg-red-100 text-center text-red-500">
            {err ? err : null}
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-gray-200">
        <RightNavbar />
        <Formik
          onSubmit={handleSignup}
          validationSchema={SignupSchema}
          initialValues={{
            fullName: "",
            email: "",
            password: "",
            confirmPassword: ""
          }}
        >
          {({ errors, touched }) => (
            <Form className="max-w-sm w-full bg-white rounded-larger mx-auto my-32 p-8">
              <div className="text-center font-bold">Let's get started</div>
              <div className="text-center mb-8">
                Create a FS account to get all features
              </div>
              <div className="mb-4">
                <label className="font-semibold">Full name</label>
                <Field
                  name="fullName"
                  className="h-10 bg-indigo-100 border-indigo-700 border-b-2  w-full"
                />
                {errors.fullName && touched.fullName ? (
                  <div className="text-red-600 text-xs">{errors.fullName}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="font-semibold">Email</label>
                <Field
                  name="email"
                  className="h-10 bg-indigo-100 border-indigo-700 border-b-2  w-full"
                />
                {errors.email && touched.email ? (
                  <div className="text-red-600 text-xs"> {errors.email} </div>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="font-semibold">Password</label>
                <Field
                  name="password"
                  type="password"
                  autoComplete="true"
                  className="h-10 bg-indigo-100 border-indigo-700 border-b-2  w-full"
                />
                {errors.password && touched.password ? (
                  <div className="text-red-600 text-xs">{errors.password}</div>
                ) : null}
              </div>
              <div className="mb-6">
                <label className="font-semibold">Confirm Password</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  autoComplete="true"
                  className="h-10 bg-indigo-100 border-indigo-700 border-b-2  w-full"
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div className="text-red-600 text-xs">
                    {" "}
                    {errors.confirmPassword}
                  </div>
                ) : null}
              </div>
              <button
                className="rounded-full w-full bg-purple-600 h-10 text-white font-normal focus:outline-none"
                type="submit"
              >
                {submitting ? <Spinner /> : "Create account"}
              </button>
              <div className="text-center my-4 mx-auto text-sm">
                Already have an account? Log in{" "}
                <Link className="text-purple-600 font-bold" to="/auth">
                  here
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
