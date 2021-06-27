import numpy as np

TRANSFORMATION_HELMERT_FOUR_CONST = "helmert_four"
TRANSFORMATION_POLYNOMIAL_CONST = "polynomial"


def optimization_helmert_four(gcps_array):
    gcps_number = len(gcps_array)
    gravity_center_image_x, gravity_center_image_y, gravity_center_reference_x, gravity_center_reference_y = np.average(
        gcps_array, 0)

    img_x = gcps_array[:, 0]
    img_y = gcps_array[:, 1]
    ref_x = gcps_array[:, 2]
    ref_y = gcps_array[:, 3]

    delta_image_x = img_x - gravity_center_image_x
    delta_image_y = img_y - gravity_center_image_y
    delta_reference_x = ref_x - gravity_center_reference_x
    delta_reference_y = ref_y - gravity_center_reference_y

    a_numerator, a_denominator, b_nominator, b_denominator = 0, 0, 0, 0
    for i in range(gcps_number):
        a_numerator += delta_image_x[i] * delta_reference_y[i] - delta_image_y[i] * delta_reference_x[i]
        a_denominator += delta_image_x[i] * delta_image_x[i] + delta_image_y[i] * delta_image_y[i]
        b_nominator += delta_image_x[i] * delta_reference_x[i] + delta_image_y[i] * delta_reference_y[i]
        b_denominator = a_denominator

    rotation = a_numerator / a_denominator
    pixel_resolution = b_nominator / b_denominator
    shift_x = gravity_center_image_y * rotation - gravity_center_image_x * pixel_resolution + gravity_center_reference_x
    shift_y = -gravity_center_image_x * rotation - gravity_center_image_y * pixel_resolution + gravity_center_reference_y

    pred_x = delta_reference_x * pixel_resolution - delta_reference_y * rotation + gravity_center_reference_x
    pred_y = delta_reference_x * rotation + delta_reference_y * pixel_resolution + gravity_center_reference_y

    shift_vector_x = pred_x - img_x
    shift_vector_y = pred_y - img_y

    return pred_x, pred_y, shift_vector_x, shift_vector_y, {TRANSFORMATION_HELMERT_FOUR_CONST: {
        "rotation": rotation,
        "scale": pixel_resolution,
        "shift_x": shift_x,
        "shift_y": shift_y
    }}


def optimization_polynomial(order, gcps_array):
    gcps_number = len(gcps_array)
    img_x = gcps_array[:, 0]
    img_y = gcps_array[:, 1]
    ref_x = gcps_array[:, 2]
    ref_y = gcps_array[:, 3]
    if order == 1:
        # X = a0 + a1x + a2y
        # Y = b0 + b1x + b2y
        matrix = np.zeros((gcps_number, 3), dtype=np.float)
        matrix[:, 0] = 1
        matrix[:, 1] = ref_x
        matrix[:, 2] = ref_y
    elif order == 2:
        # X = a0 + a1x + a2y + a3xy + a4x^2 + a5y^2
        # Y = b0 + b1x + b2y + b3xy + b4x^2 + b5y^2
        matrix = np.zeros((gcps_number, 6), dtype=np.float)
        matrix[:, 0] = 1
        matrix[:, 1] = ref_x
        matrix[:, 2] = ref_y
        matrix[:, 3] = ref_x * ref_y
        matrix[:, 4] = ref_x * ref_x
        matrix[:, 5] = ref_y * ref_y
    elif order == 3:
        # X = a0 + a1x + a2y + a3xy + a4x^2 + a5y^2 + a6x^3 + a7x^2y + a8xy^2 + a9y^3
        # Y = b0 + b1x + b2y + b3xy + b4x^2 + b5y^2 + b6x^3 + b7x^2y + b8xy^2 + b9y^3
        matrix = np.zeros((gcps_number, 10), dtype=np.float)
        matrix[:, 0] = 1
        matrix[:, 1] = ref_x
        matrix[:, 2] = ref_y
        matrix[:, 3] = ref_x * ref_y
        matrix[:, 4] = ref_x * ref_x
        matrix[:, 5] = ref_y * ref_y
        matrix[:, 6] = ref_x * ref_x * ref_x
        matrix[:, 7] = ref_x * ref_x * ref_y
        matrix[:, 8] = ref_x * ref_y * ref_y
        matrix[:, 9] = ref_y * ref_y * ref_y

    least_squared_reference_x = np.linalg.lstsq(matrix, img_x, rcond=None)
    least_squared_reference_y = np.linalg.lstsq(matrix, img_y, rcond=None)

    pred_x = matrix.dot(least_squared_reference_x[0])
    pred_y = matrix.dot(least_squared_reference_y[0])

    shift_vector_x = np.array(pred_x) - img_x
    shift_vector_y = np.array(pred_y) - img_y

    return pred_x, pred_y, shift_vector_x, shift_vector_y, {
        TRANSFORMATION_POLYNOMIAL_CONST:
            {
                "order": order,
                "least_squared_x": least_squared_reference_x[0].tolist(),
                "least_squared_y": least_squared_reference_y[0].tolist()
            }
    }


def optimization_polynomial_first_order(gcps_array):
    return optimization_polynomial(1, gcps_array)


def optimization_polynomial_second_order(gcps_array):
    return optimization_polynomial(2, gcps_array)


def optimization_polynomial_third_order(gcps_array):
    return optimization_polynomial(3, gcps_array)
