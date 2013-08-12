function Menu() {
    var self = this;

    self.Items = new Array();

    self.timerMenu;
    self.LeftButton;
    self.RightButton;
    self.SelectedItem = function()
    {
        for(var i=0;i<self.Items.length;i++)
            if(self.Items[i].Selected) return self.Items[i];
    };
    var background = "Images/menu.jpg";

    self.Init = function () {

        GamePlay.canvas.style.backgroundImage = "url("+background+")";
        var centerX = (GamePlay.canvas.clientWidth / 2) - 100;
        var centerY = (GamePlay.canvas.clientHeight / 2) - 100;

        window.addEventListener("keydown", self.KeyDownMenu, true);
        var level = new MenuItem(centerX, centerY, 200, 200, "Images/bg3.jpg","Images/level0_back.png","Images/level0_gnd.png");
        level.Selected = true;
        var level1 = new MenuItem(GamePlay.canvas.clientWidth / 2 + 300, centerY, 200, 200, "Images/bg4.jpg","Images/level1_back.png","Images/level1_gnd.png");

        self.Items.push(level);
        self.Items.push(level1);

        self.LeftButton = new CanvasImage(0,GamePlay.canvas.clientHeight / 2 - 32,64,64,"Images/leftarrow.png",GamePlay.canvas);
        self.RightButton = new CanvasImage(GamePlay.canvas.clientWidth - 64, GamePlay.canvas.clientHeight / 2 - 32,64,64,"Images/rightarrow.png",GamePlay.canvas);

        self.LeftButton.Click = function()
        {
            if (!self.Items[0].Selected)
                self.switchMenuRight = true;
        }

        self.RightButton.Click = function()
        {
            if (!self.Items[self.Items.length - 1].Selected)
                self.switchMenuLeft = true;
        }

        self.timerMenu = setInterval(self.DrawMenu, 50);
    }

    self.switchMenuRight = false;
    self.switchMenuLeft = false;
    self.timer = 0;
    self.DrawMenu = function () {
        for (var i = 0; i < self.Items.length; i++) {
            if (self.switchMenuLeft) {
                if (self.timer < 8) {
                    self.Items[i].X -= 50;
                }
                else {
                    for (var i = 0; i < self.Items.length; i++)
                        if (self.Items[i].Selected && i < self.Items.length - 1) {
                            self.Items[i].Selected = false;
                            self.Items[i + 1].Selected = true;
                            break;
                        }
                    self.timer = 0;
                    self.switchMenuLeft = false;
                }
            }
            if (self.switchMenuRight) {
                if (self.timer < 8) {
                    self.Items[i].X += 50;
                }
                else {
                    for (var i = 0; i < self.Items.length; i++)
                        if (self.Items[i].Selected && i > 0) {
                            self.Items[i].Selected = false;
                            self.Items[i - 1].Selected = true;
                            break;
                        }
                    self.timer = 0;
                    self.switchMenuRight = false;
                }
            }
            self.Items[i].Draw();
        }
        if (self.switchMenuLeft || self.switchMenuRight)
            self.timer++;
        self.LeftButton.DrawImage();
        self.RightButton.DrawImage();
    }

   /* function DrawAnimations(arg) {
        for (i = 0; i < arg.Levels.length; i++) {
            arg.Levels[i].DrawAnimation();
        }
    }*/

    self.KeyDownMenu = function (e) {
        if (e.keyCode == 37) {
            if (!self.Items[self.Items.length - 1].Selected)
                self.switchMenuLeft = true;
        }
        if (e.keyCode == 39) {
            if (!self.Items[0].Selected)
                self.switchMenuRight = true;
        }

        self.timer = 0;
    };

    self.Dispose = function () {
        clearInterval(self.timerMenu);
        GamePlay.context.clearRect(0, 0, GamePlay.canvas.clientWidth, GamePlay.canvas.clientHeight);
        GamePlay.canvas.removeEventListener("keydown", self.KeyDownMenu, true);
        for(var i=0;i<self.Items.length;i++)
            self.Items[i].Dispose();
        self.LeftButton.Dispose();
        self.RightButton.Dispose();
    }
}

function MenuItem(x, y, width, height, fillPattern,levelPattern,groundPattern) {
    var self = this;
    self.X = x;
    self.Y = y;
    self.Width = width;
    self.Height = height;
    self.FillPattern = fillPattern;
    self.LevelPattern = levelPattern;
    self.GroundPattern = groundPattern;
    self.Selected = false;

    self.Init = function () {
    }

    var itemClick = function()
    {
        var rectWidth = self.Width;
        var rectHeight = self.Height;
        var rectX = self.X;
        var rectY = self.Y;
        if (Mouse.Position.X > rectX && Mouse.Position.X< rectX+rectWidth && Mouse.Position.Y > rectY && Mouse.Position.Y< rectY+rectHeight && self.Selected)
        {
            GamePlay.StartSimple();
        }
    };
    GamePlay.canvas.addEventListener("click", itemClick, true);
    self.Init();
    self.DrawAnimation = function () {

    }

    self.Draw = function () {
        GamePlay.context.beginPath();

        var rectWidth = self.Width;
        var rectHeight = self.Height;
        var rectX = self.X;
        var rectY = self.Y;

        var mousein = false;

        if (Mouse.Position.X > rectX && Mouse.Position.X< rectX+rectWidth && Mouse.Position.Y > rectY && Mouse.Position.Y< rectY+rectHeight)
            mousein = true;

        var cornerRadius = 15;
        GamePlay.context.clearRect(self.X - 100, self.Y - 100, self.X + rectWidth + 270, self.Y + rectHeight)

        GamePlay.context.moveTo(rectX, rectY);
        GamePlay.context.lineTo(rectX + rectWidth - cornerRadius, rectY);
        GamePlay.context.arcTo(rectX + rectWidth, rectY, rectX + rectWidth,
        rectY + cornerRadius, cornerRadius);
        GamePlay.context.lineTo(rectX + rectWidth, rectY + rectHeight);

        GamePlay.context.arcTo(rectX + rectWidth, rectY + rectHeight + cornerRadius, rectX + rectWidth - cornerRadius,
        rectY + rectHeight + cornerRadius, cornerRadius);

        GamePlay.context.lineTo(rectX, rectY + rectHeight + cornerRadius);

        GamePlay.context.arcTo(rectX - cornerRadius, rectY + rectHeight + cornerRadius, rectX - cornerRadius,
        rectY + rectHeight, cornerRadius);

        GamePlay.context.lineTo(rectX - cornerRadius, rectY + cornerRadius);

        GamePlay.context.arcTo(rectX - cornerRadius, rectY, rectX,
        rectY, cornerRadius);

        GamePlay.context.lineWidth = 10;
        if (mousein && self.Selected)
            GamePlay.context.strokeStyle = "#666666";
        else
            GamePlay.context.strokeStyle = "black";
        GamePlay.context.stroke();
        GamePlay.context.save();
        GamePlay.context.translate(rectX - 15, rectY - 15);
        var imgPattern = new Image();
        imgPattern.src = this.FillPattern;
        var pattern = GamePlay.context.createPattern(imgPattern, "repeat");
        GamePlay.context.fillStyle = pattern;
        GamePlay.context.fill();
        GamePlay.context.restore();
    }

    self.Dispose = function()
    {
        GamePlay.canvas.removeEventListener("click", itemClick, true);
    };
}