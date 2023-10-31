import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'; 

const useToken = () => {
  const getAccessToken = (): string | undefined => {
    const access_token = localStorage.getItem('access_token')
    if (access_token) return access_token
  }

  const getRefreshToken = (): string | undefined => {
    const refresh_token = localStorage.getItem('refresh_token')
    if (refresh_token) return refresh_token
  }

  const [accessToken, setAccessToken] = useState<string | undefined>(getAccessToken())
  const [refreshToken, setRefreshToken] = useState<string | undefined>(getRefreshToken())

  const saveAccessToken = (userToken: string): void => {
    localStorage.setItem('access_token', userToken)
    setAccessToken(userToken)  
  }

  const saveRefreshToken = (userToken: string): void => {
    localStorage.setItem('refresh_token', userToken)
    setRefreshToken(userToken)
  }

  return {
    setAccessToken: saveAccessToken,
    accessToken,
    refreshToken,
    setRefreshToken: saveRefreshToken,
    decodedAccessToken : accessToken ? (jwtDecode as any)(accessToken) : null
  }
}

export default useToken  