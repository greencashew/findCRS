import logging
import math
import multiprocessing

from pyproj import Transformer, CRS

REFERENCE_MAP_CRS = "EPSG:4326"


def async_convert_from_wgs84_to_crs_list(inputs_map, supported_crs_list):
    pool = multiprocessing.Pool(multiprocessing.cpu_count())
    crs_coordinates_list = pool.starmap_async(transform_crs,
                                              [(inputs_map, target_crs) for target_crs in supported_crs_list]).get()
    pool.close()

    results = [x for x in crs_coordinates_list if x is not None]
    return results


def transform_crs(inputs_map, target_crs):
    logging.debug("CRS: {}".format(target_crs))
    epsg = target_crs['epsg']
    try:
        crs_details = CRS(epsg)
        transformer = Transformer.from_crs(crs_from=REFERENCE_MAP_CRS, crs_to=epsg, always_xy=True)
        i = 0
        new_points = []
        for point in transformer.itransform(inputs_map, switch=True, direction="FORWARD"):
            if math.isinf(point[0]) or math.isinf(point[1]):
                break

            new_points.append(point[::-1])
            i += 1
        return {"crs": target_crs,
                "units": crs_details.axis_info[0].unit_name + " " + crs_details.axis_info[1].unit_name,
                "converted_points": new_points}
    except Exception as e:
        logging.error("[{}]: {}".format(epsg, e))
        return
