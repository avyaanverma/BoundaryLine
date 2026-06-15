import { useForm } from "react-hook-form";


export const RegisterHook = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch("password");

    const onSubmit = (data) => {
        console.log(data);
    };


    return {
        register, handleSubmit, watch, errors, password,
        onSubmit
    }
}

