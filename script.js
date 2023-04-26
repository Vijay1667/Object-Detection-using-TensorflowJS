const video = document.getElementById('video')
function startVideo() {
  navigator.getUserMedia(
    { video: {facingMode: {
      // exact: 'environment'
    }} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

let model;
let ctx = document.getElementById('canvas').getContext("2d");
const detectFaces = async () => {
  const prediction = await model.detect(video);
  console.log(prediction);
  if (prediction.length > 0) {
    ctx.beginPath();
    ctx.drawImage(video, 0, 0, 800, 540);
    for (let i = 0; i < prediction.length; i++) {
      ctx.beginPath();
      ctx.rect(prediction[i].bbox[0], prediction[i].bbox[1], prediction[i].bbox[2], prediction[i].bbox[3]);
      ctx.stroke();
      ctx.lineWidth = "2";
      ctx.font = "bold 20px Sans-Serif"
      // ctx.beginPath();
      ctx.fillText("Total objects detected: " + prediction.length, 10, 20);
      ctx.fillText("→ " + prediction[i].class, prediction[i].bbox[0], prediction[i].bbox[1]-5);
      ctx.strokeStyle = "#FF0000";
      ctx.fillStyle = "#00ff00"

      ctx.font = "20px red Seoge UI"
      ctx.fillText("Face:" + (i + 1), start[0], start[1] - 5);

      ctx.stroke();
    }
  }
  else {
    ctx.beginPath();
    ctx.stroke();

  }
};
startVideo();
video.addEventListener("loadeddata", async () => {
  model = await cocoSsd.load();
  setInterval(detectFaces, 10);
});

var pause=document.getElementById("pause");
pause.addEventListener("click",function(){
    video.pause();
    counter=1;
    end();
})
var start=document.getElementById("start");
start.addEventListener("click",function(){
    video.play();
    counter=1;
    end();
})

function detect_img(event){
  // var img=document.getElementById('image_upload');
  
  document.getElementById('image_upload').src=URL.createObjectURL(event.target.files[0]);
  var img=document.getElementById('image_upload').getUserMedia;
  console.log(event.target.files[0]);
  // ImageBitmap img=new ImageBitmap();
  /////////////////////////
  let ctx_img = document.getElementById('canvas_img').getContext("2d");
  const detectFaces = async () => {
    const prediction = await model.detect(img);
    console.log(prediction);
    if (prediction.length > 0) {
      ctx_img.beginPath();
      ctx_img.drawImage(img, 0, 0, 800, 540);
      for (let i = 0; i < prediction.length; i++) {
        ctx_img.beginPath();
        ctx_img.rect(prediction[i].bbox[0], prediction[i].bbox[1], prediction[i].bbox[2], prediction[i].bbox[3]);
        ctx_img.stroke();
        ctx_img.lineWidth = "2";
        ctx_img.font = "bold 20px Sans-Serif"
        // ctx.beginPath();
        ctx_img.fillText("Total objects detected: " + prediction.length, 10, 20);
        ctx_img.fillText("→ " + prediction[i].class, prediction[i].bbox[0], prediction[i].bbox[1]-5);
        ctx_img.strokeStyle = "#FF0000";
        ctx_img.fillStyle = "#00ff00"
  
        ctx_img.font = "20px red Seoge UI"
        ctx_img.fillText("Face:" + (i + 1), start[0], start[1] - 5);
  
        ctx_img.stroke();
      }
    }
    else {
      ctx_img.beginPath();
      ctx_img.stroke();
  
    }
  };
  detectFaces();
}