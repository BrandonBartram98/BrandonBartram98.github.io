//Variables
var canvas, context;
var brush = {
	x: 0,
	y: 0,
	color: "#000000",
	size: 10,
	down: false,
}
var strokes = [];
var currentStroke = null;

//Functions
function redraw() 
{
	context.clearRect(0, 0, canvas.width(), canvas.height());
	context.lineCap = "round"; // Makes the brush ends round instead of straight
	for (var i = 0; i < strokes.length; i++) 
	{
		var s = strokes[i];
		context.strokeStyle = s.color;
		context.lineWidth = s.size;
		context.beginPath();
		context.moveTo(s.points[0].x, s.points[0].y);
		for (var j = 0; j < s.points.length; j++) 
		{
			var p = s.points[j];
			context.lineTo(p.x, p.y);
		}
		context.stroke();
	}
}

function init () 
{
	canvas = $("#custom");
	canvas.attr( // Canvas size is set to window size
	{
		width: window.innerWidth,
		height: window.innerHeight,
	});
	context = canvas[0].getContext("2d"); // Get canvas context
	
	function mouseEvent (e) 
	{
		brush.x = e.pageX;
		brush.y = e.pageY;
		
		currentStroke.points.push({
			x: brush.x,
			y: brush.y,
		});
		
		redraw();
	}
	
	canvas.mousedown(function (e) 
	{
		brush.down = true; // When mouse is clicked

		currentStroke = {
			color: brush.color, // Get brush colour
			size: brush.size, // Get brush size
			points: [],
		};
		strokes.push(currentStroke);
		
		mouseEvent(e);
	})
	
	.mouseup(function (e) // When mouse click is released
	{
		brush.down = false;
		
		mouseEvent(e);
		
		currentStroke = null;
	}).mousemove(function (e) // When mouse is moved
	{
		if (brush.down)
				mouseEvent(e);
			
	}).mouseleave(function (e) // When mouse leaves the canvas
	{
		brush.down = false; // brush is up when leaving canvas so strokes are not drawn when mouse re-enters
		
		mouseEvent(e);
		
		currentStroke = null;
	});
		
		$("#save").click(function () // Save as image button function
		{
			localStorage.setItem("custom", canvas[0].toDataURL());
		});
		
		$("#load").click(function () // Load saved image from local storage
		{
			var dataURL = localStorage.getItem("custom");
			var img = new Image;
			img.src = dataURL;
			img.onload = function ()
			{
				context.drawImage(img, 0, 0);
			}
		});
		
		$("#undo").click(function () // Undo last stroke function
		{
			strokes.pop();
			redraw();
		});
		
		$("#clear").click(function () // Clear canvas function
		{
			strokes = []; // Removes strokes
			redraw();
		});
		
		$("#colorPicker").on("input", function () // Colour picker function
		{
			brush.color = this.value; // Brush.color is set to colour picker value
		});
		
		$("#strokeSize").on("input", function () //Stroke size function
		{
			brush.size = this.value; // Brush.size is set to slider value
		});
			
}

$(init);
	



