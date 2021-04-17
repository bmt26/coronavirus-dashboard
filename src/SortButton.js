import { useEffect, React } from "react";
import PropTypes from "prop-types";
import ReactDom from "react-dom";

function SortButton(props) {
    const mostLeast = props.mostLeast;
    
    function sort() {
        SwitchButton(!mostLeast);
    }
    
    if (mostLeast) {
        return (
            <div id="play_again">
                <button onClick={sort}>Name▲</button>
            </div>
        );
    }
    
    return (
        <div id="play_again">
            <button onClick={sort}>Name▼</button>
        </div>
    );
}

function SwitchButton() {
    ReactDom.render(
        <SortButton mostLeast={arguments[0]} />,
        document.getElementById("play_again")
    );
}

SortButton.propTypes = {
    mostLeast: PropTypes.node.isRequired,
};
export default SortButton;