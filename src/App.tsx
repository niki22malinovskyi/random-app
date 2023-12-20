import { useState } from 'react';

import { ChangeEvent } from 'react';
import './App.css';
import { PlayerItem } from './PlayerItem';
import { v1 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { State } from './state/types';
import { Button, Checkbox, IconButton, TextField } from '@mui/material';
import { ControlPoint } from '@mui/icons-material';
function App() {

  const people = useSelector((state: State) => state.people);
  const captain = useSelector((state: State) => state.captain);
  const player = useSelector((state: State) => state.player);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [status, setStatus] = useState(Boolean);
  const [play, setPlay] = useState(Boolean);
  let [error, setError] = useState<string | null>(null);

  const onStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.checked);
  }

  const onPlayer = (e: ChangeEvent<HTMLInputElement>) => {
    setPlay(e.currentTarget.checked);
  }

  const onTakeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }

  const onPressKey = (e: any) => {
    setError(null);
    if (e.key === 'Enter') {
      addPlayer();
    }
  }

  const addPlayer = () => {
    if (name.trim() !== '') {
      dispatch({ type: 'createPerson', id: v1(), name: name, captain: status, player: play, subplayer: status || play ? false : true })
      setName('');
      setStatus(false);
      setPlay(false);
    } else {
      setError('Field is required');
    }
  }

  const onChangeName = (newName: string, id: string) => { dispatch({ type: 'nameChange', id: id, name: newName }) }

  let clickRand = () => dispatch({ type: 'randomTeams' });

  return (
    <div className="App">
      <div className="container">
        <h1>Рандомний підбір команди</h1>
        <p>Внести гравців</p>
        <div className="input__wrap">
          <div className="input__btn">
            <TextField error={!!error} variant={'outlined'} label={'Гравець'} value={name} onChange={onTakeName} onKeyPress={onPressKey} />
            <IconButton onClick={addPlayer} color={'primary'}>
              <ControlPoint />
            </IconButton>
          </div>
          <div className="input__checkbox">
            <label className='label' htmlFor='captain'>Капітан<Checkbox id='captain' checked={status} onChange={onStatus} /></label>
            <label className='label' htmlFor='player'>Сильні гравці<Checkbox id='player' checked={play} onChange={onPlayer} /></label>
          </div>
        </div>
        <div className='people-all'>{`Всього гравців ${people.length}`}</div>
        <ul className='people__lists'>
          {
            people.length
              ? people.map((el: any) => {
                return <PlayerItem
                  key={el.id}
                  name={el.name}
                  id={el.id}
                  captain={el.captain}
                  player={el.player}
                  subplayer={el.subplayer}
                  onChangeName={onChangeName}
                />
              })
              : (<div className='people-all'><span>Немає персон</span></div>)
          }
        </ul>
        <div className='btn'><Button variant="outlined" color={"primary"} disabled={people.length ? false : true} onClick={clickRand}>Зробити рандомні команди</Button></div>
        <div className="inner">
          <div className="wrap__teams__name"><div className='team'>Команди</div></div>
          <div className={`wrap__teams wrap__teams__column-${captain.length}`}>

            <ul>
              {
                captain.length
                  ? captain.map((el: any) => {
                    return <li key={el.id}>
                      <p className='name'>{el.name}</p>
                    </li>
                  })
                  : (<div><span>Немає капітанів</span></div>)
              }

            </ul>
            <ul>
              {
                player.length
                  ? (player.map((el: any) => {
                    return <li key={el.id}>
                      <p className='name'>{el.name}</p>
                    </li>
                  }))
                  : (<div><span>Немає гравців</span></div>)
              }
            </ul>
          </div>
        </div>


      </div>
    </div>
  );
}

export default App;
