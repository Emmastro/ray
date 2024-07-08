import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post, setAuthToken } from "../../service/requestHandlers";

// Define the structure of the expected error response
type ErrorResponse = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(3),
  //   boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const response = await post("/login", { username, password });

      const token = response.data.access_token;
      localStorage.setItem("token", token);
      setAuthToken(token);
      navigate("/overview");
    } catch (error) {
      console.error("Error logging in", error);

      const typedError = error as ErrorResponse;
      const errorMessage =
        typedError.response?.data?.message ||
        "An error occurred. Please try again.";
      setErrorMessage(errorMessage);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <StyledContainer maxWidth="xs">
      <StyledBox>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <StyledTextField
            label="Username"
            variant="outlined"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <StyledTextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {errorMessage && (
            <Box mb={2}>
              <Alert severity="error">{errorMessage}</Alert>
            </Box>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
          <Box mt={2}>
            <Typography variant="body2">
              Don't have an account? <Link href="/register">Register</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="/reset-password">Forgot Password?</Link>
            </Typography>
          </Box>
        </form>
      </StyledBox>
    </StyledContainer>
  );
};

export default LoginPage;
