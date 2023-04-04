import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function CardList({deck, cardCount, cards}) {

    const [index, setIndex] = useState(0);
    const [flipSide, setFlipSide] = useState(true);
    const history = useHistory();

    if (cardCount < 3) {
        return (
            <div>
                <h4>Not Enough Cards.</h4>
                <p>You need at least 3 cards to study. There are {`${cardCount}`} cards in this deck.</p>
                <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => history.push(`/decks/${deck.id}/cards/new`)}>
                    + Add Cards
                </button>
            </div>
        )
    }

//flips cards front/back w/boolean
function flipButton() {
    setFlipSide(!flipSide);
}

//cycles through deck; once complete, user prompted to restart or return home 
function nextClick() {
    if (index < (cardCount-1)) {
        setIndex(index + 1);
        setFlipSide(true);
    } else {
        const restartPrompt = window.confirm("Restart? Click 'Cancel' to return to the home page.");
        //if restart prompt returns true, reset deck to initial conditions
        if (restartPrompt) {
            setIndex(0);
            setFlipSide(true);
        } else {
            //if restart prompt is false, go home
            history.push("/")
        }
    }
}

  return (
    <div>
        <h1>CardList</h1>
        <div className="card w-75">
            <div className="card-body">
                <h5 className="card-title">Card {index + 1} of {cardCount}</h5>
                    <p className="card-text">{flipSide ? cards[index]?.front : cards[index]?.back}</p>
                        <button type="button" className="btn btn-secondary" onClick={flipButton}>Flip</button>
                        <button type="button" className="btn btn-primary" onClick={nextClick}>Next</button>
            </div>
        </div>
    </div>
  )
}

export default CardList;