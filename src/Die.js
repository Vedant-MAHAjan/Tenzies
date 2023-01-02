import React from "react"

export default function Die(props) {
    // if isHeld is true, change color to green otherwise white
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        // when div of die is clicked, run the holdDice prop
        <div
            className="die-face"
            style={styles}
            onClick={props.holdDice}
        >
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}