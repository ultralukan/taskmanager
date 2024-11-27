import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useRegisterMutation } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
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
      confirmPassword: '',
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

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const { confirmPassword, ...dataToSend } = formData;
        const response = await register(dataToSend);
        if (response.data) {
          // Успешная регистрация, переходим на страницу входа
          navigate('/login');
        }
      }catch(e){}
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

        <Box sx={{ mb: 2 }}>
          <TextField
            label="Подтверждение пароля"
            variant="outlined"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
            fullWidth
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          Зарегистрироваться
        </Button>
      </Box>
    </Box>
  );
};
