var button=document.getElementsByClassName("addsub")
var start_stop=document.getElementsByClassName("startstop");
var reset=document.getElementById("reset");
var hour=document.getElementById("hours");
var minutes = document.getElementById("minutes");
var seconds = document.getElementById("seconds");

start_stop[0].addEventListener("click",startstop,false);
start_stop[1].addEventListener("click",resetval,false);
function resetval(){
    hour.textContent="00";
    minutes.textContent="00";
    seconds.textContent="00";
}

function startstop(){
    var _id = this.id == "start" ? "stop" : "start";
    this.id=_id;
    if(this.id=="stop"){
        this.textContent="STOP";
        start();
    }
    else{
        this.textContent="START";
        stop();
    }
}

var start;
function start() {
    timer=setInterval(subsec,1000);
}

function stop(){
    clearInterval(timer)
}

for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", process, false);
}

function process() {
    var x = this.id;
    check(x);
}

function check(value){
    if(value==="addhour")
        addhour();
    else if(value==="addmin")
        addmin();
    else if(value==="addsec")
        addsec();
    else if(value==="subhour")
        subhour();
    else if (value === "submin") 
        submin();
    else
        subsec();
}

function addhour(){
    var content=parseInt(hour.textContent);
    var x = increase(content);
    var value=x;
    if(x<10){
        value="0"+x;
    }
    if (x>=60){
        x="59";
    }
    hour.textContent=value;
}

function addmin(){
    var content=parseInt(minutes.textContent);
    var x=increase(content);
    var value=x+"";
    if(x<10){
        value="0"+x;
    }
    if(x>=59 && hour.textContent=="59"){
        value="59";
    }
    else if (x > 59) {
        value= "00";
        addhour();
    }
    minutes.textContent=value;
}

function addsec(){
    var content = parseInt(seconds.textContent);
    var x = increase(content);
    var value=x+"";
    if(x<10){
        value="0"+x;
    }
    if (x >= 59 && hour.textContent == "59" && minutes.textContent=="59") {
        value="59"
    }
    else if (x > 59) {
        value = "00";
        addmin();
    }
    seconds.textContent =value;
}

function subhour(){
    var content=parseInt(hour.textContent);
    var x=decrease(content);
    var value=x+"";
    if(x<10){
        value="0"+x;
    }
    if(x<=0){
        value="00";
    }
    hour.textContent=value;
}

function submin(){
    var content=parseInt(minutes.textContent);
    var x=decrease(content);
    var value=x+"";
    if(x<10){
        value="0"+x
    }
    if(x<=0 && hour.textContent=="00"){
        value="00";
    }
    else if(x<0){
        value="59";
        subhour();
    }
    minutes.textContent=value;
}

function subsec(){
    var content=parseInt(seconds.textContent);
    var x=decrease(content);
    var value=x+"";
    if(x<10){
        value="0"+x;
    }
    if(x<=0 && minutes.textContent=="00" && hour.textContent=="00"){
        value="00";
    }
    else if (x < 0) {
        value= "59"
        submin();
    }
    seconds.textContent=value;
}

function increase(num){
    return ++num;
}

function decrease(num){
    return --num;
}