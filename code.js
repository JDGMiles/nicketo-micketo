const startdecks = 8; // starting decks in shoe

var counts = []; // frequency of cards remaining by type (index 0 = TJQK, 1 = Aces, 1 = 2s, ... 9 = 9s)

counts[0] = 16 * startdecks; // generates initial count for 0s from 'startdecks'

for (var i = 1; i < 10; i++) { // generates initial counts for 1-9 from 'startdecks'
  counts[i] = 4 * startdecks;
}

var odds = []; // payout for ties 0 to 9
odds[odds.length] = 150;
odds[odds.length] = 215;
odds[odds.length] = 225;
odds[odds.length] = 200;
odds[odds.length] = 120;
odds[odds.length] = 110;
odds[odds.length] = 45;
odds[odds.length] = 45;
odds[odds.length] = 80;
odds[odds.length] = 80;

function alter(m, n) { // alters frequency of an individual card type
  counts[m] += -n;
  updateui();
}

function deck(n) { // adds or subtracts decks (= 4 of each card type)
  counts[0] += 16 * -n;
  for (var i = 1; i < 10; i++) {
    counts[i] += 4 * -n;
  }
  updateui();
}

function updateui() { // updates displayed card frequencies
  var cardsgone = [];
  cardsgone[0] = 16 * startdecks - counts[0];
  document.getElementById('0-count').innerHTML = cardsgone[0];
  for (var i = 1; i < 10; i++) {
    cardsgone[i] = 4 * startdecks - counts[i];
    document.getElementById(i + '-count').innerHTML = cardsgone[i];
  }
  var total = 0;
  for (var i = 0; i < 10; i++) {
    total += counts[i];
  }
  document.getElementById('total').innerHTML = total;

  var systemcount = []; // tc system
  systemcount[systemcount.length] = [-3, 2, 2, 2, 2, 1, 1, 0, 1, 1];
  systemcount[systemcount.length] = [-1, -6, 2, 2, 2, 2, 1, 1, 0, 0];
  systemcount[systemcount.length] = [-1, -1, -6, 2, 2, 2, 2, 1, 2, 0];
  systemcount[systemcount.length] = [-1, -1, -1, -6, 2, 2, 3, 3, 0, 2];
  systemcount[systemcount.length] = [0, -1, 0, 0, -6, 1, 2, 2, 2, 0];
  systemcount[systemcount.length] = [0, 0, -1, -1, 0, -6, 2, 2, 2, 2];
  systemcount[systemcount.length] = [1, 0, 0, 0, 0, 0, -7, 1, 1, 1];
  systemcount[systemcount.length] = [1, 1, 0, 0, 0, 0, 0, -8, 2, 1];
  systemcount[systemcount.length] = [1, 1, 1, 0, 0, 0, 0, 0, -7, 1];
  systemcount[systemcount.length] = [1, 1, 1, 1, 0, 0, 0, 0, 1, -8];
  var triggers = [7, 7, 6, 7, 7, 7, 7, 4, 6, 6];

  for (var i = 0; i < 10; i++) {
    var countnumber = Math.round(100 * (systemcount[i][1] * cardsgone[1] + systemcount[i][2] * cardsgone[2] + systemcount[i][3] * cardsgone[3] + systemcount[i][4] * cardsgone[4] + systemcount[i][5] * cardsgone[5] + systemcount[i][6] * cardsgone[6] + systemcount[i][7] * cardsgone[7] + systemcount[i][8] * cardsgone[8] + systemcount[i][9] * cardsgone[9] + systemcount[i][0] * cardsgone[0]) / (total / 52)) / 100;
    document.getElementById(i + '-tcount').innerHTML = countnumber + " (" + triggers[i] + ")";
    if (countnumber > triggers[i]) {
      document.getElementById(i + '-tcount').style.color = "yellow";
    }
    else {
      document.getElementById('' + i + '-tcount').style.color = "rgb(130, 130, 0)";
    }
  }
}

function playgame(a, b, c, d, e, f, v) { // returns game result (0 to 9 = tie 0 to 9, 10 = punto 11 = banco) and how (when v=1)
  var pun = (a + c) % 10;
  var ban = (b + d) % 10;
  if (v) { document.getElementById('drum').innerHTML += "Top of deck is: " + a + ", " + b + ", " + c + ", " + d + ", " + e + ", " + f + "<br>Punto: " + pun + " Banco: " + ban + "<br>" }
  if (pun == 9 || pun == 8 || ban == 9 || ban == 8) {
    if (pun == ban) {
      if (v) { document.getElementById('drum').innerHTML += "TIE<br>" }
      return pun;
    }
    else if (pun > ban) {
      if (v) { document.getElementById('drum').innerHTML += "PUNTO WINS<br>" }
      return 10;
    }
    else {
      if (v) { document.getElementById('drum').innerHTML += "BANCO WINS<br>" }
      return 11;
    }
  }
  else if (pun == 7 || pun == 6) {
    if (ban == 7 || ban == 6) {
      if (pun == ban) {
        if (v) { document.getElementById('drum').innerHTML += "TIE<br>" }
        return pun;
      }
      else if (pun > ban) {
        if (v) { document.getElementById('drum').innerHTML += "PUNTO WINS<br>" }
        return 10;
      }
      else {
        if (v) { document.getElementById('drum').innerHTML += "BANCO WINS<br>" }
        return 11;
      }
    }
    else {
      ban = (ban + e) % 10;
      if (v) { document.getElementById('drum').innerHTML += "Banco draws extra card: " + e + "<br>Punto: " + pun + " Banco: " + ban + "<br>" }
      if (pun == ban) {
        if (v) { document.getElementById('drum').innerHTML += "TIE<br>" }
        return pun;
      }
      else if (pun > ban) {
        if (v) { document.getElementById('drum').innerHTML += "PUNTO WINS<br>" }
        return 10;
      }
      else {
        if (v) { document.getElementById('drum').innerHTML += "BANCO WINS<br>" }
        return 11;
      }
    }
  }
  else {
    pun = (pun + e) % 10;
    if (v) { document.getElementById('drum').innerHTML += "Punto draws extra card: " + e + "<br>Punto: " + pun + " Banco: " + ban + "<br>" }
    if (ban < 3) {
      ban = (ban + f) % 10;
      if (v) { document.getElementById('drum').innerHTML += "Banco draws extra card: " + f + "<br>Punto: " + pun + " Banco: " + ban + "<br>" }
    }
    else if (ban == 3 && e != 8) {
      ban = (ban + f) % 10;
      if (v) { document.getElementById('drum').innerHTML += "Banco draws extra card: " + f + "<br>Punto: " + pun + " Banco: " + ban + "<br>" }
    }
    else if (ban == 4 && e != 1 && e != 8 && e != 9 && e != 0) {
      ban = (ban + f) % 10;
      if (v) { document.getElementById('drum').innerHTML += "Banco draws extra card: " + f + "<br>Punto: " + pun + " Banco: " + ban + "<br>" }
    }
    else if (ban == 5 && e != 1 && e != 2 && e != 3 && e != 8 && e != 9 && e != 0) {
      ban = (ban + f) % 10;
      if (v) { document.getElementById('drum').innerHTML += "Banco draws extra card: " + f + "<br>Punto: " + pun + " Banco: " + ban + "<br>" }
    }
    else if (ban == 6 && e != 1 && e != 2 && e != 3 && e != 4 && e != 5 && e != 8 && e != 9 && e != 0) {
      ban = (ban + f) % 10;
      if (v) { document.getElementById('drum').innerHTML += "Banco draws extra card: " + f + "<br>Punto: " + pun + " Banco: " + ban + "<br>" }
    }
    if (pun == ban) {
      if (v) { document.getElementById('drum').innerHTML += "TIE<br>" }
      return pun;
    }
    else if (pun > ban) {
      if (v) { document.getElementById('drum').innerHTML += "PUNTO WINS<br>" }
      return 10;
    }
    else {
      if (v) { document.getElementById('drum').innerHTML += "BANCO WINS<br>" }
      return 11;
    }
  }
}

function launch() {
  var edge = [];
  for (var i = 0; i < 10; i++) {
    edge[i] = 0;
  }

  document.getElementById("bongo").innerHTML = '';
  document.getElementById("drum").innerHTML = '';

  var winrates = [];
  for (var i = 0; i < 12; i++) {
    winrates[i] = 0;
  }

  var total = 0;
  for (var i = 0; i < 10; i++) {
    total += counts[i];
  }

  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      for (var k = 0; k < 10; k++) {
        for (var l = 0; l < 10; l++) {
          for (var m = 0; m < 10; m++) {
            for (var n = 0; n < 10; n++) {
              var probability = counts[i] / total;
              counts[i]--;
              probability = probability * counts[j] / (total - 1);
              counts[j]--;
              probability = probability * counts[k] / (total - 2);
              counts[k]--;
              probability = probability * counts[l] / (total - 3);
              counts[l]--;
              probability = probability * counts[m] / (total - 4);
              counts[m]--;
              probability = probability * counts[n] / (total - 5);
              counts[i]++;
              counts[j]++;
              counts[k]++;
              counts[l]++;
              counts[m]++;
              winrates[playgame(i, j, k, l, m, n)] += probability;
            }
          }
        }
      }
    }
  }

  for (var i = 0; i < 10; i++) {
    document.getElementById("bongo").innerHTML += "Tie-" + i + ": " + Math.round(100000 * winrates[i]) / 1000 + "%<br>";
  }
  document.getElementById("bongo").innerHTML += "Punto: " + Math.round(100000 * winrates[10]) / 1000 + "%<br>";
  document.getElementById("bongo").innerHTML += "Banco: " + Math.round(100000 * winrates[11]) / 1000 + "%<br>";

  var ev = 0;

  for (i = 0; i < 10; i++) {

    ev = Math.floor(10000 * ((odds[i] + 1) * winrates[i] - 1)) / 100;

    if (ev < 0) {
      document.getElementById("" + i + "-edge").innerHTML = "<span style='color:red'>" + ev + "%</span>";
    }
    else {
      document.getElementById("" + i + "-edge").innerHTML = "<span style='color:green'>" + ev + "%</span>";
    }
  }
}

updateui();