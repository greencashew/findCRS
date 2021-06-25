import pandas as pd
from pyproj import Transformer

REFERENCE_MAP_CRS = "EPSG:3857"
TARGET_CRS = "EPSG:2180"

if __name__ == "__main__":
    inputs_dataframe = pd.read_csv("lst.wgs.csv", delimiter=" ")

    transformer = Transformer.from_crs(crs_from=REFERENCE_MAP_CRS, crs_to=TARGET_CRS, always_xy=True)
    i = 0
    new_points = []
    for point in transformer.itransform(inputs_dataframe.to_numpy().tolist(), switch=True):
        new_points.append(point[::-1])

    converted_points_df = pd.DataFrame(new_points, columns=["x", "y"])
    converted_points_df.to_csv("lst_transformed.csv", index=False, header=False)

    converted_points_df.plot.scatter(x='x',
                                     y='y',
                                     c='DarkBlue')
