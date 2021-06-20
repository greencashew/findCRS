import logging
import math
import multiprocessing

from pyproj import Transformer

REFERENCE_MAP_CRS = "EPSG:4326"

crs_coordinates_list = []


def convert_from_wgs84_to_crs_list(inputs_map, supported_crs_list):
    pool = multiprocessing.Pool(multiprocessing.cpu_count())

    def collect_result(crs):
        global crs_coordinates_list
        if crs is not None:
            crs_coordinates_list.append(crs)

    for target_crs in supported_crs_list:
        pool.apply_async(transform_crs, args=(inputs_map, target_crs), callback=collect_result)

    pool.close()
    pool.join()

    return crs_coordinates_list


def transform_crs(inputs_map, target_crs):
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
        return {"crs": target_crs, "converted_points": new_points}
    except Exception as e:
        logging.error("[{}]: {}".format(epsg, e))
