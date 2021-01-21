import math

from geopy import distance
from pyproj import Transformer

TARGET_CRS = "EPSG:4326"
INPUT_CRS_LIST = [
    ["WGS 84 / Pseudo-Mercator", "EPSG:3857", "World between 85.06°S and 85.06°N.", "m"],
    ["OSGB 1936 / British National Grid", "EPSG:27700",
     "United Kingdom (UK) - offshore to boundary of UKCS within 49°46'N to 61°01'N and 7°33'W to 3°33'E; onshore Great Britain (England, Wales and Scotland). Isle of Man onshore.",
     "2m"],
    ["RGF93 / Lambert-93", "EPSG:2154", "France - onshore and offshore, mainland and Corsica.", "1m"],
    ["Belge 1972 / Belgian Lambert 72", "EPSG:31370", "Belgium - onshore.", "m"],
    ["ETRS89 / TM35FIN(E,N)", "EPSG:3067", "Finland - onshore and offshore.", "1m"],
    ["NZGD49 / New Zealand Map Grid", "EPSG:27200",
     "New Zealand - North Island, South Island, Stewart Island - onshore.", "m"],
    ["S-JTSK / Krovak East North", "EPSG:5514", "Czechia; Slovakia.", "6m"],
    ["CH1903 / LV03", "EPSG:21781", "Liechtenstein; Switzerland.", "1.5 m"]
]


def get_possible_crs(inputs_map, expected_values):
    transformed_list = []
    for inputCrs in INPUT_CRS_LIST:
        transformer = Transformer.from_crs(inputCrs[1], TARGET_CRS, always_xy=True)
        i = 0
        new_points = []
        points_distance = 0
        for pt in transformer.itransform(inputs_map):
            if math.isinf(pt[0]) or math.isinf(pt[1]):
                break

            points_distance += distance.distance(expected_values[i], pt).km
            new_points.append(pt)
            i += 1
        if points_distance == 0:
            break
        transformed_list.append([inputCrs[0], inputCrs[1], new_points, points_distance])

    transformed_list.sort(key=lambda x: x[3])
    return transformed_list
