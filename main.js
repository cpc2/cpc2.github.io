function doOnload() {
  var letters = ["Q", "X", "A", "H", "", "", "", "G", "N", "P", "D", "F", "M", "T", "", "J", "", "", "U", "C", "K", "R", "Y", "B", "I"];
  
  var table = document.getElementById("myTable");
  for(i=0; i<5;i++){
    var row = table.insertRow(i);
    for(j=0; j<5; j++){
      var cell = row.insertCell(j);
      //cell.innerHTML = i + "-"+ j;
      cell.innerHTML = "<span class='text'>    " + letters[0] + "</span>";
      if(letters[0]==""){
        cell.className = "on";
        var imgSrc = 'url(open.png)';
      } else{
        cell.className = "off";
        var imgSrc = 'url(closed.png)'; 
      }
      letters.shift();
      cell.style.backgroundColor = "grey";
      cell.style.backgroundImage=imgSrc;
      cell.id =i + "" + j;
    }
  }
}

$(document).ready(function(){
  $("td").on("click", function(){
    doPattern(event.target.id);
    check();
  });
});

var count = 0;

function doPattern(clickedCell){
  clickedID = parseInt(clickedCell);
  rowNum = clickedCell[0];
  colNum = clickedCell[1];
  //alert("The cell " + clickedID + " was clicked.");
  left = rowNum + (parseInt(colNum) - 1);
  right = rowNum + (parseInt(colNum) + 1);
  up = (parseInt(rowNum) - 1) + colNum;
  down = clickedID + 10;
  upLeft = (parseInt(rowNum) - 1).toString() + (parseInt(colNum) - 1);
  upRight = (parseInt(rowNum) - 1).toString() + (parseInt(colNum) + 1);
  downLeft = (parseInt(rowNum) + 1).toString() + (parseInt(colNum) - 1);
  downRight = (parseInt(rowNum) + 1).toString() + (parseInt(colNum) + 1);
  if(isOn(document.getElementById(clickedCell))){
    patternPlus(clickedCell);
  }
  else{
    patternX(clickedCell);
  }

}
function check(){
  //Ah people can just cheese this... Welp, who cares. GJ!
  var elements = document.getElementsByClassName("off");
  if(elements.length == 0 && count > 4){
    window.location.href = "part2.html";
  }else{
    count++;
  }
}

function patternPlus(clickedCell){
  flip(clickedCell);
  if (colNum > 0) {
    flip(left);
  }
  if (colNum < 4) {
    flip(right);
  }
  if (rowNum > 0) {
    flip(up);
  }
  if (rowNum < 4) {
    flip(down);
  }
}

function patternX(clickedCell){
  flip(clickedCell);
  if (colNum > 0 && rowNum > 0) {
    flip(upLeft);
  }
  if (colNum < 4 && rowNum > 0) {
    flip(upRight);
  }
  if (rowNum < 4 && colNum > 0) {
    flip(downLeft);
  }
  if (rowNum < 4 && colNum < 4) {
    flip(downRight);
  }
}

function flip(cellNumber){
  cell = document.getElementById(cellNumber);
  if (isOn(cell)){
    cell.className = "off";
    var imgClosed = 'url(closed.png)'; 
    cell.style.backgroundImage=imgClosed;
    cell.getElementsByTagName("SPAN")[0].style.visibility = 'visible';
  }
  else{
    cell.className = "on";
    var imgOpen = 'url(open.png)'; 
    cell.style.backgroundImage=imgOpen;
    //cell.style.color = "white";
    cell.getElementsByTagName("SPAN")[0].style.visibility = 'hidden';
  }
}

function isOn(cell){
  if (cell.className == "on"){
    return true;
  } else if (cell.className == "off"){
    return false;
  }
}