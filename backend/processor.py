import numpy as np

from backend.crs.coordinates_transformer_async import async_convert_from_wgs84_to_crs_list
from backend.crs.crs_list import get_applicable_crs_list_for_bounds
from backend.transformation.transform import optimization_helmert_four, optimization_polynomial_first_order, \
    optimization_polynomial_second_order, optimization_polynomial_third_order
from backend.transformation.transform_quality import mean_square_error


def process(input_values_map, expected_values_map, bounds):
    list_for_bounds = get_applicable_crs_list_for_bounds(bounds)
    converted_points = async_convert_from_wgs84_to_crs_list(expected_values_map, list_for_bounds)

    results_polynomial_first = calculate_conversion_for(optimization_polynomial_first_order, converted_points,
                                                        input_values_map)
    results_polynomial_second = calculate_conversion_for(optimization_polynomial_second_order, converted_points,
                                                         input_values_map)
    results_polynomial_third = calculate_conversion_for(optimization_polynomial_third_order, converted_points,
                                                        input_values_map)
    results_helmert_four = calculate_conversion_for(optimization_helmert_four, converted_points,
                                                    input_values_map)

    return {
        "polynomial_first": results_polynomial_first,
        "polynomial_second": results_polynomial_second,
        "polynomial_third": results_polynomial_third,
        "helmert_four": results_helmert_four,
    }


def calculate_conversion_for(optimization_function, converted_points, input_values_map):
    results = []
    for crs in converted_points:
        items = []
        for i in range(len(input_values_map)):
            items.append([*input_values_map[i], *list(crs['converted_points'][i])])

        results.append(calculate_optimization_for(optimization_function, items, crs))
    return results


def calculate_optimization_for(function, array_of_items, crs):
    pred_x, pred_y, shift_vector_x, shift_vector_y, parameters = function(np.array(array_of_items))
    mse_overall, mse_x, mse_y = mean_square_error(shift_vector_x, shift_vector_y, len(np.array(array_of_items)))

    return {"epsg": crs['crs']['epsg'],
            "crs": crs,
            "pred_x": pred_x.tolist(),
            "pred_y": pred_y.tolist(),
            "shift_vector_x": shift_vector_x.tolist(),
            "shift_vector_y": shift_vector_y.tolist(),
            "mse": mse_overall,
            "parameters": parameters}
