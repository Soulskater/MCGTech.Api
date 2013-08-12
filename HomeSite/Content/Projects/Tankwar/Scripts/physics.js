﻿function isPixelCollision(first, x, y, other, x2, y2, isCentred) {
    // we need to avoid using floats, as were doing array lookups
    x = Math.round(x);
    y = Math.round(y);
    x2 = Math.round(x2);
    y2 = Math.round(y2);

    var w = first.width,
        h = first.height,
        w2 = other.width,
        h2 = other.height;

    // deal with the image being centred
    if (isCentred) {
        // fast rounding, but positive only
        x -= (w / 2 + 0.5) << 0
        y -= (h / 2 + 0.5) << 0
        x2 -= (w2 / 2 + 0.5) << 0
        y2 -= (h2 / 2 + 0.5) << 0
    }

    // find the top left and bottom right corners of overlapping area
    var xMin = Math.max(x, x2),
        yMin = Math.max(y, y2),
        xMax = Math.min(x + w, x2 + w2),
        yMax = Math.min(y + h, y2 + h2);

    // Sanity collision check, we ensure that the top-left corner is both
    // above and to the left of the bottom-right corner.
    if (xMin >= xMax || yMin >= yMax) {
        return false;
    }

    var xDiff = xMax - xMin,
        yDiff = yMax - yMin;

    // get the pixels out from the images
    var pixels = first.data,
        pixels2 = other.data;

    // if the area is really small,
    // then just perform a normal image collision check
    if (xDiff < 4 && yDiff < 4) {
        for (var pixelX = xMin; pixelX < xMax; pixelX++) {
            for (var pixelY = yMin; pixelY < yMax; pixelY++) {
                if (
                        (pixels[((pixelX - x) + (pixelY - y) * w) * 4 + 3] !== 0) &&
                        (pixels2[((pixelX - x2) + (pixelY - y2) * w2) * 4 + 3] !== 0)
                ) {
                    return true;
                }
            }
        }
    } else {
        /* What is this doing?
        * It is iterating over the overlapping area,
        * across the x then y the,
        * checking if the pixels are on top of this.
        *
        * What is special is that it increments by incX or incY,
        * allowing it to quickly jump across the image in large increments
        * rather then slowly going pixel by pixel.
        *
        * This makes it more likely to find a colliding pixel early.
        */

        // Work out the increments,
        // it's a third, but ensure we don't get a tiny
        // slither of an area for the last iteration (using fast ceil).
        var incX = xDiff / 3.0,
            incY = yDiff / 3.0;
        incX = (~ ~incX === incX) ? incX : (incX + 1 | 0);
        incY = (~ ~incY === incY) ? incY : (incY + 1 | 0);

        for (var offsetY = 0; offsetY < incY; offsetY++) {
            for (var offsetX = 0; offsetX < incX; offsetX++) {
                for (var pixelY = yMin + offsetY; pixelY < yMax; pixelY += incY) {
                    for (var pixelX = xMin + offsetX; pixelX < xMax; pixelX += incX) {
                        if (
                                (pixels[((pixelX - x) + (pixelY - y) * w) * 4 + 3] !== 0) &&
                                (pixels2[((pixelX - x2) + (pixelY - y2) * w2) * 4 + 3] !== 0)
                        ) {
                            return true;
                        }
                    }
                }
            }
        }
    }

    return false;
}