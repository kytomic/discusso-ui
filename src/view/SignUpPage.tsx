import { Box, Button, InputLabel, Paper, TextField, Typography, Link } from '@mui/material';
import { useRef, useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import loginFormBg from '../assets/login_form_bg.jpg';
import { Color, FontColor } from '../common/enum/color.enum';
import { signUp } from '../controller/auth/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { UserSignUpSchema } from '../model/schema/User.schema';
import { generateValidationErrorMessage } from '../common/util/validation-error.util';

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const alertTextRef = useRef<HTMLElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserSignUpSchema),
  });
  const navigate = useNavigate();

  const populateAlertText = (text: string) => {
    if (alertTextRef.current) {
      alertTextRef.current.style.display = 'block';
      alertTextRef.current.textContent = text;
    }
  };
  const handleRegister = async (
    username: string,
    email: string,
    password: string,
    confirmPassword: string | undefined,
  ) => {
    try {
      if (password !== confirmPassword) {
        populateAlertText('Passwords do not match');
        return;
      }

      const response: unknown = await signUp(username, password, email);
      navigate('/login');
      console.log(response);
    } catch (error) {
      console.error(error);
      populateAlertText('Unexpected error occurred. Please try again later.');
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', height: '100vh', width: '100vw', position: 'relative' }}>
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
        <Box sx={{ display: 'flex', flexDirection: 'column', m: 'auto' }}>
          <Paper
            elevation={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4rem 4rem 2rem 4rem',
            }}
          >
            <QuestionAnswerIcon sx={{ color: FontColor.PRIMARY, fontSize: '3rem' }} />
            <Typography variant="h4" color={FontColor.PRIMARY}>
              Discusso
            </Typography>
            <Typography variant="h6" color={FontColor.PRIMARY}>
              Create your account
            </Typography>
            <Box
              my={3}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <TextField
                variant="outlined"
                label="Username"
                sx={{ width: '350px' }}
                size="medium"
                {...register('username')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              />
              <TextField
                label="Email Address"
                variant="outlined"
                sx={{ width: '350px' }}
                size="medium"
                {...register('email')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                sx={{ width: '350px' }}
                size="medium"
                {...register('password')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                sx={{ width: '350px' }}
                size="medium"
                {...register('confirmPassword')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                mt={2}
              >
                <Button
                  variant="contained"
                  sx={{
                    width: '200px',
                    backgroundColor: FontColor.PRIMARY,
                  }}
                  onClick={handleSubmit((data) =>
                    handleRegister(data.username, data.email, data.password, data.confirmPassword),
                  )}
                >
                  Register
                </Button>
                <Link sx={{ my: 2, color: Color.DARKBLUE }} href="/login">
                  Already have an account? Sign in!
                </Link>
                {errors &&
                  generateValidationErrorMessage(errors, [
                    'username',
                    'password',
                    'email',
                    'confirmPassword',
                  ])}
                <Typography ref={alertTextRef} variant="body2" color="error"></Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default SignUpPage;
