function Bullet(x, y,width,height,angle,velocity) {
    var self = this;
    self.angle = angle;
    var spriteLoaded = false;
    self.bulletImage = new Image();
    self.bulletImage.onload = function()
    {
        self.Size = new Size(self.bulletImage.width,self.bulletImage.height);
        spriteLoaded = true;
    }
    self.bulletImage.src = "Images/bullet1.png";
    var tankSize = new Size(width,height);

    var startTime = GamePlay.GameTime;

    var Velocity = new Vector(function()
    {
        return Velocity.Measure * Math.cos(self.angle*TO_RADIANS);
    },function()
    {
        return (Velocity.Measure * Math.sin(self.angle*TO_RADIANS))-(GamePlay.Gravity*dt());
    },velocity)

    var dt = function()
    {
        return GamePlay.GameTime - startTime;
    };

    self.Position = new Position(x, y);

    var prevPosition = new Position(x,y);
    self.MoveVector = function()
    {
        return new Position(self.Position.X-prevPosition.X,self.Position.Y-prevPosition.Y);
    };

    var smoke2 = new SmokeParticle(self.Position.X,self.Position.Y,'Images/ParticleSmoke4.png');

    //var DebugItem = DebugData.length;
    //DebugData.push("Degree: " + self.angle);

    self.Draw = function () {
        if (!spriteLoaded) return;
        GamePlay.contextBuffer.fillStyle="#666666";
        GamePlay.contextBuffer.save();
        GamePlay.contextBuffer.shadowOffsetX = 3;
        GamePlay.contextBuffer.shadowOffsetY = 3;
        GamePlay.contextBuffer.shadowBlur = 5;
        GamePlay.contextBuffer.shadowColor = "rgba(98, 103, 99, 0.4)";

        var vec = self.MoveVector();
        var rotate = self.angle;
        if (vec.X!=0 || vec.Y != 0)
            rotate = (180/Math.PI)*(Math.atan2(vec.X,vec.Y)-Math.PI/2);

        var tmpCanvas = document.createElement("canvas");
        tmpCanvas.width = GamePlay.canvas.width;
        tmpCanvas.height = GamePlay.canvas.height;
        var tmpContext = tmpCanvas.getContext("2d");
        tmpContext.drawImage(GamePlay.ActualLevel.GroundImage,0,0);

        var image = tmpContext.getImageData(self.Position.X, self.Position.Y,self.Size.Width+30,self.Size.Height+30);
        drawBullet(tmpContext,rotate);
        var image2 = tmpContext.getImageData(self.Position.X, self.Position.Y,self.Size.Width,self.Size.Height);
        var collision = isPixelCollision(image,self.Position.X, self.Position.Y,image2,self.Position.X,self.Position.Y,false);
        if(collision)
            GamePlay.ActualLevel.CollisionTerrain();

        //DebugData[DebugItem] = "Degree: " + rotate;
        drawBullet(GamePlay.contextBuffer, rotate);
        smoke2.UpdatePosition(self.Position.X+tankSize.Width/2,self.Position.Y+tankSize.Height/2);
        smoke2.Draw();
        self.UpdatePosition();
    };

    var drawBullet = function(context, rotate)
    {
        context.translate(self.Position.X +tankSize.Width/2,self.Position.Y +tankSize.Height/2);
        context.rotate(rotate*-1*TO_RADIANS);
        context.drawImage(self.bulletImage,0,0-self.Size.Height/2);
        context.restore();
    }

    self.UpdatePosition = function()
    {
        prevPosition.X = self.Position.X;
        prevPosition.Y = self.Position.Y;
        var t = (dt()/1000);
        var x = Velocity.X() * t;
        var y = ((Velocity.Measure * Math.sin(self.angle*TO_RADIANS) * t)-((GamePlay.Gravity/2)*(t*t)))*-1;

        self.Position.X += Math.round((x*GamePlay.DistanceConst));
        self.Position.Y += Math.round((y*GamePlay.DistanceConst));
    }

    self.Dispose = function () {

    };
}
