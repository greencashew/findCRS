# Script for gathering list of CRS from EPSG database

This is recommended way to gather CRS and its boundaries.

Steps to create file:

1. Import postgres database from https://epsg.org/download-dataset.html
2. Select needed data with following query:

```sql
SELECT 'EPSG:' || coord_ref_sys_code::text AS EPSG,
       coord_ref_sys_name                  AS name,
       bbox_south_bound_lat,
       bbox_west_bound_lon,
       bbox_north_bound_lat,
       bbox_east_bound_lon,
       CRS.remarks                         AS details,
       extent_name                         AS area
FROM epsg_coordinatereferencesystem AS CRS
         INNER JOIN epsg_usage USAGE ON CRS.coord_ref_sys_code = USAGE.object_code
         INNER JOIN epsg_extent EXTENT on USAGE.extent_code = EXTENT.extent_code
WHERE CRS.deprecated = 0
      AND USAGE.object_table_name = 'epsg_coordinatereferencesystem';
```

3. Dump data into json array
4. Put data to `backend/crs` directory 
