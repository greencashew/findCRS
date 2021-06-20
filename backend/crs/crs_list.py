import json
import logging
import os

from backend.definitions import ROOT_DIR

crs_list_file = open(os.path.join(ROOT_DIR, "crs/crs_list.json"), "r")
crs_json = json.loads(crs_list_file.read())


def get_applicable_crs_list_for_bounds(bounds):
    applicable_list = []
    for crs in crs_json:
        min_lat, min_lng, max_lat, max_lng = bounds

        logging.debug("CRS: ", crs)
        logging.debug(("bbox_south_bound_lat: ", float(crs['bbox_south_bound_lat']), "min_lat: ", min_lat, "isValid: ",
                       float(crs['bbox_south_bound_lat']) <= min_lat, "\n",
                       "bbox_west_bound_lon: ", float(crs['bbox_west_bound_lon']), "min_lng: ", min_lng, "isValid: ",
                       float(crs['bbox_west_bound_lon']) <= min_lng, "\n",
                       "bbox_north_bound_lat: ", float(crs['bbox_north_bound_lat']), "max_lat: ", max_lat, "isValid: ",
                       float(crs['bbox_north_bound_lat']) >= max_lat, "\n",
                       "bbox_east_bound_lon: ", float(crs['bbox_east_bound_lon']), "max_lng: ", max_lng, "isValid: ",
                       float(crs['bbox_east_bound_lon']) >= max_lng, "\n"))

        if float(crs['bbox_south_bound_lat']) <= min_lat and \
                float(crs['bbox_west_bound_lon']) <= min_lng and \
                float(crs['bbox_north_bound_lat']) >= max_lat and \
                float(crs['bbox_east_bound_lon']) >= max_lng:
            applicable_list.append(crs)

    return applicable_list
