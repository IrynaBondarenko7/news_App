import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UserContext } from "../components/UserContext";
import { postUser } from "../api";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    name: yup
      .string()
      .required("required field")
      .matches(
        /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ'-]+( [a-zA-Zа-яА-ЯёЁіІїЇєЄ'-]+)*$/,
        "Name can only contain letters, hyphens, and spaces"
      ),
    username: yup
      .string()
      .required("required field")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "Username can only contain letters and numbers, no spaces"
      )
      .max(15, "Username cannot exceed 15 characters"),

    avatar_url: yup
      .string()
      .required("required field")
      .url("Avatar URL must be a valid URL"),
  })
  .required();

export const SignUpPage = () => {
  const [inputUser, setInputUser] = useState({
    avatar_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQLkHEGZo-Sj8I4jJ-AL1kVcqlCTHYNFPxKQ&s",
  });
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const onSubmit = () => {
    reset({
      name: "",
      username: "",
      avatar_url: "",
    });
    postUser(inputUser)
      .then((response) => {
        localStorage.setItem("username", response.username);
        setUser(response.username);
        navigate(`/users/${response.username}`);
      })
      .catch((err) => console.log(err));
  };

  watch((data) => {
    setInputUser(data);
  });

  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full relative md:w-[500px] mx-auto mt-6 flex flex-col gap-8"
      >
        <label className="relative">
          <span>Name</span>
          <input
            placeholder="Hannah"
            {...register("name")}
            className="border-2 border-[#508C9B] w-full p-2 rounded-md"
          />
          <p className="absolute text-red-700 bottom-[-26px]">
            {errors.name?.message}
          </p>
        </label>

        <label className="relative">
          <span>UserName</span>
          <input
            placeholder="hannah123"
            {...register("username")}
            className="border-2 border-[#508C9B] w-full  p-2 rounded-md"
          />
          <p className="absolute text-red-700 bottom-[-26px]">
            {errors.username?.message}
          </p>
        </label>
        <label className="relative">
          <span>Avatar url (provided default url)</span>
          <input
            placeholder="https://..."
            value={inputUser.avatar_url}
            {...register("avatar_url")}
            className="border-2 border-[#508C9B] w-full p-2 rounded-md"
          />
          <p className="absolute text-red-700 bottom-[-26px]">
            {errors.avatar_url?.message}
          </p>
        </label>

        <button type="submit" className="button mx-auto block">
          Sign up
        </button>
      </form>
    </section>
  );
};
