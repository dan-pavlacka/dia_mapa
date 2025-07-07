export async function fetchOvmList() {
    const data = await import('@/data/ovm.json');
    return data.default;
  }
  
  export async function fetchKonzultace() {
    const data = await import('@/data/konzultace.json');
    return data.default;
  }
  
  export async function fetchProjekty() {
    const data = await import('@/data/projekty.json');
    return data.default;
  }
  
  export async function fetchISVS() {
    const data = await import('@/data/ISVS.json');
    return data.default;
  }
  