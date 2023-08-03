import { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter.js";
import Form from "./components/Form.js";
import PersonList from "./components/PersonList.js";
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [nameFilter, setNewFilterName] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3001/persons").then((response) => {
            setPersons(response.data);
        });
    }, []);

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
