import axios from 'axios';
import axiosInstance from '../../common/config/axiosInstance';

export async function login(
  username: string,
  password: string,
): Promise<{ userId: string; username: string }> {
  try {
    const response = await axiosInstance.post(
      '/user/login',
      { username, password },
      { headers: { 'Content-Type': 'application/json' } },
    );

    if (response?.status === 200) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    console.log('Login successful:', response.data);

    const result = {
      userId: response.data.id,
      username: response.data.username,
    };
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error('Login failed: ' + (error.response?.data?.message || error.message));
    } else {
      throw new Error('Login failed: ' + error);
    }
  }
}

export async function signUp(username: string, password: string, email: string) {
  try {
    const response = await axiosInstance.post(
      '/user/signUp',
      { username, password, email },
      { headers: { 'Content-Type': 'application/json' } },
    );

    return response.data.id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error('Register failed: ' + (error.response?.data?.message || error.message));
    } else {
      throw new Error('Register failed: ' + error);
    }
  }
}

export async function refresh() {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('Refresh token not found');
    }

    const response = await axiosInstance.post(
      '/user/refresh',
      { refreshToken },
      { headers: { 'Content-Type': 'application/json' } },
    );

    if (response.status === 200) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error('Refresh failed: ' + (error.response?.data?.message || error.message));
    } else {
      throw new Error('Refresh failed: ' + error);
    }
  }
}
