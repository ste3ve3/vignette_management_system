import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import axios from 'axios';
import useToken from '../store/hooks/useToken';
import useInterval from '../store/hooks/useInterval';

interface AuthGuardProps { 
  children: any;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const [isApiCallInProgress, setIsApiCallInProgress] = useState<boolean>(false);

  const navigate = useNavigate();
  const { accessToken, refreshToken, decodedAccessToken, setAccessToken, setRefreshToken } =
    useToken();

  const handleRefreshToken = () => {
    const data = {
      Method: 'POST',
      URL: (import.meta as any).env.VITE_APP_D_KEYCLOACK_URL,
      refresh_token: refreshToken,
      grant_type: (import.meta as any).env.VITE_APP_KEYCLOACK_GRANT_TYPE,
      client_id: (import.meta as any).env.VITE_APP_KEYCLOACK_CLIENT_ID,
      client_secret: (import.meta as any).env.VITE_APP_KEYCLOACK_CLIENT_SECRET_KEY,
    };

    axios
      .post((import.meta as any).env.VITE_APP_D_KEYCLOACK_URL, qs.stringify(data), {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer`,
        },
      })
      .then(function (response: any) {
        setAccessToken(response.data?.access_token);
        setRefreshToken(response.data?.refresh_token);
        setIsApiCallInProgress(false);
      })
      .catch(function (error: any) {
        localStorage.clear();
        navigate('/');
      })
      .finally(() => {
        setIsApiCallInProgress(false);
      });
  };

useEffect(() => {
    if (!accessToken) {
        navigate('/login');
    }
    const interval = setInterval(() => {
        setIsApiCallInProgress(accessToken ? (jwtDecode as any)(accessToken).exp < Date.now() / 1000 : false);
    }, 1000);
    return () => clearInterval(interval);
}, [accessToken, setIsApiCallInProgress, navigate]);

useInterval(() => {
    if (isApiCallInProgress) {
        handleRefreshToken();
    }
}, 1000);

return children;

};
   
export default AuthGuard;