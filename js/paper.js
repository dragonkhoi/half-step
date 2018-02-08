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

var videoIFrame = document.getElementById("concept-video-frame");

var closeButtons =[
  document.getElementsByClassName("closeButton")[0],
  document.getElementsByClassName("closeButton")[1],
  document.getElementsByClassName("closeButton")[2],
  document.getElementsByClassName("closeButton")[3],
  document.getElementsByClassName("closeButton")[4],
  document.getElementsByClassName("closeButton")[5],
  document.getElementsByClassName("closeButton")[6],
  document.getElementsByClassName("closeButton")[7]
]
function closeCurrentInfoBar(){
  if(currentInfoBar == infoBars[2]){
    console.log("video");
    videoIFrame.src = videoIFrame.src;
  }
  currentInfoBar.style.display = "none";
  currentInfoBar = null;
}
window.onclick = function(event) {
    if (event.target == currentInfoBar) {
        closeCurrentInfoBar();
    }
}
var loadingScreen = document.getElementById("loading-screen");
var currentInfoBar = null;
//audio files
var cSound = new Audio("audio/middle-c.wav");
var dSound = new Audio("audio/middle-d.wav");
var eSound = new Audio("audio/middle-e.wav");
var fSound = new Audio("audio/middle-f.wav");
var gSound = new Audio("audio/middle-g.wav");
var aSound = new Audio("audio/middle-a.wav");
var bSound = new Audio("audio/middle-b.wav");
var highCSound= new Audio("audio/high-c.wav");
// sounds from jobro on FreeSound.org

var thisCanvas = document.getElementById("myCanvas");
var context = thisCanvas.getContext("2d");

var keySounds = [cSound, dSound, eSound, fSound, gSound, aSound, bSound, highCSound];
// on window resize
view.onResize = function(event){

  infoBars[4].style.display = "none";
  loadingScreen.style.display = "none";
  if(view.bounds.width > 700){
    WHITE_KEY_WIDTH = view.bounds.width / 8;
    WHITE_KEY_HEIGHT = view.bounds.height - 20;
    BLACK_KEY_WIDTH = WHITE_KEY_WIDTH * 0.55;
    BLACK_KEY_OFFSET = WHITE_KEY_WIDTH - (BLACK_KEY_WIDTH/2);
    BLACK_KEY_HEIGHT = WHITE_KEY_HEIGHT * 0.6;
    for(var i = 0; i < whiteKeys.length; i++){
      //infoBars[i].style.top = "" + BLACK_KEY_HEIGHT * 1.2 + "px";
      //infoBars[i].style.height = "" + BLACK_KEY_HEIGHT / 3 + "px";
      whiteKeys[i].bounds.width = WHITE_KEY_WIDTH;
      whiteKeys[i].bounds.height = WHITE_KEY_HEIGHT;
      whiteKeys[i].position.x = i * WHITE_KEY_WIDTH + (WHITE_KEY_WIDTH/2);
      whiteKeys[i].bounds.y = -3 * roundSize.height;
      lettersDrawn[i].fontSize = WHITE_KEY_WIDTH / 3;
      lettersDrawn[i].position.x = i * WHITE_KEY_WIDTH + (WHITE_KEY_WIDTH/2);
      lettersDrawn[i].position.y = (WHITE_KEY_HEIGHT * 0.9) - (3*roundSize.height);
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
  else {
    WHITE_KEY_WIDTH = view.bounds.height / 8;
    WHITE_KEY_HEIGHT = view.bounds.width - 20;
    BLACK_KEY_WIDTH = WHITE_KEY_WIDTH * 0.6;
    BLACK_KEY_OFFSET = WHITE_KEY_WIDTH - (BLACK_KEY_WIDTH/2);
    BLACK_KEY_HEIGHT = WHITE_KEY_HEIGHT * 0.6;
    for(var i = 0; i < whiteKeys.length; i++){
      //infoBars[i].style.top = "" + BLACK_KEY_HEIGHT * 1.2 + "px";
      //infoBars[i].style.height = "" + BLACK_KEY_HEIGHT / 3 + "px";
      whiteKeys[i].bounds.height = WHITE_KEY_WIDTH;
      whiteKeys[i].bounds.width = WHITE_KEY_HEIGHT;
      whiteKeys[i].position.y = i * WHITE_KEY_WIDTH + (WHITE_KEY_WIDTH/2);
      whiteKeys[i].bounds.x = -3 * roundSize.height;
      lettersDrawn[i].fontSize = WHITE_KEY_WIDTH / 3;
      lettersDrawn[i].position.y = i * WHITE_KEY_WIDTH + (WHITE_KEY_WIDTH/2);
      lettersDrawn[i].position.x = (WHITE_KEY_HEIGHT * 0.9) - (3*roundSize.height);
      labelsDrawn[i].fontSize = WHITE_KEY_WIDTH / 4;
      labelsDrawn[i].position.y = i * WHITE_KEY_WIDTH + (WHITE_KEY_WIDTH/2);
      labelsDrawn[i].bounds.x = 30;
    }
    for(var i = 0; i < blackKeys.length; i++){
      if(blackKeys[i] != null){
        blackKeys[i].bounds.height = BLACK_KEY_WIDTH;
        blackKeys[i].bounds.width = BLACK_KEY_HEIGHT;
        blackKeys[i].bounds.x = -3 * roundSize.height; //-1 * roundSize;
        blackKeys[i].position.y = (i + 1) * WHITE_KEY_WIDTH; // + BLACK_KEY_OFFSET;
      }
    }
  }

  //context.translate(thisCanvas.width/2, thisCanvas.height / 2);
  //context.rotate(Math.PI / 4);
}
// draw white keys
for(var i = 0; i < 8; i++){
  var whiteKey = new Rectangle(i*WHITE_KEY_WIDTH,0,WHITE_KEY_WIDTH,WHITE_KEY_HEIGHT);
  var whiteKeyDraw = new Path.RoundRectangle(whiteKey, roundSize);
  whiteKeyDraw.onClick = function(event){
    var thisIndex = whiteKeys.indexOf(this)
      keySounds[thisIndex].play();
      if(currentInfoBar != null){
        currentInfoBar.style.display = "none";
      }
      currentInfoBar = infoBars[thisIndex];
      infoBars[thisIndex].style.display = "block";
  }
  closeButtons[i].onclick = closeCurrentInfoBar;
  whiteKeyDraw.onMouseEnter = function(event){
      //this.fillColor = animateKeys[whiteKeys.indexOf(this)][1];
      var thisIndex = whiteKeys.indexOf(this);
      animateKeys[thisIndex][0] = true;
      if(animateKeys[thisIndex][3] < 0){
        animateKeys[thisIndex][3] *= -1;
      }
  }
  whiteKeyDraw.onMouseLeave = function(event){
      //this.fillColor = whiteKeyStyle.fillColor;
      var thisIndex = whiteKeys.indexOf(this);
      animateKeys[thisIndex][0] = false;
      if(animateKeys[thisIndex][3] > 0){
        animateKeys[thisIndex][3] *= -1;
      }
  }
  // whiteKeyDraw.onFrame = function(event){
  //   var thisIndex = whiteKeys.indexOf(this);
  //   if(animateKeys[thisIndex][0] && animateKeys[thisIndex][3] > 0){
  //     animateKeys[thisIndex][2] += animateKeys[whiteKeys.indexOf(this)][3];
  //     var lerpColor = whiteKeyStyle.fillColor + ((animateKeys[whiteKeys.indexOf(this)][1] - whiteKeys[whiteKeys.indexOf(this)].fillColor) * animateKeys[whiteKeys.indexOf(this)][2]);
  //     whiteKeys[whiteKeys.indexOf(this)].fillColor = lerpColor;
  //     if(animateKeys[i][2] >= 1 && animateKeys[i][3] > 0){
  //       animateKeys[i][2] = 1;
  //       animateKeys[i][3] *= -1.0;
  //     }
  //   }
  // }
  whiteKeyDraw.style = whiteKeyStyle;
  var textLetter = new PointText(i*WHITE_KEY_WIDTH, WHITE_KEY_HEIGHT - 50);
  textLetter.fillColor = '#444444';
  textLetter.content = letters[i];
  textLetter.off({mouseenter: true});
  textLetter.fontFamily = "Montserrat"; //"Segoe UI";
  whiteKeyDraw.addChild(textLetter);
  var textLabel = new PointText(0*WHITE_KEY_WIDTH, WHITE_KEY_HEIGHT - 50);
  textLabel.fillColor = '#444444';
  textLabel.content = labels[i];
  textLabel.fontFamily = "Montserrat";//"Segoe UI";
  if(view.bounds.width > 700){
    textLabel.matrix.rotate(90, 0, 0);
  }
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
  if(currentInfoBar != null){
    return;
  }
  for(var i = 0; i < animateKeys.length; i++){
    if(animateKeys[i][0] && animateKeys[i][3] > 0){
      animateKeys[i][2] += animateKeys[i][3];
      var lerpColor = whiteKeyStyle.fillColor + ((animateKeys[i][1] - whiteKeys[i].fillColor) * animateKeys[i][2]);
      whiteKeys[i].fillColor = lerpColor;
      if(animateKeys[i][2] >= 1 && animateKeys[i][3] > 0){
        animateKeys[i][2] = 1;
        animateKeys[i][3] *= -1.0;
      }
    }
    else{
      if(!animateKeys[i][0] && animateKeys[i][3] < 0){
        animateKeys[i][2] += animateKeys[i][3];
        var lerpColor = whiteKeyStyle.fillColor + ((animateKeys[i][1] - whiteKeys[i].fillColor) * animateKeys[i][2]);
        whiteKeys[i].fillColor = lerpColor;
        if(animateKeys[i][2] <= 0 && animateKeys[i][3] < 0){
          //animateKeys[i][1] *= -1;
          animateKeys[i][2] = 0;
          animateKeys[i][3] *= -1;
        }
      }
    }
  }
}
