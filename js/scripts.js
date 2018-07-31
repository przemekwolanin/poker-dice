// Selection functions
var sel = function(selector) {
  return document.querySelector(selector)
}
var selAll = function(selector) {
  return document.querySelectorAll(selector)
}

// Main variables
var dice0 = 0,
dice1 = 0,
dice2 = 0,
dice3 = 0,
dice4 = 0,
dices = 5;
currentSum = 0,
throwCount = 0,
turnSum = 0,
throws = 0,
players = 2,
currentPlayer = 1,
holdedDicesAmm = 0,
tempScores = [];

// Players list object
var playersList = {
  'player1': 'Ja',
  'player2': 'On'
};
var currentPlayerName = playersList['player1'];
document.getElementById('current-player').innerText = currentPlayerName;

// Buttons variables
var throwButton = document.querySelector('.throw');
var closeButton = document.querySelector('.close');
var changePlayerButton = document.querySelector('.change-player');

var createPlaygroundStages;

// Chance player function
var changePlayer = function() {
  currentSum = 0;
  turnSum = 0;
  throws = 0;
  getDices = document.getElementsByClassName('dice');
  for(var i = 0; i < getDices.length; i++) {
    if(getDices[i].classList.contains('dice-holded')) {
      getDices[i].classList.remove('dice-holded');
    }
  }
  if(currentPlayer == players) {
    currentPlayer = 1;
    currentPlayerName = playersList['player1'];
    document.getElementById('current-player').innerText = currentPlayerName;
  } else {
    currentPlayer += 1;
    currentPlayerName = playersList['player'+currentPlayer];
    document.getElementById('current-player').innerText = currentPlayerName;
  }
  fadingAlert('fading-alert','Zmiana gracza!');
}

// Score table
var scoreTable = [
  ['Ones', 0],
  ['Twos', 0],
  ['Threes',  0],
  ['Fours', 0],
  ['Fives', 0],
  ['Sixes', 0],
  ['Up Bonus', 0],
  ['Up Sum', 0],
  ['Overall Sum', 0]
];

// Figure object
var figures = {
  'Ones': [[1,1,1],[1,1,1,1],[1,1,1,1,1]],
  'Twos': [[2,2,2],[2,2,2,2],[2,2,2,2,2]],
  'Threes': [[3,3,3],[3,3,3,3],[3,3,3,3,3]],
  'Fours': [[4,4,4],[4,4,4,4],[4,4,4,4,4]],
  'Fives': [[5,5,5],[5,5,5,5],[5,5,5,5,5]],
  'Sixes': [[6,6,6],[6,6,6,6],[6,6,6,6,6]]
}

// Generate score table
var generateTable = function(pl){
  var getTableBox = document.getElementById('players-tables');
  var g = document.createElement("TABLE");
  var scTBL = scoreTable.length;
  g.setAttribute("id", pl);
  g.classList.add(pl)
  getTableBox.appendChild(g);
  for(var i = 0; i < scTBL; i++) {
    var row = g.insertRow(i);
    row.classList.add('score-row','score-row-'+i)
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    for(var ii = 0; ii < 2; ii++) {
      cell1.innerHTML = scoreTable[i][ii-1];
      cell2.innerHTML = scoreTable[i][ii];
      cell1.classList.add('name-cell','name-cell-'+i);
      cell2.classList.add('score-cell','score-cell-'+i);
    }
  }
};

var randomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var throwDices = function(){
  if(throws <= 2) {
  fadingAlert('fading-alert','RZUT!');

    if(!(sel('.dice1').classList.contains('dice-holded'))) {
      dice1 = randomNumber(1,6);
      sel('.dice1').innerHTML = dice1;
      sel('.dice1').style.left = randomNumber(60,160) + 'px';
      sel('.dice1').style.top = randomNumber(60,160) + 'px';
    }
    if(!(sel('.dice2').classList.contains('dice-holded'))) {
      dice2 = randomNumber(1,6);
      sel('.dice2').innerHTML = dice2;
      sel('.dice2').style.left = randomNumber(160,260) + 'px';
      sel('.dice2').style.top = randomNumber(160,260) + 'px';
    }
    if(!(sel('.dice3').classList.contains('dice-holded'))) {
      dice3 = randomNumber(1,6);
      sel('.dice3').innerHTML = dice3;
      sel('.dice3').style.left = randomNumber(260,360) + 'px';
      sel('.dice3').style.top = randomNumber(260,360) + 'px';
    }
    if(!(sel('.dice4').classList.contains('dice-holded'))) {
      dice4 = randomNumber(1,6);
      sel('.dice4').innerHTML = dice4;
      sel('.dice4').style.left = randomNumber(360,460) + 'px';
      sel('.dice4').style.top = randomNumber(360,460) + 'px';
    }
    if(!(sel('.dice5').classList.contains('dice-holded'))) {
      dice5 = randomNumber(1,6);
      sel('.dice5').innerHTML = dice5;
      sel('.dice5').style.left = randomNumber(460,560) + 'px';
      sel('.dice5').style.top = randomNumber(460,560) + 'px';
    }
    tempScores.push(dice1);
    tempScores.push(dice2);
    tempScores.push(dice3);
    tempScores.push(dice4);
    tempScores.push(dice5);
    console.log(tempScores);
    throws++;
    console.log(dice1+' ',dice2+' ',dice3+' ',dice4+' ',dice5);
  } else {
    document.getElementById('greyWall').style.display = 'block';
    document.getElementById('message').style.display = 'block';
    document.getElementById('title').innerText = 'Koniec tury!';
    document.getElementById('description').innerText = 'Wybierz opcję punktacji i zmień gracza';
  }
}
var setHoldTips = function(){
  var holdDiceNL = selAll('.hold-dice');
  var holdDiceArr  = Array.prototype.slice.call(holdDiceNL);
  var holdDiceArrL = holdDiceArr.length;
  for(var i = 0; i < holdDiceArrL; i++) {
    holdDiceArr[i].addEventListener('mouseover',function() {
      document.getElementById(this.id).getElementsByTagName('span')[0].style.display = 'block';
    });
    holdDiceArr[i].addEventListener('mouseout',function() {
      document.getElementById(this.id).getElementsByTagName('span')[0].style.display = 'none';
    });
  }
};
var holdDice = function(elem){
  var clickedDice = document.getElementById(elem);
  var holdSlotDice = document.getElementById('hold-'+elem);
  console.log(clickedDice, typeof clickedDice, holdSlotDice, typeof holdSlotDice);
  holdSlotDice.appendChild(clickedDice);
  clickedDice.style.top = 0;
  clickedDice.style.left = 0;
  clickedDice.classList.add('dice-holded');
}
var releseDice = function(elem,st1,st2) {
  var clickedDice = document.getElementById(elem);
  var playground = document.getElementById('playground');
  playground.appendChild(clickedDice);
  clickedDice.style.top = st1 + 'px';
  clickedDice.style.left = st2 + 'px';
  clickedDice.classList.remove('dice-holded');
  holdedDicesAmm--;
}

var closeMessage = function() {
  document.getElementById('greyWall').style.display = 'none';
  document.getElementById('message').style.display = 'none';
}

var fadingAlert = function(elem,txt) {
  elem = document.getElementById(elem);
  elemTxt = document.getElementById('fading-alert-txt');
  elemTxt.innerText = txt;
  elem.classList.add('fade-in-out');
  elem.addEventListener('animationend',function(event){
    elem.classList.remove('fade-in-out');
  });
}

throwButton.addEventListener('click',throwDices);
changePlayerButton.addEventListener('click',changePlayer);
closeButton.addEventListener('click',closeMessage);

document.getElementById('dice1').addEventListener('click',function(){
  if( !(sel('.dice1').classList.contains('dice-holded')) ) {
    holdDice('dice1');
  } else {
    releseDice('dice1', 30, 70);
  }
});
document.getElementById('dice2').addEventListener('click',function(){
  if( !(sel('.dice2').classList.contains('dice-holded')) ) {
    holdDice('dice2');
  } else {
    releseDice('dice2', 50, 140);
  }
});
document.getElementById('dice3').addEventListener('click',function(){
  if( !(sel('.dice3').classList.contains('dice-holded')) ) {
    holdDice('dice3');
  } else {
    releseDice('dice3', 100, 240);
  }
});
document.getElementById('dice4').addEventListener('click',function(){
  if( !(sel('.dice4').classList.contains('dice-holded')) ) {
    holdDice('dice4');
  } else {
    releseDice('dice4', 260, 70);
  }
});
document.getElementById('dice5').addEventListener('click',function(){
  if( !(sel('.dice5').classList.contains('dice-holded')) ) {
    holdDice('dice5');
  } else {
    releseDice('dice5', 460, 200);
  }
});
document.addEventListener('pagehide',function(){
  document.getElementById('greyWall').style.display = 'block';
  document.getElementById('message').style.display = 'block';
  document.getElementById('title').innerText = 'Gra zatrzymana';
  document.getElementById('description').innerText = 'Kliknij w okno przeglądarki aby uruchomić ponownie.';
});

generateTable("player-0");
setHoldTips();
