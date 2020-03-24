import * as firebase from 'firebase/app';
import 'firebase/database';

import { Players } from '../types/player';

class FirebaseService {
  db: any = null;
  room = '';

  constructor(config: { [index: string]: string }) {
    firebase.initializeApp(config);
    this.db = firebase.database();
    console.log('new FirebaseService');
  }

  setRoom(room: string): void {
    this.room = room.toLowerCase();
  }

  setPoint(player: string, pt: number): void {
    this.db.ref(this.room + '/players/' + player.toLowerCase() + '/point').set(pt);
  }

  clearVotes(): void {
    this.db
      .ref(this.room)
      .once('value')
      .then((snapshot: any) => {
        const res = snapshot.val();
        const players: Players = {};
        for (const index in res.players) {
          players[index] = {
            point: 0,
          };
        }
        this.db.ref(this.room).set({
          showPoints: 0,
          players: players,
        });
      });
  }

  showVotes(): void {
    this.db.ref(this.room + '/showPoints').set(1);
  }

  watch(callbackFunc: (snapshot: any) => void) {
    const roomRef = this.db.ref(this.room);
    roomRef.on('value', callbackFunc);
    return roomRef;
  }

  deletePlayer(player: string): void {
    this.db.ref(this.room + '/players/' + player.toLocaleLowerCase()).set(null);
  }
}

const firebaseService = new FirebaseService({
  apiKey: 'AIzaSyAW076Ai3lOBhONLt8pKfUA0jedjf5A7RY',
  authDomain: 'planning-poker-remax.firebaseapp.com',
  databaseURL: 'https://planning-poker-remax.firebaseio.com',
  projectId: 'planning-poker-remax',
  storageBucket: 'planning-poker-remax.appspot.com',
  messagingSenderId: '1050364771989',
  appId: '1:1050364771989:web:a5c621b239496dfaf9e59c',
});

export default firebaseService;
