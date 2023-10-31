import React, { useState } from 'react';
import classNames from 'classnames';
import OTPInput from 'react-otp-input';
import useInterval from '../../store/hooks/useInterval';
import ModalDialog from '../../components/global/ModalDialog';
import IconLoader from '../../components/Icon/IconLoader';

interface OtpModalProps {
  show: boolean;
  onHide: () => void;
  isError: string | null;
  handleSubmit: (e: any) => void;
  isLoading: boolean;
  setOTP: (otp: string) => void;
  OTP: string;
  message: string;
  handleResendOtp: (e: any) => void;
}

const OtpModal: React.FC<OtpModalProps> = ({
  show,
  onHide,
  isError,
  handleSubmit,
  isLoading,
  setOTP,
  OTP,
  handleResendOtp,
}) => {
  const [countDownTimer, setCountDownTimer] = useState(300);
  const [timer, setTimer] = useState('5 min and 00 sec');

  function handleChange(otp: string) {
    setOTP(otp);
  }

  useInterval(() => {
    if (show) setCountDownTimer((countDownTimer) => (countDownTimer === 0 ? 0 : countDownTimer - 1));
    let min = Math.floor(countDownTimer / 60);
    let secs = countDownTimer - min * 60;
    setTimer(`${min} : ${secs < 10 ? '0' + secs : secs}`);
  }, 1000);

  if (countDownTimer === 0 && show) {
    onHide();
  }

  return (
    <ModalDialog
      modalVisibility={show}
      setModalVisibility={onHide}
      hideSubmitButtons={true}
      title="Verification code"
      body={
        <div>
          <span className="text-gray-500 text-center">Enter the code that was sent to your phone number</span>
          <div className="otp-fake-field flex justify-center items-center mt-5"> 
            <OTPInput
              onChange={handleChange}
              value={OTP}
              inputStyle="otp-inputStyle"
              numInputs={6}
              renderSeparator={<span> </span>}
              renderInput={(props) => <input {...props}/>}
            /> 
          </div>
          {isError ? (
            <p className={classNames('text-center text-red-500', { 'block': true })}> {isError}</p>
          ) : (
            <p></p>
          )}
          <div className="mt-7 text-gray-600 text-center">
            Code will expire in
            <span style={false ? { color: 'red' } : { color: 'blue' }}>
              {' ' + timer} Minutes
            </span>
          </div>
          <div className="mt-4 flex justify-end">
            <a className="text-blue-500 underline cursor-pointer" onClick={handleResendOtp}>Resend Otp</a>
          </div>
          <div className="mt-8">
            <button
              disabled={isLoading}
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-3 px-4 mb-3 rounded-md w-full flex items-center justify-center gap-2"
            >  
              {isLoading ? (
                    <>
                    <IconLoader className="animate-spin mr-1" /> {" Submitting..."}
                    </>
                ) : (
                    "Submit"
                )} 
            </button>
          </div>
        </div>
      }
    />
  );
};

export default OtpModal;
