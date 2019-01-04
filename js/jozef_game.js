//Make the DIV element draggagle:

dragElement(document.getElementById("nr"), 692, 315);
dragElement(document.getElementById("ba"), 700, 152);
dragElement(document.getElementById("tr"), 628, 190);
dragElement(document.getElementById("tre"), 510, 268);
dragElement(document.getElementById("zi"), 440, 490);
dragElement(document.getElementById("ko"), 638, 845);
dragElement(document.getElementById("ps"), 508, 792);
dragElement(document.getElementById("bb"), 645, 493);

data = [{
  city: 'nr',
  top: 692,
  left: 315,
},
{
  city: 'ba',
  top: 700,
  left: 152,
},
{
  city: 'tr',
  top: 628,
  left: 190,
},
{
  city: 'tre',
  top: 510,
  left: 268,
},
{
  city: 'zi',
  top: 440,
  left: 490,
},
{
  city: 'ko',
  top: 638,
  left: 845,
},
{
  city: 'ps',
  top: 508,
  left: 792,
},
{
  city: 'bb',
  top: 645,
  left: 493,
},
]

function demo() {
  for (let i = 0; i < data.length; i++) {
    let elmnt = document.getElementById(data[i].city);
    setTimeout(function () {
      elmnt.style.transform = "scale(1)";
      elmnt.style.top = data[i].top + "px";
      elmnt.style.left = data[i].left + "px";
    }, 2000 * (i));
    setTimeout({}, 2000);
  }
}

let timer, time = 0, minutes, seconds

function start() {
  timer = setInterval(() => {
    time++
    minutes = Math.floor(time / 60)
    seconds = Math.floor(time % 60)
    if (minutes < 10) {
      minutes = "0" + minutes
    }
    if (seconds < 10) {
      seconds = "0" + seconds
    }
    document.getElementById("timer").innerHTML = minutes + "m:" + seconds + "s"
  }, 1000)
}

function reset() {
  clearInterval(timer)
  location.reload();
}

let completed = [];
function dragElement(elmnt, top, left) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id)) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    elmnt.style.transform = "scale(1)"
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    if (elmnt.offsetTop >= top - 10 && elmnt.offsetTop <= top + 10 && elmnt.offsetLeft >= left - 10 && elmnt.offsetLeft <= left + 10) {
      elmnt.style.top = top + "px";
      elmnt.style.left = left + "px";
      var index = completed.indexOf(elmnt.id);
      if (index === -1) completed.push(elmnt.id);
      if (completed.length === 8) {
        document.getElementById("won").innerHTML = "Vyhral si!";
      }
    }
    else {
      var index = completed.indexOf(elmnt.id);
      if (index !== -1) completed.splice(index, 1);
    }
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}