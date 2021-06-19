import numpy as np


def mean_square_error(shift_vector_x, shift_vector_y, gcps_number):
    squared_vector_sum, squared_vector_x_sum, squared_vector_y_sum = 0, 0, 0

    shift_vector = np.sqrt(shift_vector_x * shift_vector_x + shift_vector_y * shift_vector_y)

    for i in range(gcps_number):
        squared_vector_sum += shift_vector[i] * shift_vector[i]
        squared_vector_x_sum += shift_vector_x[i] * shift_vector_x[i]
        squared_vector_y_sum += shift_vector_y[i] * shift_vector_y[i]

    return squared_vector_sum, squared_vector_x_sum, squared_vector_y_sum
