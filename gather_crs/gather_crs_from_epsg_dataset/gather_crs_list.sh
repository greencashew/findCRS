# Dataset source https://epsg.org/download-dataset.html

psql -h localhost -p 5432 -U login -d epsg_db -c "SELECT 'EPSG:' || coord_ref_sys_code::text AS EPSG,
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
      AND USAGE.object_table_name = 'epsg_coordinatereferencesystem'" >crs_list.txt
