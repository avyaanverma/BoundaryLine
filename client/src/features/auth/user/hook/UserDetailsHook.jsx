import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../../../app/store/index.js";
import {
  loginUser,
  registerUser,
  persistUserSession,
} from "../api/userAuthApi.js";
import { getErrorMessage } from "../../../../shared/utils/errorMessages.js";

export const UserRegisterHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const user = await registerUser({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
      });

      persistUserSession({ user, remember: false });
      dispatch(login({ user }));
      toast.success("Account created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      reset();
      navigate("/matches", { replace: true });
    } catch (error) {
      const message = getErrorMessage(error);
      setError("root", { message });
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return {
    register,
    handleSubmit,
    watch,
    errors,
    password,
    onSubmit,
  };
};

export const UserLoginHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const user = await loginUser({
        email: data.email,
        password: data.password,
      });

      persistUserSession({ user, remember: data.remember });
      dispatch(login({ user }));
      toast.success(`Welcome back, ${user.name || "User"}!`, {
        position: "top-right",
        autoClose: 3000,
      });
      reset();
      navigate("/matches", { replace: true });
    } catch (error) {
      const message = getErrorMessage(error);
      setError("root", { message });
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};