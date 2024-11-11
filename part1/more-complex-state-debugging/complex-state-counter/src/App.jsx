import React from "react";

const App = () => {
    const [left, setLeft] = React.useState(0);
    const [right, setRight] = React.useState(0);
    const [allClicks, setAllClicks] = React.useState([]);

    const handleLeftClick = () => {
        setAllClicks([...allClicks, "L"]);
        setLeft(left + 1);
    };

    const handleRightClick = () => {
        setAllClicks([...allClicks, "R"]);
        setRight(right + 1);
    };

    return (
        <div>
            {left}
            <button onClick={handleLeftClick}>Left</button>
            <button onClick={handleRightClick}>Right</button>
            {right}
            <p>{allClicks.join(" ")}</p>
        </div>
    );
};

export default App;
