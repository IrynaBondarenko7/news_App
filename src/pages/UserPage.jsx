import { useEffect } from "react";
import { getUser } from "../api";
import { useParams } from "react-router-dom";

export const UserPage = () => {
  const { username } = useParams();

  useEffect(() => {
    getUser(username);
  }, [username]);
  return (
    <section>
      <img src="" alt="" />
      <p>{username}</p>
    </section>
  );
};
