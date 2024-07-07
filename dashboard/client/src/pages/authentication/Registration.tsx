import { Alert, Box, Button, Container, Link, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post, setAuthToken } from "../../service/requestHandlers";

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

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [researchInterests, setResearchInterests] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const response = await post("/register", { 
        username,
        password,
        first_name: firstName,
        last_name: lastName,
        email,
        gender,
        date_of_birth: dateOfBirth,
        country,
        research_interests: researchInterests });

      const token = response.data.access_token;
      localStorage.setItem("token", token);
      setAuthToken(token);
      navigate("/overview");
    } catch (error) {
      console.error("Error registering", error);
      setErrorMessage("Invalid username or password. Please try again.");
    }
  };

  return (
    <StyledContainer maxWidth="xs">
      <StyledBox>
        <Typography variant="h4" gutterBottom>
          Register
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
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledTextField
            label="First Name"
            variant="outlined"
            fullWidth
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <StyledTextField
            label="Last Name"
            variant="outlined"
            fullWidth
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <StyledTextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledTextField
            label="Gender"
            variant="outlined"
            fullWidth
            required
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <StyledTextField
            label="Date of Birth"
            type="date"
            variant="outlined"
            fullWidth
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <StyledTextField
            label="Country"
            variant="outlined"
            fullWidth
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <StyledTextField
            label="Research Interests"
            variant="outlined"
            fullWidth
            multiline
            required
            rows={4}
            value={researchInterests}
            onChange={(e) => setResearchInterests(e.target.value)}
          />

          {errorMessage && (
            <Box mb={2}>
              <Alert severity="error">{errorMessage}</Alert>
            </Box>
          )}

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
          <Box mt={2}>
            <Typography variant="body2">
              Already have an account? <Link href="/login">Login</Link>
            </Typography>
          </Box>
        </form>
      </StyledBox>
    </StyledContainer>
  );
};

export default RegistrationPage;
