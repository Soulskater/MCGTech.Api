function Cloud(minx, miny, maxx, maxy, normalSize) {
    this.MinX = minx;
    this.MinY = miny;
    this.MaxX = maxx;
    this.MaxY = maxy;
    this.NormalSize = normalSize;
    this.CreateCloud = CreateCloud;
    this.DrawCloud = DrawCloud;
    this.clouds = new Array();
    function CreateCloud() {
        var imageObj = new Image();
        if (this.NormalSize)
            imageObj.src = "Images/cloud.png";
        else
            imageObj.src = "Images/cloudmini.png";
        var randomX = randomRange(this.MinX, this.MaxX);
        var randomY = randomRange(this.MinY, this.MaxY);
        dispImage = new DisplayImage(imageObj, randomX, randomY);
        return dispImage;
    }

    function DrawCloud() {
        if (this.clouds.length < 13) {
            this.clouds[this.clouds.length] = this.CreateCloud();
        }
        for (i = 0; i < this.clouds.length; i++) {
            this.clouds[i].X = this.clouds[i].X + 1;
            if (this.clouds[i].X > this.MaxX || this.clouds[i].X < this.MinX)
                this.clouds[i] = this.CreateCloud();
            ctx.drawImage(this.clouds[i].Image, this.clouds[i].X, this.clouds[i].Y);
        }
    }
}
function DisplayImage(Image, x, y) {
    this.Image = Image;
    this.X = x;
    this.Y = y;
}