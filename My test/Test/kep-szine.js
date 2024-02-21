// Előfeltételezve, hogy van egy <img> elem az oldalon, aminek van src attribútuma a kép fájlra mutatva
var img = document.getElementById('myImage'); // Az img HTML elem referenciája

function szin() {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    var colorCounts = {};

    for (var i = 0; i < data.length; i += 4) {
        var rgba = [data[i], data[i + 1], data[i + 2], data[i + 3]]; // R, G, B, Alpha
        var hex = "#" + ("000000" + rgbToHex(rgba[0], rgba[1], rgba[2])).slice(-6); // RGB szín hex formátumban
        
        if (!colorCounts[hex]) {
            colorCounts[hex] = 0;
        }
        colorCounts[hex]++;
    }

    // A leggyakoribb szín megtalálása
    var mostCommonColor = Object.keys(colorCounts).reduce(function(a, b){ return colorCounts[a] > colorCounts[b] ? a : b });

    console.log("A leggyakoribb szín a képen:", mostCommonColor);
    document.body.style.backgroundColor = mostCommonColor;
};

function rgbToHex(r, g, b) {
    return ((r << 16) | (g << 8) | b).toString(16);
}
