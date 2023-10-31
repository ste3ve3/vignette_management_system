import axios from 'axios'; 
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useEffect, useState } from 'react';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconPhone from '../../components/Icon/IconPhone';
import { API } from '../../store/api';
import { toast } from 'react-hot-toast';
import useToken from '../../store/hooks/useToken';
import IconLoader from '../../components/Icon/IconLoader';

const initFormData = {
    username: '',
    password: ''
};

const initState = { loading: false, error: null };

const Login = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Login'));
    });
    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const [flag, setFlag] = useState(themeConfig.locale);
    const [formData, setFormData] = useState(initFormData);
    const [state, setState] = useState(initState);
    const [authError, setAuthError] = useState(null)
    const { setAccessToken, setRefreshToken } = useToken()

    const handleChange = (name: string, value: string): void => {
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };
    
    const handleLogin = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setState(initState);
        if(authError) {
            setAuthError(null);
        }
        try {
            setState((prev: any) => ({ ...prev, loading: true }));
            const response = await toast.promise(
                axios.post((import.meta as any).env.VITE_APP_D_KEYCLOACK_URL, {  
                    ...formData,
                    grant_type: (import.meta as any).env.VITE_APP_KEYCLOACK_GRANT_TYPE,
                    client_id: (import.meta as any).env.VITE_APP_KEYCLOACK_CLIENT_ID,
                    client_secret: (import.meta as any).env.VITE_APP_KEYCLOACK_CLIENT_SECRET_KEY,
                    scope: (import.meta as any).env.VITE_APP_KEYCLOACK_SCOPE,
                }, 
                {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer`,
                },
                }),
                {
                    loading: `Checking credentials, please wait...`,
                    success: `Logged In Successfully!`,
                    error: `Login was unsuccessfull!`
                },
                { position: 'top-center' }
            );
            setFormData(initFormData);
            setAccessToken(response.data?.access_token)
            setRefreshToken(response.data?.refresh_token)
            navigate('/')
        } catch (error: any) {
            setState((prev: any) => ({
                ...prev,
                error: error.response?.data?.error_description || error.message || 'Unknown error occured, please try again.'
            }));
            if(error.response?.data?.error_description){ 
                setAuthError(error.response?.data?.error_description);
            }
        } finally {
            setState((prev: any) => ({ ...prev, loading: false }));
        }
    };

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/parkingBg1.jpeg" alt="image" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black opacity-60"></div>
            </div> 
            <div className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <div className="relative w-full max-w-[570px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 py-10">
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Login</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your phone number and passcode to continue</p>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={handleLogin}>
                                <div>
                                    <label htmlFor="Phone number">Phone number</label>
                                    <div className="relative text-white-dark">
                                        <input 
                                            id="Phone number" 
                                            type="number" 
                                            value={formData.username}
                                            name="username"
                                            onChange={(e) => handleChange('username', e.target.value)}
                                            placeholder="Enter phone number" 
                                            className="form-input ps-10 placeholder:text-white-dark" 
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconPhone fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Password">Passcode</label> 
                                    <div className="relative text-white-dark">
                                        <input 
                                            id="Password" 
                                            type="password" 
                                            value={formData.password}
                                            name="password"
                                            onChange={(e) => handleChange('password', e.target.value)}
                                            placeholder="Enter passcode" 
                                            className="form-input ps-10 placeholder:text-white-dark" 
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                </div>
                                {authError && <div className="bg-red-500 text-sm text-white font-bold rounded-md text-center p-3">{authError}</div>}
                                <button
                                type="submit"
                                disabled={formData.username == "" || formData.password == "" || state.loading}
                                className={`btn btn-gradient py-3 mt-6 w-full border-0 uppercase shadow-[0 10px 20px -10px rgba(67,97,238,0.44)]`}
                                >
                                    {state.loading ? (
                                        <>
                                        <IconLoader className="animate-spin mr-1" /> {" Authenticating..."}
                                        </>
                                    ) : (
                                        "Login"
                                    )} 
                                </button>
                            </form>  
                            <div className="text-center dark:text-white mt-10">
                                Forgot Passcode ?&nbsp;
                                <Link to="/recover-passcode" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    RESET
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
