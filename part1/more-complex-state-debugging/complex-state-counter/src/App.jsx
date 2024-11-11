import React from "react";

const App = () => {
    const [left, setLeft] = React.useState(0);
    const [right, setRight] = React.useState(0);
    const [allClicks, setAllClicks] = React.useState([]);
    const [total, setTotal] = React.useState(0);

    const handleLeftClick = () => {
        const nextNumber = left + 1
        setAllClicks([...allClicks, "L"]);
        setLeft(nextNumber);
        setTotal(nextNumber + right);
    };

    const handleRightClick = () => {
        const nextNumber = right + 1
        setAllClicks([...allClicks, "R"]);
        setRight(nextNumber);
        setTotal(left + nextNumber);
    };

    return (
        <div>
            {left}
            <button onClick={handleLeftClick}>Left</button>
            <button onClick={handleRightClick}>Right</button>
            {right}
            <p>{allClicks.join(" ")}</p>
            <p>Total {total}</p>
        </div>
    );
};

export default App;
