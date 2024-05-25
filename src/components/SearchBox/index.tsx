import React, { useRef } from "react";
import "./style.css";
import useKeyPress from "../../hooks/useKeyPress";

type SearchBoxProps = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
};

const SearchBox = ({ value, onChange, placeholder }: SearchBoxProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const ref = useRef<HTMLInputElement>(null);

  useKeyPress("/", () => ref?.current?.focus());

  return (
    <div className="searchContainer">
      <input
        type="text"
        ref={ref}
        value={value}
        onChange={handleInputChange}
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
