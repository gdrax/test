function setColors(stroke, shadow, fill) {
  if (stroke != null)
    ctx.strokeStyle = stroke;
  else
    ctx.strokeStyle = backgroundColor;

  if (shadow != null) {
    ctx.shadowColor = shadow;
    ctx.shadowBlur = 10;
  }
  else
    ctx.shadowColor = backgroundColor;

  if (fill != null)
    ctx.fillStyle = fill;
  else
    ctx.fillStyle = backgroundColor;
}

/*
Imposta le frecce da mostrare
*/
function updateArrows() {
  switch(levelNumber) {
    //primo livello, solo freccia a dx
    case firstLevel:
      levelRect.showLeftArrow = false;
      levelRect.showRightArrow = true;
      break;
    //ultimo livello, solo freccia a sx
    case lastLevel:
      levelRect.showLeftArrow = true;
      levelRect.showRightArrow = false;
      break;
    default:
      levelRect.showLeftArrow = true;
      levelRect.showRightArrow = true;
  }
}

/*
Controlla se il mouse si trova nel rettangolo
@return: true se il mouse si trova all'interno, false altrimenti
*/
function mouseInRectangle(rect) {
  if (mousePoint.x >= rect.rpoint.x && mousePoint.x <= rect.rpoint.x + rect.width && mousePoint.y >= rect.rpoint.y && mousePoint.y <= rect.rpoint.y + rect.height)
    return true;
  else
    return false;
}

/*
TODO: why?
*/
function sign(point1, point2, point3) {
  return (point1.x - point3.x)*(point2.y - point3.y)-(point2.x - point3.x)*(point1.y - point3.y);
}

/*
Controlla se il mouse si trova all'interno del triangolo
@return: true se il mouse si trova all'interno, false altrimenti
*/
function mouseInTriangle(point1, point2, point3) {
  var d1 = sign(mousePoint, point1, point2);
  var d2 = sign(mousePoint, point2, point3);
  var d3 = sign(mousePoint, point3, point1);

  var hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0);
  var hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0);

  return !(hasNeg && hasPos);
}

/*
Controlla se il mouse si trova all'interno del triangolo
@return: true se il mouse si trova all'interno, false altrimenti
*/
function mouseInCircle(center, radius) {
  var distance = Math.sqrt((mousePoint.x - center.x)*(mousePoint.x - center.x)+(mousePoint.y - center.y)*(mousePoint.y - center.y));
  if (distance <= radius)
    return true;
  else
    return false;
}

function bouncePolygons() {
  for (var i=0; i<polygons.length; i++) {
    for (var j=0; j<polygons[i].vertices.length; j++) {
      var x = polygons[i].vertices[j].x;
      var y = polygons[i].vertices[j].y;
      if (x + polygons[i].vx >= canvas.width || x + polygons[i].vx <= 0) {
        polygons[i].vx = -polygons[i].vx;
        break;
      }
      if (y + polygons[i].vy >= canvas.height || y + polygons[i].vy <= 0) {
        polygons[i].vy = -polygons[i].vy;
        break;
      }
    }
  }
}

function applyBonus(ball, poly) {
  ball.vx *= poly.speedBonus;
  ball.vy *= poly.speedBonus;
}

function drawLine(p1, p2, c) {
  setColors(c.makeColor(1), c.makeColor(1), null);
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}
