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
 * [minLat, minLng, maxLat, maxLng]
 */
export const getCoordinatesBounds = (points) => {

    let maxLat = points[0][0];
    let minLat = points[0][0];
    let maxLng = points[0][1];
    let minLng = points[0][1];

    let i;
    for (i = 1; i < points.length; i++) {
        const x = points[i][0];
        const y = points[i][1];

        if (x < minLat)
            minLat = x;

        if (x > maxLat)
            maxLat = x;

        if (y < minLng)
            minLng = y;

        if (y > maxLng)
            maxLng = y;
    }

    return [minLat, minLng, maxLat, maxLng]
};

