import React from "react";

const Display = ({counter}) => <div>{counter}</div>

const App = () => {
    const [counter, setCounter] = React.useState(0);

    const increaseByOne = () => {
        setCounter(counter + 1);
    };

    const decreaseByOne = () => {
        setCounter(counter - 1);
    };

    const setToZero = () => {
        setCounter(0);
    };

    return (
        <div>
            <Display counter={counter} />
            <button onClick={decreaseByOne}>-</button>
            <button onClick={setToZero}>0</button>
            <button onClick={increaseByOne}>+</button>
        </div>
    );
};

export default App;
