let capture;

function setup() {
  // 設定畫布大小為視窗大小
  createCanvas(windowWidth, windowHeight);
  
  // 設定背景顏色為 #0b132b
  background('#0b132b');
  
  // 初始化攝影機擷取，解析度為預設大小
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  capture.hide(); // 隱藏原始的攝影機畫面
}

function draw() {
  // 設定背景顏色
  background('#0b132b');

  // 繪製攝影機畫面到畫布上
  image(capture, (windowWidth - capture.width)/2, (windowHeight - capture.height)/2, capture.width, capture.height);
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
}
