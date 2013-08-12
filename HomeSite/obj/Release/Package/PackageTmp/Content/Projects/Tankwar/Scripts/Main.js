var GamePlay = new Game();
function Game ()
{
    this.Players = new Array();
    this.canvas;
    this.canvasBuffer = document.createElement("canvas");
    this.context;
    this.contextBuffer;
    this.GameTime = 0;
    this.ActualLevel = null;
    //Pixel per meter
    this.DistanceConst = 10;
    this.FlushBuffer = function()
    {
        this.context.drawImage(this.canvasBuffer,0,0);
        this.contextBuffer.clearRect(0,0,this.canvasBuffer.width,this.canvasBuffer.height);
    }
    this.menu;

    this.Wind = new WindData();
    this.Gravity = 9.80665;

    this.Init = function () {
        this.canvas = document.getElementById("canvasMain");

        this.canvas.addEventListener("mousemove", mouse_move, false);
        this.context = this.canvas.getContext("2d");
        this.canvasBuffer.width = this.canvas.width;
        this.canvasBuffer.height = this.canvas.height;
        this.contextBuffer = this.canvasBuffer.getContext("2d");
        this.menu = new Menu();
        this.menu.Init();
    };

    this.CreatePlayers = function () {
        var tank = CreateTank(new Position(170, 250), "#FF952B");
        tank.Init();
        this.Players.push(tank);
    }

    this.LoadGame = function (background,ground,players) {
        this.Wind.Init();
        var level = new LevelFirst(background,ground,players);
        this.ActualLevel = level;
    }

    this.StartSimple = function()
    {
        this.ShowPopup();
    };

    this.ShowPopup = function()
    {
        centerPopup();
        loadPopup();
    }

    function mouse_move(e) {

        if (e.pageX || e.pageY) {
            Mouse.Position.X = e.pageX;
            Mouse.Position.Y = e.pageY;
        }
        else {
            Mouse.Position.X = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            Mouse.Position.Y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        Mouse.Position.X -= GamePlay.canvas.offsetLeft;
        Mouse.Position.Y -= GamePlay.canvas.offsetTop;
    }
}

function WindData()
{
    var self = this;
    self.X = 0;
    self.Y = 0;

    var interval = 1000;
    var elapsed = 0;
    var intervalID;
    self.Init = function ()
    {
        intervalID = setInterval(generateWind,interval);
    }

    var generateWind = function()
    {
        if ((elapsed / 1000)%3 == 0)
        {
            self.X = randomRange(1,2);
            self.Y = Math.round(randomRange(-1,1));
        }
        elapsed += interval;
    }

    self.Dispose = function()
    {
        clearInterval(intervalID);
    };
}

function btStart_Click()
{
    var players = new Array();
    var tbNumber = document.getElementById("tbNumber");
    var containerDiv = document.getElementById("containerDiv");
    if (tbNumber.value <0) return;
    for(var i=0;i<tbNumber.value;i++)
    {
        var tbName = document.getElementById("tbName"+i);
        var tbColor = document.getElementById("tbColor"+i);
        var item =
        {
            Name:tbName.value,
            Color:tbColor.value
        };
        players.push(item);
    }
    disablePopup();
    GamePlay.menu.Dispose();
    GamePlay.LoadGame(GamePlay.menu.SelectedItem().LevelPattern,GamePlay.menu.SelectedItem().GroundPattern,players);
}

function btDebugStart_Click()
{
    var players = new Array();
    var item =
    {
        Name:"DebugUser1",
        Color:"#752EFF"
    };
    var item2 =
    {
        Name:"DebugUser2",
        Color:"#666666"
    };
    players.push(item);
    players.push(item2);

    GamePlay.menu.Dispose();
    GamePlay.LoadGame(GamePlay.menu.SelectedItem().LevelPattern,GamePlay.menu.SelectedItem().GroundPattern,players);
}

function tbNumber_Changed()
{
    var tbNumber = document.getElementById("tbNumber");
    var containerDiv = document.getElementById("containerDiv");
    containerDiv.innerHTML = "";
    var template = document.getElementById("template");
    var playerName = document.getElementById("playerName");
    var playerColor = document.getElementById("playerColor");
    var tbName = document.getElementById("tbName");
    var tbColor = document.getElementById("tbColor");
    if (tbNumber.value >0) document.getElementById('btStartGame').style.display = "";
    for(var i=0;i<tbNumber.value;i++)
    {
        playerName.innerText = "Player" + (i+1) + " name:";
        playerColor.innerText = "Player" + (i+1) + " color:";
        tbName.id = "tbName" + i;
        tbColor.id = "tbColor" + i;
        var newDiv = document.createElement("div");
        newDiv.id = "Element"+i;
        newDiv.innerHTML = template.innerHTML;
        containerDiv.appendChild(newDiv);
        tbName.id = "tbName";
        tbColor.id = "tbColor";
    }

}