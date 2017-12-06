import {judgeRequestFullscreenSupport} from './support';

// 全屏
function launchFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}
// 取消全屏
function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
let judge = true;
// 切换
function ToggleFullscreen() {
  judge ? launchFullscreen(document.documentElement) : exitFullscreen();
  judge = !judge;
}
export default function () {
  if(judgeRequestFullscreenSupport()){
    let btn = document.createElement('button');
    btn.textContent = '全屏切换';
    btn.setAttribute('class', 'full-screen-toggle');
    btn.onclick = function (e){
      e.stopPropagation();
      ToggleFullscreen();
    };
    document.getElementsByClassName('content-wrapper')[0].appendChild(btn);
  }
}