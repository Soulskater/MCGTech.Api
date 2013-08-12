
var TO_RADIANS = Math.PI / 180;

function ImageParticle(img, posx, posy)
{

    // the position of the particle
    this.posX = posx;
    this.posY = posy;
    // the velocity
    this.velX = 0;
    this.velY = 0;

    // multiply the particle size by this every frame
    this.shrink = 1;
    this.size = 1;
    // if maxSize is a positive value, limit the size of
    // the particle (this is for growing particles).
    this.maxSize = -1;

    // multiply the velocity by this every frame to create
    // drag. A number between 0 and 1, closer to one is
    // more slippery, closer to 0 is more sticky. values
    // below 0.6 are pretty much stuck :)
    this.drag = 1;

    // add this to the yVel every frame to simulate gravity
    this.gravity = 0;

    // current transparency of the image
    this.alpha = 1;
    // subtracted from the alpha every frame to make it fade out
    this.fade = 0;

    // the amount to rotate every frame
    this.spin = 0;
    // the current rotation
    this.rotation = 0;

    // the blendmode of the image render. 'source-over' is the default
    // 'lighter' is for additive blending.
    this.compositeOperation = 'source-over';

    // the image to use for the particle.
    this.img = img;

    this.update = function()
    {

        // simulate drag
        this.velX *= this.drag;
        this.velY *= this.drag;

        // add gravity force to the y velocity
        this.velY += this.gravity;

        // and the velocity to the position
        this.posX += this.velX;
        this.posY += this.velY;

        // shrink the particle
        this.size *= this.shrink;
        // if maxSize is set and we're bigger, resize!
        if((this.maxSize>0) && (this.size>this.maxSize))
            this.size = this.maxSize;

        // and fade it out
        this.alpha -= this.fade;
        if(this.alpha<0) this.alpha = 0;

        // rotate the particle by the spin amount.
        this.rotation += this.spin;


    }

    this.render = function(c)
    {

        // if we're fully transparent, no need to render!
        if(this.alpha ==0) return;

        // save the current canvas state
        c.save();

        // move to where the particle should be
        c.translate(this.posX, this.posY);

        // scale it dependent on the size of the particle
        c.scale(this.size,this.size);

        // and rotate
        c.rotate(this.rotation * TO_RADIANS);

        // move the draw position to the center of the image
        c.translate(img.width*-0.5, img.width*-0.5);

        // set the alpha to the particle's alpha
        c.globalAlpha = this.alpha;

        // set the composition mode
        c.globalCompositeOperation = this.compositeOperation;

        // and draw it!
        c.drawImage(img,0,0);

        // and restore the canvas state
        c.restore();

    }


}

function SmokeParticle(posx, posy,imageSrc)
{
    var self = this;
    var X = posx, Y = posx,
        particles = [],
        MAX_PARTICLES = 60,
        particleImage = new Image();

    particleImage.src = imageSrc;
    self.UpdatePosition = function(x,y)
    {
        X = x;
        Y = y;
    }

    self.Draw = function ()
    {

        // make some particles
        self.makeParticle(2);

        // clear the canvas
        //GamePlay.context.clearRect(X-40, Y-200, 80, 212);

        for (var i=0; i<particles.length; i++)
        {
            var particle = particles[i];

            // render it
            particle.render(GamePlay.contextBuffer);
            // and then update. We always render first so particle
            // appears in the starting point.
            particle.update();

        }

        // Keep taking the oldest particles away until we have
        // fewer than the maximum allowed.

        while(particles.length>MAX_PARTICLES)
            particles.shift();
    }

    self.makeParticle = function (particleCount)
    {

        for(var i=0; i<particleCount;i++)
        {

            // create a new particle in the middle of the stage
            var particle = new ImageParticle(particleImage, X, Y);


            particle.velX = randomRange(-0.5,0.5);
            particle.velY = 0;
            particle.size = randomRange(0.3,0.9);
            particle.maxSize = 0.9;
            particle.alpha = randomRange(0.2,0.3);
            particle.gravity = -0.2;
            particle.drag = 0.96;
            particle.shrink = 1.1;
            particle.fade = 0.02 * 0.8;

            particle.rotation = randomRange(0,360);
            particle.spin = randomRange(-5,5);

            particle.compositeOperation = 'lighten';

            // add it to the array
            particles.push(particle);

        }

    }

    //var interval = setInterval(self.loop, 1000 / 30);
    self.Dispose = function ()
    {
        //clearInterval(interval);
    }
}

function CloudParticle()
{
    var self = this;
    var particleImage = new Image();
    particleImage.src = "Images/cloud_med.png";
    var particles = new Array();
    var particlesCount = 20;
    var timer = 0;
    self.Draw = function ()
    {
        if (particles.length < particlesCount)
        {
            CreateParticle();
        }
        //if(timer%20 == 0)
            for (var i=0;i<particles.length;i++)
            {
                particles[i].posX = parseInt(particles[i].posX) + (GamePlay.Wind.X) + parseInt(particles[i].velX);
                if (randomRange(0,30).toFixed(0)%3==0)
                    particles[i].posY = parseInt(particles[i].posY) + (GamePlay.Wind.Y);
                if (particles[i].posX > GamePlay.canvas.width)
                {
                    particles[i].posX = randomRange(-800,-50).toFixed(0);
                    particles[i].posY = randomRange(0,150).toFixed(0);
                }
            }
        GamePlay.contextBuffer.save();
        GamePlay.contextBuffer.shadowOffsetX = 3;
        GamePlay.contextBuffer.shadowOffsetY = 3;
        GamePlay.contextBuffer.shadowBlur = 5;
        GamePlay.contextBuffer.shadowColor = "rgba(98, 103, 99, 0.4)";
        for(var i=0;i<particles.length;i++)
            GamePlay.contextBuffer.drawImage(particles[i].img,particles[i].posX,particles[i].posY);
        GamePlay.contextBuffer.restore();
        timer+=30;
    }

    var CreateParticle = function()
    {
        var x = randomRange(-800,-20).toFixed(0);
        var y = randomRange(0,150).toFixed(0);
        var velX = randomRange(0,2).toFixed(0);
        var particle = new ImageParticle(particleImage,x,y);
        particle.velX = velX;
        particles.push(particle);
    }
}

function ExplosionParticle(img, posx, posy,angle)
{

    // the position of the particle
    this.posX = posx;
    this.posY = posy;
    // the velocity
    this.velX = 0;
    this.velY = 0;

    // multiply the particle size by this every frame
    this.shrink = 1;
    this.size = 1;
    // if maxSize is a positive value, limit the size of
    // the particle (this is for growing particles).
    this.maxSize = -1;

    // multiply the velocity by this every frame to create
    // drag. A number between 0 and 1, closer to one is
    // more slippery, closer to 0 is more sticky. values
    // below 0.6 are pretty much stuck :)
    this.drag = 1;

    // add this to the yVel every frame to simulate gravity
    this.gravity = 0;

    // current transparency of the image
    this.alpha = 1;
    // subtracted from the alpha every frame to make it fade out
    this.fade = 0;

    // the amount to rotate every frame
    this.spin = 0;
    // the current rotation
    this.rotation = 0;

    // the blendmode of the image render. 'source-over' is the default
    // 'lighter' is for additive blending.
    this.compositeOperation = 'source-over';

    // the image to use for the particle.
    this.img = img;
    this.angle = angle;
    this.update = function()
    {

        // simulate drag
        this.velX *= this.drag;
        this.velY *= this.drag;

        // add gravity force to the y velocity
        this.velY += this.gravity;

        // and the velocity to the position
        this.posX += (7 * Math.cos(this.angle*TO_RADIANS));// + this.velX;
        this.posY += (7 * Math.sin(this.angle*TO_RADIANS));// + this.velY;
        // shrink the particle
        this.size *= this.shrink;

        // if maxSize is set and we're bigger, resize!
        if((this.maxSize>0) && (this.size>this.maxSize))
            this.size = this.maxSize;

        // and fade it out
        this.alpha -= this.fade;
        if(this.alpha<0) this.alpha = 0;

        // rotate the particle by the spin amount.
        this.rotation += this.spin;


    }

    this.render = function(c)
    {

        // if we're fully transparent, no need to render!
        if(this.alpha ==0) return;

        // save the current canvas state
        c.save();

        // move to where the particle should be
        c.translate(this.posX, this.posY);

        // scale it dependent on the size of the particle
        c.scale(this.size,this.size);

        // and rotate
        c.rotate(this.rotation * TO_RADIANS);

        // move the draw position to the center of the image
        c.translate(img.width*-0.5, img.width*-0.5);

        // set the alpha to the particle's alpha
        c.globalAlpha = this.alpha;

        // set the composition mode
        c.globalCompositeOperation = this.compositeOperation;

        // and draw it!
        c.drawImage(img,0,0);

        // and restore the canvas state
        c.restore();

    }


}

function ExplosionSystem(posx, posy,imageSrc)
{
    var self = this;
    var X = posx, Y = posy,
        particles = [],
        MAX_PARTICLES = 30,
        particleImage = new Image();

    particleImage.src = imageSrc;
    self.ExplosionTime = 0;
    self.UpdatePosition = function(x,y)
    {
        X = x;
        Y = y;
    }

    self.Draw = function ()
    {

        // make some particles
        self.makeParticle(4);

        // clear the canvas
        //GamePlay.context.clearRect(X-40, Y-200, 80, 212);

        for (var i=0; i<particles.length; i++)
        {
            var particle = particles[i];

            // render it
            particle.render(GamePlay.contextBuffer);
            // and then update. We always render first so particle
            // appears in the starting point.
            particle.update();

        }

        // Keep taking the oldest particles away until we have
        // fewer than the maximum allowed.

        while(particles.length>MAX_PARTICLES)
            particles.shift();
    }

    self.makeParticle = function (particleCount)
    {

        for(var i=0; i<particleCount;i++)
        {

            // create a new particle in the middle of the stage
            var angle;
            if (i%2 == 0)
                angle = -20;
            else
                angle = -160
            var particle = new ExplosionParticle(particleImage, X, Y,angle);


            particle.velX = randomRange(-0.2,0.2);
            particle.velY = 0;
            particle.size = randomRange(0.6,1.1);
            particle.maxSize = 1.5;
            particle.alpha = randomRange(0.2,0.3);
            particle.gravity = -0.02;
            particle.drag = 0.03;
            particle.shrink = 2;
            particle.fade = 0.02 * 0.8;

            particle.rotation = randomRange(0,360);
            particle.spin = randomRange(-5,5);

            particle.compositeOperation = 'lighten';

            // add it to the array
            particles.push(particle);

        }

    }

    //var interval = setInterval(self.loop, 1000 / 30);
    self.Dispose = function ()
    {
        //clearInterval(interval);
    }
}
