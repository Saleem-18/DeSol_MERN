import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const LoginForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post(`${apiBaseUrl}/api/auth/login`, values);
      localStorage.setItem("token", res.data.token);
      router.push("/car");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        style={{
          width: "100%",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                label="Email"
                name="email"
                fullWidth
                margin="normal"
                helperText={<ErrorMessage name="email" />}
                error={touched.email && !!errors.email}
              />
              <Field
                as={TextField}
                label="Password"
                name="password"
                type="password"
                fullWidth
                margin="normal"
                helperText={<ErrorMessage name="password" />}
                error={touched.password && !!errors.password}
              />
              {error && <Typography color="error">{error}</Typography>}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "20px" }}
                disabled={isSubmitting}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default LoginForm;
