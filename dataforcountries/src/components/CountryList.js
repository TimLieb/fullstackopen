const CountryList = ({ countries }) => {
    switch (true) {
        case countries.length > 10:
            return <div>Too many matches, specify another filter</div>;
        case countries.length === 1:
            return countries.map((country) => (
                <div key={country.name.official}>
                    <div>
                        <h2>{country.name.common}</h2>
                    </div>
                    <div>
                        <p>capital: {country.capital}</p>
                        <p>area: {country.area}</p>
                    </div>
                    <div>
                        <b>languages:</b>
                    </div>
                    <div>
                        <ul>
                            {Object.values(country.languages).map(
                                (language) => (
                                    <li key={language}>{language}</li>
                                )
                            )}
                        </ul>
                    </div>
                    <img
                        src={country.flags.png}
                        alt="Country flag"
                        width="150"
                        height="150"
                    />
                </div>
            ));
        default:
            return countries.map((country) => (
                <div key={country.name.official}>{country.name.common}</div>
            ));
    }
};

export default CountryList;
