import React, { useState , useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');  
  const [email, setMail] = useState('');
  const [country, setCountry] = useState('');
  const [newFoodName, setNewFoodName] = useState('');
  const [contactList, setContactList] = useState([]);
  

  useEffect(() => {
    Axios.get('http://localhost:3001/read').then((response) => {
      setContactList(response.data);
    })
  }, [])

  const addToList = () => {
    Axios.post('http://localhost:3001/insert' , {
      Name: name,
      Email: email,
      Country: country
    });
  };

  return (
    <div className="App">
      <h1>Data Collection</h1>
      <h2>Enter your details below</h2>

      <label> Name: </label>
      <input type='text' onChange ={(event) =>
         {setName(event.target.value)}
          } /> 


      <label> E-mail: </label>
      <input type='text' onChange ={(event) =>
         {setMail(event.target.value)}
          }/>

      <label> Country: </label>
      <input type='text' onChange ={(event) =>
         {setCountry(event.target.value)}
          }/>

      <br/>
      <button onClick = {addToList}>Submit</button>
      <h1>Details submitted</h1>

      {contactList.map((val , key) =>{
        return(
          <div key = {key}>
            <h1> {val.Name} </h1> <h1> {val.Country} </h1> <h1>{val.Email}</h1>

            <input 
            type='text' 
            placeholder='Name'
            onChange = {(event) =>
            {setNewFoodName(event.target.value)}
             }/>

            <button> Update </button> 
            <input 
            type='text' 
            placeholder='E-mail'
            onChange = {(event) =>
            {setNewFoodName(event.target.value)}
             }/> 

            <button> Update </button>
            <input 
            type='text' 
            placeholder='Country'
            onChange = {(event) =>
            {setNewFoodName(event.target.value)}
             }/>

            <button> Update </button>
            <button> Delete </button>
          </div>  

        )
      })}
    </div>
  );
}

export default App;
