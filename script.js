var chip = document.getElementById('chip-wrap').cloneNode(true);
chip.id = "";

var cord = document.getElementById('cord-wrap').cloneNode(true);
cord.id = "";

var gate = document.getElementById('gate-wrap').cloneNode(true);
gate.id = "";

var monitor = document.getElementById('monitor-wrap').cloneNode(true);
monitor.id = "";

var phone = document.getElementById('phone-wrap').cloneNode(true);
phone.id = "";

var container = document.getElementById('background');

var w = window.innerWidth;
var h = window.innerHeight;

var rows = h / 50;
var cols = w / 50;

var icons = [phone];

var mousex = 0.0;
var mousey = 0.0;

var icon = icons[Math.floor(Math.random() * icons.length)].cloneNode(true);
container.appendChild(icon);

document.onmousemove = function(e) {
	mousex = e.pageX;
	mousey = e.pageY;

	var iconCenter = [getOffset(icon).left+getOffset(icon)/2, getOffset(icon).top+getOffset(icon)/2];
	var angle = Math.atan2(e.pageX- iconCenter[0], - (e.pageY- iconCenter[1]) )*(180/Math.PI);        

	icon.css({ "-webkit-transform": 'rotate(' + angle + 'deg)'});    
	icon.css({ '-moz-transform': 'rotate(' + angle + 'deg)'});
}

for (var i = 0; i < rows; i++) {
	for (var j = 0; j < cols; j++) {

	}
}

function collide(a, b) {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}

function getOffset(el) {
  el = el.getBoundingClientRect();
  return {
    left: el.left + window.scrollX,
    top: el.top + window.scrollY
  }
}
