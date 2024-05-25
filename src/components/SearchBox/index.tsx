import React, { useRef } from "react";
import "./style.css";
import useKeyDown from "../../hooks/useKeyDown";

type SearchBoxProps = {
  onChange: (val: string) => void;
  placeholder?: string;
};

const SearchBox = ({ onChange, placeholder }: SearchBoxProps) => {
  const handleInputChange = (event: React.KeyboardEvent<HTMLInputElement>) =>
    event.key === "Enter" &&
    onChange((event.target as HTMLInputElement)?.value);

  const ref = useRef<HTMLInputElement>(null);

  useKeyDown("/", () => ref?.current?.focus());

  return (
    <div className="searchContainer">
      <input
        type="text"
        ref={ref}
        onKeyDown={handleInputChange}
        placeholder={placeholder}
        className="searchInput"
      />
      <div className="searchIcon">
        <span className="searchSuffix">Ctrl + /</span>
      </div>
    </div>
  );
};

export default SearchBox;
