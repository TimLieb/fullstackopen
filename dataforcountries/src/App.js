import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar.js";
import countriesService from "./services/countries.js";
import CountryList from "./components/CountryList.js";

function App() {
    const [searchInput, setSearchInput] = useState("");
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        countriesService
            .getAll()
            .then((storedCountries) => setCountries(storedCountries));
    }, []);

    const inputHandler = (event) => {
        setSearchInput(event.target.value);
    };

    const filteredCountries = countries.filter(
        (country) =>
            country.name.common
                .toUpperCase()
                .indexOf(searchInput.toUpperCase()) !== -1
    );

    return (
        <div>
            <SearchBar input={searchInput} changeHandler={inputHandler} />
            <CountryList countries={filteredCountries} />
        </div>
    );
}

export default App;
