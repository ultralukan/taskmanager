import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/authSlice";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: any) => state.auth.access_token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Список задач
        </Typography>
        <Box>
          {!isAuthenticated ? (
            <>
              <Button
                color="inherit"
                onClick={() => navigate("/register")}
              >
                Регистрация
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate("/login")}
              >
                Вход
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              onClick={handleLogout}
            >
              Выход
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
