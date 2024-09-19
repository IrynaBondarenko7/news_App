import Select from "react-select";

export const SelectSortQueries = ({
  navigate,
  setSortBy,
  setOrder,
  orderSearch,
  sortSearch,
  setSearchParams,
  location,
}) => {
  const sortOptions = [
    { value: "created_at", label: "date" },
    { value: "comment_count", label: "comments count" },
    { value: "votes", label: "votes" },
  ];

  const orderOptions = [
    { value: "asc", label: "ascending order" },
    { value: "desc", label: "descending order" },
  ];

  const handleChange = (option) => {
    if (!option) {
      navigate("/articles");
      setSortBy(undefined);
      orderSearch
        ? setSearchParams({ order: orderSearch })
        : setSearchParams({});
    } else {
      setSortBy(option.value);
      orderSearch
        ? setSearchParams({ sort_by: option.value, order: orderSearch })
        : setSearchParams({ sort_by: option.value });
    }
  };

  const handleOrderChange = (option) => {
    if (!option) {
      if (location.pathname.includes("topics")) {
        navigate(location);
      } else {
        navigate("/articles");
      }
      setOrder(undefined);
      sortSearch
        ? setSearchParams({ sort_by: sortSearch })
        : setSearchParams({});
    } else {
      setOrder(option.value);
      sortSearch
        ? setSearchParams({ sort_by: sortSearch, order: option.value })
        : setSearchParams({ order: option.value });
    }
  };

  return (
    <div className="my-10 flex flex-col md:flex-row md:justify-center gap-6 md:gap-20 ">
      <div className="md:w-[200px]">
        <label> Sort articles by</label>
        <Select
          name="sort"
          options={sortOptions}
          onChange={handleChange}
          isClearable={true}
        />
      </div>
      <div className="md:w-[200px]">
        <label> Sort articles in</label>
        <Select
          name="order"
          options={orderOptions}
          onChange={handleOrderChange}
          isClearable={true}
        />
      </div>
    </div>
  );
};
