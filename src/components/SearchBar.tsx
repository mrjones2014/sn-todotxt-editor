import { ClearButton, SearchContainer, SearchIcon, SearchInput } from "./StyledComponents";

const INPUT_ID = "todo_txt_search_input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange("");
    document.getElementById(INPUT_ID).focus();
  };

  return (
    <SearchContainer>
      <SearchInput id={INPUT_ID} type="text" placeholder="Search..." value={value} onChange={handleChange} />
      <SearchIcon>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </SearchIcon>
      <ClearButton onClick={handleClear} aria-label="Clear search">
        ×
      </ClearButton>
    </SearchContainer>
  );
};

export default SearchBar;
