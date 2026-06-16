import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../../../app/store/index.js";
import {
  loginAdmin,
  persistAdminSession,
} from "../api/adminAuthApi.js";
import apiClient from "../../../../shared/lib/axios.js";
import { getErrorMessage } from "../../../../shared/utils/errorMessages.js";

export const RegisterHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      // Register the admin user
      await apiClient.post("/auth/register", {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
      });

      // Auto-login after successful registration
      const user = await loginAdmin({
        email: data.email,
        password: data.password,
      });

      persistAdminSession({ user, remember: false });
      dispatch(login({ user }));
      toast.success("Admin account created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/admin", { replace: true });
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

