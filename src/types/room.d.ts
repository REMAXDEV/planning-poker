import { Players } from './player';

export interface Room {
  showPoints: 0 | 1;
  players: Players;
}
