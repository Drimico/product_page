interface AuthProps {
  setEmailErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setPasswordErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}
export const useAuth = ({ setEmailErrorMessage, setPasswordErrorMessage }: AuthProps) => {
  const validateEmail = (email: string): boolean => {
    if (!email) {
      setEmailErrorMessage("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailErrorMessage("Please enter a valid email addres");
      return false;
    }
    setEmailErrorMessage("");
    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordErrorMessage("Password is required");
      return false;
    }
    if (password.length < 8) {
      setPasswordErrorMessage("Password must be at least 8 characters");
      return false;
    }
    setPasswordErrorMessage("");
    return true;
  };
  const validate = (email: string, password: string): boolean => {
    setEmailErrorMessage("");
    setPasswordErrorMessage("");

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    return isEmailValid && isPasswordValid;
  };

  return { validate, validateEmail, validatePassword };
};
