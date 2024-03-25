import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() { 
  const [cards, setCards] = React.useState([]);
  const [action, setAction] = React.useState('Do a SQL Action and will appear here!')
  React.useEffect(() => {
    changeCards();
  },[]);
  function changeCards(){
      fetch('https://crudlogic-server.onrender.com/checkCards')
          .then(response => response.json())
          .then(data => {
              if (data.exists) {
                let rowCards = data.rows;
                setCards(cards => {
                return rowCards.map(row => {
                  let { title: dbTitle, text: dbText, color: dbColor } = row;
                   return <Card key={row.id} id={row.id} title={dbTitle} text={dbText} color={dbColor} changeCards={changeCards}></Card>;
                })
              })
            }})
          .catch(error => {
              console.error('Error in connection:', error);
          });
    }
  function createCard(event){
    event.preventDefault();
    if(cards.length >=3){
      toast.info("3 cards max!",{
        position: 'bottom-right',className: 'cardAlert'
      })
      return
    }
    else if(cards.length < 3){
      let cardTitle = document.querySelector('#cardTitle').value;
      let cardText = document.querySelector('#cardText').value;
      let cardColor = document.querySelector('#cardColor').value;
      fetch(`https://crudlogic-server.onrender.com/createCard/${cardTitle}/${cardText}/${cardColor}`)
      .then(response => {
        if(response.ok){
          changeCards();
          setAction(`INSERT INTO cards (title,text,color) VALUES (${cardTitle},${cardText},${cardColor})`);
        }
        else{
          console.log('Failed to create card');
        }
      })
      .catch(error => {
        console.error('Error creating card:', error);
      });
    }
  }
  return (
    <>
    <div id="pageTitle">
      <h1>CRUD LOGIC</h1>
    </div>
    <form id="entries" className="container">
      <div className="entry">
      <label htmlFor='cardTitle'>Title</label>
        <select id="cardTitle" name="cardTitle">
          <option value='Admin'>Admin</option>
          <option value='Hello'>Hello</option>
          <option value='Main'>Main</option>
          <option value='Master'>Master</option>
        </select>
      </div>
      <div className="entry">
        <label htmlFor='cardText'>Text</label>
        <select id="cardText" name="cardText">
          <option value='Hello World'>Hello World</option>
          <option value='Nice Day'>Nice Day</option>
          <option value='Thank You'>Thank You</option>
          <option value='Goodbye'>Goodbye</option>
        </select>
      </div>
      <div className="entry">  
        <label htmlFor='cardColor'>Color</label>
        <select id="cardColor" name="cardColor">
          <option value='blue'>Blue</option>
          <option value='pink'>Pink</option>
          <option value='purple'>Purple</option>
          <option value='green'>Green</option>
        </select>
      </div>
      <button className="btn btn-success" onClick={createCard}>Create Card</button>
    </form>
    <div id="cardsSection" className="container-fluid">
    {cards}
    </div>
    <div id="sqlDescription" className="container-fluid">
      <h2>{action}</h2>
    </div>
    <ToastContainer/>
    </>
  )
  function Card(props) {
    function readCard(){
      setAction(`SELECT * FROM cards where id=${props.id}`)
    }
    function updateCard(){
      let cardTitle = document.querySelector('#cardTitle').value;
      let cardText = document.querySelector('#cardText').value;
      let cardColor = document.querySelector('#cardColor').value;
      fetch(`https://crudlogic-server.onrender.com/updateCard/${props.id}/${cardTitle}/${cardText}/${cardColor}`)
      .then(response => {
        if(response.ok){
          props.changeCards();
          setAction(`UPDATE cards SET title=${cardTitle}, text=${cardText}, color=${cardColor} WHERE id=${props.id}`)
        }
        else{
          console.log('Failed to update card');
        }
      })
      .catch(error => {
        console.error('Error updating card:', error);
      }); 
    }
    function deleteCard(){
      fetch(`https://crudlogic-server.onrender.com/deleteCard/${props.id}`)
      .then(response => {
        if(response.ok){
          props.changeCards();
          setAction(`DELETE FROM cards WHERE id=${props.id}`)
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
      <div id="crudCard" className="container" style={{backgroundColor: props.color}} onClick={readCard}>
        <h3>{props.title}</h3>
        <h5>{props.text}</h5>
        <div id="cardButtons">
          <button className="cardBtn btn btn-warning" onClick={updateCard}>Update</button>
          <button className="cardBtn btn btn-danger" onClick={deleteCard}>Delete</button>
        </div>
        
      </div>
    )
  }
}
export default App
