prediction1 = "";
prediction2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capture_image" src="'+data_uri+'">';
    });
}
console.log('ml5 version', ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/EoyyOoVtz/model.json", modelLoaded);

function modelLoaded(){
    console.log("model loaded!");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data1 = "The first prediction is"+prediction1;
    speak_data2 = "And the second prediction is"+prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById('capture_image');
    classifier.classify(img, gotResult)
}
function gotResult(){
    if (error){
        console.error(error)
    }
    else{
        console.log(results)
        document.getElementById('result_emotion_name1').innerHTML = results[0].label;
        document.getElementById('result_emotion_name2').innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        check();
        if(results[0].label == "thumbs up"){
            document.getElementById("update_emoji1").innerHTML = "&#128077";
        }
        if(results[0].label == "thumbs down"){
            document.getElementById("update_emoji1").innerHTML = "&#128078;";
        }
        if(results[0].label == "hye"){
            document.getElementById("update_emoji1").innerHTML = "&#128075;";
        }
        if(results[0].label == "super"){
            document.getElementById("update_emoji1").innerHTML = "&#128076;";
        }
        if(results[1].label == "thumbs up"){
            document.getElementById("update_emoji2").innerHTML = "&#128077";
        }
        if(results[1].label == "thumbs down"){
            document.getElementById("update_emoji2").innerHTML = "&#128078;";
        }
        if(results[1].label == "hye"){
            document.getElementById("update_emoji2").innerHTML = "&#128075;";
        }
        if(results[1].label == "super"){
            document.getElementById("update_emoji2").innerHTML = "&#128076;";
        }
    }
}