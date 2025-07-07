'use client';


export default function NoResultsBanner({ searchTerm }) {
  return (
    <div className={"bannerWrapper"}>
      <img
        src="/assets/icons/noResult.svg"
        alt="Žádné výsledky"
        className={"noResultsIcon"}
      />
      <div className={"textContainer"}>
        <div className={"topLine"}>
          Pro vyhledávání „{searchTerm}“ nebyly nalezeny žádné výsledky.
        </div>
        <div className={"bottomLine"}>
          Opravte případné překlepy, zkuste použít jiná klíčová slova.
        </div>
      </div>
    </div>
  );
}
