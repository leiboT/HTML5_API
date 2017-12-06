import '../css/reset.css';
import '../stylus/index.stylus';
import toggleFullscreen from '../jsk/toggleFullscreen';
import canvasDraw from '../jsk/canvasDraw';
import getUserMedia from '../jsk/getUserMedia';

window.onload = function () {
  // 全屏切换
  toggleFullscreen();
  // canvas绘制背景
  canvasDraw();
  // 调用用户媒体设备
  getUserMedia();
};