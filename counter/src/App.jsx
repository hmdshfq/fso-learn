import React from "react";

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
            <div>{counter}</div>
            <button onClick={decreaseByOne}>-</button>
            <button onClick={setToZero}>0</button>
            <button onClick={increaseByOne}>+</button>
        </div>
    );
};

export default App;
