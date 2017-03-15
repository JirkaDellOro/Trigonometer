/*
  Trigonometer
  © Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl, HFU, 2011
  Interaktive Darstellung der trigonometrischen Funktionen
  Sinus und Cosinus in Abhängigkeit vom Winkel im Bogenmaß

  TypeScript-Version 2017 
 */

// Radius des Kreises
let oiansdv: string ="onsav";
let radius: number = 200;
let canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
let crc2: CanvasRenderingContext2D = canvas.getContext("2d");

// Koordinatensystem zum Leinwandmittelpunkt verschieben
let width: number = canvas.width;
let height: number = canvas.height;
crc2.translate(width / 2, height / 2);
crc2.font = "16px Arial";
draw(1, 0);

canvas.addEventListener("mousemove", handleMouseMove);

function handleMouseMove(_event: MouseEvent): void {
    draw(_event.offsetX - width / 2, _event.offsetY - height / 2);
}
function draw(_x: number, _y: number): void {
    // Hintergrund löschen und Farben setzen
    crc2.fillStyle = "#ffffff";
    crc2.strokeStyle = "#000000";
    crc2.fillRect(-width / 2, -height / 2, width, height);

    let ml: number = Math.sqrt(_x * _x + _y * _y);
    // Position des Punktes auf Perimeter berechnen
    let x: number = _x * radius / ml;
    let y: number = _y * radius / ml;
    // Winkel berechnen
    let angle: number = Math.acos(x / radius);
    if (y > 0)
        angle = 2 * Math.PI - angle;
    // Kreis und Kreisabschnitt zeichnen
    crc2.beginPath();
    crc2.arc(0, 0, radius, 0, Math.PI * 2);
    crc2.stroke();

    crc2.beginPath();
    crc2.fillStyle = "#ccffcc";
    crc2.moveTo(0, 0);
    crc2.arc(0, 0, radius, -angle, 0);
    crc2.fill();

    // Koordinatensystem und Hypothenuse zeichnen
    crc2.beginPath();
    crc2.moveTo(-width / 2, 0);
    crc2.lineTo(width / 2, 0);
    crc2.moveTo(0, -height / 2);
    crc2.lineTo(0, height / 2);
    crc2.moveTo(0, 0);
    crc2.lineTo(x, y);
    crc2.stroke();

    // Perimeterpunkt zeichnen
    crc2.beginPath();
    crc2.fillStyle = "#000000";
    crc2.arc(x, y, 10, 0, Math.PI * 2);
    crc2.stroke();

    // Texte und Katheten zeichnen
    crc2.beginPath();
    crc2.fillText("Angle = " + angle.toFixed(3), -180, 20);

    crc2.beginPath();
    crc2.fillStyle = "#ff0000";
    crc2.strokeStyle = "#ff0000";
    crc2.moveTo(x, 0);
    crc2.lineTo(x, y);
    crc2.fillText("Sin = " + (y / -radius).toFixed(3), x + 2, -2);
    crc2.stroke();

    crc2.beginPath();
    crc2.fillStyle = "#0000ff";
    crc2.strokeStyle = "#0000ff";
    crc2.moveTo(0, y);
    crc2.lineTo(x, y);
    crc2.fillText("Cos = " + (x / radius).toFixed(3), 2, y - 2);
    crc2.stroke();

    crc2.fillStyle = "#000000";
    crc2.strokeStyle = "#000000";
    crc2.fillText("© Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl, HFU", -width / 2 + 10, height / 2 - 10);
}