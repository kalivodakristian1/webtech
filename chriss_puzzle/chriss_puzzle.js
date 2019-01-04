var tilePositionLeft = [339,-252,101,-8,-258,526,106,-305,582,5,-57,136];
var tilePositionTop = [109,94,-63,-307,26,-375,-532,-202,-437,-721,-437,-782];
var demoIndex=1;
var state = 0;
var time=0;

function onLoading() {
    var myDiv = document.getElementById("frame");
    for(i=1;i<=12;i++){
        var img = document.createElement("img");
        img.setAttribute("src", "tile"+i+".png");
        img.setAttribute("id",i);
        img.setAttribute("class","puzzle");
        /*img.style.width="50px";
        img.style.height="50px";
        img.style.left=(1*10)+"px";
        img.style.top="500px";*/
        myDiv.appendChild(img);
    }

    $( function() {
        $( ".puzzle" ).draggable({containment: "#game", scroll: false,snap: "#frame", snapMode: "inner",
            /*start:function(){
                this.style.width=null;
                this.style.height=null;
            },*/
            stop: function() {
                checkPosition(this);
            }
        });
    } );
    callTimer();
}
var demoInt;
function demo() {
    demoInt = setInterval(myDemo,150);
}
function myDemo(){
    var i=demoIndex;
    //console.log("apply: "+i+" left: "+tilePositionLeft[i-1]+" right: " + tilePositionTop[i-1]);
    var img = document.getElementById(i);
    img.style.position = "relative";
    img.style.left=tilePositionLeft[i-1]+"px";
    img.style.top=tilePositionTop[i-1]+"px";
    $("#"+i+"").draggable("disable");
    img.style.opacity=0.5;
    demoIndex++;
    if(demoIndex==13){
        clearInterval(demoInt);
        demoIndex=1;
        checkPosition();
    }
}
function checkPosition(element){
    state=0;
    for(i=1;i<=12;i++){
        var img = document.getElementById(i);
        //console.log("apply: "+(i)+" left: "+img.style.left+"/"+tilePositionLeft[i-1]+" right: "+img.style.top+"/" + tilePositionTop[i-1]);
        if(parseInt(img.style.left,10)<tilePositionLeft[i-1]+2 && parseInt(img.style.left,10)>tilePositionLeft[i-1]-2){
            if(parseInt(img.style.top,10)<tilePositionTop[i-1]+2 && parseInt(img.style.top,10)>tilePositionTop[i-1]-2){
                state++;
                //console.log(i + " je dobre");
                $("#"+i+"").draggable("disable");
                img.style.opacity=0.5;
                img.style.zIndex = 3;
            }else{
                img.style.opacity=1;
                img.style.zIndex = 5;
                if(element && i==element.id){
                    img.style.zIndex = 12;
                }
            }
        }else{
            img.style.opacity=1;
            img.style.zIndex = 5;
            if(element &&  i==element.id){
                img.style.zIndex = 12;
            }
        }
    }
    if(state==12){
        window.alert("THE END\nTrvanie hry: "+time+"s");
        endTimer();
    }else{
        return;
    }
}
function reset(){
    location.reload(true);
}
var timerVar;
function callTimer() {
    timerVar = setInterval(timer,1000);
}
function endTimer() {
    clearInterval(timerVar);
}
function timer(){
    time++;
    //console.log(time);
    document.getElementById("time").innerText=time;
}