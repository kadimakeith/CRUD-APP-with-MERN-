import React, { useState , useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');  
  const [email, setMail] = useState('');
  const [country, setCountry] = useState('');
  const [newName, setNewName] = useState('');
  const [newMail, setNewMail] = useState('');
  const [newCountry, setNewCountry] = useState('');
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

   const updateName = (id) => {
     Axios.put('http://localhost:3001/updateName', {
       id: id,
       newName: newName
     })

   }

  const updateMail = (id) => {
    Axios.put('http://localhost:3001/updateMail', {
       id: id,
       newName: newName
     })

  }

  const updateCountry = (id) => {
    Axios.put('http://localhost:3001/updateCountry', {
       id: id,
       newName: newName
     })

  }

  const deleteContact = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`)
  }
 

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
            <label>Name:</label>
            <h3> {val.Name} </h3>
                        
            <label>Country:</label>
            <h3> {val.Country} </h3>
            
            <label>E-mail:</label> 
            <h3>{val.Email}</h3>
            
            <input 
            type='text' 
            placeholder='Name'
            onChange = {(event) =>
            {setNewName(event.target.value)}
             }/>

            <button onClick={() => updateName(val._id)}> Update </button> 
            <input 
            type='text' 
            placeholder='E-mail'
            onChange = {(event) =>
            {setNewMail(event.target.value)}
             }/> 

            <button onClick={() => updateMail(val._id)}> Update </button>
            <input 
            type='text' 
            placeholder='Country'
            onChange = {(event) =>
            {setNewCountry(event.target.value)}
             }/>

            <button onClick={() => updateCountry(val._id)}> Update </button>
            <br/>

            <button onClick ={() => deleteContact(val._id)}> Delete </button>
            
          </div>  

        )
      })}
    </div>
  );
}
    

          
     

export default App;
