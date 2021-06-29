import numpy as np
from numpy import rad2deg, arctan, sqrt

TRANSFORMATION_HELMERT_FOUR_CONST = "helmert_four"
TRANSFORMATION_POLYNOMIAL_CONST = "polynomial"


def estimation_helmert_four(gcps_array):
    gcps_number = len(gcps_array)
    X0, Y0, x0, y0 = np.average(
        gcps_array, 0)

    x = gcps_array[:, 2]
    y = gcps_array[:, 3]
    X = gcps_array[:, 0]
    Y = gcps_array[:, 1]

    xi = x - x0
    yi = y - y0
    Xi = X - X0
    Yi = Y - Y0

    s_numerator, c_numerator, denominator = 0, 0, 0
    for i in range(gcps_number):
        c_numerator += Xi[i] * xi[i] + Yi[i] * yi[i]
        s_numerator += Xi[i] * yi[i] - Yi[i] * xi[i]
        denominator += xi[i] * xi[i] + yi[i] * yi[i]

    c_factor = c_numerator / denominator  # scale, rotation factor
    s_factor = s_numerator / denominator  # scale, rotation factor

    rotation = rad2deg(arctan(s_factor / c_factor))
    scale = sqrt(s_factor * s_factor + c_factor * c_factor)
    shift_x = X0 - c_factor * x0 + s_factor * y0
    shift_y = Y0 - c_factor * y0 - s_factor * x0

    pred_x = X0 + c_factor * xi + s_factor * yi
    pred_y = Y0 + c_factor * yi - s_factor * xi

    shift_vector_x = pred_x - X
    shift_vector_y = pred_y - Y

    return pred_x, pred_y, shift_vector_x, shift_vector_y, {TRANSFORMATION_HELMERT_FOUR_CONST: {
        "rotation (deg)": rotation,
        "scale": scale,
        "shift_x": shift_x,
        "shift_y": shift_y
    }}


def estimation_polynomial(order, gcps_array):
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


def estimation_polynomial_first_order(gcps_array):
    return estimation_polynomial(1, gcps_array)


def estimation_polynomial_second_order(gcps_array):
    return estimation_polynomial(2, gcps_array)


def estimation_polynomial_third_order(gcps_array):
    return estimation_polynomial(3, gcps_array)
