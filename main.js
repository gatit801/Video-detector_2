objectDetector= "";
objects= [];
status= "";

function preload(){
    //img = loadImage('dog_cat.jpg')
    video = createVideo('video.mp4')

}

function setup(){
    canvas = createCanvas(640,420)
    canvas.center()
    video.hide()
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Estado: detectando objetos"
}

function modelLoaded(){
    console.log("Ola")
    status = true
    video.loop();
    video.speed(1);
    video.volumen(0);
}

function gotResult(error, results){
    if(error){
        console.log(error)
    }
    console.log(results)
    objects = results
}
function draw(){
        image(video, 0, 0, 640,420)
        if (status != ""){
                objectDetector.detect(video, gotResult)
        for (var i = 0; i < objects.length; i++){
        document.getElementById("status").innerHTML = 'status: objeto detectado';
        document.getElementById("number_of_objects").innerHTML = 'Numero de objetos detectados'+ objects.length;

            fill("red");    
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%",objects[i].x + 15, objects[i].y + 15)
            noFill();
            stroke("red")
            rect(objects[i].x, objects[i].y, objects[i].width,objects[i].height)
            
        }
    }
}