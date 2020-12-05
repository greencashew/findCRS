# Find projection - Raster maps calibration 

## Overall Description

Purpose of the application is finding the most possible 
projection of the historical map based on the common points defined in both maps.

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

### TODO

- Importing historical maps
- Projection calculation part
- Response panel
- Prettier Layout
- Responsiveness

### Project Setup

To run project locally you need to have installed:
 - python 3.7+
 - node latest
 - npm latest

Frontend

```bash
npm install
```

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
npm start
```

Backend:

```python
cd backend
python3 app.py
```