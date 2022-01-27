var selector = document.getElementsByClassName("selector");

function setPos(x,y){
  selector[0].style.paddingLeft = x + "px";
  selector[0].style.paddingTop = y + "px";
}

//Selects random element from list
function random(){
    return parseInt((Math.random()* Object.keys(stagesPos).length))
}

var stagesPos = {
  "Windswept plains": [365, 35],
  "Master Swordsman's cave azure horizon": [607, 25],
  "Ostrheinsburg Castle: Hall of the chosen": [1100, 25],
  "Cursed Moonlit Woods": [1340, 35],
  "Sunken Desert Ruins": [330, 210],
  "Shrine of Eurydice: Cloud sanctuary": [575, 200],
  "Kunpaetku Temple: Serpentine Banquet": [1130, 200],
  "Indian Port: Impending storm": [1375, 210],
  "City Ruins: Eternal apocalypse": [330, 390],
  "Snow-Capped Showdown": [575, 405],
  "Astral Chaos: Tide of the Damned": [850, 420],
  "Replica Kaer Morhen": [1130, 405],
  "Silver Wolves' Haven": [1375, 388],
  "Murakumo Shrine Grounds": [365, 565],
  "Gairyu Isle": [605, 580],
  "Master Swordsman's Cave: Wicked Depths": [1100, 580],
  "Motien Pass Ruins": [1342, 565],
  "Silver Wolves' Haven (Daytime)": [425, 740],
  "Shrine of Eurydice (Evening)": [637, 760],
  "Master Swordsman's Cave (Evening)": [1080, 760],
  "Murakumo Shrine Grounds (Night)": [1300, 740],
};


//Stages with groups
function cycle(){
  var pos = 0;
  var cycleBoi;
  cycleBoi = setInterval(function(){
    if(pos == Object.keys(stagesPos).length){
      clearInterval(cycleBoi);
    }
    else{
      setPos(stagesPos[Object.keys(stagesPos)[pos]][0], stagesPos[Object.keys(stagesPos)[pos]][1])
      pos += 1;
    }
  }, 100);
}

//flashes random stages x times, set to -1 for infinite
function randomCycle(duration, endPos = null){
  stageId = 0
  stageCount = 0
  prevStageId = -1
  var randoms;
  randoms = setInterval(function(){
    do{
      stageId = random();
    }
    while(stageId == prevStageId)

    if(stageCount == duration){
      clearInterval(randoms);
      if(endPos != null){
        setPos(endPos[0], endPos[1]);
      }
    }
    else{
      setPos(stagesPos[Object.keys(stagesPos)[stageId]][0], stagesPos[Object.keys(stagesPos)[stageId]][1])
      prevStageId = stageId
      stageCount += 1
    }
  }, 100);
}

function main(randomCylces = 6){
  //Full list of stages
  var stageKeys = ["Windswept plains", ["Master Swordsman's cave azure horizon", "Master Swordsman's Cave (Evening)"], "Ostrheinsburg Castle: Hall of the chosen", ["Cursed Moonlit Woods", "Silver Wolves' Haven (Daytime)", "Silver Wolves' Haven"], "Sunken Desert Ruins", ["Shrine of Eurydice: Cloud sanctuary", "Shrine of Eurydice (Evening)"], "Kunpaetku Temple: Serpentine Banquet", "Indian Port: Impending storm", "City Ruins: Eternal apocalypse", "Snow-Capped Showdown", "Astral Chaos: Tide of the Damned", "Replica Kaer Morhen", ["Murakumo Shrine Grounds","Murakumo Shrine Grounds (Night)"], "Gairyu Isle", "Master Swordsman's Cave: Wicked Depths", "Motien Pass Ruins"];

  var bannedStages = [];

  //Matches until a map comes back into rotation
  var maxMaps = 2;

  //Hopps before final


  //Reads previous maps from client
  var previousMaps = JSON.parse(localStorage.getItem("PreviousMaps"));
  console.log(previousMaps);
  if(previousMaps == null){
    previousMaps = [];
  }

  //Ensures that previousMaps doesnt exceed maxMaps
  do{
    previousMaps.shift();
  }
  while(previousMaps.length > maxMaps);

  //Generate random numbers until randomselect isnt in previousMaps
  var randomSelect;
  var equalsLast = -1;
  do{
    randomSelect = parseInt((Math.random()* stageKeys.length))
    equalsLast = previousMaps.indexOf(randomSelect)
  }
  while(equalsLast != -1);

  //Adds the current map to previousMaps and saves it
  previousMaps.push(randomSelect)
  localStorage.setItem("PreviousMaps", JSON.stringify(previousMaps));

  //Displays the map to the user depending on if the map is a collection of maps or just a singular map
  if(typeof(stageKeys[randomSelect]) == "object"){
    temp = parseInt((Math.random() * stageKeys[randomSelect].length))
    temp2 = stageKeys[randomSelect]
    randomCycle(randomCylces, stagesPos[temp2[temp]]);
    return temp2[temp];
  }
  else{
    randomCycle(randomCylces, stagesPos[stageKeys[randomSelect]]);
    return stageKeys[randomSelect];
  }
}

window.onload = main()
