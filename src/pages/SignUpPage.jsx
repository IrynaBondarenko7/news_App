import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UserContext } from "../components/UserContext";
import { postUser } from "../api";
import { useNavigate } from "react-router-dom";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import avatars from "../../data/avatars.json";

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

    // avatar_url: yup
    //   .string()
    //   .required("required field")
    //   .url("Avatar URL must be a valid URL"),
  })
  .required();

export const SignUpPage = () => {
  const [selected, setSelected] = useState(avatars[1]);
  const [inputUser, setInputUser] = useState({
    avatar_url: avatars[1].url,
  });
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const onSubmit = () => {
    reset({
      name: "",
      username: "",
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
    if (data.avatar_url) {
      setInputUser(data);
    } else {
      setInputUser({ ...data, avatar_url: avatars[1].url });
    }
  });

  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full relative md:w-[500px] mx-auto mt-6 flex flex-col gap-8"
      >
        <label className="relative flex flex-col gap-1">
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

        <label className="relative flex flex-col gap-1">
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
        <label className="relative flex flex-col gap-1">
          <span>Avatar</span>
          <Listbox
            value={selected}
            onChange={(avatar) => {
              setValue("avatar_url", avatar.url);
              setSelected(avatar);
            }}
          >
            <ListboxButton
              className={clsx(
                "relative block w-full rounded-lg bg-[#508C9B] py-1.5 pr-8 pl-3 text-left text-sm/6 text-white",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            >
              <img
                src={selected.url}
                alt="avatar"
                className="w-10 h-10 block object-cover rounded-full"
              />

              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                aria-hidden="true"
              />
            </ListboxButton>
            <ListboxOptions
              anchor="bottom"
              transition
              className={clsx(
                "flex flex-wrap gap-1 w-[var(--button-width)] rounded-xl border border-[#508C9B] bg-[#508C9B] p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
                "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
              )}
            >
              {avatars.map((avatar) => (
                <ListboxOption
                  key={avatar.url}
                  value={avatar}
                  className="w-14 h-12 group flex cursor-pointer items-center justify-center select-none data-[focus]:bg-white/10"
                >
                  <img
                    src={avatar.url}
                    alt="avatar"
                    className="w-14 h-12 object-cover rounded-md hover:rounded-xl transition-all "
                  />
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
        </label>
        <button type="submit" className="button mx-auto block">
          Sign up
        </button>
      </form>
    </section>
  );
};
