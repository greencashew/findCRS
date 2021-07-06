import numpy as np


def mean_square_error(shift_vector_x, shift_vector_y, gcps_number):
    squared_vector_sum = 0

    shift_vector = np.sqrt(shift_vector_x * shift_vector_x + shift_vector_y * shift_vector_y)

    for i in range(gcps_number):
        squared_vector_sum += shift_vector[i] * shift_vector[i]

    return squared_vector_sum
