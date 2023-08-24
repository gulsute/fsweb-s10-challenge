export const s10chLocalStorageKey = "s10ch";

export const baslangicDegerleri = {
  notlar: [
    {
      id: "75g1IyB8JLehAr0Lr5v3p",
      date: "Fri Feb 03 2023 09:40:27 GMT+0300 (GMT+03:00)",
      body: "Bugün hava çok güzel!|En iyi arkadaşımın en iyi arkadaşı olduğumu öğrendim :)|Kedim iyileşti!",
    },
  ],
};

function localStorageStateYaz(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function localStorageStateOku(key) {
  return JSON.parse(localStorage.getItem(key));
}

function baslangicNotlariniGetir(key) {
  const eskiNotlar = localStorage.getItem(key);

  if (eskiNotlar) {
    return localStorageStateOku(key);
  } else {
    return baslangicDegerleri;
  }
}

export default function reducer(state, action) {
  switch (action.type) {
    case "NOT_EKLE":
      const yeniNotlar = [...state.notlar, action.payload];
      localStorageStateYaz(s10chLocalStorageKey, {
        ...state,
        notlar: yeniNotlar,
      });
      return { ...state, notlar: yeniNotlar };
    case "NOT_SIL":
      const notlar = state.notlar.filter((not) => not.id !== action.payload);
      return { ...state, notlar };

    default:
      return state;
  }
}
