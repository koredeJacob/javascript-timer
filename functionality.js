let button=document.getElementsByClassName("addsub")
let start_stop=document.getElementsByClassName("startstop");
let reset=document.getElementById("reset");
let hour=document.getElementById("hours");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");

start_stop[0].addEventListener("click",startstop,false);
start_stop[1].addEventListener("click",resetval,false);

let timer;
//function to reset values to "00" values if reset button is pressed
function resetval(){
    end();
    hour.textContent="00";
    minutes.textContent="00";
    seconds.textContent="00";
}

function startstop(){
    //remove event listeners while timer is functioning
    for (let i = 0; i < button.length; i++) {
        button[i].removeEventListener("click", process);
    }
    let _id = this.id == "start" ? "stop" : "start";
    this.id=_id;

    if(this.id=="stop"){
        this.classList.add("change");
        this.textContent="stop";
        start();//start timer and change text content to sto
    }

    else{
        this.textContent="START";
        stop();//pause timer and change textcontent to start
    }
}

function start() {//countdown timer every second
    timer=setInterval(subsec,1000);
}

function stop(){// function to pause timer 
    clearInterval(timer)
}

for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", process, false);
}

function process() {
    let x = this.id;
    check(x);//pass id of clicked button to check
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
    else if (value==="submin") 
        submin();
    else
      subsec();
}

function addhour(){
    let content=parseInt(hour.textContent);
    let x = increase(content);
    let value=x;
    if(x<10){
        value="0"+x;
    }
    if (x>=60){
        x="59";
    }
    hour.textContent=value;
}

function addmin(){
    let content=parseInt(minutes.textContent);//get time in minutes
    let x=increase(content);
    let value=x+"";
    if(x<10)
        value="0"+x;
    
    if(x>=59 && hour.textContent=="59"){
        value="59";
    }
    else if (x > 59) {
        value= "00";
        addhour();//if minutes greater than 59 call addhour() function
    }
    minutes.textContent=value;
}

function addsec(){
    let content = parseInt(seconds.textContent);//get time in seconds
    let x = increase(content);
    let value=x+"";
    if(x<10)
        value="0"+x;
    if (x >= 59 && hour.textContent == "59" && minutes.textContent=="59") {
        value="59"
    }
    else if (x > 59) {
        value = "00";
        addmin();//if seconds greater than 59 call addmin() function
    }
    seconds.textContent =value;
}

function subhour(){
    let content=parseInt(hour.textContent);
    let x=decrease(content);
    let value=x+"";
    if(x<10){
        value="0"+x;
    }
    if(x<=0){
        value="00";
    }
    hour.textContent=value;
}

function submin(){
    let content=parseInt(minutes.textContent);
    let x=decrease(content);
    let value=x+"";
    if(x<10)
        value="0"+x
    
    if(x<=0 && hour.textContent=="00"){
        value="00";
    }
    else if(x<0){
        value="59";
        subhour();//call subhour() function if hour is not 00
    }
    minutes.textContent=value;
}

function subsec(){
    let content=parseInt(seconds.textContent);
    let x=decrease(content);
    let value=x+"";
    if(x<10)
        value="0"+x;
    
    if(x<=0 && minutes.textContent=="00" && hour.textContent=="00"){
        value="00";
        end();
    }
    else if (x < 0) {
        value= "59"
        submin();//call submin() if hour and minutes are not 00
    }
    seconds.textContent=value;
}
//function to clear interval and change start_stop button id  and textcontent to start
function end(){
    start_stop[0].id = "start";
    start_stop[0].textContent = "START";
    stop();
    for (let i = 0; i < button.length; i++) {
        button[i].addEventListener("click", process, false);
    }
}
function increase(num){
    return ++num;
}

function decrease(num){
    return --num;
}