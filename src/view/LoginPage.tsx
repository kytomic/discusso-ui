import { Box, Button, Link, Paper, TextField, Typography } from '@mui/material';
import { Color, FontColor } from '../common/enum/color.enum';
import loginBg from '../assets/login_bg.png';
import loginFormBg from '../assets/login_form_bg.jpg';
import { useRef, useState, type JSX } from 'react';
import { login } from '../controller/auth/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { UserLoginSchema } from '../model/schema/User.schema';
import { useNavigate } from 'react-router-dom';
import { generateValidationErrorMessage } from '../common/util/validation-error.util';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../slice/user.slice';

interface LoginPageProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const alertTextRef = useRef<HTMLElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserLoginSchema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const populateAlertText = (text: string) => {
    if (alertTextRef.current) {
      alertTextRef.current.style.display = 'block';
      alertTextRef.current.textContent = text;
    }
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const { userId } = await login(username, password);
      dispatch(setUserInfo({ userId, username }));
      populateAlertText('Login Successfully!');
      navigate('/chat');
    } catch (error) {
      console.error(error);
      populateAlertText('Login Unsucessfully... Please retry!');
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Box
        component="img"
        src={loginBg}
        sx={{
          height: '100vh',
          width: '50vw',
          display: { lg: 'block', md: 'none', xs: 'none', sm: 'none' },
        }}
        alt="Login background"
      />
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Color.PRIMARY,
          width: '100%',
          height: '100vh',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={loginFormBg}
          alt="Login background"
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        />
        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            textAlign: 'center',
            height: '70vh',
            width: { lg: '40vw', md: '50vw', sm: '70vw' },
            padding: '5rem 2rem',
          }}
        >
          <Typography variant="h4" align="center" color={FontColor.PRIMARY} fontWeight={550}>
            Login
          </Typography>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <TextField
              label="Username"
              variant="outlined"
              sx={{ width: '90%' }}
              {...register('username')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              sx={{ width: '90%' }}
              {...register('password')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
            <Typography variant="body2" color="error"></Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 2,
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              sx={{ width: '10vw', my: 2 }}
              onClick={handleSubmit((data) => handleLogin(data.username, data.password))}
            >
              Login
            </Button>
            {errors && generateValidationErrorMessage(errors, ['username', 'password'])}
            <Typography ref={alertTextRef} variant="body2" color="error"></Typography>
            <Link href="/signUp">Don&apos;t have an account? Register here!</Link>
            <Link>Forgot password?</Link>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default LoginPage;
