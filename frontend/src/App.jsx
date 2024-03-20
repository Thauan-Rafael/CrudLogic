import React from "react";
function App() {
  const [cards, setCards] = React.useState([]);
  function createCard() {
    let title = document.querySelector('#cardTitle').value;
    let text = document.querySelector('#cardText').value;
    let color = document.querySelector('#cardColor').value;
    if(cards.length > 2){
      alert('The maximum of cards is 3');
    }
    else{
    setCards([...cards, <Card title={title} text={text} color={color}></Card>]);
    }
  }
  return (
    <>
    <div id="pageTitle">
      <h1>CRUD LOGIC</h1>
    </div>
    <div id="entries" className="container">
      <label htmlFor='cardTitle'>Title</label>
      <select id="cardTitle" name="cardTitle">
        <option value='Admin'>Admin</option>
        <option value='Hello'>Hello</option>
        <option value='Main'>Main</option>
        <option value='Master'>Master</option>
      </select>
      <label htmlFor='cardText'>Text</label>
      <select id="cardText" name="cardText">
        <option value='Hello World'>Hello World</option>
        <option value='Nice Day'>Nice Day</option>
        <option value='Thank You'>Thank You</option>
        <option value='Goodbye'>Goodbye</option>
      </select>
      <label htmlFor='cardColor'>Color</label>
      <select id="cardColor" name="cardColor">
        <option value='blue'>Blue</option>
        <option value='pink'>Pink</option>
        <option value='purple'>Purple</option>
        <option value='green'>Green</option>
      </select>
      <button className="btn btn-success" onClick={createCard}>Create</button>
    </div>
    <div id="cardsSection" className="container-fluid">
    {cards}
    </div>
    </>
  )
  function Card(props) {
    return(
      <div id="crudCard" className="container" style={{backgroundColor: props.color}}>
        <h3>{props.title}</h3>
        <h5>{props.text}</h5>
        <div id="cardButtons">
          <button className="cardBtn btn btn-warning">Update</button>
          <button className="cardBtn btn btn-danger">Delete</button>
        </div>
        
      </div>
    )
  }
}


export default App
