const SearchBar = ({ input, changeHandler }) => {
    return (
        <div>
            find countries
            <input value={input} onChange={changeHandler} />
        </div>
    );
};

export default SearchBar;
