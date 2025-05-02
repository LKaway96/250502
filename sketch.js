let capture;
let graphics;

function setup() {
  // 設定畫布大小為視窗大小
  createCanvas(windowWidth, windowHeight);
  
  // 設定背景顏色為 #0b132b
  background('#0b132b');
  
  // 初始化攝影機擷取，解析度為預設大小
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  capture.hide(); // 隱藏原始的攝影機畫面

  // 使用 createGraphics 產生與攝影機畫面相同大小的圖形緩衝區
  graphics = createGraphics(capture.width, capture.height);
}

function draw() {
  // 設定背景顏色
  background('#0b132b');
  
  // 計算影像顯示的起始位置，讓影像置中
  let aspectRatio = capture.width / capture.height;
  let displayWidth = windowWidth * 0.8;
  let displayHeight = displayWidth / aspectRatio;

  if (displayHeight > windowHeight * 0.8) {
    displayHeight = windowHeight * 0.8;
    displayWidth = displayHeight * aspectRatio;
  }

  let x = (width - displayWidth) / 2;
  let y = (height - displayHeight) / 2;

  // 翻轉畫布以修正左右顛倒
  push();
  translate(width, 0); // 將畫布原點移到右上角
  scale(-1, 1); // 水平翻轉畫布
  image(capture, x, y, displayWidth, displayHeight);
  pop();

  // 更新 graphics 的內容
  graphics.background(0); // 設定背景為黑色
  for (let i = 0; i < graphics.width; i += 20) {
    for (let j = 0; j < graphics.height; j += 20) {
      let col = capture.get(i, j); // 從 capture 中取得相對位置的顏色
      graphics.fill(col);
      graphics.noStroke();
      graphics.ellipse(i + 10, j + 10, 15, 15); // 繪製圓形
    }
  }

  // 在攝影機畫面上方繪製 createGraphics 的內容
  image(graphics, x, y, displayWidth, displayHeight);
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
}
