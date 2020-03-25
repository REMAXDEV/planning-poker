import * as firebase from 'firebase/app';
import 'firebase/database';

import { Players } from '../types/player';

class FirebaseService {
  db: firebase.database.Database;
  room = '';
  player = '';

  constructor(config: { [index: string]: string }) {
    firebase.initializeApp(config);
    this.db = firebase.database();
    console.info('new FirebaseService');
  }

  signIn(room: string, player: string): void {
    this.room = room.toLowerCase();
    this.player = player.toLowerCase();
    this.setPoint(0);
    //
    const connectedRef = this.db.ref('.info/connected');
    connectedRef.on('value', (snap: firebase.database.DataSnapshot) => {
      if (snap.val() === true) {
        const con = this.db.ref(this.room + '/players/' + this.player + '/connected');
        con.onDisconnect().set(false);
        con.set(true);
      }
    });
  }

  setPoint(pt: number): void {
    this.db
      .ref(this.room + '/players/' + this.player + '/point')
      .set(pt)
      .catch(this.errorHandler);
  }

  clearVotes(): void {
    this.db
      .ref(this.room)
      .once('value')
      .then((snapshot: firebase.database.DataSnapshot) => {
        const res = snapshot.val();
        const players: Players = {};
        for (const index in res.players) {
          players[index] = {
            point: 0,
            connected: !!res.players[index].connected,
          };
        }
        this.db
          .ref(this.room)
          .set({
            showPoints: 0,
            players: players,
          })
          .catch(this.errorHandler);
      })
      .catch(this.errorHandler);
  }

  showVotes() {
    this.db
      .ref(this.room + '/showPoints')
      .set(1)
      .catch(this.errorHandler);
  }

  watch(callbackFunc: (snapshot: firebase.database.DataSnapshot) => void) {
    this.db.ref(this.room).on('value', callbackFunc);
    console.info('Connect to: ' + this.room);
  }

  deletePlayer(player: string): void {
    this.db
      .ref(this.room + '/players/' + player.toLocaleLowerCase())
      .remove()
      .catch(this.errorHandler);
  }

  detachListener() {
    this.db.ref(this.room).off();
    this.db.ref('.info/connected').off();
    console.info('Disconnect from: ' + this.room);
  }

  errorHandler(res: any) {
    console.error(res);
  }
}

const firebaseService = new FirebaseService({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
});

export default firebaseService;
