import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
export default function Search() {
  const [search, setSearch] = useState("");
  const searchRef: any = useRef();
  const router = useRouter();
  useEffect(() => {
    searchRef.current.focus();
  }, []);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSearch("");
        router.push(`/${search}`);
      }}
    >
      <input
        type="text"
        value={search}
        onChange={(e: any) => setSearch(e.target.value)}
        ref={searchRef}
      />
      <button>Search</button>
    </form>
  );
}
