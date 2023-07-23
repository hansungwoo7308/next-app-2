import { searchWithFilter } from "lib/client/utils/searchWithFilter";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
export default function Filter() {
  const categories: string[] = ["all", "food", "sports"];
  const [category, setCategory]: any = useState("");
  const [search, setSearch]: any = useState("");
  const [sort, setSort]: any = useState("");
  const searchRef: any = useRef();
  const router = useRouter();
  const handleCategory = (e: any) => {
    e.preventDefault();
    setCategory(e.target.value);
    searchWithFilter({ category: e.target.value }, router);
  };
  const handleSearch = (e: any) => {
    e.preventDefault();
    setSearch(e.target.value);
    searchWithFilter({ search: e.target.value }, router);
  };
  const handleSort = (e: any) => {
    e.preventDefault();
    setSort(e.target.value);
    searchWithFilter({ sort: e.target.value }, router);
  };
  useEffect(() => {
    searchRef.current.focus();
  }, []);
  return (
    <Box>
      <select name="category" id="category" onChange={handleCategory}>
        {categories.map((category: any, index: any) => (
          <option key={index} value={category}>
            {category.toUpperCase()}
          </option>
        ))}
      </select>
      <input ref={searchRef} type="text" value={search} onChange={handleSearch} />
      <select name="sort" id="sort" value={sort} onChange={handleSort}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </Box>
  );
}
const Box = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  > input {
    flex: 60%;
  }
  > select {
    flex: 20%;
  }
`;
