/**
 * @param {array} markers common struct handling input and interactive map
 *
 * Output:
 * Array of points
 * [["12","43"],[53.45517706219938,-4.425208990156079],[51.97134580885172,-5.199443277362889]]
 */
export const getInteractiveMapAsArrayOfCoordinates = (markers) => {
    return markers.map(el => el.interactiveMap);
};


/**
 * @param {array} points Array of points
 *
 * Output:
 * [minX, minY, maxX, maxY]
 */
export const getCoordinatesBounds = (points) => {

    let maxX = points[0][0];
    let minX = points[0][0];
    let maxY = points[0][1];
    let minY = points[0][1];

    let i;
    for (i = 1; i < points.length; i++) {
        const x = points[i][0];
        const y = points[i][1];

        if (x < minX)
            minX = x;

        if (x > maxX)
            maxX = x;

        if (y < minY)
            minY = y;

        if (y > maxY)
            maxY = y;
    }

    return [minX, minY, maxX, maxY]
};

