import React from "react";

const History = ({ allClicks }) => {
    if (allClicks.length === 0) {
        return <p>This app is used by pressing the buttons</p>;
    }
    return <p>Button press history: {allClicks.join(" ")}</p>;
};

const Button = ({ onClick, text }) => {
    return <button onClick={onClick}>{text}</button>;
};

const App = () => {
    const [left, setLeft] = React.useState(0);
    const [right, setRight] = React.useState(0);
    const [allClicks, setAllClicks] = React.useState([]);
    const [total, setTotal] = React.useState(0);

    const handleLeftClick = () => {
        const nextNumber = left + 1;
        setAllClicks([...allClicks, "L"]);
        setLeft(nextNumber);
        setTotal(nextNumber + right);
    };

    const handleRightClick = () => {
        const nextNumber = right + 1;
        setAllClicks([...allClicks, "R"]);
        setRight(nextNumber);
        setTotal(left + nextNumber);
    };

    return (
        <div>
            {left}
            <Button onClick={handleLeftClick} text="Left" />
            <Button onClick={handleRightClick} text="Right" />
            {right}
            <p>Total {total}</p>
            <History allClicks={allClicks} />
        </div>
    );
};

export default App;
