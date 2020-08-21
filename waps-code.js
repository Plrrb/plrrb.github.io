function preload() {
  waterCan = loadImage("https://i.imgur.com/BrqwDSN.png");
  waterCanRotate = loadImage("https://i.imgur.com/VTkwWyA.png");
  trebuchetImg = loadImage("https://i.imgur.com/daowshM.png");
  trebuchetProjectileImg = loadImage("https://i.imgur.com/JNgsbsl.png");
  groundImg = loadImage("https://i.imgur.com/ujJ9aHh.png");
  plantImg = loadImage("https://i.imgur.com/UP58pf6.png");
  heliImg = loadImage("https://i.imgur.com/aABZrpr.png");
  heliProjectileImg = loadImage("https://i.imgur.com/1IQh88m.png");
  airImg = loadImage("https://i.imgur.com/J45ULy3.png");
  asteroidImg = loadImage("https://i.imgur.com/rDDg0Ky.png");
  spaceImg = loadImage("https://i.imgur.com/boZD6aX.png");
  winImg = loadImage("https://i.imgur.com/82oPuFY.png");
}

function setup() {
  createCanvas(600, 600);
  noStroke();
  imageMode(CENTER);
}

var water = {
  x: [],
  y: [],

  imlazy: 20,

  speed: 5
};

var bodge;

var plant = {
  x: 450,
  y: 800,

  width: 295.5,
  height: 834,
  speed: 0.4
};

var trebuchet = {
  x: 30,
  y: 550,

  width: 197.3333333333333,
  height: 106.3333333333333,

  projectile: {
    x: [],
    y: [],

    Xtrajectory: [],
    Ytrajectory: [],

    width: 30,
    height: 37.27272727272727,

    speed: 5,
    damage: 15
  }
};

var heli = {
  x: 50,
  y: 300,
  speed: 1,

  width: 176.8,
  height: 45.2,

  projectile: {
    x: [],
    y: [],

    width: 83,
    height: 19,

    speed: 5,
    damage: 15,
  },
};

var asteroid = {
  x: [],
  y: [],
  Xtrajectory: [],
  Ytrajectory: [],

  width: 58,
  height: 54,

  damage: 15
};

var level = 0;

var stages = [
  function() {
    trebuchetCode(100, 520)
  },
  function() {
    heliCode(100)
  },
  function() {
    asteroidCode()
  },
  function() {
    winCode();
  }
];

var waterCode = function() {
  if (mouseIsPressed) {
    water.x.push(mouseX + random(-8, 8));
    water.y.push(mouseY);

    bodge = waterCanRotate;
    water.imlazy = -40;
  } else {
    bodge = waterCan;
    water.imlazy = 20;
  }

  image(bodge, mouseX + 75, mouseY + water.imlazy, bodge.width / 8, bodge.height / 8);

  for (var i = 0; i < water.x.length || i < water.y.length; i++) {
    fill(33, 47, 196);
    ellipse(water.x[i] += random(-0.3, 0.3), water.y[i] += water.speed, 10, 20);
  }

  if (water.x.length > 200 || water.y.length > 200) {
    water.x.splice(0, 1);
    water.y.splice(0, 1);
  }
};

var plantCode = function() {
  fill(43, 179, 5);
  image(plantImg, plant.x, plant.y, plant.width, plant.height)

  if (mouseIsPressed && mouseX > plant.x - 50) {
    plant.y -= plant.speed;
  }
};

var trebuchetCode = function(x, y) {
  image(groundImg, 300, 300, groundImg.width, groundImg.height);

  image(trebuchetImg, x, y, trebuchet.width, trebuchet.height);

  if (random(0, 100) < 1) {
    trebuchet.projectile.x.push(x - 90);
    trebuchet.projectile.y.push(y);
    trebuchet.projectile.Xtrajectory.push(random(3, 6));
    trebuchet.projectile.Ytrajectory.push(random(-5, -8));
  }
  for (var i = 0; i < trebuchet.projectile.x.length || i < trebuchet.projectile.y.length || i < trebuchet.projectile.Xtrajectory.length || i < trebuchet.projectile.Ytrajectory.length; i++) {
    image(trebuchetProjectileImg, trebuchet.projectile.x[i] += trebuchet.projectile.Xtrajectory[i], trebuchet.projectile.y[i] += trebuchet.projectile.Ytrajectory[i] += 0.08, trebuchet.projectile.width, trebuchet.projectile.height);

    if (mouseIsPressed && mouseX < trebuchet.projectile.x[i] + trebuchet.projectile.width && mouseX > trebuchet.projectile.x[i] - trebuchet.projectile.width && mouseY < trebuchet.projectile.y[i] + trebuchet.projectile.height && mouseY > trebuchet.projectile.y[i] - trebuchet.projectile.height) {
      trebuchet.projectile.x.splice(i, i + 1);
      trebuchet.projectile.y.splice(i, i + 1);
      trebuchet.projectile.Xtrajectory.splice(i, i + 1);
      trebuchet.projectile.Ytrajectory.splice(i, i + 1);
    } else if (trebuchet.projectile.x[i] > plant.x - 40 && trebuchet.projectile.y[i] > plant.y / 3) {
      plant.y += trebuchet.projectile.damage;
      trebuchet.projectile.x.splice(i, i + 1);
      trebuchet.projectile.y.splice(i, i + 1);
      trebuchet.projectile.Xtrajectory.splice(i, i + 1);
      trebuchet.projectile.Ytrajectory.splice(i, i + 1);
    } else if (trebuchet.projectile.x[i] > width + 100 || trebuchet.projectile.y[i] > height + 100) {
      trebuchet.projectile.x.splice(i, i + 1);
      trebuchet.projectile.y.splice(i, i + 1);
      trebuchet.projectile.Xtrajectory.splice(i, i + 1);
      trebuchet.projectile.Ytrajectory.splice(i, i + 1);
    }
  }
};

var heliCode = function(inputX) {
  image(airImg, 300, 300, airImg.width, airImg.height);

  image(heliImg, inputX += random(-0.3, 0.3), heli.y += heli.speed, heli.width, heli.height);

  if (heli.y > 500) {
    heli.speed = ~heli.speed + 1;
  } else if (heli.y < 100) {
    heli.speed = heli.speed + 1;
  }

  if (random(0, 100) < 2) {
    heli.projectile.x.push(inputX);
    heli.projectile.y.push(heli.y);
  }

  for (var i = 0; i < heli.projectile.x.length || i < heli.projectile.y.length; i++) {
    fill(255, 0, 0);
    image(heliProjectileImg, heli.projectile.x[i] += heli.projectile.speed, heli.projectile.y[i], heli.projectile.width, heli.projectile.height);

    if (mouseIsPressed && mouseX < heli.projectile.x[i] + heli.projectile.width && mouseX > heli.projectile.x[i] - heli.projectile.width && mouseY < heli.projectile.y[i] + heli.projectile.height && mouseY > heli.projectile.y[i] - heli.projectile.height) {
      heli.projectile.x.splice(i, i + 1);
      heli.projectile.y.splice(i, i + 1);
    } else if (heli.projectile.x[i] > plant.x - 50 && heli.projectile.y[i] > plant.y / 3) {
      plant.y += heli.projectile.damage;
      heli.projectile.x.splice(i, i + 1);
      heli.projectile.y.splice(i, i + 1);
    } else if (heli.projectile.x[i] > 600) {
      heli.projectile.x.splice(i, i + 1);
      heli.projectile.y.splice(i, i + 1);
    }
  }
};

var asteroidCode = function() {
  image(spaceImg, 300, 300, spaceImg.width, spaceImg.height);

  if (random(0, 100) < 2) {
    asteroid.x.push(-50);
    asteroid.y.push(random(20, 580));
    asteroid.Xtrajectory.push(random(3, 5));
    asteroid.Ytrajectory.push(random(-3, 3));
  }

  for (var i = 0; i < asteroid.x.length || i < asteroid.y.length || i < asteroid.Xtrajectory.length || i < asteroid.Ytrajectory.length; i++) {
    image(asteroidImg, asteroid.x[i] += asteroid.Xtrajectory[i], asteroid.y[i] += asteroid.Ytrajectory[i], asteroid.width, asteroid.height);

    if (mouseIsPressed && mouseX < asteroid.x[i] + asteroid.width && mouseX > asteroid.x[i] - asteroid.width && mouseY < asteroid.y[i] + asteroid.height && mouseY > asteroid.y[i] - asteroid.height) {
      asteroid.x.splice(i, i + 1);
      asteroid.y.splice(i, i + 1);
      asteroid.Xtrajectory.splice(i, i + 1);
      asteroid.Ytrajectory.splice(i, i + 1);
    } else if (asteroid.x[i] > plant.x - 40 && asteroid.y[i] > plant.y / 3) {
      plant.y += asteroid.damage;
      asteroid.x.splice(i, i + 1);
      asteroid.y.splice(i, i + 1);
      asteroid.Xtrajectory.splice(i, i + 1);
      asteroid.Ytrajectory.splice(i, i + 1);
    } else if (asteroid.x[i] > width + 100 || asteroid.y[i] > height + 100) {
      asteroid.x.splice(i, i + 1);
      asteroid.y.splice(i, i + 1);
      asteroid.Xtrajectory.splice(i, i + 1);
      asteroid.Ytrajectory.splice(i, i + 1);
    }
  }
};

var winCode = function() {
  image(winImg, 300, 300, winImg.width, winImg.height);

  textAlign(CENTER);
  textSize(40);
  fill(209, 195, 0);
  text("You Win!", 300, 100);
  plant.y = 700;
};

function draw() {
  if (plant.y < 300) {
    plant.y = 800;
    level++;
  }

  stages[level]();
  plantCode();
  waterCode();
}