function or(a, b) {
  return a || b;
};

function removeChildren(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

var background = document.getElementById("background");
var background_clone = background.cloneNode(true);
var confetti_1_clone = document.getElementById("confetti-1").cloneNode(true);
var confetti_2_clone = document.getElementById("confetti-2").cloneNode(true);
var confetti_3_clone = document.getElementById("confetti-3").cloneNode(true);
var confetti_4_clone = document.getElementById("confetti-4").cloneNode(true);
var confetti_clones = [confetti_1_clone, confetti_2_clone, confetti_3_clone, confetti_4_clone];
var colors = ["green", "blue", "yellow", "purple", "orange", "red"];

var w = window.innerWidth;
var h = window.innerHeight;
var window_center = {
  x: Math.floor(w/2),
  y: Math.floor(h/2)
};

var RAD_TO_DEG = 180/Math.PI;

var angle_noise = 25;
var position_noise_x = 20;
var position_noise_y = 20;

var pad = .05 * h;

var screen_elements = [
  getCollisionArea(document.getElementById("presents").getBoundingClientRect(), pad),
  getCollisionArea(document.getElementById("dummy").getBoundingClientRect(), pad),
  getCollisionArea(document.getElementById("hackathon").getBoundingClientRect(), pad),
  getCollisionArea(document.getElementById("mce-EMAIL").getBoundingClientRect(), pad),
  getCollisionArea(document.getElementById("mc-embedded-subscribe").getBoundingClientRect(), pad),
];

function getCollisionArea(box, pad) {
  var collision_area = {};

  collision_area.top = box.top - pad;
  collision_area.left = box.left - pad;
  collision_area.height = box.height + (pad * 2);
  collision_area.width = box.width + (pad * 2);

  return collision_area;
};

function clearBackground() {
  removeChildren(background)
}

function resetBackground() {
  clearBackground();

  w = window.innerWidth;
  h = window.innerHeight;
  window_center = {
    x: Math.floor(w/2),
    y: Math.floor(h/2)
  };

  screen_elements = [
    getCollisionArea(document.getElementById("presents").getBoundingClientRect(), pad),
    getCollisionArea(document.getElementById("dummy").getBoundingClientRect(), pad),
    getCollisionArea(document.getElementById("hackathon").getBoundingClientRect(), pad),
    getCollisionArea(document.getElementById("mce-EMAIL").getBoundingClientRect(), pad),
    getCollisionArea(document.getElementById("mc-embedded-subscribe").getBoundingClientRect(), pad),
  ];

  createBackground();
}

function createBackground() {
  // insert here a way to clear the entire background

  for (var i = 0; i < 500; i++){
    var rand_confetti = Math.floor(Math.random() * 10) % confetti_clones.length;

    var new_confetti = confetti_clones[rand_confetti].cloneNode(true);
    new_confetti.id = "new-confetti";

    var rand_color = Math.floor(Math.random() * 10) % colors.length;
    new_confetti.className += " " + colors[rand_color];

    document.getElementById("background").appendChild(new_confetti);

    var rect = new_confetti.getBoundingClientRect();

    if ( screen_elements.map(
      function(a) {
        return !(
          ((a.top + a.height) < (rect.top)) ||
          (a.top > (rect.top + rect.height)) ||
          ((a.left + a.width) < rect.left) ||
          (a.left > (rect.left + rect.width))
        );
      }
    ).reduce(or) ) {
      var this_confetti = document.getElementById("new-confetti");
      this_confetti.removeChild(
        this_confetti.getElementsByTagName("svg")[0]
      );
    } else {
      var rect_center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      }

      var vector = {
        x: window_center.x - rect_center.x,
        y: window_center.y - rect_center.y
      }

      var position_adjustment = Math.floor(Math.random() * 100) % position_noise_x - position_noise_x;

      new_confetti.style.marginLeft = -position_adjustment + "px";
      position_adjustment = Math.floor(Math.random() * 100) % position_noise_y - position_noise_y;
      new_confetti.style.marginTop = position_adjustment + "px";

      var angle_adjustment = 0;
      var angle = Math.atan2(vector.y, vector.x) * RAD_TO_DEG + 270 + angle_adjustment;

      // var angle_adjustment = Math.floor(Math.random() * 100) % angle_noise - angle_noise;
      new_confetti.style.transform = "rotate(" + angle + "deg)";
    }

    new_confetti.removeAttribute("id")
  }
};

var confettis = document.getElementsByClassName("svg-wrap");
var up = "first";
var theta = 10;

function wiggle() {
  for (i = 0; i < confettis.length; i++) {
    var angle = parseFloat(confettis[i].style.transform.replace("rotate(", "").replace("deg)", ""));
    angle += (up ? theta : -theta)
    confettis[i].style.transform = "rotate(" + angle + "deg)";
  }
  if (typeof up == "string") theta *= 2;
  up = !up;
}

function randomWiggle() {
  for (i = 0; i < confettis.length; i++) {
    var angle = parseFloat(confettis[i].style.transform.replace("rotate(", "").replace("deg)", ""));
    angle += (Math.ceil(Math.random() - .5) ? theta : -theta)
    confettis[i].style.transform = "rotate(" + angle + "deg)";
  }
}

window.addEventListener("resize", resetBackground);
createBackground();

// setInterval(resetBackground, 500)
// setInterval(wiggle, 500)
setInterval(randomWiggle, 500)
