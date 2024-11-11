import React from "react";

const Display = ({ counter }) => <div>{counter}</div>;
const Button = ({text, onClick}) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

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
            <Button onClick={decreaseByOne} text='-' />
            <Button onClick={setToZero} text='0' />
            <Button onClick={increaseByOne} text='+' />
        </div>
    );
};

export default App;
