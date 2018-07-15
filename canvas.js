var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');




//##########################################
//		 CONSTANTS & VARIABLES & SETUP
//##########################################

//Variables
var mouseDown = false;
var mousePos = {	//Values will be 'compressed' (store val as 1 instead of 10 as will times by 10 later)
	x: undefined,
	y: undefined
}
var blockMap = [];
fillMap();

var toBeData = [];

//Constants
let blockSize = 40;
let blockBuffer = blockSize/2;

let fWidth = blockSize*10;//*500;
let fHeight = blockSize*10;

//SETUP
canvas.width = fWidth;
canvas.height = fHeight;



//##########################################
//				FUNCTIONS
//##########################################

function fillMap(){
	for(let i=0;i<100;i++){
		blockMap[i]=0;
	}
}

//Checks blockMap to see if clicked space is empty and if not add block
function addBlock(){

	let colIndex = mousePos.x + mousePos.y*10;

	if(blockMap[colIndex]===0){
		blockMap[colIndex]=1;
		drawRect();
	}else{
		// console.log('space already occupied');
	}
}

//Gets real mouse position
function getRealMousePos(event){
	let rect = canvas.getBoundingClientRect();
	let realX = event.x-rect.left;
	let realY = event.y-rect.top;
	if(realX>=0&&realX<fWidth){
		if(realY>=0&&realY<fHeight){
			mousePos.x =  Math.round((realX-blockBuffer)/blockSize);
			mousePos.y =  Math.round((realY-blockBuffer)/blockSize);

			//
			addBlock();
			// console.log(mousePos);
		}
	}
	// console.log(blockMap);
}

//Draws a rect on canvas
function drawRect(){
	c.beginPath();
	c.rect(mousePos.x*blockSize,mousePos.y*blockSize,blockSize,blockSize);
	c.fill();
}


function copyToClipboard(text){
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute('value', text);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}



window.addEventListener('mousedown',(event)=>{
	mouseDown = true;

	getRealMousePos(event);

});
window.addEventListener('mouseup',(event)=>{
	mouseDown = false;
});

window.addEventListener('mousemove',(event)=>{
	if(mouseDown){
		getRealMousePos(event);
	}
});
window.addEventListener('keypress',(event)=>{
	let key = event.key;
	if(key === 'c'){	//Clear blockMap
		c.clearRect(0,0,fWidth,fHeight)
		fillMap();
	}
	if(key === 'v'){	//Empty
		htmlToBeData.innerHTML = JSON.stringify(toBeData);
	}

	if(key === 'b'){	//Empty
		console.log(blockMap);
		c.clearRect(0,0,fWidth,fHeight)
		let len = toBeData.length;
		toBeData[len] = [];
		toBeData[len][0] = JSON.parse(JSON.stringify(blockMap));
		toBeData[len][1] = [0,0,1];
		fillMap();
	}
	if(key === 'n'){	//Happy
		console.log(blockMap);
		c.clearRect(0,0,fWidth,fHeight)
		let len = toBeData.length;
		toBeData[len] = [];
		toBeData[len][0] = JSON.parse(JSON.stringify(blockMap));
		toBeData[len][1] = [1,0,0];
		fillMap();
	}
	if(key === 'm'){	//Sad
		c.clearRect(0,0,fWidth,fHeight)
		let len = toBeData.length;
		toBeData[len] = [];
		toBeData[len][0] = JSON.parse(JSON.stringify(blockMap));
		toBeData[len][1] = [0,1,0];
		fillMap();
	}
});
//##########################################
//				MAIN CODE
//##########################################




var htmlToBeData = document.getElementById('toBeData');

function sendData(){
	let dataField = document.getElementById('dataField').value;
	console.log(dataField);
	matrixRun(dataField);

	drawErrors();
}

function sendPictureData(){
	findLabel(blockMap);
}



function drawErrors(){
	c.beginPath();
	for(let i=0;i<totalErrorsAve.length;i++){
		c.lineTo(i,fHeight-10 - totalErrorsAve[i]*200);
	}
	c.stroke();
	console.log('draw totalErrorsAve');

	c.beginPath();
	c.lineTo(0,fHeight-10);
	c.lineTo(totalErrorsAve.length-1,fHeight-10);
	c.stroke();
}


function clearPictureData(){
	c.clearRect(0,0,fWidth,fHeight)
	fillMap();
}