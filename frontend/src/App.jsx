import React from "react";
function App() {
  const [cards, setCards] = React.useState([]);
  function createCard(event){
    event.preventDefault();
    if(cards.length >=3){
      alert('Maximum 3');
      return
    }
    else if(cards.length < 3){
      document.querySelector('#entries').submit();
    }
  }
  React.useEffect(() => {
    fetch('http://localhost:3000/checkCards')
        .then(response => response.json())
        .then(data => {
            if (data.exists) {
              let rowCards = data.rows;
              setCards(cards => {
              return rowCards.map(row => {
                let { title: dbTitle, text: dbText, color: dbColor } = row;
                 return <Card key={row.id} id={row.id} title={dbTitle} text={dbText} color={dbColor}></Card>;
              })
            })
        }})
        .catch(error => {
            console.error('Error in connection:', error);
        });
  },[]);
  return (
    <>
    <div id="pageTitle">
      <h1>CRUD LOGIC</h1>
    </div>
    <form id="entries" className="container" method="post" action="http://localhost:3000">
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
    </form>
    <div id="cardsSection" className="container-fluid">
    {cards}
    </div>
    </>
  )
  function Card(props) {
    function UpdateCard(){
      let cardTitle = document.querySelector('#cardTitle').value;
      let cardText = document.querySelector('#cardText').value;
      let cardColor = document.querySelector('#cardColor').value;
      console.log(cardTitle)
      fetch(`http://localhost:3000/updateCard/${props.id}/${cardTitle}/${cardText}/${cardColor}`)
      .then(response => {
        if(response.ok){
          location.reload();
        }
        else{
          console.log('Failed to update card');
        }
      })
      .catch(error => {
        console.error('Error updating card:', error);
      }); 
    }
    function DeleteCard(){
      fetch(`http://localhost:3000/deleteCard/${props.id}`)
      .then(response => {
        console.log(response.ok)
        if(response.ok){
          location.reload();
        }
        else{
          console.log('Failed to delete card');
        }
      })
      .catch(error => {
        console.error('Error deleting card:', error);
      });
    }
    return(
      <div id="crudCard" className="container" style={{backgroundColor: props.color}}>
        <h3>{props.title}</h3>
        <h5>{props.text}</h5>
        <div id="cardButtons">
          <button className="cardBtn btn btn-warning" onClick={UpdateCard}>Update</button>
          <button className="cardBtn btn btn-danger" onClick={DeleteCard}>Delete</button>
        </div>
        
      </div>
    )
  }
}
export default App
