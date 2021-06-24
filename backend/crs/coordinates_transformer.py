import logging
import math

from pyproj import Transformer

REFERENCE_MAP_CRS = "EPSG:3857"


def convert_from_wgs84_to_crs_list(inputs_map, supported_crs_list):
    crs_coordinates_list = []

    for target_crs in supported_crs_list:
        logging.debug("CRS: {}".format(target_crs))
        epsg = target_crs['epsg']
        try:
            transformer = Transformer.from_crs(crs_from=REFERENCE_MAP_CRS, crs_to=epsg, always_xy=True)
            i = 0
            new_points = []
            for point in transformer.itransform(inputs_map, switch=True):
                if math.isinf(point[0]) or math.isinf(point[1]):
                    break

                new_points.append(point[::-1])
                i += 1
            crs_coordinates_list.append({"crs": target_crs, "converted_points": new_points})
        except Exception as e:
            logging.error("[{}]: {}".format(epsg, e))
            continue
    return crs_coordinates_list
