function callnodejs(data, success) {
	$.ajax({
		type: "POST",
		url: "nodejsws",
		data: data,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: OnSuccess,
		error: OnError
	});
	
	function OnSuccess(data, status) {
		success(data);
	}
	
	function OnError(request, status, error) {
		alert(request.statusText);
	}
}

var ctx, color = "#000";

$(document).ready(function () {
	setTimeout(function () {
		newCanvas();
	}, 1000);
});

var w = 0;
var h = 0;
// function to setup a new canvas for drawing
function newCanvas() {
	w = $(window).width();
	h = $(window).height();
	paramClear();
	
	var canvas = "<canvas id='canvas' width='" + w + "' height='" + h + "'></canvas>";
	$("#page1").html(canvas);
	
	// setup canvas
	ctx = document.getElementById("canvas").getContext("2d");
	ctx.strokeStyle = color;
	ctx.lineWidth = 15;
	ctx.lineCap = "round";
	
	// setup to trigger drawing on mouse or touch
	$("#canvas").drawTouch();
	$("#canvas").drawPointer();
	$("#canvas").drawMouse();
}

// prototype to start drawing on touch using canvas moveTo and lineTo
$.fn.drawTouch = function () {
	var start = function (e) {
		e = e.originalEvent;
		ctx.beginPath();
		x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY;
		ctx.moveTo(x, y);
	};
	var move = function (e) {
		e.preventDefault();
		e = e.originalEvent;
		x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY;
		ctx.lineTo(x, y);
		ctx.stroke();
	};
	$(this).on("touchstart", start);
	$(this).on("touchmove", move);
};

// prototype to start drawing on pointer(microsoft ie) using canvas moveTo and lineTo
$.fn.drawPointer = function () {
	var start = function (e) {
		e = e.originalEvent;
		ctx.beginPath();
		x = e.pageX;
		y = e.pageY;
		ctx.moveTo(x, y);
	};
	var move = function (e) {
		e.preventDefault();
		e = e.originalEvent;
		x = e.pageX;
		y = e.pageY;
		ctx.lineTo(x, y);
		ctx.stroke();
	};
	$(this).on("MSPointerDown", start);
	$(this).on("MSPointerMove", move);
};

var wsdelay = 800;
var timer = null;
var p0 = new Array(32);
paramClear();

function paramClear() {
	for (var i = 0; i < 32; i++) {
		p0[i] = new Array(32);
		for (var j = 0; j < 32; j++) {
			p0[i][j] = 0;
		}
	}
}

function brush(x, y) {
	if (x >= 0 && y >= 0 && x <= 31 && y <= 31)
		p0[x][y] = 1;
}

function paramStore(x, y) {
	var x2 = Math.floor(x / w * 32);
	var y2 = Math.floor(y / h * 32);
	
	// 3*3
	for (i = -1; i <= 1; i++)
		for (j = -1; j <= 1; j++)
			brush(x2 + i, y2 + j);
}

var p1 = new Array(64);

function paramFix() {
	for (var i = 0; i < 64; i++) {
		p1[i] = 0;
	}
	
	for (var i = 0; i < 32; i++) {
		for (var j = 0; j < 32; j++) {
			var i1 = Math.floor(i / 4);
			var j1 = Math.floor(j / 4);
			p1[j1 * 8 + i1] += p0[i][j];
		}

	}
}

// prototype to start drawing on mouse using canvas moveTo and lineTo
$.fn.drawMouse = function () {
	var clicked = 0;
	var start = function (e) {
		if (timer != null) {
			clearTimeout(timer);
		}
		clicked = 1;
		ctx.beginPath();
		x = e.pageX;
		y = e.pageY;
		ctx.moveTo(x, y);
	};
	var move = function (e) {
		if (clicked) {
			x = e.pageX;
			y = e.pageY;
			
			//                    ctx.fillRect(x, y, 1, 1);
			
			ctx.lineTo(x, y);
			ctx.stroke();
			
			paramStore(x, y);
		}
	};
	var stop = function (e) {
		clicked = 0;
		if (timer != null) {
			clearTimeout(timer);
		}
		timer = setTimeout(call_ws, wsdelay);
	};
	$(this).on("mousedown", start);
	$(this).on("mousemove", move);
	$(window).on("mouseup", stop);
	
	var call_ws = function () {
		//		txt.value = "call";
		//		finished = true;
		// $.ajax();
		
		paramFix();
		
		callnodejs(JSON.stringify(p1), function (result) {
			play(result);
			newCanvas();
		});
	}
	var play = function (n) {
		$('#a' + n)[0].play();
	}
};
