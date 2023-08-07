const Person = ({ person, clickHandler }) => {
    return (
        <div>
            {person.name} {person.number}{" "}
            <button onClick={clickHandler}>delete</button>
        </div>
    );
};

export default Person;
