// server side
mp.events.add("setShitClothes", (player, index, value) =>
{
    player.setClothes(parseInt(index), parseInt(value), 0, 0);
    //console.log(player.invoke('0x1BDFED65066884D5', parseInt(index), parseInt(value), 0));
});

// client side
const player = mp.players.local;

var clothingIndex = 0;
var clothingValue = 0;

mp.keys.bind(0x72, true, function()
{
    clothingValue++;
    mp.events.callRemote("setShitClothes", clothingIndex, clothingValue);
});

mp.keys.bind(0x71, true, function()
{
    clothingValue--;
    mp.events.callRemote("setShitClothes", clothingIndex, clothingValue);
});

mp.keys.bind(0x73, true, function()
{
    clothingIndex++;

    if(clothingIndex == 12) clothingIndex = 0; // if we reach 12, we return to 0 since there are only 11 indexes
    if(clothingIndex == 7) clothingIndex = 8; // skip index 7 since it's unused

    clothingValue = 0;
});

// Using an array instead of a switch statement, much cleaner.
var clothingIndexName =
    ["Head",
    "Masks",
    "Hair",
    "Arms / Gloves",
    "Legs",
    "Back Props",
    "Feet",
    "", // unused
    "Undershirt",
    "Armour",
    "Decals",
    "Overshirt"];

//var clothingString = mp.game.ui.getLabelText(mp.game.invoke('0x0368B3A838070348', clothingValue, clothingIndex, 0, 0));
//var clothingString = mp.game.ui.getLabelText(mp.game.invoke('0x1BDFED65066884D5', mp.players.local.handle, clothingValue, clothingIndex, 0));

var clothingString = "NULL";

mp.events.add('render', () =>
{
    mp.game.graphics.drawText('Clothing Index: ' + clothingIndexName[clothingIndex] + ' (' + clothingIndex + ')', [0.5, 0.005],
    {
      font: 4,
      color: [255, 255, 255, 255],
      scale: [1.0, 1.0],
      outline: true
    });

    mp.game.graphics.drawText('Clothing Value: ' + clothingValue, [0.5, 0.050],
    {
      font: 4,
      color: [255, 255, 255, 255],
      scale: [1.0, 1.0],
      outline: true
    });

    mp.game.graphics.drawText('itemName: ' + clothingString, [0.5, 0.1],
    {
      font: 4,
      color: [255, 255, 255, 255],
      scale: [1.0, 1.0],
      outline: true
    });

});
