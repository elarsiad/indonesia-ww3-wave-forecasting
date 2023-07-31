# Comparing WaveWatch-3 Forecast Outputs using Various Wind Forcings

This project was part of research during my visit as a research scientist at NOAA, Climate Prediction Center. Research evaluates different configurations of the WAVEWATCH III (WW3) spectral wave model using varied wind forcing inputs for maritime forecasting around Indonesia region.

## Data

- **Bathymetry:** ETOPO1 1 arc-minute global relief model 
- **Shorelines:** GSHHS high-resolution shoreline database
- **Wind forcing:**
  - Global models: GFS, ECMWF, CFSV2, UKMET
  - Regional model: WRF
- **Validation data:** 
  - ECMWF Reanalysis (0.125°)
  - Meteo France WAM model (0.083°)

# Comparing Maritime Forecast Techniques using Multi-Model Approach

This project evaluates different configurations of the WAVEWATCH III (WW3) spectral wave model using varied wind forcing inputs for maritime forecasting around Indonesia.

## Methodology

### Model Domain and Grids

- Model domain covers Indonesia region (-15°S to 15°N, 90°E to 145°E)
- Spatial resolution of 0.125°

- **Bathymetry** from ETOPO1 1 arc-minute relief model
- **Shorelines** from GSHHS high-resolution database
- **Computing boundaries** - GSHHS shoreline polygons used
- **Computing mask** - Resolves land masses and discrepancies between shoreline database and bathymetry
- **Grid generation** using GRIDGEN tool to create model grids

### Model Configuration

- WW3 v5.16 setup at 0.125° resolution  
- Default physics schemes:
  - Nonlinear interactions - SNL1
  - Source terms - ST2 
  - Bottom friction - SBT1
  - Surface dissipation - SDB1

### Running WAVEWATCH III

- **Timestep** - 3600 seconds
- **Spin up** - 24 hour initialization run
- **Output** - Hourly

### Wind Forcing Data

- Global models:
  - GFS 0.25°
  - ECMWF 0.5°
  - CFSV2 0.25°
  - UKMET 0.5°
- Regional model:
  - WRF 15km

## Experiments

- WW3 forced by different wind inputs 
- Simulations from 30 Dec 2018 to 2 Jan 2019
- Focus on active monsoon and tropical cyclone periods

## Verification 

- Point verification at 8 locations around Indonesia
- Spatial verification against ECMWF Reanalysis and MFWAM
- Metrics: correlation, RMSE, bias, Critical Success Index

## Results

- All WW3 runs underestimate validation data
- UKMET input shows best performance spatially
- WRF provides good high-resolution regional winds

## Conclusion

Using multiple global and regional models provides range of solutions. Performance varies across complex Indonesian seas.

## References

- WAVEWATCH III® Development Group Technical Report, 2016
- ETOPO1 Technical Documentation, 2009
