import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { useAuthContext } from "../../../contexts/AuthContext";
import * as yup from "yup";

interface ILoginProps {
  children: React.ReactNode;
}

const loginSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required().min(6),
});

export const Login: React.FC<ILoginProps> = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const { isAuthenticated, signIn } = useAuthContext();

  const handleSubmit = () => {
    loginSchema
      .validate({ email, password }, { abortEarly: false })
      .then((dadosValidados) => {
        signIn(dadosValidados.email, dadosValidados.password);
      })
      .catch((errors: yup.ValidationError) => {
        errors.inner.forEach((error) => {
          if (error.path === "email") setEmailError(error.message);
          else setPasswordError(error.message);
        });
      });
  };

  if (!isAuthenticated) return <>{children}</>;
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2} width={250}>
            <Typography variant="h6">Identifique-se</Typography>

            <TextField
              fullWidth
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              onKeyDown={() => setEmailError("")}
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              onKeyDown={() => setPasswordError("")}
            />
          </Box>
        </CardContent>

        <Box width="100%" display="flex" justifyContent="center" mb={2}>
          <Button onClick={handleSubmit}>Entrar</Button>
        </Box>
        <Typography>Ainda não é inscrito?</Typography>
      </Card>
    </Box>
  );
};
