var drawInterval = 30;
var fps = 0, now, lastUpdate = (new Date)*1 - 1;

// The higher this value, the less the FPS will be affected by quick changes
// Setting this to 1 will show you the FPS of the last sampled frame only
var fpsFilter = 50;

function DrawFPS()
{
    var thisFrameFPS = 1000 / ((now=new Date) - lastUpdate);
    fps += (thisFrameFPS - fps) / fpsFilter;
    lastUpdate = now;

    var x = GamePlay.canvas.clientWidth-100;
    var y = 20;
    //GamePlay.context.clearRect(x, y, 100, 70);
    GamePlay.contextBuffer.fillStyle = "#A1A892";
    GamePlay.contextBuffer.font = "bold 10pt Verdana";
    GamePlay.contextBuffer.fillText("FPS: " + fps.toFixed(1) , x+10, y+10);
}

function measureText(pText, pFontSize, pStyle) {
    var lDiv = document.createElement('lDiv');

    document.body.appendChild(lDiv);

    if (pStyle != null) {
        lDiv.style = pStyle;
    }
    lDiv.style.fontSize = "" + pFontSize + "px";
    lDiv.style.position = "absolute";
    lDiv.style.left = -1000;
    lDiv.style.top = -1000;

    lDiv.innerHTML = pText;

    var lResult = {
        width: lDiv.clientWidth,
        height: lDiv.clientHeight
    };

    document.body.removeChild(lDiv);
    lDiv = null;

    return lResult;
}

function hexToRGB(hex)
{
    var r = hexToR(hex);
    var g = hexToG(hex);
    var b = hexToB(hex);
    var rgb =
    {
        R:r,
        G:g,
        B:b
    };
    return rgb;
}

function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

function randomRange(min, max)
{
    return ((Math.random()*(max-min)) + min);
}

function Position(x,y)
{
    this.X = x;
    this.Y = y;
    this.Width = null;
    this.Height = null;
}
function Vector(x,y,measure)
{
    this.Measure = measure;
    this.X = x;
    this.Y = y;
}

function Size(width,height)
{
    this.Width = width;
    this.Height = height;
}

var Mouse = new MouseData();
function MouseData()
{
    this.Position = new Position(0,0);
}

function CanvasImage(x,y,width,height,src,canvas)
{
    var self = this;
    self.Position = new Position(x,y);
    self.Position.Width = width;
    self.Position.Height = height;
    self.Image = new Image();
    self.Canvas = canvas;
    self.Context = canvas.getContext("2d");
    if (typeof(src) == 'undefined')
        Console.log("Error!You must define the src parameter of a CanvasImage");
    self.Image.src = src;
    self.Context.drawImage(self.Image,x,y);
    self.Click = null;

    self.DrawImage = function()
    {
        self.Context.drawImage(self.Image,x,y);
    }

    var imageClick = function ()
    {
        var image = self.Context.getImageData(self.Position.X, self.Position.Y,self.Position.Width,self.Position.Height);
        var image2 = self.Context.getImageData(Mouse.Position.X,Mouse.Position.Y,2,2);
        var collision = isPixelCollision(image,self.Position.X, self.Position.Y,image2,Mouse.Position.X,Mouse.Position.Y,false);
        if (self.Click != null && collision)
            self.Click();
    }
    self.Canvas.addEventListener("click", imageClick, false);

    self.Dispose = function()
    {
        GamePlay.canvas.removeEventListener("click", imageClick, true);
    };
}