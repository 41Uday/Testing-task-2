import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import { Autocomplete } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import * as Yup from "yup";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./index.css";

const initialValues = {
  fullName: "",
  dept: "DRS",
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .matches(/./, "fullname is required")
    .required("fullname is required"),
  email: Yup.string()
    .email("invalid email format")
    .required("email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`[\]{}|\\:;"',./<>?])(?!.*\s).{8,}$/,
      "password contains one (uppercase,lowercase,digit)"
    )
    .required("password must contains 8 characters"),
});

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    axios
      .post("http://192.168.1.85:8095/api/signup", values)
      .then((res) => {
        toast.success(res.data, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          // window.location.href = "/login";
          navigate("/login", { replace: true });
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
    resetForm();
  };

  const toastMethod = () => (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );

  return (
    <div className="signup-container">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <Box noValidate sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        autoComplete="given-name"
                        name="fullName"
                        required
                        fullWidth
                        id="firstName"
                        label="Full Name"
                        autoFocus
                      />
                      <div className="error">
                        <ErrorMessage name="fullName" />
                      </div>
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                      />
                      <div className="error">
                        <ErrorMessage name="email" />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                      />
                      <div className="error">
                        <ErrorMessage name="password" />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth autoFocus={false}>
                        <InputLabel htmlFor="dropdown" autoFocus={false}>
                          Department
                        </InputLabel>
                        <Field
                          as={Select}
                          name="dept"
                          id="dropdown"
                          label="Department"
                          autoComplete="dropdown"
                          autoFocus={false}
                        >
                          <MenuItem value="DRS">DRS</MenuItem>
                          <MenuItem value="Sustainability">
                            Sustainability
                          </MenuItem>
                          <MenuItem value="MarketPlace">MarketPlace</MenuItem>
                        </Field>
                        <ErrorMessage name="dept" component="div" />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-start">
                    <Grid item>
                      <Link
                        to="/login"
                        variant="body2"
                        className="text-black hover:text-blue-600"
                      >
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            </Formik>
          </Box>
        </Container>
      </ThemeProvider>
      {toastMethod()}
    </div>
  );
}
