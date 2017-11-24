var roundSize = new Size(5,5);
var whiteKeyStyle = {
  strokeColor: "#666666",
  fillColor: new Color(1,1,1)
}
var blackKeyStyle = {
  fillColor: "#333333"
}
var WHITE_KEY_WIDTH = 50;
var WHITE_KEY_HEIGHT = 200;
var BLACK_KEY_WIDTH = 30;
var BLACK_KEY_HEIGHT = 120;
var BLACK_KEY_OFFSET = WHITE_KEY_WIDTH - (BLACK_KEY_WIDTH/2);
var whiteKeys = [];
var blackKeys = [];
var letters = ["h","a","l","f","s","t","e","p"];
var labels = ["needfinding", "experience proto", "concept video", "low-fi proto", "med-fi proto", "heuristic eval", "high-fi proto", "poster + pitch"];
var lettersDrawn = [];
var labelsDrawn = [];
var animateKeys = [
  // [is hovered, color to change to, lerp index, lerp interval]
  [false, new Color(1, 0.321, 0.349), 0, 0.08],
  [false, new Color(1, 0.8, 0.380), 0, 0.08],
  [false, new Color(1, 0.933, 0.380), 0, 0.08],
  [false, new Color(0.501, 1, 0.509), 0, 0.08],
  [false, new Color(0.501, 0.917, 1), 0, 0.08],
  [false, new Color(0.517, 0.501, 1), 0, 0.08],
  [false, new Color(0.721, 0.501, 1), 0, 0.08],
  [false, new Color(1, 0.501, 0.972), 0, 0.08] ];

// infobars: "needfinding", "experience proto"
var infoBars = [
  document.getElementById("needfinding"),
  document.getElementById("exp-proto"),
  document.getElementById("concept-video"),
  document.getElementById("lowfi-proto"),
  document.getElementById("medfi-proto"),
  document.getElementById("heuristic-eval"),
  document.getElementById("hifi-proto"),
  document.getElementById("pitch-poster")
]

var currentInfoBar = null;
//audio files
var cSound = new Audio("audio/middle-c.wav");
var dSound = new Audio("audio/middle-d.wav");
var eSound = new Audio("audio/middle-e.wav");
var fSound = new Audio("audio/middle-f.wav");
var gSound = new Audio("audio/middle-g.wav");
var keySounds = [cSound, dSound, eSound, fSound, gSound, cSound, cSound, cSound];
// on window resize
view.onResize = function(event){
  console.log("resize");
  WHITE_KEY_WIDTH = view.bounds.width / 8;
  WHITE_KEY_HEIGHT = view.bounds.height;
  BLACK_KEY_WIDTH = WHITE_KEY_WIDTH * 0.6;
  BLACK_KEY_OFFSET = WHITE_KEY_WIDTH - (BLACK_KEY_WIDTH/2);
  BLACK_KEY_HEIGHT = WHITE_KEY_HEIGHT * 0.6;
  console.log(view.bounds.width);
  for(var i = 0; i < whiteKeys.length; i++){
    //infoBars[i].style.top = "" + BLACK_KEY_HEIGHT * 1.2 + "px";
    //infoBars[i].style.height = "" + BLACK_KEY_HEIGHT / 3 + "px";
    whiteKeys[i].bounds.width = WHITE_KEY_WIDTH;
    whiteKeys[i].bounds.height = WHITE_KEY_HEIGHT;
    whiteKeys[i].position.x = i * WHITE_KEY_WIDTH + (WHITE_KEY_WIDTH/2);
    whiteKeys[i].bounds.y = -3 * roundSize.height;
    console.log(-1*roundSize.height);
    lettersDrawn[i].fontSize = WHITE_KEY_WIDTH / 3;
    lettersDrawn[i].position.x = i * WHITE_KEY_WIDTH + (WHITE_KEY_WIDTH/2);
    lettersDrawn[i].position.y = WHITE_KEY_HEIGHT - 50 - (3*roundSize.height);
    labelsDrawn[i].fontSize = WHITE_KEY_WIDTH / 4;
    labelsDrawn[i].position.x = i * WHITE_KEY_WIDTH + (WHITE_KEY_WIDTH/2);
    labelsDrawn[i].bounds.y = 30;
  }
  for(var i = 0; i < blackKeys.length; i++){
    if(blackKeys[i] != null){
      blackKeys[i].bounds.width = BLACK_KEY_WIDTH;
      blackKeys[i].bounds.height = BLACK_KEY_HEIGHT;
      blackKeys[i].bounds.y = -3 * roundSize.height; //-1 * roundSize;
      blackKeys[i].position.x = (i + 1) * WHITE_KEY_WIDTH; // + BLACK_KEY_OFFSET;
    }
  }
}
// draw white keys
for(var i = 0; i < 8; i++){
  var whiteKey = new Rectangle(i*WHITE_KEY_WIDTH,0,WHITE_KEY_WIDTH,WHITE_KEY_HEIGHT);
  var whiteKeyDraw = new Path.RoundRectangle(whiteKey, roundSize);
  infoBars[i].addEventListener("mouseleave", function (event){
    this.style.display = "none";
    currentInfoBar = null;
  }, false);
  whiteKeyDraw.onClick = function(event){
      keySounds[whiteKeys.indexOf(this)].play();
      if(currentInfoBar != null){
        currentInfoBar.style.display = "none";
      }
      currentInfoBar = infoBars[whiteKeys.indexOf(this)];
      infoBars[whiteKeys.indexOf(this)].style.display = "block";
  }
  whiteKeyDraw.onMouseEnter = function(event){
      //this.fillColor = animateKeys[whiteKeys.indexOf(this)][1];
      animateKeys[whiteKeys.indexOf(this)][0] = true;
      if(animateKeys[whiteKeys.indexOf(this)][3] < 0){
        animateKeys[whiteKeys.indexOf(this)][3] *= -1;
      }
  }
  whiteKeyDraw.onMouseLeave = function(event){
      //this.fillColor = whiteKeyStyle.fillColor;
      animateKeys[whiteKeys.indexOf(this)][0] = false;
      if(animateKeys[whiteKeys.indexOf(this)][3] > 0){
        animateKeys[whiteKeys.indexOf(this)][3] *= -1;
      }
  }
  whiteKeyDraw.style = whiteKeyStyle;
  var textLetter = new PointText(i*WHITE_KEY_WIDTH, WHITE_KEY_HEIGHT - 50);
  textLetter.fillColor = '#444444';
  textLetter.content = letters[i];
  textLetter.off({mouseenter: true});
  textLetter.fontFamily = "Segoe UI";
  whiteKeyDraw.addChild(textLetter);
  var textLabel = new PointText(0*WHITE_KEY_WIDTH, WHITE_KEY_HEIGHT - 50);
  textLabel.fillColor = '#444444';
  textLabel.content = labels[i];
  textLabel.fontFamily = "Segoe UI";
  textLabel.matrix.rotate(90, 0, 0);
  labelsDrawn.push(textLabel);
  lettersDrawn.push(textLetter);
  whiteKeys.push(whiteKeyDraw);
}
// draw black keys on top
for(var i = 0; i < 8; i++){
  if(i == 0 || i == 1 || i == 3 || i == 4 || i == 5 || i == 7){
    var blackKey = new Rectangle(i*WHITE_KEY_WIDTH + BLACK_KEY_OFFSET,0,BLACK_KEY_WIDTH,BLACK_KEY_HEIGHT);
    var blackKeyDraw = new Path.RoundRectangle(blackKey, roundSize);
    blackKeyDraw.style = blackKeyStyle;
    blackKeys.push(blackKeyDraw);
  }
  else{
    blackKeys.push(null);
  }
}
 // runs every frame
function onFrame(event){
  for(var i = 0; i < animateKeys.length; i++){
    if(animateKeys[i][0] && animateKeys[i][3] > 0){
      animateKeys[i][2] += animateKeys[i][3];
      var lerpColor = whiteKeyStyle.fillColor + ((animateKeys[i][1] - whiteKeys[i].fillColor) * animateKeys[i][2]);
      whiteKeys[i].fillColor = lerpColor;
      if(animateKeys[i][2] >= 1 && animateKeys[i][3] > 0){
        animateKeys[i][2] = 1;
        console.log("stap");
        animateKeys[i][3] *= -1.0;
      }
    }
    else{
      if(!animateKeys[i][0] && animateKeys[i][3] < 0){
        animateKeys[i][2] += animateKeys[i][3];
        var lerpColor = whiteKeyStyle.fillColor + ((animateKeys[i][1] - whiteKeys[i].fillColor) * animateKeys[i][2]);
        whiteKeys[i].fillColor = lerpColor;
        if(animateKeys[i][2] <= 0 && animateKeys[i][3] < 0){
          console.log("STAHPP");
          //animateKeys[i][1] *= -1;
          animateKeys[i][2] = 0;
          animateKeys[i][3] *= -1;
        }
      }
    }
  }
}
