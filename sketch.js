let words = [];
let x = 0;
let y = 0;
let index;
let novel;
//define a word chain
let word_count = {};
//store the fonts into the font array
let fonts = ["timesNewRoman", "Courier New", "Arial", "Andale Mono", "helvetica"];
let wordtimes;
let slider2;

function preload() {
  novel = loadStrings("the garden of forking paths.txt", process);
  garden = loadImage('jlborges.jpeg');
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  background('white');
  noStroke();
  //create a slider controlling the change of font types
  slider = createSlider(0,4,0,1);
  slider.position(10,10);
  slider2 = createSlider(0,5,0,1);
  slider2.position(10,40);
  garden.resize(windowWidth,windowHeight);
  frameRate(1);  
}

function draw() {
 
  let val = slider.value();
   let val2 = slider.value();
 textFont(fonts[val]);

  
  if(frameCount% 2 == 1){
  
    //display the word according to their number of appearances;
    for (let word in word_count) {
      wordtimes = word_count[word] * 5.9;
      let r = random(0,255);
      let g = random(0,255);
      let b = random(0,255);
      fill(r,g,b,wordtimes * 1.9);
      drawingContext.shadowOffsetX = 5;
      drawingContext.shadowBlur = 50;
      drawingContext.shadowColor = color(r + val2 *5 ,g + val2 *5,b + val2*5);
    textSize(wordtimes);
    text(word, random(10, width - 10), random(10, height - 10));
       
      
  }
 
    
    }
  garden.loadPixels()
  for (let x = 0; x < garden.width; x += 19){
    for (let y = 0; y < garden.height; y += 9){
      let i = (x + y * garden.width) * 4;
      let c = [
        garden.pixels[i],
        garden.pixels[i + 1],
        garden.pixels[i + 2],
        garden.pixels[i + 3],
      ];
      let bright = brightness(c);      
      //colorful
      // if(bright< 20) fill(47, 0, 118);
      // else if(bright>=20 && bright < 40)fill(92, 177, 166);
      // else if(bright>=40 && bright < 60)fill(255, 126, 21);
      // else if(bright>=60 && bright < 80)fill(255, 60, 21);
      // else fill(255, 118, 144)
      if(bright< 20) fill(255,255, 255, 50);
      else if(bright>=20 && bright < 40)fill(190,190,190,50);
      else if(bright>=40 && bright < 60)fill(100,100,100,50);
      else if(bright>=60 && bright < 80)fill(50,50,50,50);
      else fill(255,255, 255, 500)
      textSize(9);
      textAlign(CENTER, CENTER);
      //define the index variable as random integers that is within the word account
      index = floor(random(0,words.length));
      //call random word objects from the words array and display it in the nested for loop as pixels of the image
      text(words[index], x + 19, y + 9);
      
      //display word objects sequentially
      // index ++;
      //map the length of the text to 51 words
      // let len = map(words.length, 0,words.length, 0, 51);
      // //once it reaches the 51th word, return to the 1st word
      // index %= len;
      
      
      
       console.log(words[index]);
    }
  }
  // console.log(words[index]);
  

}


function process(lines) {
  for (let line of lines) {
    let tokens = splitTokens(line);
    words = words.concat(tokens);
  }

  for (let w = 0; w < words.length; w ++) {
    let word = words[w];
    word = word.replace(/[-_:;.,!?()""'']/g, "");
    word = word.toLowerCase();
    word = word.trim();
    if (word.length < 1) {words.splice(w, 1);
                          w--;}
    
    else words[w] = word;
  }
for (let word of words) {
    if (word in word_count) word_count[word]++;
    else word_count[word] = 1;
  }
}