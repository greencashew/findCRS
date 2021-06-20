# Script running

Scraper gather list of coordinate system details from: https://spatialreference.org/

**This method is no more recommended as https://spatialreference.org/ may contain corrupted and outdated CRS**

Scraper could be started with following command

```bash
scrapy crawl crs_gather -O crs_list.json
```
