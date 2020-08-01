const functions = require('firebase-functions');

// when show votes buuton is clicked
exports.showPoints = functions.database.ref('/{room}/showPoints').onWrite((change, context) => {
  const previousValue = change.before.val();
  const currentValue = change.after.val();

  if (previousValue != 1 && currentValue == 1) {
    change.after.ref.parent
      .child('players')
      .once('value')
      .then(snapAfter => {
        const playersAfter = snapAfter.val();
        const pointsAfter = playerPoints(playersAfter, false);
        if (pointsAfter.length >= 2) {
          pushToElastic(context.params.room, pointsAfter);
        } else {
          console.info('== Data invalid, skipped.');
          return null;
        }
      });
  } else {
    console.info('== Someone clicked showVote more than one time, skipped.');
    return null;
  }
});

// when everyone voted
exports.everyoneVoted = functions.database.ref('/{room}/players/{playerName}/point').onWrite((change, context) => {
  const previousValue = change.before.val();
  const currentValue = change.after.val();

  if (previousValue <= 0 && currentValue > 0) {
    change.after.ref.parent.parent.once('value').then(snapAfter => {
      const playersAfter = snapAfter.val();
      const pointsAfter = playerPoints(playersAfter, true);
      if (pointsAfter.length >= 2) {
        pushToElastic(context.params.room, pointsAfter);
      } else {
        console.info('== Wait, Some one did not vote.');
        return null;
      }
    });
  } else {
    console.info('== Someone changed the point, skipped.');
    return null;
  }
});

/* ============= */

function pushToElastic(roomName, data) {
  const { Client } = require('@elastic/elasticsearch');
  const client = new Client({
    node: functions.config().elastic.host,
    maxRetries: 1,
    requestTimeout: 1000,
    auth: {
      username: functions.config().elastic.user,
      password: functions.config().elastic.pwd,
    },
  });
  // time
  const time = new Date().toISOString();
  // push
  client.index(
    {
      index: 'planning-poker',
      id: roomName.replace(/\W/g, '') + '@' + time,
      body: {
        room: roomName,
        time: time,
        points: shuffle(data),
      },
    },
    function(err, resp, status) {
      if (err) {
        console.error('== ERROR - HTTP ' + resp.statusCode + ' ' + resp.body.error.reason);
      } else {
        console.info('== SUCCESS - HTTP ' + resp.statusCode);
      }
    }
  );
}

function shuffle(a) {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function playerPoints(players, requireAll) {
  const points = [];
  for (const key in players) {
    if (players[key].point > 0) {
      points.push(players[key].point);
    }
    if (players[key].point == 0 && requireAll) {
      return [];
    }
  }
  return points;
}
