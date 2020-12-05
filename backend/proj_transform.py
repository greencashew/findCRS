from pyproj import Transformer

transproj_eq = Transformer.from_proj(
    proj_from='+proj=merc',
    proj_to='+proj=airy',
    always_xy=True,
    skip_equivalent=True
)

for pt in transproj_eq.itransform([(20.137, 15.661)]):
    print('{:.3f} {:.3f}'.format(*pt))
