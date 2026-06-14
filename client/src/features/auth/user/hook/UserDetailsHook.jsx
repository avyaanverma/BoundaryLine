import { useForm } from "react-hook-form";

export const UserRegisterHook = () => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const password = watch("password");

    const onSubmit = (data) => {
        console.log(data);
        reset();
    };
    return {
        register, handleSubmit, watch, errors, password, onSubmit
    }
}

export const UserLoginHook = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        reset();
    };

    return {
        register, handleSubmit, errors, onSubmit
    }
}