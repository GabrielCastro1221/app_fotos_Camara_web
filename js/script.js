"use strict";
const video = document.querySelector(".video");
const canvas = document.querySelector(".canvas");

const button = document.querySelector(".start-btn");

const photo = document.querySelector(".photo");

const constraints = {
  video: { width: 720, height: 340 },
  audio: false,
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSucces(stream);
    console.log(stream);
  } catch (error) {
    console.log(error);
  }
};

const handleSucces = (stream) => {
  video.srcObject = stream;
  video.play();
};

getVideo();

button.addEventListener("click", () => {
  let context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, 720, 340);
  let data = canvas.toDataURL("image/png");
  photo.setAttribute("src", data);
});