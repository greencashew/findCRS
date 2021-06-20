import unittest
from unittest import TestCase

import pandas as pd

from backend.crs.crs_list import get_applicable_crs_list_for_bounds


class Test(TestCase):

    def test_should_gather_crs_list_for_polish_boundaries(self):
        polish_areas = ['Poland', 'Europe', 'World', 'To be specified']
        wgs84_bounds = [49.742231602580716, 15.94503427794723, 53.35710874569601, 21.74672191597506]

        crs_list_for_bounds = get_applicable_crs_list_for_bounds(wgs84_bounds)

        for crs in crs_list_for_bounds:
            result = any(sub in crs['area'] for sub in polish_areas)
            self.assertTrue(result, "Unexpected area: {} in CRS: {}".format(crs['area'], crs))

    @unittest.skip("For development purpose or deeper verification")
    def test_gather_supported_crs_list_for_bounds(self):
        wgs84_bounds = [49.742231602580716, 15.94503427794723, 53.35710874569601, 21.74672191597506]

        crs_list_for_bounds = get_applicable_crs_list_for_bounds(wgs84_bounds)

        data_frame = pd.DataFrame(crs_list_for_bounds)
        data_frame.to_csv("supported.csv")
