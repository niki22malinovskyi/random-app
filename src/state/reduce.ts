import { Action, State } from "./types";

const initialState: State = {
  people: [
    {id: '1', name: 'Саня', captain: true, player: false, subplayer: false},
    {id: '2', name: 'Даніл', captain: true, player: false, subplayer: false},
    {id: '3', name: 'Жека', captain: false, player: true, subplayer: false},
    {id: '4', name: 'Андрій', captain: false, player: true, subplayer: false},
    {id: '5', name: 'Коля', captain: false, player: true, subplayer: false},
    {id: '6', name: 'Олег', captain: false, player: true, subplayer: false},
    {id: '7', name: 'Назар', captain: false, player: true, subplayer: false},
    {id: '8', name: 'Костя', captain: false, player: true, subplayer: false},
    {id: '9', name: 'Хриня', captain: false, player: false, subplayer: true},
    {id: '10', name: 'Ваня Мал.', captain: false, player: false, subplayer: true},
  ],
  captain: [],
  player: [],
};

export const reducerPlayer = (
  state: State = initialState, action: Action): State => {
  switch (action.type) {
    
    case "randomTeams": {
      let stateCopy = state.people
      let statePlayerCopy = state.player;
      let stateCapCopy = state.captain;
      let captain = state.people.filter((el: any) => el.captain === true);
      let player = state.people.filter((el: any) => el.player === true);
      let subplayer = state.people.filter((el: any) => el.subplayer === true);
      let randomCapElement = captain[Math.floor(Math.random() * captain.length)];
      let randomPlayerElement = player[Math.floor(Math.random() * player.length)];
      let randomSubplayerElement = subplayer[Math.floor(Math.random() * subplayer.length)];
      
      
      if(captain.length) {
        stateCapCopy = [...stateCapCopy, randomCapElement ];
        stateCopy = [...state.people.filter((el: any) => el.id !== randomCapElement.id)];
      } else if(player.length) {
        statePlayerCopy = [...statePlayerCopy, randomPlayerElement ];
        stateCopy = [...state.people.filter((el: any) => el.id !== randomPlayerElement.id)];
      } else {
        statePlayerCopy = [...statePlayerCopy, randomSubplayerElement ];
        stateCopy = [...state.people.filter((el: any) => el.id !== randomSubplayerElement.id)];
      }

      return { ...state, people: stateCopy, captain: stateCapCopy, player: statePlayerCopy };
    }

    case "removePlayer": {
      let stateCopy = state.people
      stateCopy = [...state.people.filter((el: any) => el.id !== action.id)];
      
      return { ...state, people: stateCopy };
    }

    case "createPerson": {
      let stateCopy = state.people;
      const newPerson = {id: action.id, name: action.name, captain: action.captain, player: action.player, subplayer: action.subplayer};
      stateCopy = [...stateCopy, newPerson];
      
      return { ...state, people: stateCopy };
    }

    case "nameChange": {
      let stateCopy = state.people;
      let person = stateCopy.find((el: any) => el.id === action.id);
      if (person) {
        person.name = action.name;
        stateCopy=[...stateCopy]
    }
      
      return { ...state, people: stateCopy };
    }
    default:
      return state;
  }
};
