const locations = {};
const items = {};
const npcs = {};

function addLocations(names) {
  names.forEach(
    (name) => (locations[name] = { name, itemNeeds: [], items: [], npcs: [], neighbours: [] })
  );
}

function addItems(names) {
  names.forEach((name) => (items[name] = { name, value: 0, space: 0 }));
}

function addNPCs(names) {
  names.forEach((name) => (npcs[name] = { name, items: [], itemWants: [], isEnemy: false }));
}

function setItemValue(item, value) {
  items[item].value = value;
}

function setItemSpace(item, space) {
  items[item].space = space;
}

function setItemAtLocation(item, location) {
  locations[location].items.push(items[item]);
}

function setNPCEnemy(isEnemy, npc) {
  npcs[npc].isEnemy = isEnemy;
}

function setItemOnNPC(item, npc) {
  npcs[npc].items.push(items[item]);
}

function setNPCAtLocation(npc, location) {
  locations[location].npcs.push(npcs[npc]);
}

function setNPCWantsItem(npc, item) {
  npcs[npc].itemWants.push(items[item]);
}

function setLocationNeighbour(location, neighbour) {
  locations[location].neighbours.push(locations[neighbour]);
  locations[neighbour].neighbours.push(locations[location]);
}

function setLocationRequiresItem(location, item) {
  locations[location].itemNeeds.push(items[item]);
}

addLocations(['outside', 'entrancehall', 'cloister', 'library', 'observatory']);
addItems(['fruitbasket', 'brokenbow', 'brokenaxe']); // outside
addItems(['cookedrat']); // entrancehall
addItems(['warhorn', 'silverlamp']); // cloister
addItems([
  'dustytome',
  'scrawlednote',
  'TheLustyLizardMaidVol1',
  'TheLustyLizardMaidVol2',
  'ADreamOfValhalla',
  'TheGreatWar',
]); // library
addItems(['oldscroll', 'weavedbasket', 'tankard']); // observatory
addNPCs(['bandit1']); // outside
addNPCs(['bandit2', 'bandit3']); // entrancehall
addNPCs(['bandit4']); // cloister
addNPCs(['banditboss']); // observatory
addItems(['antechamberkey']); // on banditboss

addLocations(['upperstairwell', 'lowerstairwell']);

addLocations(['antechamber', 'armoury', 'grandhall', 'crypt', 'shrine', 'exit']);
addItems(['goldenclaw', 'stonechalice']); // antechamber
addItems(['ancientshield', 'rustyironmace', 'rustyancientsword', 'brokensteeldagger']); // armoury
addItems(['goldnecklace']); // grandhall
addItems(['ancientsword', 'silverring', 'jewelledring']); // crypt
addItems(['incense', 'amulet']); // shrine
addNPCs(['draugr1']); // antechamber
addNPCs(['giantspider']); // armoury
addNPCs(['draugr2', 'draugr3', 'draugrboss']); // grandhall
addNPCs(['draugr4']); // crypt
addNPCs(['spirit']); // shrine
addItems(['poison']); // on giantspider
addItems(['ancienttablet']); // on draugrboss
addItems(['exitkey']); // on spirit

addLocations(['riverwood', 'meadery', 'stables', 'citygates', 'marketplace', 'store']);
addItems(['soulgem', 'sweetroll', 'carrot']); // item
addNPCs(['nazeem', 'belethor']); // npc

addLocations(['gildergreen', 'dragonsreach']);
addNPCs(['lucan', 'farengar']); // npc

setItemValue('cookedrat', 5);
setItemValue('tankard', 5);
setItemValue('fruitbasket', 10);
setItemValue('warhorn', 10);
setItemValue('dustytome', 10);
setItemValue('weavedbasket', 10);
setItemValue('ADreamOfValhalla', 10);
setItemValue('brokenbow', 20);
setItemValue('brokenaxe', 20);
setItemValue('scrawlednote', 20);
setItemValue('TheGreatWar', 20);
setItemValue('silverlamp', 50);
setItemValue('TheLustyLizardMaidVol1', 50);
setItemValue('TheLustyLizardMaidVol2', 50);
setItemValue('oldscroll', 100);
setItemValue('antechamberkey', 100);

setItemValue('rustyironmace', 10);
setItemValue('rustyancientsword', 10);
setItemValue('brokensteeldagger', 10);
setItemValue('incense', 10);
setItemValue('silverring', 30);
setItemValue('amulet', 30);
setItemValue('poison', 30);
setItemValue('stonechalice', 50);
setItemValue('exitkey', 50);
setItemValue('ancientshield', 50);
setItemValue('goldenclaw', 100);
setItemValue('ancientsword', 100);
setItemValue('goldnecklace', 100);
setItemValue('ancienttablet', 200);
setItemValue('jewelledring', 200);

setItemValue('soulgem', 30);
setItemValue('sweetroll', 10);
setItemValue('carrot', 10);

setItemSpace('antechamberkey', 1);
setItemSpace('scrawlednote', 1);
setItemSpace('cookedrat', 3);
setItemSpace('tankard', 3);
setItemSpace('warhorn', 3);
setItemSpace('silverlamp', 3);
setItemSpace('oldscroll', 3);
setItemSpace('dustytome', 4);
setItemSpace('ADreamOfValhalla', 4);
setItemSpace('TheGreatWar', 4);
setItemSpace('TheLustyLizardMaidVol1', 4);
setItemSpace('TheLustyLizardMaidVol2', 4);
setItemSpace('fruitbasket', 7);
setItemSpace('brokenaxe', 7);
setItemSpace('brokenbow', 7);
setItemSpace('weavedbasket', 7);

setItemSpace('poison', 1);
setItemSpace('silverring', 1);
setItemSpace('jewelledring', 1);
setItemSpace('amulet', 1);
setItemSpace('goldnecklace', 1);
setItemSpace('exitkey', 1);
setItemSpace('incense', 2);
setItemSpace('stonechalice', 2);
setItemSpace('ancienttablet', 2);
setItemSpace('brokensteeldagger', 2);
setItemSpace('rustyironmace', 8);
setItemSpace('rustyancientsword', 8);
setItemSpace('ancientsword', 8);
setItemSpace('goldenclaw', 8);
setItemSpace('ancientshield', 10);

setItemSpace('soulgem', 1);
setItemSpace('sweetroll', 1);
setItemSpace('carrot', 1);

setItemAtLocation('fruitbasket', 'outside');
setItemAtLocation('brokenbow', 'outside');
setItemAtLocation('brokenaxe', 'outside');
setItemAtLocation('cookedrat', 'entrancehall');
setItemAtLocation('warhorn', 'cloister');
setItemAtLocation('silverlamp', 'cloister');
setItemAtLocation('dustytome', 'library');
setItemAtLocation('scrawlednote', 'library');
setItemAtLocation('TheLustyLizardMaidVol1', 'library');
setItemAtLocation('TheLustyLizardMaidVol2', 'library');
setItemAtLocation('ADreamOfValhalla', 'library');
setItemAtLocation('TheGreatWar', 'library');
setItemAtLocation('oldscroll', 'observatory');
setItemAtLocation('weavedbasket', 'observatory');
setItemAtLocation('tankard', 'observatory');

setItemAtLocation('goldenclaw', 'antechamber');
setItemAtLocation('stonechalice', 'antechamber');
setItemAtLocation('ancientshield', 'armoury');
setItemAtLocation('rustyironmace', 'armoury');
setItemAtLocation('rustyancientsword', 'armoury');
setItemAtLocation('brokensteeldagger', 'armoury');
setItemAtLocation('goldnecklace', 'grandhall');
setItemAtLocation('ancientsword', 'crypt');
setItemAtLocation('silverring', 'crypt');
setItemAtLocation('jewelledring', 'crypt');
setItemAtLocation('incense', 'shrine');
setItemAtLocation('amulet', 'shrine');

setItemAtLocation('carrot', 'marketplace');

setNPCEnemy(true, 'bandit1');
setNPCEnemy(true, 'bandit2');
setNPCEnemy(true, 'bandit3');
setNPCEnemy(true, 'bandit4');
setNPCEnemy(true, 'banditboss');

setNPCEnemy(true, 'draugr1');
setNPCEnemy(true, 'draugr2');
setNPCEnemy(true, 'draugr3');
setNPCEnemy(true, 'draugr4');
setNPCEnemy(true, 'giantspider');
setNPCEnemy(true, 'draugrboss');
setNPCEnemy(true, 'spirit');

setNPCEnemy(true, 'nazeem');
setNPCEnemy(false, 'belethor');

setNPCEnemy(false, 'lucan');
setNPCEnemy(false, 'farengar');

setItemOnNPC('antechamberkey', 'banditboss');

setItemOnNPC('poison', 'giantspider');
setItemOnNPC('ancienttablet', 'draugrboss');
setItemOnNPC('exitkey', 'spirit');

setItemOnNPC('soulgem', 'nazeem');
setItemOnNPC('sweetroll', 'belethor');

setNPCAtLocation('bandit1', 'outside');
setNPCAtLocation('bandit2', 'entrancehall');
setNPCAtLocation('bandit3', 'entrancehall');
setNPCAtLocation('bandit4', 'cloister');
setNPCAtLocation('banditboss', 'observatory');

setNPCAtLocation('draugr1', 'antechamber');
setNPCAtLocation('giantspider', 'armoury');
setNPCAtLocation('draugr2', 'grandhall');
setNPCAtLocation('draugr3', 'grandhall');
setNPCAtLocation('draugrboss', 'grandhall');
setNPCAtLocation('draugr4', 'crypt');
setNPCAtLocation('spirit', 'shrine');

setNPCAtLocation('nazeem', 'marketplace');
setNPCAtLocation('belethor', 'store');

setNPCAtLocation('lucan', 'riverwood');
setNPCAtLocation('farengar', 'dragonsreach');

setNPCWantsItem('belethor', 'soulgem');
setNPCWantsItem('belethor', 'carrot');

setLocationNeighbour('outside', 'entrancehall');
setLocationNeighbour('entrancehall', 'cloister');
setLocationNeighbour('cloister', 'library');
setLocationNeighbour('cloister', 'observatory');

setLocationNeighbour('cloister', 'upperstairwell');
setLocationNeighbour('upperstairwell', 'lowerstairwell');
setLocationNeighbour('lowerstairwell', 'antechamber');

setLocationRequiresItem('antechamber', 'antechamberkey');

setLocationNeighbour('antechamber', 'armoury');
setLocationNeighbour('antechamber', 'grandhall');
setLocationNeighbour('grandhall', 'crypt');
setLocationNeighbour('crypt', 'shrine');

setLocationRequiresItem('exit', 'exitkey');

setLocationNeighbour('crypt', 'exit');

setLocationNeighbour('outside', 'riverwood');
setLocationNeighbour('outside', 'meadery');

setLocationNeighbour('exit', 'riverwood');
setLocationNeighbour('exit', 'meadery');
setLocationNeighbour('riverwood', 'meadery');
setLocationNeighbour('meadery', 'stables');
setLocationNeighbour('stables', 'citygates');
setLocationNeighbour('citygates', 'marketplace');
setLocationNeighbour('marketplace', 'store');
setLocationNeighbour('marketplace', 'gildergreen');
setLocationNeighbour('gildergreen', 'dragonsreach');

const game = {
  currentLocation: locations['outside'],
  health: 50,
  bagSpace: 50,
  itemInBagGoals: [items['sweetroll']],
  itemOnNPCGoals: { goldenclaw: npcs['lucan'], ancienttablet: npcs['farengar'] },
};

export default game;
