import React, { useState , useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [foodName, setFoodName] = useState('');  
  const [days, setDays] = useState(0);
  const [newFoodName, setNewFoodName] = useState('');
  const [foodList, setFoodList] = useState([]);
  

  useEffect(() => {
    Axios.get('http://localhost:3001/read').then((response) => {
      setFoodList(response.data);
    })
  }, [])

  const addToList = () => {
    Axios.post('http://localhost:3001/insert' , {
      foodName: foodName,
      days: days,
    });
  };

  return (
    <div className="App">
      <h1>Zuri Training</h1>
      <h2>CRUD APP WITH MERN</h2>

      <label>Food: </label>
      <input type='text' onChange ={(event) =>
         {setFoodName(event.target.value)}
          } /> 


      <label> Days since I ate: </label>
      <input type='number' onChange ={(event) =>
         {setDays(event.target.value)}
          }/>
      <br/>
      <button onClick = {addToList}>Submit</button>
      <h1>Food list</h1>

      {foodList.map((val , key) =>{
        return(
          <div key = {key}>
            <h1> {val.foodName} </h1> <h1> {val.daysSinceIAte} </h1>

            <input type='text' 
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
