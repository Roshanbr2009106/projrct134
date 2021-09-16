img = "";
status = "";
objects = [];
audio = "";

function preload(){
    img = "baby.jpg";
    audio = "emergency_alarm.mp3"
}



function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    object_detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
    
}
function modelLoaded(){
    console.log("model is Loaded");
    status = true;
   

    
}

function gotResult(error,results){
    if(error){
        console.error(error);
        
    }
    console.log(results);
    objects = results;
    

}

function draw(){
    image(video,0,0,380,380);
    if(status != ""){
        object_detector.detect(video,gotResult);

       
        for(i = 0; i < objects.length ; i++){
            r = random(255);
            g =random(255);
            b = random(255);
            document.getElementById("status").innerHTML = "status : objects detected";
           
            fill(r,g,b);
            percentage = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percentage+"%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label = "person"){
                document.getElementById("foundornot").innerHTML = "BABY FOUND";
                audio.stop();

            }
            else{
                document.getElementById("foundornot").innerHTML = "BABY NOT FOUND";
                audio.play();
            }

           

        }
    }

   
    
}