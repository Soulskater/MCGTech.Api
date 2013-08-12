//
//Spaceship class
//
function SpaceShip(x, y, width, height, lives) {
    this.Lives = lives;
    this.Position = new Position(x, y, width, height);
    this.Shield = ko.observable(1);
    //
    //MoveShip function for keyboard controlling
    //
    SpaceShip.prototype.MoveShip = function () {
        if ($.inArray(37, keybuffer) != -1 && this.Position.X() > 0) {
            var value = this.Position.X();
            this.Position.X(value - 10);
        }
        if ($.inArray(39, keybuffer) != -1 && this.Position.X() < canvas.clientWidth - 70) {
            var value = this.Position.X();
            this.Position.X(value + 10);
        }
        if ($.inArray(38, keybuffer) != -1 && this.Position.Y() > 0) {
            var value = this.Position.Y();
            this.Position.Y(value - 10);
        }
        if ($.inArray(40, keybuffer) != -1 && this.Position.Y() < canvas.clientHeight - 53) {
            var value = this.Position.Y();
            this.Position.Y(value + 10);
        }
    };
    //
    //MoveToShip function for moved the ship to a given point
    //
    SpaceShip.prototype.MoveToShip = function (x, y) {
        this.Position.X(x);
        this.Position.Y(y);
    }
}
//
//Bullet class
//
function Bullet(x, y, width, height) {
    var self = this;

    self.Position = new Position(x, y, width, height);
    //
    //This function execute in every thick
    // this function contains collision detection, between bullet and asteroids
    // and Dispose function, can remove the bullet from the datamodel and stop the timer
    self.intervalId = setInterval(function () {
        var value = self.Position.Y();
        self.Position.Y(value - 10);
        var asteroids = DataModel.GetAsteroids();
        for (i = 0; i < asteroids.length; i++)
            if (isCollision(self, asteroids[i])) {
                //playEffect();
                self.Dispose();
                var asteroid = asteroids[i];
                asteroid.Dispose();
                var value = DataModel.Point();
                DataModel.Point(value + 1);
                if (asteroid.Type != AsteroidType.small) {
                    var count = Math.floor((Math.random() * 5) + 1);
                    if (asteroid.Type == AsteroidType.medium)
                        count = Math.floor((Math.random() * 10) + 1);
                    var xCoord = asteroid.Position.X();
                    var yCoord = asteroid.Position.Y();
                    for (i = 0; i < count; i++) {
                        if (asteroid.Type == AsteroidType.large)
                            DataModel.CreateAsteroid(xCoord, yCoord, AsteroidType.medium);
                        if (asteroid.Type == AsteroidType.medium)
                            DataModel.CreateAsteroid(xCoord, yCoord, AsteroidType.small);
                    }
                }
                break;
            }
        if (self.Position.Y() < 0)
            self.Dispose();
    }, 10);

    self.Dispose = function () {
        if (self.intervalId) {
            clearInterval(self.intervalId);
            DataModel.RemoveBullet(self);
        }
    };
}

//
//Used to SpaceShip, Bullet, Asteroids
//
function Position(initialX, initialY, width, height) {
    this.X = initialX;
    this.Y = initialY;
    this.Width = width;
    this.Height = height;
}