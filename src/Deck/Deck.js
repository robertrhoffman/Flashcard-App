import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import DeckDelete from "../Delete/DeckDelete";
import CardDelete from "../Delete/CardDelete";

function Deck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState([]);
  const [cardPull, setCardPull] = useState([]);

  //load appropriate deck
  useEffect(() => {
    const deckAbort = new AbortController();

    async function loadDeck() {
      try {
        const pullDeck = await readDeck(deckId, deckAbort.signal);
        setDeck(pullDeck);
        setCardPull(pullDeck.cards)

      } catch (error) {
        console.log("error creating deck list")
      }
      return () => deckAbort.abort();
    }
    loadDeck();
  }, [deckId]);

  let printCards;
    if (cardPull) {
      printCards = cardPull.map((card) => {
        return (
          <div className="cards border rounded m-1" key={card.id}>
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Front</h6>
              <p>{card.front}</p>
            </div>
            <div className="card-body m-1">
              <p className="card-subtitle m-1 text-muted">Back</p>
              <p>{card.back}</p>
            </div>
            <div>
              <button 
              type="button" 
              className="btn btn-secondary mx-1 float-right"
              onClick={() => history.push(`/decks/${deck.id}/cards/${card.id}/edit`)}
              >Edit</button>
              <CardDelete cardId={card.id} deckId={deck.id} />
            </div>
          </div>
        )
      })
    } else {
      printCards = "Loading";
    }

    //console.log(deck);
    //console.log(cardPull);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Library</li>
        </ol>
      </nav>
      <div className="header">
        <h1>{deck.name}</h1>
        <p>{deck.description}</p>
        <div className="buttons">
          <button 
            type="button" 
            className="btn btn-secondary mx-1" 
            onClick={() => history.push(`/decks/${deck.id}/edit`)}>
              Edit
          </button>
          <button 
            type="button" 
            className="btn btn-primary mx-1" 
            onClick={() => history.push(`/decks/${deck.id}/study`)}>
              Study
          </button>
          <button 
            type="button" 
            className="btn btn-primary mx-1" 
            onClick={() => history.push(`/decks/${deck.id}/cards/new`)}>
              + Add Cards
          </button>
          <DeckDelete deckId={deck.id} />
        </div>
        
      <h3 className="my-2">Cards</h3>
        <div>{printCards}</div>
      </div>
      
    </div>
  )
}

export default Deck;