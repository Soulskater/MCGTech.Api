function isCollision(first, other) {
    fx = first.Position.X();
    fy = first.Position.Y();
    fwidth = fx + first.Position.Width;
    fheight = fy + first.Position.Height;

    ox = other.Position.X();
    oy = other.Position.Y();
    owidth = ox + other.Position.Width;
    oheight = oy + other.Position.Height;

    if (fx >= ox && fx <= owidth && fy >= oy && fy <= oheight)
        return true;
    if (fwidth >= ox && fwidth <= owidth && fheight >= oy && fheight <= oheight)
        return true;
    if (fx <= ox && fwidth >= owidth && fy >= oy && fy <= oheight)
        return true;
    return false;
}