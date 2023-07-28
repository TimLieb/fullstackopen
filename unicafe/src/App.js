import { useState } from "react";

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const Button = ({ handleClick, text }) => (
        <button onClick={handleClick}>{text}</button>
    );
    const goodHandler = () => {
        setGood(good + 1);
        setNeutral(neutral);
        setBad(bad);
    };
    const neutralHandler = () => {
        setGood(good);
        setNeutral(neutral + 1);
        setBad(bad);
    };
    const badHandler = () => {
        setGood(good);
        setNeutral(neutral);
        setBad(bad + 1);
    };

    const all = good + neutral + bad;
    const average = (good - bad) / all;
    const positive = (good / all) * 100 + "%";

    const Statistics = ({ good, neutral, bad, all, average, positive }) => {
        if (all !== 0) {
            return (
                <div>
                    <table>
                        <tbody>
                            <StatisticLine text={"good"} value={good} />
                            <StatisticLine text={"neutral"} value={neutral} />
                            <StatisticLine text={"bad"} value={bad} />
                            <StatisticLine text={"all"} value={all} />
                            <StatisticLine text={"average"} value={average} />
                            <StatisticLine text={"positive"} value={positive} />
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <div>
                    <p>No feedback given</p>
                </div>
            );
        }
    };

    const StatisticLine = ({ text, value }) => (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={goodHandler} text={"good"} />
            <Button handleClick={neutralHandler} text={"neutral"} />
            <Button handleClick={badHandler} text={"bad"} />
            <h1>statistics</h1>
            <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                all={all}
                average={average}
                positive={positive}
            />
        </div>
    );
};

export default App;
