'reinit'
'sdfopen ecmwf_uv_10m_20181231.nc'
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
