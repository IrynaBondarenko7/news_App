import { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { getTopics } from "../api";

export const SelectTopics = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((response) => {
      setTopics([{ slug: "all topics" }, ...response]);
    });
  }, []);

  let topicsOptions = topics.map((topic) => ({
    value: topic.slug,
    label: topic.slug,
  }));
  const navigate = useNavigate();

  const handleChange = (option) => {
    if (!option) {
      navigate("/articles");
    } else if (option.value === "all topics") {
      navigate("/articles");
    } else {
      navigate(`/articles/topics/${option.value}`);
    }
  };

  return (
    <Select
      className="w-[200px]"
      isClearable={true}
      name="topic"
      options={topicsOptions}
      placeholder="Search by topic"
      onChange={handleChange}
    />
  );
};
