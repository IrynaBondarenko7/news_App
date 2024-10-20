import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import { getTopics } from "../api";

export const SelectTopics = () => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getTopics().then((response) => {
      setTopics([{ slug: "all topics" }, ...response]);
    });
  }, []);

  let topicsOptions = topics.map((topic) => ({
    value: topic.slug,
    label: topic.slug,
  }));

  const handleChange = (option) => {
    if (!option) {
      if (location.pathname === "/") {
        navigate("/");
      } else {
        navigate("/articles");
      }
    } else if (option.value === "all topics") {
      navigate("/articles");
    } else {
      navigate(`/articles/topics/${option.value}`);
    }
  };

  return (
    <Select
      className="w-[200px] "
      isClearable={true}
      name="topic"
      options={topicsOptions}
      placeholder="Search by topic"
      onChange={handleChange}
    />
  );
};
