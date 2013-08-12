///<reference path="~/Scripts/SpaceShip.js"/>

//
//The datamodel for MVVM pattern
//this model used to bind the data to the ui
//the model contains Bullets array, because the knockout js generate the bullets by template
//if the model is changed the ui will be refreshed with te binding
var Model = function (level) {
    var self = this;
    self.Level = level;
    self.Point = ko.observable(0);
    self.Ship = new SpaceShip(ko.observable((canvas.clientWidth / 2) - 35), ko.observable(canvas.clientHeight - 53), 70, 53, ko.observable(10));

    self.Ship.Lives.subscribe(function (newValue) {
        if (newValue == 0) {
            Stop();
        }
    });
    //
    //The asteroids are taken apart, large,medium and small asteroids array because these arrays binded to different SVG object
    //
    self.LargeAsteroids = ko.observableArray();
    self.MediumAsteroids = ko.observableArray();
    self.SmallAsteroids = ko.observableArray();
    //
    //GetAsteroids returns all of the active asteroids
    self.GetAsteroids = function (type) {
        var result = new Array();
        for (i = 0; i < self.LargeAsteroids().length; i++) {
            result.push(self.LargeAsteroids()[i]);
        }
        for (i = 0; i < self.MediumAsteroids().length; i++) {
            result.push(self.MediumAsteroids()[i]);
        }
        for (i = 0; i < self.SmallAsteroids().length; i++) {
            result.push(self.SmallAsteroids()[i]);
        }
        return result;
    }

    var interval = (self.Level === 0 ? 4000 : self.Level === 1 ? 2000 : 1000);
    //
    //Creates large asteroids
    self.intervalId = setInterval(function () {
        var x = Math.floor((Math.random() * (canvas.clientWidth - 40)) + 1);
        var y = -30;
        self.CreateAsteroid(x, y, AsteroidType.large);
    }, interval);
    //
    //Create a new asteroid and add it into the datamodel
    self.CreateAsteroid = function (x, y, type) {
        if (type == AsteroidType.large) {
            DataModel.LargeAsteroids.push(new Asteroid(ko.observable(x), ko.observable(y), type));
        }
        if (type == AsteroidType.medium) {
            DataModel.MediumAsteroids.push(new Asteroid(ko.observable(x), ko.observable(y), type));
        }
        if (type == AsteroidType.small) {
            DataModel.SmallAsteroids.push(new Asteroid(ko.observable(x), ko.observable(y), type));
        }
    }
    //
    //Remove the asteroid from the datamodel
    self.RemoveAsteroid = function (asteroid) {
        if (asteroid.Type == AsteroidType.large) {
            DataModel.LargeAsteroids.remove(asteroid);
        }
        if (asteroid.Type == AsteroidType.medium) {
            DataModel.MediumAsteroids.remove(asteroid);
        }
        if (asteroid.Type == AsteroidType.small) {
            DataModel.SmallAsteroids.remove(asteroid);
        }

    }
    //
    //Create a new bullet
    self.CreateBullet = function () {
        var x = self.Ship.Position.X() + 50;
        var y = self.Ship.Position.Y() + 30;
        self.Bullets.push(new Bullet(ko.observable(x), ko.observable(y), 5, 25));
    }
    //
    //Remove the bullet
    self.RemoveBullet = function (bullet) { self.Bullets.remove(bullet) }
    self.Bullets = ko.observableArray();

    //
    //Stop the timer, and dispose all active object
    //
    self.Dispose = function () {
        if (self.intervalId) {
            clearInterval(self.intervalId);
        }
        var count = self.LargeAsteroids().length;
        for (i = 0; i < count; i++) {
            self.LargeAsteroids()[0].Dispose();
        }

        count = self.MediumAsteroids().length;
        for (i = 0; i < count; i++) {
            self.MediumAsteroids()[0].Dispose();
        }

        count = self.SmallAsteroids().length;
        for (i = 0; i < count; i++) {
            self.SmallAsteroids()[0].Dispose();
        }
        //self.Ship.MoveToShip((canvas.clientWidth / 2) - 35, canvas.clientHeight - 53);
    }
}

var AsteroidType = { "large": 0, "medium": 1, "small": 3 };

//
//Asteroid class
//
function Asteroid(x, y, type) {
    var self = this;

    self.Position = new Position(x, y);
    //
    //The direction is "steepness" of asteroids, except the larges asteroids
    self.DirectionX = Math.floor((Math.random() * 11)) - 5;
    self.DirectionY = Math.floor((Math.random() * 11)) - 5;
    //
    //The Type variable is AsteroidType, it can be large, medium, small
    self.Type = type;
    if (type == AsteroidType.large) {
        self.Position.Width = 80;
        self.Position.Height = 59;
        self.DirectionX = 0;
        self.DirectionY = 1;
    }
    if (type == AsteroidType.medium) {
        self.Position.Width = 80;
        self.Position.Height = 60;
    }
    if (type == AsteroidType.small) {
        self.Position.Width = 30;
        self.Position.Height = 20;
    }
    //
    //Asteroid movement timer
    self.intervalId = setInterval(function () {
        var valueX = self.Position.X();
        var valueY = self.Position.Y();
        self.Position.X(valueX + self.DirectionX);
        self.Position.Y(valueY + self.DirectionY);
    }, 50);
    //
    //Collision detection timer
    self.collisionIntervalId = setInterval(function () {
        //
        //Collision between asteroid and ship
        var collisionship = isCollision(self, DataModel.Ship);
        var outoffield = self.Position.Y() > canvas.clientHeight || self.Position.Y() < -40 || self.Position.X() < 0 || self.Position.X() > canvas.clientWidth;
        if (collisionship || outoffield)
            self.Dispose();
        if (collisionship) {
            if (DataModel.Ship.Shield() > 0) {
                var value = DataModel.Ship.Shield();
                DataModel.Ship.Shield(value - (0.03 * (DataModel.Level + 1)));
            }
            else
                DataModel.Ship.Lives(DataModel.Ship.Lives() - 1);
            return;
        }
        //
        //Collision between asteroids
        var collision = false;
        var asteroids = DataModel.GetAsteroids();
        for (i = 0; i < asteroids.length; i++)
            if (self.Type != asteroids[i].Type && isCollision(self, asteroids[i])) {
                collision = true;
                break;
            }

        if (collision) {
            self.Dispose();
            var value = DataModel.Point();
            DataModel.Point(value + 1);
            if (self.Type != AsteroidType.small) {
                var count = Math.floor((Math.random() * 5) + 1);
                if (self.Type == AsteroidType.medium)
                    count = Math.floor((Math.random() * 10) + 1);
                var xCoord = self.Position.X();
                var yCoord = self.Position.Y();
                for (i = 0; i < count; i++) {
                    if (self.Type == AsteroidType.large)
                        DataModel.CreateAsteroid(xCoord, yCoord, AsteroidType.medium);
                    if (self.Type == AsteroidType.medium)
                        DataModel.CreateAsteroid(xCoord, yCoord, AsteroidType.small);
                }
            }
        }

    }, 100);
    //
    //Stop the two timer, and remove the asteroid from the datamodel
    self.Dispose = function () {
        if (self.intervalId) {
            clearInterval(self.intervalId);
        }
        if (self.collisionIntervalId) {
            clearInterval(self.collisionIntervalId);
            DataModel.RemoveAsteroid(self);
        }
    };
}