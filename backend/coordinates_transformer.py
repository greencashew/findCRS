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
    ["EPSG topocentric example B", "EPSG:5820", "Description of the extent of the CRS.", "m"],
    ["EPSG topocentric example A", "EPSG:5819", "Description of the extent of the CRS.", "m"],
    ["EPSG vertical perspective example", "EPSG:5821", "Description of the extent of the CRS.", "m"],
    ["ED79", "EPSG:4668", "Peru - east of 73°W, onshore.", "42m"],
    ["Korea 2000 / East Belt", "EPSG:5183", "Republic of Korea (South Korea) - onshore east of 128°E.", "1m"],
    ["PSAD56 / Peru east zone", "EPSG:24893", "Nigeria east of 10°30'E.", "15m"],
    ["ED50 / SPBA LCC", "EPSG:5643", "Europe - South Permian basin.", "10m"],
    ["Minna / Nigeria East Belt", "EPSG:26393", "Europe - South Permian basin.", "10m"],
    ["ETRS89 / Poland CS92", "EPSG:2180", "Poland - onshore and offshore.", "1m"],
    ["ETRS89 / Poland CS2000 zone 8", "EPSG:2179", "Poland - east of 22°30'E.", "1m"],
    ["ETRS89 / Poland CS2000 zone 5", "EPSG:2176", "Poland - onshore and offshore west of 16°30'E.", "1m"],
    ["Pulkovo 1942(58) / Poland zone I", "EPSG:3120", "Poland - southeast - south of 52°20'N and east of 18°E.", "1m"],
    ["ETRS89 / Poland CS2000 zone 7", "EPSG:2178", "Poland - onshore and offshore between 19°30'E and 22°30'E.", "1m"],
    ["CH1903 / LV03", "EPSG:21781", "Liechtenstein; Switzerland.", "1.5 m"],
    ["Cape / Lo33", "EPSG:22293", "South Africa - east of 32°E.", "9 m"],
    ["Hartebeesthoek94 / Lo33", "EPSG:2055", "South Africa - east of 32°E.", "1 m"],
    ["Hartebeesthoek94 / ZAF BSU Albers 25E", "EPSG:9221", "South Africa - mainland - onshore and offshore.", "1 m"],
    ["Cape / Lo17", "EPSG:22277", "South Africa - onshore west of 18°E.	", "9 m"],
    ["Hartebeesthoek94 / Lo17", "EPSG:2047", "South Africa - onshore west of 18°E.", "1 m"],
    ["SAD69", "EPSG:4618",
     "Brazil - onshore and offshore. In rest of South America - onshore north of approximately 45°S and Tierra del Fuego.	",
     "5 m"],
    ["SIRGAS 2000 / UTM zone 18N", "EPSG:31972",
     "Latin America - Central America and South America - between 78°W and 72°W, northern hemisphere, onshore and offshore.",
     "1 m"],
    ["ED50", "EPSG:4230",
     "Europe - west: Andorra; Cyprus; Denmark - onshore and offshore; Faroe Islands - onshore; France - offshore; Germany - offshore North Sea; Gibraltar; Greece - offshore; Israel - offshore; Italy including San Marino and Vatican City State; Ireland offshore; Malta; Netherlands - offshore; North Sea; Norway including Svalbard - onshore and offshore; Portugal - mainland - offshore; Spain - onshore; Turkey - onshore and offshore; United Kingdom UKCS offshore east of 6°W including Channel Islands (Guernsey and Jersey). Egypt - Western Desert; Iraq - onshore; Jordan.",
     "10 m"],
    ["Układ współrzędnych 1992", "EPSG:2180", "Polska", "1 m"]
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

            try:
                points_distance += distance.distance(expected_values[i], pt).km
            except:
                break

            new_points.append(pt)
            i += 1
        if points_distance == 0:
            break
        transformed_list.append([inputCrs[0], inputCrs[1], new_points, points_distance])

    transformed_list.sort(key=lambda x: x[3])
    return transformed_list
