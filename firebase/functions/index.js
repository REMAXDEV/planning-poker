const functions = require('firebase-functions');

// exports.showPoints = functions.database.ref('/{room}/showPoints')
//     .onWrite((change, context) => {
//         const previousValue = change.before.val();
//         const currentValue = change.after.val();
//         if( previousValue==0 && currentValue==1 ) {
//             pushToElastic( change.after.ref.parent.child('players') );
//         }
//     });

exports.everyoneVoted = functions.database.ref('/{room}/players/{playerName}/point')
    .onWrite((change, context) => {
        const players = change.after.ref.parent.parent.toJSON();
        //const currentValue = change.after.val();
        const points = playerPoints(players);
        if( points.length>=2 ) {
            pushToElastic( context.params.room, points );
        }
        else {
            console.log('Not everyone voted.' + points.length);
        }
    });



/* ============= */

function pushToElastic(roomName, points) {
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
    // set data
    client.index(
        {
            index: 'planning-poker',
            body: {
                room: roomName,
                time: (new Date()).toISOString(),
                points: shuffle(points),
            },
        },
        function(err, resp, status) {
            if (err) {
                console.error('ERROR - HTTP ' + resp.statusCode + ' ' + resp.body.error.reason);
            } else {
                console.log('SUCCESS - HTTP ' + resp.statusCode);
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

function playerPoints(players) {
    const validPlayerPoints = [];
    for(const key in players) {
        if( players[key].point>0 ) {
            validPlayerPoints.push(players[key].point);
        }
        if( players[key].point==0 ) {
            return [];
        }
    }
    return validPlayerPoints;
}