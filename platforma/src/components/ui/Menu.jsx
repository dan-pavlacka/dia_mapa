'use client';


export default function Menu({ activeItem, onSelect }) {
  const items = [
    { label: 'Projekty', value: 'Projekty' },
    { label: 'Konzultace', value: 'Konzultace' },
    { label: 'Interní poznatky', value: 'Interni_poznatky' },
    { label: 'Informační systémy', value: 'Informacni_systemy' },
    { label: 'Agendy', value: 'Agendy' },
    { label: 'Dokumenty', value: 'Dokumenty' }
  ];

  return (
    <nav className={"menu"}>
      {items.map((item) => (
        <button 
          key={item.value}
          className={`${"menuButton"} ${activeItem === item.value ? "active" : ''}`}
          onClick={() => onSelect(item.value)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
