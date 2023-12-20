export interface State {
    people: any;
    captain: any;
    player: any;
  }

  export interface addName {
    type: 'removePlayer';
    id: string;
  }

  export interface removePlayer {
    type: 'randomTeams';
  }

  export interface addPlayer {
    type: "createPerson";
    id: string;
    name: string;
    captain: boolean;
    player: boolean;
    subplayer: boolean;
  }

  export interface nameChange {
    type: 'nameChange';
    id: string;
    name: string;
  }
  
export type Action = addName | removePlayer | addPlayer | nameChange;