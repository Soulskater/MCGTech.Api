///<reference path="Scripts/Utilities.js"/>

function Button(text, x, y, width, height, fillcolor, strokecolor) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fillcolor = fillcolor;
    this.strokecolor = strokecolor;
    this.DrawButton = DrawButton;

    function DrawButton() {
        ctx.beginPath();

        ctx.fillStyle = fillcolor;
        ctx.strokeStyle = strokecolor;

        var rectWidth = width;
        var rectHeight = height;
        var rectX = x;
        var rectY = y;

        var cornerRadius = 10;
        ctx.moveTo(rectX, rectY);
        ctx.lineTo(rectX + rectWidth - cornerRadius, rectY);
        ctx.arcTo(rectX + rectWidth, rectY, rectX + rectWidth,
        rectY + cornerRadius, cornerRadius);
        ctx.lineTo(rectX + rectWidth, rectY + rectHeight);

        ctx.arcTo(rectX + rectWidth, rectY + rectHeight + cornerRadius, rectX + rectWidth - cornerRadius,
        rectY + rectHeight + cornerRadius, cornerRadius);

        ctx.lineTo(rectX, rectY + rectHeight + cornerRadius);

        ctx.arcTo(rectX - cornerRadius, rectY + rectHeight + cornerRadius, rectX - cornerRadius,
        rectY + rectHeight, cornerRadius);

        ctx.lineTo(rectX - cornerRadius, rectY + cornerRadius);

        ctx.arcTo(rectX - cornerRadius, rectY, rectX,
        rectY, cornerRadius);

        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.fill();

        ctx.fillStyle = "#544C4A";
        ctx.font = "bold 10pt Verdana";
        fontwidth = measureText(text, 10, "Verdana");
        ctx.fillText(text, (x + (fontwidth.width / 2)) - cornerRadius - cornerRadius / 2, y + ((height + 5) / 2) + (fontwidth.height / 2));
    }
}