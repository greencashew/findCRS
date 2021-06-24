import numpy as np

TRANSFORMATION_HELMERT_FOUR_CONST = "helmert_four"
TRANSFORMATION_POLYNOMIAL_CONST = "polynomial"


def optimization_helmert_four(gcps_array):
    gcps_number = len(gcps_array)
    gravity_center_image_x, gravity_center_image_y, gravity_center_reference_x, gravity_center_reference_y = np.average(
        gcps_array, 0)

    image_x = gcps_array[:, 0]
    image_y = gcps_array[:, 1]
    reference_x = gcps_array[:, 2]
    reference_y = gcps_array[:, 3]

    delta_image_x = image_x - gravity_center_image_x
    delta_image_y = image_y - gravity_center_image_y
    delta_reference_x = reference_x - gravity_center_reference_x
    delta_reference_y = reference_y - gravity_center_reference_y

    a_up, a_down, b_up, b_down = 0, 0, 0, 0
    for i in range(gcps_number):
        a_up += delta_image_x[i] * delta_reference_y[i] - delta_image_y[i] * delta_reference_x[i]
        a_down += delta_image_x[i] * delta_image_x[i] + delta_image_y[i] * delta_image_y[i]
        b_up += delta_image_x[i] * delta_reference_x[i] + delta_image_y[i] * delta_reference_y[i]

    b_down = a_down
    rotation = a_up / a_down
    pixel_resolution = b_up / b_down
    shift_x = gravity_center_image_y * rotation - gravity_center_image_x * pixel_resolution + gravity_center_reference_x
    shift_y = -gravity_center_image_x * rotation - gravity_center_image_y * pixel_resolution + gravity_center_reference_y

    pred_x = (image_x - gravity_center_image_x) * pixel_resolution - (
            image_y - gravity_center_image_y) * rotation + gravity_center_reference_x
    pred_y = (image_x - gravity_center_image_x) * rotation + (
            image_y - gravity_center_image_y) * pixel_resolution + gravity_center_reference_y

    shift_vector_x = pred_x - reference_x
    shift_vector_y = pred_y - reference_y

    return pred_x, pred_y, shift_vector_x, shift_vector_y, {TRANSFORMATION_HELMERT_FOUR_CONST: {
        "rotation": rotation,
        "scale": pixel_resolution,
        "shift_x": shift_x,
        "shift_y": shift_y
    }}


def optimization_polynomial(order, gcps_array):
    gcps_number = len(gcps_array)
    image_x = gcps_array[:, 0]
    image_y = gcps_array[:, 1]
    reference_x = gcps_array[:, 2]
    reference_y = gcps_array[:, 3]
    if order == 1:
        # X = a0 + a1x + a2y
        # Y = b0 + b1x + b2y
        matrix = np.zeros((gcps_number, 3), dtype=np.float)
        matrix[:, 0] = 1
        matrix[:, 1] = image_x
        matrix[:, 2] = image_y
    elif order == 2:
        # X = a0 + a1x + a2y + a3xy + a4x^2 + a5y^2
        # Y = b0 + b1x + b2y + b3xy + b4x^2 + b5y^2
        matrix = np.zeros((gcps_number, 6), dtype=np.float)
        matrix[:, 0] = 1
        matrix[:, 1] = image_x
        matrix[:, 2] = image_y
        matrix[:, 3] = image_x * image_y
        matrix[:, 4] = image_x * image_x
        matrix[:, 5] = image_y * image_y
    elif order == 3:
        # X = a0 + a1x + a2y + a3xy + a4x^2 + a5y^2 + a6x^3 + a7x^2y + a8xy^2 + a9y^3
        # Y = b0 + b1x + b2y + b3xy + b4x^2 + b5y^2 + b6x^3 + b7x^2y + b8xy^2 + b9y^3
        matrix = np.zeros((gcps_number, 10), dtype=np.float)
        matrix[:, 0] = 1
        matrix[:, 1] = image_x
        matrix[:, 2] = image_y
        matrix[:, 3] = image_x * image_y
        matrix[:, 4] = image_x * image_x
        matrix[:, 5] = image_y * image_y
        matrix[:, 6] = image_x * image_x * image_x
        matrix[:, 7] = image_x * image_x * image_y
        matrix[:, 8] = image_x * image_y * image_y
        matrix[:, 9] = image_y * image_y * image_y

    least_squared_reference_x = np.linalg.lstsq(matrix, reference_x, rcond=None)
    least_squared_reference_y = np.linalg.lstsq(matrix, reference_y, rcond=None)

    pred_x = matrix.dot(least_squared_reference_x[0])
    pred_y = matrix.dot(least_squared_reference_y[0])

    shift_vector_x = reference_x - np.array(pred_x)
    shift_vector_y = reference_y - np.array(pred_y)

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
