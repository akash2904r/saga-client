import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IAuthForm } from "../constants/interfaces";

const isEmail: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidEmail = (email: string) => isEmail.test(email);

export const isValidAuthData = (formData: IAuthForm): number => {
    if (!isValidEmail(formData.email)) {
        toast.error("Not a vaild email !!!");
        return 0;
    } 
      
    if (formData.password.length < 8) {
        toast.error("Password is too short !!!");
        return 1;
    }
      
    if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords don't match !!!");
        return 1;
    }

    return 2;
};

export const toastify = (msg: string, status: number) => {
    if (status === 0) {
        toast.error(msg);
        return;
    }

    if (status === 1) {
        toast.success(msg);
    }
};

export function getPlainTextFromHTMLString(htmlString: string) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.replace("<p><br/></p>", " ");
    
    return div.textContent || div.innerText;
};

export const color = ["blue", "purple", "cyan", "red", "orange"];

export const rand = () => {
    const random = Math.floor((Math.random() * 5));
    return color[random];
};
