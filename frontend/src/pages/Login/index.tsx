import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useLoginMutation } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../slices/authSlice";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginApi] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
    };

    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Электронная почта обязательна";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Пароль обязателен";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await loginApi(formData);
        if (response.data) {
          dispatch(login({
            access_token: response.data.token,
            email: formData.email
          }));
          navigate('/main');
        } else {
          console.error('Ошибка при логине', response.error);
        }
      } catch (e) {
        console.error('Ошибка при логине:', e);
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 400,
          backgroundColor: '#fff',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Электронная почта"
            variant="outlined"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
            fullWidth
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            label="Пароль"
            variant="outlined"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
            fullWidth
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          Войти
        </Button>
      </Box>
    </Box>
  );
};
