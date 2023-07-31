'reinit'
'sdfopen ecmwf_uv_10m_20181231.nc'
'set lat -15 15'
'set lon 90 145'
i=1
while(i<=21)
j=i*6
'set t 'i
'define uu=u10'
'g2grb uu outpu'i'.grb d=2018123100:UGRD:surface:'j' hour fcst'
'set t 'i
'set lat -15 15'
'set lon 90 145'
'define vv=v10'
'g2grb vv +outpu'i'.grb d=2018123100:VGRD:surface:'j' hour fcst'
i=i+1
endwhile
!cat outpu1.grb outpu2.grb outpu3.grb outpu4.grb outpu5.grb outpu6.grb outpu7.grb outpu8.grb outpu9.grb outpu10.grb outpu11.grb outpu12.grb outpu13.grb outpu14.grb outpu15.grb outpu16.grb outpu17.grb outpu18.grb outpu19.grb outpu20.grb outpu21.grb > ecmwf_new.grb
