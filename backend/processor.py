import numpy as np

from backend.coordinates_transformer import calculate_crs_list
from backend.transform import optimization_helmert_four
from backend.transform_quality import mean_square_error

inputMap = 'old-map-england.jpg'


# gcps_pixel = [
#     [709.458570847479, 605.4617178931325],
#     [677.3083650861621, 625.1537189219391],
#     [627.7148722878082, 762.429053284079],
#     [258.0465376458333, 718.5266969875257]
# ]
#
# QGIS_gcps_pixel_xy = np.array([
#     [706.592, 603.366, -448604, 7.03874e+06],
#     [676.297, 627.349, -489998, 7.01065e+06],
#     [688.92, 463.254, -486302, 7.24792e+06],
#     [254.698, 716.971, -1.1672e+06, 6.82649e+06],
# ])
#
# QGIS_gcps_pixel_xy = np.array([
#     [10, 20, 209, -107],
#     [15, 25, 270, -157],
#     [30, 54, 549, -307],
# ])

def process(input_values_map, expected_values_map):
    results = []

    converted_points = calculate_crs_list(expected_values_map)

    for crs in converted_points.items():
        items = []
        for i in range(len(input_values_map)):
            items.append([*input_values_map[i], *list(crs[1][i])])

        pred_x, pred_y, shift_vector_x, shift_vector_y, parameters = optimization_helmert_four(np.array(items))
        mse_overall, mse_x, mse_y = mean_square_error(shift_vector_x, shift_vector_y, len(np.array(items)))

        results.append({"CRS": crs[0],
                        "pred_x": pred_x.tolist(),
                        "pred_y": pred_y.tolist(),
                        "shift_vector_x": shift_vector_x.tolist(),
                        "shift_vector_y": shift_vector_y.tolist(),
                        "MSE": mse_overall,
                        "parameters": parameters})

        print(results)

    results.sort(key=lambda x: "MSE")

    # data_frame = pd.DataFrame(results,
    #                           columns=["crs", "pred_x", "pred_y", "shift_vector_x", "shift_vector_y", "mse_overall",
    #                                    "mse_x", "mse_y", "parameters"])
    #
    # print(data_frame)

    return results

    # helmert_result = optimization_helmert_four(QGIS_gcps_pixel_xy)
    # helmert_result = optimization_polynomial(1, QGIS_gcps_pixel_xy, 0, 1, 2, 3)
    # print(np.array(helmert_result))
    #
    # print(mean_square_error(helmert_result[2], helmert_result[3], len(QGIS_gcps_pixel_xy)))
