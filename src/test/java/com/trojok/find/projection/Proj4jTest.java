package com.trojok.find.projection;

import org.junit.jupiter.api.Test;
import org.osgeo.proj4j.ProjCoordinate;
import org.osgeo.proj4j.proj.MercatorProjection;
import org.osgeo.proj4j.proj.Projection;

import static org.junit.jupiter.api.Assertions.assertEquals;


class Proj4jTest {

    @Test
    void shouldConvertToMarcatorProjection2() {
        //given
        final ProjCoordinate src = new ProjCoordinate(25.25, 10.10, Double.NaN);
        final ProjCoordinate expected = new ProjCoordinate(10.15, 25.42, Double.NaN);
        final Projection projection = new MercatorProjection();

        //when
        final ProjCoordinate result = projection.project(src, new ProjCoordinate());

        //then
        assertEquals(expected, result);
    }
}