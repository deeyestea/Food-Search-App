import React, { useState } from 'react';
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import './App.css';

import Recipe from './components/Recipe';
import Alert from './components/Alert';

function App() {

  const [query, setQuery] = useState('')
  const [recipes, setRecipes] = useState([])
  const [alert, setAlert] = useState('')

  const APP_ID = '2b69a710'
  const APP_KEY = '5684eb344164959e6e0d3b7bdca3e25e'

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== '') {
      const result = await axios.get(url);
      if (!result.data.more) {
        return setAlert("No food with such name")
      }
      setRecipes(result.data.hits)
      console.log(result);
      setAlert("")
      setQuery('')
    } else {
      setAlert('Please fill the form...')
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getData();
  }

  return (
    <div className="App">
      <h1>Food Searching App</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        {alert !== '' && <Alert alert={alert} />}
        <input type="text" placeholder="Search Your Food...." autoComplete="off"
          value={query} onChange={e => setQuery(e.target.value)} />
        <input type="submit" value="Search" />
      </form>

      <div className="recipes">
        {
          recipes !== [] && recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)
        }
      </div>

    </div>
  );
}

export default App;
