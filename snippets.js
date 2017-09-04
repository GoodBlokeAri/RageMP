/*
		JavaScript Snippets for RageMP 0.2->
				Compiled by Ari
				 ParagonRP.net
*/


// ```````````````````````````````````````````````````````````````````````````
//			setHeading patch by kemperrrr (deprecated, fixed in client)

//server
mp.events.add('playerJoin', (player) => {
  player.setHeading = (heading) => mp.players.call('setHeading', player, heading);
});
//client
mp.events.add('setHeading', (entity, heading) => {
  entity.setHeading(heading);
});

//usage
player.setHeading(30);

// ```````````````````````````````````````````````````````````````````````````
//				pedShot snippet 

const registerHeadShot = (player) => {
    const handle = player.registerheadshot();
    return new Promise((resolve, reject) => {
        const timer = setInterval(() => {
            if(mp.game.ped.isPedheadshotReady(handle) && mp.game.ped.isPedheadshotValid(handle)) {
                clearInterval(timer);
                resolve(mp.game.ped.getPedheadshotTxdString(handle));
            }
        }, 50);
    });
}

---

registerHeadShot(mp.players.local).then(face => {
    mp.game.ui.setNotificationTextEntry('STRING');
    mp.game.ui.addTextComponentSubstringPlayerName('super cool message');
    mp.game.ui.setNotificationFlashColor(255, 255, 255, 255);
    mp.game.ui.setNotificationMessage(face, face, false, 2, 'super cool title', 'super cool subtitle');
    mp.game.ui.drawNotification(false, true)
})


// ``````````````````````````````````````````````````````````````````````
//				Game Version Check

//	~ add to clientside index.js where you require("gamemode/index.js");

if(!mp.game.dlc2.isDlcPresent(mp.game.joaat("mpsmuggler")))
{
    mp.gui.chat.push("THIS SERVER REQUIRES 1.41 TO JOIN!");
    mp.events.callRemote("checkPlayerGame");
}

//	~ serverside event
mp.events.add('checkPlayerGame', (player, legal) =>
{
    player.kick();
});
