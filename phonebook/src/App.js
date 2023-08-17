import { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter.js";
import Form from "./components/Form.js";
import Person from "./components/Person.js";
import personService from "./services/persons.js";
import SuccessMessage from "./components/SuccessMessage.js";
import "./index.css";
import ErrorMessage from "./components/ErrorMessage.js";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [nameFilter, setNewFilterName] = useState("");
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        personService
            .getAll()
            .then((initialPersons) => setPersons(initialPersons));
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

    const handleRemove = (person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            personService.remove(person.id);
            setPersons(persons.filter((person2) => person2.id !== person.id));
        }
    };

    const addPerson = (event) => {
        event.preventDefault();
        const existingPerson = persons.find(
            (person) => person.name === newName
        );
        const personObject = {
            name: newName,
            number: newNumber,
        };

        if (existingPerson != null) {
            if (
                window.confirm(
                    `${newName} is already added to phonebook, replace the old number with a new one?`
                )
            ) {
                personService
                    .update(existingPerson.id, personObject)
                    .then((updatedPerson) => {
                        setPersons(
                            persons.map((person) =>
                                person.id === existingPerson.id
                                    ? updatedPerson
                                    : person
                            )
                        );
                        setSuccessMessage(`Updated ${existingPerson.name}`);
                        setTimeout(() => {
                            setSuccessMessage(null);
                        }, 5000);
                    })
                    .catch((error) => {
                        setErrorMessage(
                            `Person validation failed: ${error.response.data.error}`
                        );
                        setTimeout(() => {
                            setErrorMessage(null);
                        }, 5000);
                    });
            }
            return;
        }

        personService
            .create(personObject)
            .then((returnedPerson) => {
                setPersons(persons.concat(returnedPerson));
                setNewName("");
                setNewNumber("");
                setSuccessMessage(`Added ${personObject.name}`);
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 5000);
            })
            .catch((error) => {
                setErrorMessage(
                    `Person validation failed: ${error.response.data.error}`
                );
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
            });
    };

    const filteredPersons = persons.filter(
        (person) =>
            person.name.toUpperCase().indexOf(nameFilter.toUpperCase()) !== -1
    );

    return (
        <div>
            <h1>Phonebook</h1>
            <SuccessMessage message={successMessage} />
            <ErrorMessage message={errorMessage} />
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
            <h2>Numbers</h2>
            {filteredPersons.map((person) => (
                <Person
                    key={person.id}
                    person={person}
                    clickHandler={() => handleRemove(person)}
                />
            ))}
        </div>
    );
};

export default App;
