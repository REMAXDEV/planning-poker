export interface Player {
  point: number;
  connected: boolean;
}

export interface Players {
  [index: string]: Player;
}
