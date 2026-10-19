// ----- Settings -----
let tankWidth = 800;
let tankHeight = 500;
let fishWidth = 100;
let fishHeight = 60;
let numberOfFish = 8;

let images = [};

let tank = document.getElementById("tank");

class Fish {
  constructor() {
    let rand = Math.floor(Math.random() * images.length);
    this.image = images[rand];

    this.x = Math.floor(Math.random() * (tankWidth - fishWidth));
    this.y = Math.floor(Math.random() * (tankHeight - fishHeight));

    this.normalSpeed = Math.floor(Math.random() * 3) + 1;
    this.speed = this.normalSpeed;

    if (Math.random() < 0.5) {
      this.directionX = 1;
    } else {
      this.directionX = -1;
    }

    this.directionY = Math.floor(Math.random() * 3) - 1;

    this.element = document.createElement("img");
    this.element.src = this.image;
    this.element.className = "fish";
    tank.appendChild(this.element);

    this.boostTimer = null;
    this.element.addEventListener("click", () => {
      this.speedUp();
    });

    let checkTime = Math.floor(Math.random() * 6000) + 2000;
    setInterval(() => {
      this.changeDirection();
    }, checkTime);

    this.draw();
  }

  move() {
    this.x = this.x + this.directionX * this.speed;
    this.y = this.y + this.directionY * this.speed;

    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x > tankWidth - fishWidth) {
      this.x = tankWidth - fishWidth;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.y > tankHeight - fishHeight) {
      this.y = tankHeight - fishHeight;
    }

    this.draw();
  }

  changeDirection() {
    if (this.x <= 0) {
      this.directionX = 1;
    } else if (this.x >= tankWidth - fishWidth) {
      this.directionX = -1;
    } else if (Math.random() < 0.4) {
      this.directionX = this.directionX * -1;
    }

    // Up / down
    if (this.y <= 0) {
      this.directionY = 1;
    } else if (this.y >= tankHeight - fishHeight) {
      this.directionY = -1;
    } else if (Math.random() < 0.3) {
      this.directionY = Math.floor(Math.random() * 3) - 1;
    }
  }

  speedUp() {
    this.speed = this.normalSpeed * 3;

    clearTimeout(this.boostTimer);
    this.boostTimer = setTimeout(() => {
      this.speed = this.normalSpeed;
    }, 3000);
  }

  draw() {
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";

    if (this.directionX == -1) {
      this.element.style.transform = "scaleX(-1)";
    } else {
      this.element.style.transform = "scaleX(1)";
    }
  }
}

let fishList = [];

for (let i = 0; i < numberOfFish; i++) {
  fishList.push(new Fish());
}

function moveAllFish() {
  for (let i = 0; i < fishList.length; i++) {
    fishList[i].move();
  }
}

// Move every fish one step every 20 milliseconds
setInterval(moveAllFish, 20);
