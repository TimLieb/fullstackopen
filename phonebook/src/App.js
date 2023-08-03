import { useState } from "react";
import SearchFilter from "./components/SearchFilter.js";
import Form from "./components/Form.js";
import PersonList from "./components/PersonList.js";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", number: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [nameFilter, setNewFilterName] = useState("");

    const handlePersonChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const handleFilterChange = (event) => {
        setNewFilterName(event.target.value);
    };

    const addPerson = (event) => {
        event.preventDefault();
        const arr = persons.map((person) => person.name);
        const test = arr.includes(newName);
        if (test) {
            alert(`${newName} is already in phone book`);
            return;
        }

        const personObject = {
            name: newName,
            number: newNumber,
        };

        setPersons(persons.concat(personObject));
        setNewName("");
        setNewNumber("");
    };

    const filteredPersons = persons.filter(
        (person) =>
            person.name.toUpperCase().indexOf(nameFilter.toUpperCase()) !== -1
    );

    return (
        <div>
            <h1>Phonebook</h1>
            <SearchFilter
                input={nameFilter}
                changeHandler={handleFilterChange}
            />
            <Form
                submitHandler={addPerson}
                nameInput={newName}
                nameChangeHandler={handlePersonChange}
                numberInput={newNumber}
                numberChangeHandler={handleNumberChange}
            />
            <PersonList persons={filteredPersons} />
        </div>
    );
};

export default App;
