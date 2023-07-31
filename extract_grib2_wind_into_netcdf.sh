#! /bin/sh
year=2018
yr=18
month=12
day=31
#year=`date --date "0 day ago" "+%Y"`
#month=`date --date "0 day ago" "+%m"`
#day=`date --date "0 day ago" "+%d"`

#rm gfs.t00z.pgrb2.0p50*

for ff in 00 06 12 18 24 30 36 42 48 54 60 66 72; do
#URL="https://nomads.ncdc.noaa.gov/data/gfs4/${year}${month}/${year}${month}${day}/gfs_4_${year}${month}${day}_0000_0${ff}.grb2"

#URL="http://soostrc.comet.ucar.edu/data/grib/gfsp50/${year}${month}${day}/grib.t00z/${yr}${month}${day}00.gfs.t00z.0p50.pgrb2f0${ff}"

#URL="https://nomads.ncep.noaa.gov/pub/data/nccf/com/gfs/prod/gfs.${year}${month}${day}/00/gfs.t00z.pgrb2.0p50.f0${ff}" 

#wget $URL 
./wgrib2 gfs.t00z.pgrb2.0p50.f0${ff} -s | egrep '(:UGRD:10 m above ground:|:VGRD:10 m above ground:)' | ./wgrib2 -i gfs.t00z.pgrb2.0p50.f0${ff} -grib gfs_${ff}.grb
done

cat gfs_00.grb gfs_06.grb gfs_12.grb gfs_18.grb gfs_24.grb gfs_30.grb gfs_36.grb gfs_42.grb gfs_48.grb gfs_54.grb gfs_60.grb gfs_66.grb gfs_72.grb > gfs_all.grb

./wgrib2 gfs_all.grb -netcdf gfs.uv.10m.wnd.${year}${month}${day}.nc

rm gfs_??.grb gfs_all*

wgrib2 gfs_all.grb -netcdf gfs.uv.10m.wnd.20181231.nc




