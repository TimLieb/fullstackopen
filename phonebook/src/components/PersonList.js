const PersonList = (props) => {
    return (
        <div>
            <h2>Numbers</h2>
            {props.persons.map((person) => (
                <div key={person.name}>
                    {person.name} {person.number}
                </div>
            ))}
        </div>
    );
};

export default PersonList;
