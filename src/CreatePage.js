import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createGame } from './services/fetch-utils';

export default function CreatePage() {
  const history = useHistory();
  // you'll need the history hook from react-router-dom to do your redirecting in the handleSubmit
  const [createForm, setCreateForm] = useState({
    title: '',
    genre: '',
    designer: '',
    description: '',
    minPlayers: 0,
    maxPlayers: 0,
  });
  // here's the state you'll need:
    // title;
    // genre;
    // designer;
    // description;
    // minPlayers;
    // maxPlayers;

  async function handleSubmit(e) {
    e.preventDefault();

    await createGame(createForm);
    // create a game

    history.push('/ListPage');
    // use history.push to send the user to the list page
  }

  return (
    <div className='create'>
      {/* on submit, call your handleSubmit function */}
      <form onSubmit={handleSubmit}>
        <h2>Add board game</h2>
        <label>
            Title
          {/* on change, set the title in state */}
          <input
            required
            name='title' 
            value={createForm.name} 
            onChange={e => setCreateForm({
              ...createForm,
              name: e.target.value,
            })} />
        </label>
        <label>
            Genre
          {/* on change, set the genre in state */}
          <select
            required
            value={createForm.genre} 
            onChange={e => setCreateForm({
              ...createForm,
              genre: e.target.value,
            })}>
            <option>Tile-laying</option>
            <option>Economic</option>
            <option>War</option>
            <option>Card</option>
            <option>Abstract</option>
            <option>Cooperative</option>
            <option>Solo</option>
          </select>
        </label>
        <label>
            Designer
          {/* on change, set the designer in state */}
          <input required name='designer' 
            value={createForm.designer} 
            onChange={e => setCreateForm({
              ...createForm,
              designer: e.target.value,
            })} />
        </label>
        <label>
            Min Players
          {/* on change, set the min players in state */}
          <input required name='min_players'
            value={createForm.min_players} 
            onChange={e => setCreateForm({
              ...createForm,
              min_players: e.target.value,
            })} />
        </label>
        <label>
            Max Players
          {/* on change, set the max players in state */}
          <input required name='max_players'
            value={createForm.max_players} 
            onChange={e => setCreateForm({
              ...createForm,
              max_players: e.target.value,
            })} />
        </label>
        <label>
            Description
          {/* on change, set the description in state */}
          <textarea required name='description'
            value={createForm.description} 
            onChange={e => setCreateForm({
              ...createForm,
              description: e.target.value,
            })} />
        </label>
        <button>Create game</button>
      </form>
    </div>
  );
}
