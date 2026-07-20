import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { auth } from "../../lib/Firebase";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      alert("Login Successful!");
      reset();
      navigate("/");
    } catch (error) {
      alert("Invalid email or password");
    }
  };
  const provider = new GoogleAuthProvider();
  const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    console.log(result.user);

  } catch (error) {
    console.log(error);
  }
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        bgcolor: "#f4f7fc",
        p: { xs: 2, md: 3 },
        gap: 3,
      }}
    >
      {/* Left Side */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            width: "100%",
            maxWidth: 450,
            p: 5,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            color="primary"
          >
            Welcome Back
          </Typography>

          <Typography
            textAlign="center"
            color="text.secondary"
            mt={1}
            mb={4}
          >
            Sign in to continue to your account.
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              margin="normal"
              {...register("email", {
                required: "Email is required",
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",    
                }
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            {/* Google Button */}
            <Button
              fullWidth
              onClick={googleLogin}
              variant="outlined"
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                backgroundColor: "#fff",
                color: "#3c4043",
                borderColor: "#dadce0",
                "&:hover": {
                  backgroundColor: "#f8f9fa",
                },
              }}
              startIcon={
                <Box
                  component="img"
                  src="https://developers.google.com/identity/images/g-logo.png"
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              }
            >
              Sign In with Google
            </Button>

            {/* Divider */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                my: 3,
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  height: 1,
                  bgcolor: "#ddd",
                }}
              />

              <Typography
                sx={{
                  mx: 2,
                  color: "text.secondary",
                }}
              >
                OR
              </Typography>

              <Box
                sx={{
                  flex: 1,
                  height: 1,
                  bgcolor: "#ddd",
                }}
              />
            </Box>

            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: "bold",
                textTransform: "none",
                fontSize: 16,
                background:
                  "linear-gradient(90deg,#4F46E5,#7C3AED)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg,#4338CA,#6D28D9)",
                },
              }}
            >
              Sign In
            </Button>

            <Typography
              textAlign="center"
              mt={3}
              color="text.secondary"
            >
              Don't have an account?{" "}
              <Typography
                component="span"
                onClick={()=>navigate('/signup')}
                sx={{
                  color: "primary.main",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </Typography>
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Right Side */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          borderRadius: 5,
          color: "#fff",
          background:
            "linear-gradient(135deg,#4F46E5,#7C3AED,#9333EA)",
          p: 6,
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          mb={3}
        >
          Welcome Back!
        </Typography>

        <Typography
          variant="h6"
          sx={{
            maxWidth: 420,
            lineHeight: 1.8,
            opacity: 0.9,
          }}
        >
          Sign in to access your dashboard, manage your
          projects, and continue where you left off.
        </Typography>

        <Box
          component="img"
          src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
          alt="Welcome"
          sx={{
            width: 280,
            mt: 5,
          }}
        />
      </Box>
    </Box>
  );
};

export default Signin;