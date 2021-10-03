# Find projection - Raster maps calibration

[![Netlify Status](https://api.netlify.com/api/v1/badges/2ae6c796-91bb-4dc9-b9d5-1deffd91b155/deploy-status)](https://app.netlify.com/sites/find-coordinates/deploys)

## Application

https://find-coordinates.netlify.app/

## Overall Description

Purpose of the application is finding the most possible coordinate system of the historical map based on the common
points defined in both maps.

### Usage

1. Load historical map
2. Add matching markers for both maps
   1. Choose some characteristic point on historical map
   1. Put coordinates of the point from historical map
   1. Find same characteristic point on the map on right side
   1. Choose point on the map or write it's coordinate
1. If number of points less than 2 back to point **#2**
1. Click **Find Coordinates** button

## Development

Backend url:

https://find-coordinates.herokuapp.com/api/projection

https://find-coordinates.herokuapp.com/api/health

### Project Setup

To run project locally you need to have installed:

- python 3.7+
- node latest
- npm latest

Frontend

```bash
cd frontend
yarn install
```

By default, frontend is connected with remote backend (REACT_APP_API_URL=https://find-coordinates.herokuapp.com). To
connect with local backend it is required to create **.env.local** file:

```bash
cd frontend
echo REACT_APP_API_URL=http://127.0.0.1:8000 > .env.local
```

Please remember to specify your local **adress:port**.

Backend

```bash
# Setup virtualenv, you can skip if you made it via IDE
virtualenv venv

source venv/bin/activate 
# on Linux
venv\Scripts\activate
# on Windows


# Install required dependencies
pip install -r requirements.txt
```


## Run application

Frontend:

```bash
cd frontend
yarn start
```

Backend:

```python
gunicorn
backend.app: app
```

## Description

Historical raster maps usually do not have an identified coordinate system. Due to the multitude of possibilities, the
problem of selecting an appropriate reference system can be time-consuming and ineffective (especially in the case of
selection of little-known systems). This study aimed to prepare a search supporting system for finding the most
appropriate Coordinate Reference System (CRS) and the best possible optimization parameters for a calibrated raster map.
The selection is performed by: finding control points on the raster and reference maps, transforming the reference map
datum to the most promising systems, optimizing the raster map with respect to the coordinate reference system,
calculating the mean-squared error (MSE) based on the shift during the transformation and sorting the results based on
the error in ascending order and showing the offsets on the raster map. The results showed the effectiveness of the
method. Despite the fact that this solution does not guarantee finding the appropriate mapping without additional user
intervention, it significantly narrows the search scope.

## Opis Applikacji

Historyczne mapy rastrowe z reguły nie posiadają zidentyfikowanego układu współrzędnych. Wielość możliwości sprawia iż
problem doboru odpowiedniego układu odniesienia potrafi być czasochłonny i nieefektywny (w szczególności w przypadku
doboru mało znanych układów). Celem tego badania było sporządzenie systemu wspomagającego znajdowanie
najodpowiedniejszego układu współrzędnych oraz najlepszych możliwych parametrów transformacji dla kalibrowanej mapy
rastrowej. Dobór jest wykonywany poprzez: znalezienie punktów kontrolnych na mapie rastrowej oraz referencyjnej,
przekształcenie układu odniesienia mapy referencyjnej do najlepiej rokujących układów, optymalizacji mapy rastrowej
względem kandydującego układu odniesienia, obliczenia błędu średniokwadratowego na podstawie przesunięcia podczas
transformacji, posortowanie wyników w oparciu o błąd w kolejności rosnącej oraz pokazanie przesunięć na mapie rastrowej.
Badanie to wykazało, iż metoda ta jest skuteczna. Rozwiązanie to pomimo tego iż nie daje gwarancji znalezienia
odpowiedniego odwzorowania bez dodatkowej ingerencji użytkownika, znacznie zawęża pulę poszukiwań.