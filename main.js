
/** 
 * kick
 * mono
 * drums.mp3
 * Band: 2
 * peak: ca 190
 */

let drums_l 
let song
let ball_array = []
let segments = []

function preload(){
    drums_l  = loadSound('vsd/drums.mp3');
    song = loadSound('vsd/visual_distortion.mp3');
}

let canvas;
let button;
let drums_l_fft;

function setup(){
    canvas = createCanvas(1920, 1080);
    button = createButton('play / pause');
    button.position(10, canvas.height + 10);
    button.mousePressed(toggleSong);
    canvas.mousePressed(pushSegment);
    drums_l.disconnect();
    // song.disconnect();

    drums_l_fft = new p5.FFT()
    drums_l_fft.setInput(drums_l);


	theta = 0; 
}

function draw(){
    
  /*  let drums_l_spectrum = drums_l_fft.analyze();
    
    let hh_value = drums_l_spectrum[2];

    background(244,132,140); 

    // calculate the diameter of the circle 
    //height/2 + sin(theta) * amplitude; 
  
    var diam =  hh_value ;
  
    // draw the circle 
    ellipse(width/2,height/2, diam, diam); 
  
    // make theta keep getting bigger
    // you can play with this number to change the speed
 
  
    lastHHval = hh_value;
  }
  */
  
  
  
  
  
    background(0);
    checkHH();

    ball_array.forEach(function (ball){
        ball.update();
        ball.show();
    })

    let killIDs = [];
    segments.forEach(function (segment, i){
        segment.update();
        if(segment.alive){
            segment.show();
        }else{
            killIDs.push(i);
        }
    })

    killIDs.forEach(function (id){
            segments.splice(id, 1);

    })
}


let lastHHval = 0;
let direction_hh = 1;

function checkHH(){
    let drums_l_spectrum = drums_l_fft.analyze();
    
    let hh_value = drums_l_spectrum[2];
    console.log(hh_value);
    if(lastHHval > hh_value){
        if(direction_hh > 0 && lastHHval > 180){
            let ball = new Ball(50, 50);
            ball_array.push(ball);
        }

        direction_hh = -1;
    }else{
        direction_hh = 1;
    }

    console.log(direction_hh);
    lastHHval = hh_value;
} 

function toggleSong(){
    if(song.isPlaying()){
        song.pause();
        drums_l.pause();
    }else{
        song.play();
        drums_l.play();
    }
}


class Ball{
    constructor(x, y, r = 20){
        this.x = x;
        this.y = y;
        this.r = r;
        this.speed = 0.5;
        this.accel = 1.3;
    }

    show(){
        push();
        stroke(255);
        strokeWeight(3);
        fill(100);
        ellipse(this.x, this.y, this.r * 2);
        pop();
    }

    update(){
        this.y += this.speed;
        this.speed *= this.accel; 
    }
}

function pushSegment(){
    let segment = new Segment()
    segments.push(segment)
}

// class Tunnel{
//     constructor(){
//         this.segments = [];
//     }

//     draw(){
//         this.segments.forEach(function (segment, i){
//             push();
//             rectMode(CENTER);
//             rect(0, 0, )
//             pop();          
//         });
//     }

//     step(){

//     }
// }

class Segment{
    constructor(style){
        this.x = width/2;
        this.y = height/2;
        this.size = 30

        this.speed = 1;
        this.accel = 1.1;

        this.alive = true;
    }

    show(){
        push();
        rectMode(CENTER);
        stroke(255);
        strokeWeight(3);
        fill(100);
        rect(width/2, height/2, this.size);
        pop();
    }

    update(){
        this.size += this.speed;
        this.speed *= this.accel; 
        if(this.size > 1920 + 3000){
            this.alive = false;
        }
    }
}