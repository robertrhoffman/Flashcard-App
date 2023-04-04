import React, { useEffect, useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import { updateDeck } from "../utils/api/index";

function EditDeck() {
  const history = useHistory();
  const { deckId } = useParams();

  const [deck, setDeck] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //handles updating "name" & "description" values that will be in new deck
  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  //loads appropriate deck
  useEffect(() => {
    const deckAbort = new AbortController();

    async function loadDeck() {
      try {
        const pullDeck = await readDeck(deckId, deckAbort.signal); //Pass `AbortController` signal to `loadDeck()`
        setDeck(pullDeck);
        setName(pullDeck.name);
        setDescription(pullDeck.description);
      } 
      catch (error) {
        console.log("error creating deck list");
      }
    }
    loadDeck();
    return () => deckAbort.abort(); //cancels any pending request or response
  }, [deckId])

  //on submit, updates new deck in data/db.json, then site directs to new decks "view" page
  const handleSubmit = (event) => {
    event.preventDefault();
    updateDeck({
      ...deck, 
      name: name,
      description: description, 
    }).then((newDeck) => history.push(`decks/${newDeck.id}`))
    //console.log(name);
    //console.log(description);
  }
  return (
    //create deck form saves data inputted by form into data/db.json
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`${deck.name}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="name">Name</label>
          <input 
          type="text" 
          className="form-control" 
          id="name" 
          value={name} 
          required 
          onChange={handleNameChange} />
        </div>
        <br />
        <div className="form-group">
          <label for="description">Description</label>
          <textarea 
          type="text" 
          className="form-control" 
          id="description" 
          value={description} 
          required 
          onChange={handleDescriptionChange} />
        </div>
        <button 
          type="button" 
          className="btn btn-secondary mb-2 mx-1" onClick={() => history.push(`/decks/${deck.id}`)}>
            Cancel
        </button>
        <button type="submit" className="btn btn-primary mb-2">Submit</button>
      </form>

    </div>
  )
}

export default EditDeck;