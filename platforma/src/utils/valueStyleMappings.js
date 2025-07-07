// utils/valueStyleMappings.js

export const getStavRealizaceInfo = (value) => {
  switch (value) {
    case 'A1': return { label: 'A1 – Soutěž', className: 'stav_oranzova' };
    case 'A2': return { label: 'A2 – Podepsaná smlouva', className: 'stav_modra' };
    case 'A3': return { label: 'A3 – Realizace/Vývoj/Nastavení', className: 'stav_modra' };
    case 'A4': return { label: 'A4 – Pilotní/Zkušební provoz', className: 'stav_modra' };
    case 'A5': return { label: 'A5 – Převzatá dodávka', className: 'stav_zelena' };
    case 'A6': return { label: 'A6 – Produkční nasazení', className: 'stav_zelena' };
    case 'N':  return { label: '', className: 'stav_nic' };
    default:   return { label: value, className: '' };
  }
};

export const getStavInfo = (value) => {
  switch (value) {
    case 'ZAMER_A': return { label: 'A – V realizaci', className: 'stav_modra' };
    case 'ZAMER_B': return { label: 'B – Schváleno', className: 'stav_zelena' };
    case 'ZAMER_C': return { label: 'C – Návrh', className: 'stav_oranzova' };
    case 'ZAMER_D': return { label: 'D – Námět', className: 'stav_seda' };
    case 'STORNO':  return { label: 'Stornovaný', className: 'stav_seda' };
    case 'CLOSED':  return { label: 'E – Zrušené', className: 'stav_seda' };
    default:        return { label: value, className: '' };
  }
};

export const getStavKonzultaceInfo = (value) => {
  switch (value) {
    case 'Příprava':                         return { label: 'Příprava', className: 'stav_oranzova' };
    case 'V realizaci':                       return { label: 'V realizaci', className: 'stav_modra' };
    case 'Ukončeno':                          return { label: 'Ukončeno', className: 'stav_zelena' };
    case 'Čeká na rozhodnutí o konzultaci':   return { label: 'Čeká na rozhodnutí', className: 'stav_seda' };
    default:                                  return { label: value, className: '' };
  }
};

// použiješ v <DataTable /> jako display text
export const getLabelForValue = (columnKey, value) => {
  if (columnKey === 'stav_realizace') {
    return getStavRealizaceInfo(value).label;
  }
  if (columnKey === 'stav') {
    return getStavInfo(value).label;
  }
  if (columnKey === 'stav_konzultace') {
    return getStavKonzultaceInfo(value).label;
  }
  return value;
};

// použiješ v <DataTable /> jako className (např. stav_modra)
export const getClassForValue = (columnKey, value) => {
  if (columnKey === 'stav_realizace') {
    return getStavRealizaceInfo(value).className;
  }
  if (columnKey === 'stav') {
    return getStavInfo(value).className;
  }
  if (columnKey === 'stav_konzultace') {
    return getStavKonzultaceInfo(value).className;
  }
  return '';
};
