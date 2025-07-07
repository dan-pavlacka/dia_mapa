'use client';

import { useState, useEffect, useCallback } from 'react';

export default function LandingSearchBar({ data, onSelect, placeholder }) {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState([]);

  useEffect(() => {
    if (inputValue.trim() === '') {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      setExpandedGroups([]);
      return;
    }

    const lowerInput = inputValue.toLowerCase();

    const ovmItems = data
      .filter(
        (item) =>
          item.nazev.toLowerCase().includes(lowerInput) ||
          (item.zkratka && item.zkratka.toLowerCase().includes(lowerInput))
      )
      .map((item) => ({
        label: item.nazev,
        zkratka: item.zkratka,
        value: item,
      }));

    const groups = [];

    if (ovmItems.length > 0) {
      groups.push({
        groupLabel: 'Orgány veřejné moci',
        count: ovmItems.length,
        items: ovmItems,
      });
    }

    setFilteredSuggestions(groups);
    setShowSuggestions(true);
    setExpandedGroups([]);
  }, [inputValue, data]);

  const handleExpandGroup = useCallback((groupLabel) => {
    setExpandedGroups((prev) => [...prev, groupLabel]);
  }, []);

  useEffect(() => {
    // Add event listener for gov-button
    const handleGovClick = (event) => {
      if (event.target.dataset.action === 'expandGroup') {
        const groupLabel = event.target.dataset.group;
        if (groupLabel) {
          handleExpandGroup(groupLabel);
        }
      }
    };

    document.addEventListener('gov-click', handleGovClick);
    
    return () => {
      document.removeEventListener('gov-click', handleGovClick);
    };
  }, [handleExpandGroup]);

  const handleClear = () => {
    setInputValue('');
    setShowSuggestions(false);
    setExpandedGroups([]);
  };

  const handleSelect = (item) => {
    setInputValue('');
    setShowSuggestions(false);
    setExpandedGroups([]);
    if (onSelect) {
      onSelect(item);
    }
  };

  const highlightMatch = (text) => {
    const lowerInput = inputValue.toLowerCase();
    const index = text.toLowerCase().indexOf(lowerInput);
    if (index === -1) return text;

    return (
      <>
        {text.substring(0, index)}
        <mark className={"highlight"}>{text.substring(index, index + lowerInput.length)}</mark>
        {text.substring(index + lowerInput.length)}
      </>
    );
  };

  return (
    <div className={"dashBoardSearchBarContainer"}>
      <input
        type="text"
        className={"searchInput"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
      />
      <button
        className={"landingIconButton"}
        onClick={inputValue ? handleClear : null}
        aria-label={inputValue ? "Zrušit hledání" : "Vyhledat"}
        type="button"
      >
        <img
          src={inputValue ? "/assets/icons/krizek.svg" : "/assets/icons/search.svg"}
          alt={inputValue ? "Zrušit hledání" : "Vyhledat"}
          className={"landingSearchIcon"}
        />
      </button>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className={"suggestionsContainer"}>
          {filteredSuggestions.map((group, groupIdx) => {
            const isExpanded = expandedGroups.includes(group.groupLabel);
            const itemsToShow = isExpanded ? group.items : group.items.slice(0, 3);

            return (
              <div key={groupIdx} className={"suggestionGroup"}>
                <div className={"groupLabelRow"}>
                  <div className={"groupLabel"}>
                    {group.groupLabel} ({group.count})
                  </div>
                  {!isExpanded && group.items.length > 3 && (
                    <gov-button
                      data-action="expandGroup"
                      data-group={group.groupLabel}
                      className={"showAllButtonSearch"}
                      type="link"
                      color="primary"
                      size="m"
                    >
                      Zobrazit vše
                      <img
                        src="/assets/icons/chevron_right_green.svg"
                        alt=""
                        className={"chevronIcon"}
                      />
                    </gov-button>
                  )}
                </div>

                {itemsToShow.map((item, idx) => (
                  <div
                    key={idx}
                    className={"suggestionItem"}
                    onClick={() => handleSelect(item.value)}
                  >
                    <div className={"suggestionLabel"}>
                      {highlightMatch(item.label)}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
