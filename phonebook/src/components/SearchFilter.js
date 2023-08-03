const SearchFilter = (props) => {
    return (
        <div>
            filter shown with
            <input value={props.input} onChange={props.changeHandler} />
        </div>
    );
};

export default SearchFilter;
