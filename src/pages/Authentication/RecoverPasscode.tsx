import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useEffect, useState } from 'react';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import IconPhone from '../../components/Icon/IconPhone';
import IconArrowBackward from '../../components/Icon/IconArrowBackward';
import { API } from '../../store/api';
import OtpModal from './OtpModal';
import IconLoader from '../../components/Icon/IconLoader';
import { toast } from 'react-hot-toast';

const initState = { loading: false, error: null };

const RecoverPasscode = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Recover Passcode')); 
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
    const [phoneNumber, setPhoneNumber] = useState("")
    const [state, setState] = useState(initState);
    const [authError, setAuthError] = useState(null)
    const [OTP, setOTP] = useState('')
    const [showOtpModal, setOtpModal] = useState(false)
    const [invalidOtpMessage, setInvalidOtpMessage] = useState('')
    const [isOtpError, setOptError] = useState(null)
    const [isResendSuccess, setIsResendSuccess] = useState(false)


    const handleResetPassword = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setState(initState);
        if(authError) {
            setAuthError(null);
        }
        try {
            setState((prev: any) => ({ ...prev, loading: true }));
            const response = await API.get(`/usersManager/users/OTP/${phoneNumber}`) 
            if(response?.data?.status == "success"){
                setOtpModal(true)
            }
            else{
                setAuthError(response?.data?.description)
            }
        } catch (error: any) {
            setState((prev: any) => ({
                ...prev,
                error: error.response?.data?.description || error.message || 'Unknown error occured, please try again.'
            }));
            if(error.response?.data?.description){ 
                setAuthError(error.response?.data?.description); 
            }
        } finally {
            setState((prev: any) => ({ ...prev, loading: false }));
        }
    };

    const handleSubmitOtp = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setState(initState);
        if(isOtpError) {
            setOptError(null);
        }  
        try {
            setState((prev: any) => ({ ...prev, loading: true }));
            const response = await API.get(`/usersManager/users/recover-passcode/${phoneNumber}/OTP/${OTP}`) 
            if(response?.data?.status == "success"){
                toast.success("Passcode resetted successfully!")
                navigate('/login')
            }
            else{
                setOptError(response?.data?.error)
            }
            
        } catch (error: any) { 
            setState((prev: any) => ({
                ...prev,
                error: error?.error || error.message || 'Unknown error occured, please try again.'
            }));
            if(error?.error){ 
                setOptError(error?.error);   
            }
        } finally {
            setState((prev: any) => ({ ...prev, loading: false }));
        }
    };

    const handleResendOtp = async (e: React.FormEvent): Promise<void> => {
        setOTP('');
        setOptError(null);
        e.preventDefault();
        setState(initState);
        if(authError) {
            setOptError(null);
        }
        try {
            setState((prev: any) => ({ ...prev, loading: true }));
            const response = await API.get(`/usersManager/users/OTP/${phoneNumber}`) 
            if(response?.data?.status == "success"){
                toast.success("A new OTP was sent to your phone number!") 
            }
            else{
                setOptError(response?.data?.description)
            }
        } catch (error: any) {
            setState((prev: any) => ({
                ...prev,
                error: error.response?.data?.description || error.message || 'Unknown error occured, please try again.'
            }));
            if(error.response?.data?.description){ 
                setOptError(error.response?.data?.description); 
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
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Passcode Recovery</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your phone number to recover your passcode</p>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={handleResetPassword}>
                                <div>
                                    <label htmlFor="Phone number">Phone number</label>
                                    <div className="relative text-white-dark">
                                        <input 
                                            id="Phone number" 
                                            type="number" 
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            placeholder="Enter phone number" 
                                            className="form-input ps-10 placeholder:text-white-dark" 
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconPhone fill={true} />
                                        </span>
                                    </div>
                                </div>
                                {authError && <div className="bg-red-500 text-sm text-white font-bold rounded-md text-center p-3">{authError}</div>}
                                <button type="submit" disabled={phoneNumber == "" || state.loading} className="btn btn-gradient py-2 !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    {state.loading ? (
                                        <>
                                        <IconLoader className="animate-spin mr-1" /> {" Resetting..."}
                                        </>
                                    ) : (
                                        "Reset Passcode"
                                    )} 
                                </button>
                            </form>
                            <div className="text-center dark:text-white mt-10">
                                <Link to="/login" className="text-primary transition hover:text-black dark:hover:text-white flex gap-2 items-center justify-center">
                                    <IconArrowBackward fill={true}/>
                                    <span>Back to Login</span> 
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <OtpModal
                OTP={OTP}
                setOTP={setOTP}  
                isError={isOtpError}
                handleSubmit={(e) => handleSubmitOtp(e)}
                isLoading={state.loading}  
                show={showOtpModal} 
                onHide={() => {
                    setOtpModal(false)
                    setOTP('')
                    setInvalidOtpMessage('')
                    if(isResendSuccess){
                    setIsResendSuccess(false)
                    }
                }}
                message={invalidOtpMessage}
                handleResendOtp={(e) => handleResendOtp(e)}
            />
        </div>
    );
};

export default RecoverPasscode;
