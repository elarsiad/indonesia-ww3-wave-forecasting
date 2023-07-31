#! /bin/sh
year=2018
yr=18
month=12
day=31
#year=`date --date "0 day ago" "+%Y"`
#month=`date --date "0 day ago" "+%m"`
#day=`date --date "0 day ago" "+%d"`

rm gfs.t00z.pgrb2.0p50*

for ff in 00 03 06 09 12 15 18 21 24 27 30 33 36 39 42 45 48 51 54 57 60 63 66 69 72 75 78 81 84 87 90 93 96; do
URL="https://nomads.ncdc.noaa.gov/data/gfs4/${year}${month}/${year}${month}${day}/gfs_4_${year}${month}${day}_0000_0${ff}.grb2"

#URL="http://soostrc.comet.ucar.edu/data/grib/gfsp50/${year}${month}${day}/grib.t00z/${yr}${month}${day}00.gfs.t00z.0p50.pgrb2f0${ff}"

#URL="https://nomads.ncep.noaa.gov/pub/data/nccf/com/gfs/prod/gfs.${year}${month}${day}/00/gfs.t00z.pgrb2.0p50.f0${ff}" 

wget $URL 
./wgrib2 gfs.t00z.pgrb2.0p50.f0${ff} -s | egrep '(:UGRD:10 m above ground:|:VGRD:10 m above ground:)' | ./wgrib2 -i gfs.t00z.pgrb2.0p50.f0${ff} -grib gfs_${ff}.grb
done

cat gfs_00.grb gfs_03.grb gfs_06.grb gfs_09.grb gfs_12.grb gfs_15.grb gfs_18.grb gfs_21.grb gfs_24.grb gfs_27.grb gfs_30.grb gfs_33.grb gfs_36.grb gfs_39.grb gfs_42.grb gfs_45.grb gfs_48.grb gfs_51.grb gfs_54.grb gfs_57.grb gfs_60.grb gfs_63.grb gfs_66.grb gfs_69.grb gfs_72.grb gfs_75.grb gfs_78.grb gfs_81.grb gfs_84.grb gfs_87.grb gfs_90.grb gfs_93.grb gfs_96.grb > gfs_all.grb

./wgrib2 gfs_all.grb -netcdf gfs.uv.10m.wnd.${year}${month}${day}.nc

rm gfs_??.grb gfs_all*




