import {judgeGetUserMedia, judgeCanvas} from './support';
// 调用摄像头
// 如果支持调用就绑定调用并触发video play
export default function () {
  if(judgeGetUserMedia()){
    let video = document.createElement('video');
    video.setAttribute('class', 'video');
    document.getElementsByClassName('content-wrapper')[0].appendChild(video);
    if(judgeCanvas()){
      // 生成照片容器
      let canvas = document.createElement('canvas');
      canvas.setAttribute('class', 'photo-canvas');
      canvas.setAttribute('width', '200');
      canvas.setAttribute('height', '200');
      let context = canvas.getContext('2d');
      document.getElementsByClassName('content-wrapper')[0].appendChild(canvas);

      // 生成拍照button
      let photoBtn = document.createElement('button');
      photoBtn.textContent = '拍张照片嘛';
      photoBtn.setAttribute('class', 'photo-btn');
      photoBtn.onclick = function (e){
        e.stopPropagation();
        context.drawImage(video, 0, 0, 200, 200);
      };
      document.getElementsByClassName('content-wrapper')[0].appendChild(photoBtn);
    }
    let mediaConfig =  { video: true };
    let errBack = function(e) {
      console.log('An error has occurred!', e)
    };

    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(mediaConfig).then(function (stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
      });
    } else if(navigator.getUserMedia) { // 标准写法
      navigator.getUserMedia(mediaConfig, function(stream) {
        video.src = stream;
        video.play();
      }, errBack);
    } else if(navigator.webkitGetUserMedia) { // Webkit
      navigator.webkitGetUserMedia(mediaConfig, function(stream){
        video.src = window.webkitURL.createObjectURL(stream);
        video.play();
      }, errBack);
    } else if(navigator.mozGetUserMedia) { // Mozilla
      navigator.mozGetUserMedia(mediaConfig, function(stream){
        video.src = window.URL.createObjectURL(stream);
        video.play();
      }, errBack);
    }
  }
}