import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import CardList from "../Cards/CardList";

function Study() {

  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [cardCount, setCardCount] = useState(0)
  const { deckId } = useParams();
  
  //loads selected deck
  useEffect(() => {
    const deckAbort = new AbortController();

    async function showCard() {
      try {
        const cardList = await readDeck(deckId, deckAbort.signal);
        setDeck(cardList);
        setCardCount(cardList.cards.length);
        setCards(cardList.cards);
      }
      catch (error) {
        console.log("error creating card list");
      }
    } 

    showCard();
    return () => deckAbort.abort();
  }, ([deckId])) //reruns effect when deckId changes

  console.log(deck);
  // console.log(cardCount);
  // console.log(deck.cards);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Study</li>
        </ol>
      </nav>
      <h1>Study: {`${deck.name}`}</h1>
      <div><CardList deck={deck} cardCount={cardCount} cards={cards} /></div>
    </div>
  )
}

export default Study;