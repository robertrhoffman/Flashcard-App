import React from "react";
import { useState } from "react"; 
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function CreateDeck() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //handles updating "name" and "description" values that will be put into new deck
  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  
  //updates new deck in data/db.json, then directs to new decks "view" page
  const handleSubmit = (event) => {
    console.log("handlesubmit");
    event.preventDefault();
    createDeck({
      name: name, 
      description: description,
    }).then((newDeck) => {
      console.log(newDeck);
      history.push(`${newDeck.id}`);
    })
    // console.log(name);
    // console.log(description);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label for="name">Name</label>
          <input 
          type="text" 
          className="form-control" 
          id="name" 
          aria-describedby="name"
          placeholder="Deck Name"
          value={name} 
          onChange={handleNameChange} />
        </div>
        <div className="form-group">
          <label for="description">Description</label>
          <input 
          type="textarea" 
          className="form-control" 
          id="name" 
          aria-describedby="description"
          placeholder="Brief description of the deck"
          rows="3"
          value={description} 
          onChange={handleDescriptionChange} />
        </div>
        
        <br />
        <button className="btn btn-secondary mx-1" onClick={() => history.push(`/`)}>
          Cancel
        </button>
        <button className="btn btn-primary mx-1">
          Submit
        </button>
      </form>
    </div>
  )
}

export default CreateDeck;