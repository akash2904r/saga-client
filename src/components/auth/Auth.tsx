import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useSignUpMutation, useSignInMutation } from "../../features/authApiSlice";
import { setUser } from "../../features/userSlice";
import { useAppDispatch } from "../../app/hooks";

import { Input, GoogleLogin, Logo } from '../';
import { initialAuthForm } from "../../constants";
import { errorType } from "../../constants/interfaces";
import { isValidAuthData, toastify } from "../../utils";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialAuthForm);

  const [signup] = useSignUpMutation();
  const [signin] = useSignInMutation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const switchMode = () => setIsSignUp(prevState => !prevState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const errorToast = (msg: string) => {
    setFormData(initialAuthForm);
    toastify(msg, 0);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSignUp) {
      const validate = isValidAuthData(formData);

      switch (validate) {
        case 0: 
          setFormData(initialAuthForm);
          break;
        case 1: 
          setFormData({ ...formData, password: '', confirmPassword: '' });
          break;
        case 2:
          const { error } = await signup(formData);
          const err = error as errorType | undefined;

          setFormData(initialAuthForm);
          
          if (err && err.originalStatus === 409) {
            toastify("User with specified email already exists !!!", 0)
            break;
          }
          
          setIsSignUp(false);
          break;
      }
    } 
    else {
      const { data, error } = await signin(formData);
      const err = error as errorType | undefined;

      if (err) {
        switch (err.originalStatus) {
          case 400:
            errorToast("Email or password is missing.");
            return;
          case 401:
            errorToast("Invalid user credentials !!!");
            return;
          case 404:
            errorToast("User not found.");
            return;
          default:
            errorToast("Server not responding...");
            return;
        }
      }

      dispatch(setUser({ ...data }));
      navigate("/");
    }
  };

  return (
    <div className="w-full lg-md:h-[540px] max-lg-md:py-28 max-lg-md:flex-col flex justify-center items-center gap-5">
      <div className="xl:w-[30%] lg:w-[35%] lg-md:w-[40%] md:w-[50%] sm:w-[58%] max-sm:w-[70%] max-xs:w-[90%] h-fit flex flex-col gap-3">
        <Logo size="lg" />

        <p className="text-dark-3 dark:text-lite-2">
          {isSignUp ? "Hey there, looking for something fun to read. Then you are at the right place. Sign up and" : "Welcome back !!! Let's get you signed in before you can"} enjoy your read...
        </p>
      </div>
      <div className="xl:w-[30%] lg:w-[35%] lg-md:w-[40%] md:w-[50%] sm:w-[58%] max-sm:w-[70%] max-xs:w-[90%]">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="flex gap-3">
              <Input name="firstName" type="type" label="First Name" placeholder="eg: John" value={formData.firstName} handleChange={handleChange} />
              <Input name="lastName" type="type" label="Last Name" placeholder="eg: Wick" value={formData.lastName} handleChange={handleChange} />
            </div>
          )}
          <Input name="email" type="email" label="Email Address" placeholder="you@example.com" value={formData.email} handleChange={handleChange} />
          <Input name="password" type="password" label="Password" placeholder="Atleast 8 characters" value={formData.password} handleChange={handleChange} />
          {isSignUp && (
            <Input name="confirmPassword" type="password" label="Confirm Password" placeholder="Repeat password once again" value={formData.confirmPassword} handleChange={handleChange} />
          )}

          <button type="submit" className="group h-fit mt-3 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 hover:sign-in-hover rounded-[4px]">
            <div className="p-0.5 rounded-[4px]">
              <div className="font-semibold p-2 rounded-[4px] md:px-2 md:py-1 bg-transparent text-white group-hover:tracking-tighter">SIGN {isSignUp ? "UP" : "IN"}</div>
            </div>
          </button>

          <GoogleLogin />
        </form>

        <div className="text-sm mt-5 dark:text-white">
          {isSignUp ? "Already have" : "Don't"} have an account?&nbsp;
          <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer" onClick={switchMode}>SIGN {isSignUp ? "IN" : "UP"}</span>
        </div>
      </div>
    </div>
  );
};

export default Auth;
