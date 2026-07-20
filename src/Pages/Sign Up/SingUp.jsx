import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, GoogleAuthProvider,
  signInWithPopup,} from "firebase/auth";


import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../lib/Firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  // const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Save user information to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: data.name,
        email: data.email,
      });

      alert("User created successfully!");
      reset();
    } catch (error) {
      alert("Error creating user:", error);
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
 const { user } = useContext(UserContext);

  if (user) {
    return <Navigate to="/" replace />;
  }
  const navigate =useNavigate()

  

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
          Create Account
        </Typography>

        <Typography
          textAlign="center"
          color="text.secondary"
          mt={1}
          mb={4}
        >
          Join us today! It's quick and easy.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            {...register("name", {
              required: "Name is required",
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            fullWidth
            label="Email Address"
            type="email"
            margin="normal"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email",
              },
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
              },
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
                alt="Google"
                sx={{
                  width: 20,
                  height: 20,
                }}
              />
            }
          >
            Sign Up with Google
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

          {/* Submit */}
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
            Create Account
          </Button>

          <Typography
            textAlign="center"
            mt={3}
            color="text.secondary"
          >
            Already have an account?{" "}
            <Typography
              component="span"
              onClick={()=>navigate('/signin')}
              sx={{
                color: "primary.main",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Sign In
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
        Welcome!
      </Typography>

      <Typography
        variant="h6"
        sx={{
          maxWidth: 420,
          lineHeight: 1.8,
          opacity: 0.9,
        }}
      >
        Create your account to start building amazing
        applications with Firebase Authentication and
        Firestore. Fast, secure, and easy to use.
      </Typography>

      <Box
        component="img"
        src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
        alt="Illustration"
        sx={{
          width: 280,
          mt: 5,
        }}
      />
    </Box>
  </Box>
);
  
};

export default SignUp;