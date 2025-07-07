'use client';


export default function SearchBar({ value, onChange, placeholder }) {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className={"searchBarContainer"}>
      <input
        type="text"
        className={"searchInput"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <button
        className={"searchIconButton"}
        onClick={value ? handleClear : null}
        aria-label={value ? 'Zrušit hledání' : 'Vyhledat'}
        type="button"
      >
        <img
          src={value ? '/assets/icons/krizek.svg' : '/assets/icons/search.svg'}
          alt={value ? 'Zrušit hledání' : 'Vyhledat'}
          className={"searchIcon"}
        />
      </button>
    </div>
  );
}
