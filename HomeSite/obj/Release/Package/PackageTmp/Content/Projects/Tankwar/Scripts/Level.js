var BaseLevel = function(background,ground,players) {
    var self = {};

    //GamePlay.canvas.style.backgroundImage = "url("+background+")";
    self.Players = new Array();
    self.ActivePlayerID = 0;
    self.Background = new Image();
    self.Background.src = background;
    self.GroundImage = new Image();
    self.GroundImage.src = ground;
    self.bullet = null;
    self.Init = function()
    {
        var tmpImage = new Image();
        tmpImage.onload = function()
        {
            var tempCanvas = document.createElement('canvas');
            tempCanvas.width = GamePlay.canvas.width;
            tempCanvas.height = GamePlay.canvas.height;
            var tempContext = tempCanvas.getContext('2d');
            tempContext.drawImage(tmpImage, 0, 0);
            for(var i=0;i<players.length;i++)
            {
                var minX = (GamePlay.canvas.width/players.length)*i;
                var maxX = (GamePlay.canvas.width/players.length)*i + (GamePlay.canvas.width/players.length);
                var x = Math.round(randomRange(minX,maxX));
                var y = -1;
                var j = 0;
                while(y == -1)
                {
                    var pixel = tempContext.getImageData(x,j,1,1);
                    var nextPixel = tempContext.getImageData(x,j+1,1,1);
                    if (pixel.data[3] <= 10 && nextPixel.data[3] > 10)
                        y = j;
                    j++;
                }
                var item = new Tank(new Position(x, y),players[i].Name, players[i].Color);
                item.Init();
                self.Players.push(item);
            }
        }
        tmpImage.src = ground;
    }
    self.Init();

    self.DrawData = function() {
        //GamePlay.context.clearRect(20, 20, 100, 100);
        GamePlay.contextBuffer.fillStyle = "#A1A892";
        GamePlay.contextBuffer.font = "bold 10pt Verdana";
        for(var i=0;i<self.Players.length;i++)
        {
            var x = 25;
            var y = (i*20)+30;
            if (self.ActivePlayerID == i)
            {
                GamePlay.contextBuffer.fillStyle = "#666666";
                GamePlay.contextBuffer.arc(10,y-4,5,0,360,false);
                GamePlay.contextBuffer.fill();
            }
            GamePlay.contextBuffer.fillStyle = self.Players[i].colorhex;
            var playerInfo = self.Players[i].Name + ": " +self.Players[i].life + " Power: "+(self.Players[i].velocity*10) +
                "% Angle: " + self.Players[i].angle;
            GamePlay.contextBuffer.fillText(playerInfo,x,y);
        }
        if (self.bullet!= null)
        {
            GamePlay.contextBuffer.fillStyle = "#666666";
            GamePlay.contextBuffer.fillText("X:" + self.bullet.Position.X + ", Y:" +self.bullet.Position.Y,25,80);
        }

        DrawFPS();

        if (DebugData.length>0)
        {
            GamePlay.contextBuffer.save();
            GamePlay.contextBuffer.fillStyle = "000000";
            GamePlay.contextBuffer.rect(GamePlay.canvas.clientWidth-210,35,210,DebugData.length*20);
            GamePlay.contextBuffer.fill();
            GamePlay.contextBuffer.restore();
        }
        for(var i=0;i<DebugData.length;i++)
        {
            var x = GamePlay.canvas.clientWidth-200;
            var y = (i*20)+ 50;
            GamePlay.contextBuffer.fillStyle = "ffffff";
            GamePlay.contextBuffer.fillText(DebugData[i],x,y);
        }
    };

    return self;
};

DebugData = new Array();

var LevelFirst = function(background,ground,players) {
    var self = BaseLevel(background,ground,players);
    var cloud = new CloudParticle();
    var interval = 40;
    var timer = 0;
    this.GroundImage = self.GroundImage;
    var tempCanvas = document.createElement('canvas');
    tempCanvas.width = GamePlay.canvas.width;
    tempCanvas.height = GamePlay.canvas.height;
    var tempContext = tempCanvas.getContext('2d');
    tempContext.drawImage(this.GroundImage, 0, 0);
    var GroundImageData = tempContext.getImageData(0,0,tempCanvas.width,tempCanvas.height);

    var explosion;
    self.Draw = function()
    {
        GamePlay.contextBuffer.drawImage(self.Background,0,0);
        GamePlay.contextBuffer.drawImage(self.GroundImage,0,0);
        cloud.Draw();
        for(var i=0;i<self.Players.length;i++)
        {
            self.Players[i].Draw();
        }

        if (self.bullet != null)
        {
            if (self.bullet.Position.X>GamePlay.canvas.width || self.bullet.Position.Y>GamePlay.canvas.height)
                self.bullet = null;
            else
                self.bullet.Draw();
        }
        self.DrawData();
        for(var i = 0;i<DistroyedData.length;i++)
        {
            //GamePlay.contextBuffer.putImageData(DistroyedData[i].Data,DistroyedData[i].X,DistroyedData[i].Y);
        }
        if (explosion && explosion.ExplosionTime<200)
        {
            explosion.Draw();
            explosion.ExplosionTime += interval;
        }
        GamePlay.FlushBuffer();
        timer += interval;
        GamePlay.GameTime += interval;
    }

    this.CollisionTerrain = function()
    {
        var x = self.bullet.Position.X;
        var y = self.bullet.Position.Y;
        self.bullet = null;
        explosion = new ExplosionSystem(x,y,'Images/ParticleExplosion1.png');
        this.CreateExplosion(x,y);
    }

    var DistroyedData = new Array();

    this.CreateExplosion = function (x,y)
    {
        var tempCanvas = document.createElement('canvas');
        tempCanvas.width = GamePlay.canvas.width;
        tempCanvas.height = GamePlay.canvas.height;
        var tempContext = tempCanvas.getContext('2d');
        tempContext.drawImage(this.GroundImage, 0, 0);
        var image = tempContext.getImageData(x-30,y-30,60,60);
        var ox = x+30;
        var oy = y+30;
        for (var i=0; i<(30*30*4);i+=4)
        {
            var index = i/4;
            var row = Math.round(index / 60);
            var col = index%60;
            var x1 = x+row;
            var y1 = y+col;
            if (Math.pow(x1-ox,2) + Math.pow(y1-oy,2) < (15*15))
            {
                image.data[i+3] = 0;
            }
        }
        /*DistroyedData.push(
            {
                Data: image,
                X:x-30,
                Y:y-30
            });*/
    }

    self.KeyDown = function (e)
    {
        if (e.keyCode == 32)
        {
            var player = self.Players[self.ActivePlayerID];
            self.bullet = new Bullet(player.position.X,player.position.Y,player.position.Width,player.position.Height,player.angle,player.velocity);

            if (self.ActivePlayerID == self.Players.length-1)
                self.ActivePlayerID = 0;
            else
                self.ActivePlayerID++;
        }
        if (e.keyCode == 37) {
            self.Players[self.ActivePlayerID].IncreaseAngle();
        }
        if (e.keyCode == 39) {
            self.Players[self.ActivePlayerID].DecreaseAngle();
        }

        if (e.keyCode == 38) {
            self.Players[self.ActivePlayerID].IncreaseVelocity();
        }
        if (e.keyCode == 40) {
            self.Players[self.ActivePlayerID].DecreaseVelocity();
        }
    }

    window.addEventListener("keydown", self.KeyDown, true);
    var drawInterval = setInterval(self.Draw,interval);

    self.Dispose = function()
    {
        window.removeEventListener("keydown", self.KeyDown, true);
    }
}