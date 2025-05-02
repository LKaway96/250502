# 250502 上課筆記
## Qrcode
![image](https://hackmd.io/_uploads/HyPlyp-lee.png)
https://lkaway96.github.io/250502/

### 第一個問題
產生一個背景顏色為0b132b，擷取攝影機的畫面，
正常的顯示在視窗中間，影像畫面寬高為視窗大小的80%，請把程式碼寫在sketch.js內

    背景顏色：使用 background('#0b132b') 設定背景顏色為深藍色。
    攝影機畫面：使用 createCapture(VIDEO) 擷取攝影機畫面，並將其大小設為視窗的 80%。
    置中顯示：計算影像的起始位置 (x, y)，讓影像置於視窗中央。
    視窗調整：當視窗大小改變時，透過 windowResized() 動態調整畫布與攝影機畫面的大小。

```javascript=
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
```
---

### 第二個問題
攝影機的畫面左右顛倒，請調整
    
    水平翻轉畫布：
        使用 push() 和 pop() 保護畫布的狀態。
        使用 translate(width, 0) 將畫布的原點移到右上角。
        使用 scale(-1, 1) 水平翻轉畫布，修正攝影機畫面左右顛倒的問題。
    
    其他功能保持不變：
        影像仍然會根據視窗大小動態調整，並置於畫面中央。
        
```javascript=
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
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
}
```
---
### 第三個問題

利用createGraphics指令，產生一個與video視訊畫面一樣的寬高一樣的大小內容，該圖片顯示在視訊畫面的上方
    
    reateGraphics：
      使用 createGraphics 產生一個與攝影機畫面相同大小的緩衝區。
      在緩衝區中繪製內容，例如背景顏色、文字等。
    顯示順序：
      先繪製攝影機畫面，然後將 graphics 的內容疊加在攝影機畫面上。
    動態調整：
      當視窗大小改變時，攝影機畫面和 graphics 的顯示位置會自動調整，確保始終置中。
        
```javascript=
let capture;
let overlayGraphics;

function setup() {
  // 設定畫布大小為視窗大小
  createCanvas(windowWidth, windowHeight);
  
  // 設定背景顏色為 #0b132b
  background('#0b132b');
  
  // 初始化攝影機擷取，解析度為預設大小
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  capture.hide(); // 隱藏原始的攝影機畫面

  // 建立與攝影機畫面相同大小的圖形緩衝區
  overlayGraphics = createGraphics(capture.width, capture.height);
  overlayGraphics.fill(255, 0, 0, 150); // 半透明紅色
  overlayGraphics.textSize(32);
  overlayGraphics.textAlign(CENTER, CENTER);
  overlayGraphics.text("Overlay Text", overlayGraphics.width / 2, overlayGraphics.height / 2);
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
  image(capture, -x - displayWidth, y, displayWidth, displayHeight);
  pop();

  // 繪製 overlayGraphics 到畫布上，顯示在攝影機畫面上方
  image(overlayGraphics, x, y, displayWidth, displayHeight);
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
}
```
---
### 第四個問題
把graphics的背景改為黑色，graphics在寬與高每隔20為一個單位，在每個單位內產生一個寬高為15的圓，圓的顏色採用capture相對位置的顏色

    背景設定：
        graphics.background(0) 將 graphics 的背景設為黑色。

    圓形繪製：
        使用雙層迴圈，間隔 20 單位遍歷 graphics 的寬與高。
        使用 capture.get(i, j) 取得攝影機畫面中對應位置的顏色。
        使用 graphics.ellipse() 繪製寬高為 15 的圓，並填充對應的顏色。

    顯示順序：
        先繪製攝影機畫面，然後將 graphics 的內容疊加在攝影機畫面上。

```javascript=
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
```
---
### 第五個問題
攝影機畫面很卡，請優化

    降低 graphics 的解析度：
        將 graphics 的寬高設為攝影機畫面的一半，減少需要繪製的圓形數量。
    減少 capture.get() 的調用次數：
        使用 capture.loadPixels() 預加載像素數據，並通過縮放索引 (i * 2, j * 2) 減少調用次數。
    減少繪製頻率：
        圓形的間隔仍為 20 單位，但由於解析度降低，實際繪製的數量減少。
        
```javascript=
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
  graphics = createGraphics(capture.width / 2, capture.height / 2); // 降低解析度
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
  capture.loadPixels(); // 加載攝影機畫面的像素數據
  for (let i = 0; i < graphics.width; i += 20) {
    for (let j = 0; j < graphics.height; j += 20) {
      let col = capture.get(i * 2, j * 2); // 減少調用次數，對應到原始畫面
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
```
