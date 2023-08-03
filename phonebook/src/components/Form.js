const Form = (props) => {
    return (
        <div>
            <h2>add a new</h2>
            <form onSubmit={props.submitHandler}>
                <div>
                    name:{" "}
                    <input
                        value={props.nameInput}
                        onChange={props.nameChangeHandler}
                    />
                </div>
                <div>
                    number:{" "}
                    <input
                        value={props.numberInput}
                        onChange={props.numberChangeHandler}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    );
};

export default Form;
