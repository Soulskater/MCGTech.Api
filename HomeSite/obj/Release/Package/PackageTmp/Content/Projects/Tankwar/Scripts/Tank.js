function Tank(startpos,name , color) {
    var self = this;
    self.position = startpos;
    var spriteLoaded = false;
    var mainimg = new Image();
    mainimg.onload = function()
    {
        self.position.Y -= mainimg.height;
        self.position.Width = mainimg.width;
        self.position.Height = mainimg.height;
        mainimg.onload = null;
        spriteLoaded = true;
    }
    mainimg.src = "Images/tankMainMod.png";
    self.Name = name;

    self.life = 100;
    self.score = 0;
    self.colorhex = color;
    self.angle = 30;
    self.velocity = 5;
    var pipe = new Image();
    pipe.src = "Images/tanktube.png";

    self.Init = function () {

    }

    self.IncreaseAngle = function()
    {
        var prev = self.angle;
        if (self.angle < 180)
            self.angle += 5;
        var modified = prev<90 && self.angle>90;
        spriteLoaded = !modified;
        if(self.angle > 90)
            mainimg.src = "Images/tankModRev.png";
        else
            mainimg.src = "Images/tankMainMod.png";
    }

    self.DecreaseAngle = function()
    {
        var prev = self.angle;
        if (self.angle > 0)
            self.angle -= 5;
        var modified = prev>90 && self.angle<90;
        spriteLoaded = !modified;
        if(self.angle > 90)
            mainimg.src = "Images/tankModRev.png";
        else
            mainimg.src = "Images/tankMainMod.png";
    }

    self.IncreaseVelocity = function()
    {
        if (self.velocity < 10)
            self.velocity += 0.5;
    }

    self.DecreaseVelocity = function()
    {
        if (self.velocity > 0)
            self.velocity -= 0.5;
    }

    self.Draw = function () {
        GamePlay.contextBuffer.beginPath();
        GamePlay.contextBuffer.fillStyle = this.colorhex;
        GamePlay.contextBuffer.save();
        GamePlay.contextBuffer.translate((self.position.X + mainimg.width/2), (self.position.Y + mainimg.height/2));
        GamePlay.contextBuffer.rotate(TO_RADIANS * (self.angle*-1));
        GamePlay.contextBuffer.drawImage(pipe, 0 - mainimg.width/2, 0 - mainimg.height/2);
        GamePlay.contextBuffer.restore();

        GamePlay.contextBuffer.drawImage(mainimg, self.position.X, self.position.Y);
        if (!spriteLoaded) return;
        var imgData=GamePlay.contextBuffer.getImageData(self.position.X, self.position.Y,mainimg.width,mainimg.height);
        for (var i=0; i<imgData.width*imgData.height*4;i+=4)
        {
            // Do nothing with the colors red and green, set blue=255, and alpha=255:
            var r = imgData.data[i];
            var g = imgData.data[i+1];
            var b = imgData.data[i+2];
            if (r == 255 && g == 255 && b == 255)
            {
                var rgb = hexToRGB(self.colorhex);
                imgData.data[i] = rgb.R;
                imgData.data[i+1] = rgb.G;
                imgData.data[i+2] = rgb.B;
            }
        }
        GamePlay.contextBuffer.putImageData(imgData,self.position.X, self.position.Y);

    }
    self.Dispose = function()
    {

    }
}