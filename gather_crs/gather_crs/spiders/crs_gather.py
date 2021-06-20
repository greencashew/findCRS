import scrapy


class CrsGatherSpider(scrapy.Spider):
    name = 'crs_gather'
    allowed_domains = ['www.spatialreference.org']
    start_urls = ['https://www.spatialreference.org/ref/epsg/2001/']

    def parse(self, response):
        try:
            wgs84_bounds = response.xpath('//*[@id="content"]/ul/li[1]/text()').get() \
                .replace(" ", "") \
                .replace("\n", "") \
                .replace(":", "") \
                .split(",")
            scope = response.xpath('//*[@id="content"]/ul/li[3]/text()').get() \
                .replace(": ", "")
            area = response.xpath('//*[@id="content"]/ul/li[5]/text()').get() \
                .replace(": ", "")

            yield {
                'epsg': response.xpath('//*[@id="content"]/h1/text()').get().strip(),
                'name': response.xpath('//*[@id="content"]/p[1]/text()').get().strip(),
                'wgs84_bounds_lng_min': wgs84_bounds[0],
                'wgs84_bounds_lat_min': wgs84_bounds[1],
                'wgs84_bounds_lng_max': wgs84_bounds[2],
                'wgs84_bounds_lat_max': wgs84_bounds[3],
                'scope': scope,
                'area': area,
            }

        except Exception as e:
            print("Unable to scrap item: ", response, "Exception: ", e)

        next_page = response.css('#content > a:nth-child(2)::attr(href)').extract()[0]
        yield response \
            .follow(next_page, callback=self.parse)
