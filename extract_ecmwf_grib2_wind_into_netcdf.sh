#! /bin/sh
year=2018
month=12
day=31

rm output*

cat>netcd2grib2.gs<<eofGS
'reinit'
'sdfopen ecmwf_uv_10m_${year}${month}${day}.nc'
'set t 'i
'set x 1 720'
'set y 1 361'
i=1
while(i<=21)
j=i*6
'set t 'i
'define uu=u10'
'g2grb uu output'i'.grb d=2018123100:UGRD:surface:'j' hour fcst'
'set t 'i
'set x 1 720'
'set y 1 361'
'define vv=v10'
'g2grb vv +output'i'.grb d=2018123100:VGRD:surface:'j' hour fcst'
i=i+1
endwhile
'quit'
eofGS

/usr/local/bin/grads -blc netcd2grib2.gs

cat output1.grb output2.grb output3.grb output4.grb output5.grb output6.grb output7.grb output8.grb output9.grb output10.grb output11.grb output12.grb output13.grb output14.grb output15.grb output16.grb output17.grb output18.grb output19.grb output20.grb output21.grb  > outputall.grb

./wgrib2 outputall.grb -netcdf ecmwf.uv.10m.wnd.${year}${month}${day}.nc

rm output*.grb outputall*




