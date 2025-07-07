'use client';


// Pomocná funkce pro extrakci číselného IdOVM ze stringu id_ovm
const extractOvmIdNumber = (id_ovm) => {
  const match = id_ovm?.match(/\/(\d+)$/);
  return match ? String(parseInt(match[1], 10)) : null;
};

export default function FilterButton({ allCount, filters, data, selectedFilter, onChange, ovmId }) {
  // Spočítá počet záznamů pro atribut == true, ale jen pro aktuální OVM
  const countForAttribute = (attr) => {
    return data.filter(item => {
      const itemOvmId = extractOvmIdNumber(item.id_ovm);
      const belongsToOvm = itemOvmId === String(ovmId);
      return belongsToOvm && item[attr] === true;
    }).length;
  };

  // Spočítá počet všech položek pro aktuální OVM
  const countForAll = () => {
    return data.filter(item => {
      const itemOvmId = extractOvmIdNumber(item.id_ovm);
      return itemOvmId === String(ovmId);
    }).length;
  };

  return (
    <div className={"filterButton_container"}>
      <button
        onClick={() => onChange('all')}
        className={`${"filterButton_button"} ${selectedFilter === 'all' ? "active" : ''}`}
      >
        Vše ({countForAll()})
      </button>

      {filters.map(({ label, attribute }) => (
        <button
          key={attribute}
          onClick={() => onChange(attribute)}
          className={`${"filterButton_button"} ${selectedFilter === attribute ? "active" : ''}`}
        >
          {label} ({countForAttribute(attribute)})
        </button>
      ))}
    </div>
  );
}
