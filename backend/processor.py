import numpy as np

from backend.crs.coordinates_transformer_async import async_convert_from_wgs84_to_crs_list
from backend.crs.crs_list import get_applicable_crs_list_for_bounds
from backend.estimate.estimation import estimation_polynomial_first_order, estimation_polynomial_second_order, \
    estimation_polynomial_third_order, estimation_helmert_four
from backend.estimate.quality import mean_square_error


def process(input_values_map, expected_values_map, bounds):
    list_for_bounds = get_applicable_crs_list_for_bounds(bounds)
    converted_points = async_convert_from_wgs84_to_crs_list(expected_values_map, list_for_bounds)

    results_polynomial_first = calculate_conversion_for(estimation_polynomial_first_order, converted_points,
                                                        input_values_map)
    results_polynomial_second = calculate_conversion_for(estimation_polynomial_second_order, converted_points,
                                                         input_values_map)
    results_polynomial_third = calculate_conversion_for(estimation_polynomial_third_order, converted_points,
                                                        input_values_map)
    results_helmert_four = calculate_conversion_for(estimation_helmert_four, converted_points,
                                                    input_values_map)

    return {
        "polynomial_first": results_polynomial_first,
        "polynomial_second": results_polynomial_second,
        "polynomial_third": results_polynomial_third,
        "helmert_four": results_helmert_four,
    }


def calculate_conversion_for(estimation_function, converted_points, input_values_map):
    results = []
    for crs in converted_points:
        items = []
        for i in range(len(input_values_map)):
            items.append([*input_values_map[i], *list(crs['converted_points'][i])])

        results.append(calculate_estimation_for(estimation_function, items, crs))
    return sorted(results, key=lambda x: x['mse'])


def calculate_estimation_for(function, array_of_items, crs):
    pred_y, pred_x, shift_vector_x, shift_vector_y, parameters = function(np.array(array_of_items))
    mse_overall = mean_square_error(shift_vector_x, shift_vector_y, len(np.array(array_of_items)))
    pred_x = pred_x * -1

    return {
        "epsg": crs['crs']['epsg'],
        "crs": crs,
        "pred_x": pred_x.tolist(),
        "pred_y": pred_y.tolist(),
        "shift_vector_x": shift_vector_x.tolist(),
        "shift_vector_y": shift_vector_y.tolist(),
        "mse": mse_overall,
        "parameters": parameters
    }
