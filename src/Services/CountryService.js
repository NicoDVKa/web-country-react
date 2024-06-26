import { CountryJson } from "../Domain/Adapter/CountryJson";

export const getAllCountries = async () => {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,cca2"
    );
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    const jsonData = await response.json();
    return jsonData.map(json => CountryJson.fromJsonToCountry(json)) ;
  } catch (error) {
    console.error("Error:", error);
  }

}

export const getCountryByCode = async (code) => {
    try {
        const response = await fetch(
            `https://restcountries.com/v3.1/alpha/${code}`
        );
        if (!response.ok) {
            throw new Error("Error al obtener los datos");
        }
        const jsonData = (await response.json()).pop();
        if(jsonData.borders){
          const borders = await getFlagsByCodes(jsonData.borders);
          jsonData.borders = borders
        }
        return CountryJson.fromJsonToCountry(jsonData) ;
    } catch (error) {
        console.error("Error:", error);
    }
}

export const getFlagsByCodes = async (codes) => {
  try {
    const response = await fetch(
        `https://restcountries.com/v3.1/alpha?codes=${codes.join(",")}&fields=flags,cca2,name`
    );
    if (!response.ok) {
        throw new Error("Error al obtener los datos");
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
      console.error("Error:", error);
  }
}