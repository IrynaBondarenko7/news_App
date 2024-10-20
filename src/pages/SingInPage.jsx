import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UserContext } from "../components/UserContext";
import { getUser } from "../api";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const schema = yup
  .object({
    username: yup
      .string()
      .required("required field")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "Username can only contain letters and numbers, no spaces"
      )
      .max(15, "Username cannot exceed 15 characters"),
  })
  .required();

export const SignInPage = () => {
  const [inputUser, setInputUser] = useState({ username: "" });
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const onSubmit = () => {
    const storedUser = localStorage.getItem("username");

    if (!storedUser && inputUser.username !== "") {
      getUser(inputUser.username)
        .then((response) => {
          reset({
            username: "",
          });
          toast.success(`Hello ${response.username}`);
          localStorage.setItem("username", response.username);
          setUser(response.username);
          setTimeout(() => {
            navigate(`/users/${response.username}`);
          }, 1000);
        })
        .catch((err) => {
          toast.error("Something went wrong!");
        });
    } else if (inputUser.username === user) {
      toast.success(`Hello ${user}`);
      reset({
        username: "",
      });
      setTimeout(() => {
        navigate(`/users/${user}`);
      }, 1000);
    } else {
      toast.error("Something went wrong!");
    }
  };

  watch((data) => {
    setInputUser(data);
  });
  return (
    <section>
      <Toaster position="top-center" reverseOrder={false} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full relative md:w-[500px] mx-auto mt-6 flex flex-col gap-8"
      >
        <label className="relative">
          <span>UserName</span>
          <input
            placeholder="hannah123"
            {...register("username")}
            className="border-2 border-main w-full  p-2 rounded-md"
          />
          <p className="absolute text-red-700 bottom-[-26px]">
            {errors.username?.message}
          </p>
        </label>

        <button type="submit" className="button mx-auto block">
          Sign in
        </button>
      </form>
    </section>
  );
};
