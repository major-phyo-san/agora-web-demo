let handleError = function(err){
    console.log('error', err);
};

let remoteContrainer = document.getElementById("remote-container");

function addVideoStream(elementId){
    let streamDiv = document.createElement("div");
    streamDiv.id = elementId;
    streamDiv.style.transform = "rotateY(180deg)";
    remoteContrainer.appendChild(streamDiv);
}

function removeVideoStream(elementId){
    let remoteDiv = document.getElementById(elementId);
    if (remoteDiv) remoteDiv.parentNode.removeChild(remoteDiv);
}

let client = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8"
});

client.init("609dada4ba084fba95bd90bd68b67a86");

client.join("006609dada4ba084fba95bd90bd68b67a86IACbpl2n77jljxuJvZxHXOa76h2vQWFKQF7dnnpQ190JJ0OQEggAAAAAEABPLhaFHL3hXwEAAQAeveFf", 
"myChannel", null, function(uid){
    let localStream = AgoraRTC.createStream({
        audio: true,
        video: false
    });

    localStream.init(function(){
        localStream.play("me");
        client.publish(localStream, handleError);
    });
}, handleError);

client.on("stream-added", function(evt){
    client.subscribe(evt.stream, handleError);
});

client.on("stream-subscribed", function(evt){
    let stream = evt.stream;
    let streamId = String(stream.getId());
    addVideoStream(streamId);
    stream.play(streamId);
});

client.on("peer-leave", function(evt){
    let stream = evt.stream;
    let streamId = String(stream.getId());
    stream.close();
    removeVideoStream(streamId);
});