import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api";
import { UserContext } from "../components/UserContext";

export const UserPage = () => {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    getUser(username).then((response) => {
      setUserInfo(response);
    });
  }, [username]);

  const onLogOutBtnClick = () => {
    localStorage.removeItem("username");
    navigate(`/`);
    setUser(null);
  };

  return (
    <section className="flex flex-col md:flex-row text-[#201E43] mt-10 mx-auto justify-center items-center gap-20">
      <div>
        <img
          src={userInfo.avatar_url}
          alt="user avatar"
          className="w-[200px] h-[200px] mx-auto rounded-full object-scale-down border-2 border-[#508C9B]"
        />
      </div>
      <div className="">
        <h2>
          <span className="font-bold">UserName : </span>
          {userInfo.username}
        </h2>

        <p>
          <span className="font-bold">Name :</span> {userInfo.name}
        </p>
        <button
          type="button"
          className="button mt-5"
          onClick={onLogOutBtnClick}
        >
          Log out
        </button>
      </div>
    </section>
  );
};
