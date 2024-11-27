import {Route, Routes,} from "react-router-dom";
import { LoginPage } from './pages/Login';
import { MainPage } from './pages/Main';
import { RegistrationPage } from './pages/Registration';
import { Layout } from './layouts/Layout';
import { PrivateRoute } from './layouts/PrivateRoute';
import { Alert, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setInfo } from './slices/errorInfoSlice';

function App() {
  const dispatch = useDispatch();
  const error = useSelector((state: any) => state.errorInfo.error);
  const info = useSelector((state: any) => state.errorInfo.info);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout  />}>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegistrationPage/>}/>
          <Route path="/" element={<PrivateRoute  />}>
            <Route path="/main" element={<MainPage/>}/>
          </Route>
        </Route>
      </Routes>
      <Snackbar
        open={!!error || !!info}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => {
          dispatch(setError(''))
          dispatch(setInfo(''))
        }}
      >
        <div>
          {
            info && (
              <Alert severity={"success"} sx={{ width: '100%', marginBottom: '16px'}}>
                {info}
              </Alert>
            )
          }
          {
            error && (
              <Alert severity={"error"} sx={{ width: '100%'}}>
                {error}
              </Alert>
            )
          }
        </div>
      </Snackbar>
    </>
  );
}

export default App;
