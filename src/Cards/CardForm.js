import React from "react";
import { useHistory, useParams } from "react-router-dom";

function CardForm({ card, onChangeBackHandler, onChangeFrontHandler, submitHandler, front, back }) {
  const history = useHistory();
  const { deckId } = useParams;
  
  return (
    <div>
      <h1>CardForm</h1>
      
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label for="front">Front</label>
          <textarea 
          type="text" 
          className="form-control" 
          id="front" 
          placeholder="Front side of the card"
          onChange={onChangeFrontHandler}
          value={front}
          ></textarea>
        </div>
        <div class="form-group">
          <label for="back">Back</label>
          <textarea 
          type="text" 
          className="form-control" 
          id="back" 
          placeholder="Back side of the card"
          onChange={onChangeBackHandler}
          value={back}
          ></textarea>
        </div>
      </form>
      <button type="button" className="btn btn-secondary mx-1" onClick={() => history.push(`/decks/${deckId}`)}>Done</button>
      <button type="submit" className="btn btn-primary">Save</button>
    </div>
  )
}

export default CardForm;