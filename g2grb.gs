function g2grb(arg)
*
* writes out a single field that is on a lat-lon grid
*
* ga-> g2grb.gs hgt2mb outfile d=1999123100:UGRD:200 mb:2 hour fcst
* must copy template.grb2 in $GADDIR
*
* temporary files: $file.tmp $file.inv $file.template
* v0.4.1 wesley ebisuzaki
* v0.4.2 wesley ebisuzaki use pre-existing template option
*
* note: need sample grib2 file in $GADDIR/template.grb2
*

* wgrib2 must point to wgrib2 v0.1.8.4 or greater
wgrib2=wgrib2

var=subwrd(arg,1)
file=subwrd(arg,2)
* check for append mode
append=''
c=substr(file,1,1)
if (c = '+')
  n=math_strlen(file)-1
  append='-append'
  file=substr(file,2,n)
endif
filetmp=file'.tmp'
fileinv=file'.inv'

template0='$GADDIR/template.grb2'
template=file'.template'
build_template=1

i=3
* see if template option given:  t=file
c=subwrd(arg,i)
if (substr(c,1,2) = 't=')
   j=math_strlen(c)-2
   template=substr(c,3,j)
   say "template option template=" template
   build_template=0
   i=i+1
endif

* Get the metatdata which may contain more than one word
inv = ''
inv=subwrd(arg,i)
i=i+1
while (subwrd(arg,i) != '')
   inv = inv%' '%subwrd(arg,i)
   i = i+1
endwhile

if (inv = '')
   say 'usage: g2grb (variable) (file) (metadata)'
   say ' (variable) is a GrADS expression'
   say ' file = make a new file,   +file = append to file'
   say ' metadata = argument to wgrib2: -set_metadata'
   say ' ex: g2grb u out.grb UGRD:200 mb:anl:packing=j:center=7'
   say ' ex: g2grb u out.grb d=1999123100:UGRD:200 mb:anl:packing=j:center=7'
   say '    if pre-existing template'
   say 'usage: g2grb (variable) (file) t=(grib2 template) (metadata)'
   exit
endif

* save gxout state
'q gxout'
line=sublin(result,4)
graph=subwrd(line,6)

* pick up the grid description
'q dim'
* say result
line=sublin(result,2)
w1=subwrd(line,1)
if (w1 != 'X') 
  say 'expecting X, found' w1
  exit
endif
t=subwrd(line,11)
x0=math_nint(t)
t=subwrd(line,13)
x1=math_nint(t)
'set x ' x0 ' ' x1
'q dim'
line=sublin(result,2)
nx=x1-x0+1
lon0=subwrd(line,6)
lon1=subwrd(line,8)
dlon=(lon1-lon0) / (nx-1)
say 'dlon=' dlon ' nx = 'nx' lon0 = ' lon0

line=sublin(result,3)
say line
w1=subwrd(line,1)
if (w1 != 'Y') 
  say 'expecting Y, found' w1
  exit
endif
t=subwrd(line,11)
y0=math_nint(t)
t=subwrd(line,13)
y1=math_nint(t)
'set y ' y0 ' ' y1
'q dim'
line=sublin(result,3)
ny=y1-y0+1
lat0=subwrd(line,6)
lat1=subwrd(line,8)
dlat=(lat1-lat0) / (ny-1)
say 'dlat=' dlat ' ny = 'ny' lat0 = ' lat0

* check for X Y varying
line=sublin(result,2)
w1=subwrd(line,3)
if (w1 != 'varying')
  say 'X not varying'
  exit
endif

line=sublin(result,3)
w1=subwrd(line,3)
if (w1 != 'varying')
  say 'Y not varying'
  exit
endif

line=sublin(result,4)
w1=subwrd(line,3)
if (w1 != 'fixed')
  say 'Z not fixed'
  exit
endif

line=sublin(result,5)
w1=subwrd(line,3)
if (w1 != 'fixed')
  say 'T not fixed'
  exit
endif

line=sublin(result,5)
w1=subwrd(line,1)
if (w1 = 'E') 
   w1=subwrd(line,3)
   if (w1 != 'fixed')
      say 'E not fixed'
      exit
    endif
endif

* check if we need a date code

if (substr(inv,1,2) != 'd=')
say 'need to generate date'
   'query dim'
   line=sublin(result,5)
   date=subwrd(line,6)
   if (substr(date,3,1) = ':')
      hr = substr(date,1,2)
      min = substr(date,4,2)
      day = substr(date,7,2)
      mon = substr(date,9,3)
      year = substr(date,12,4)
   else
      min=''
      hr = substr(date,1,2)
      day = substr(date,4,2)
      mon = substr(date,6,3)
      year = substr(date,9,4)
   endif
   if (mon = 'JAN') ; mo = 01; endif
   if (mon = 'FEB') ; mo = 02; endif
   if (mon = 'MAR') ; mo = 03; endif
   if (mon = 'APR') ; mo = 04; endif
   if (mon = 'MAY') ; mo = 05; endif
   if (mon = 'JUN') ; mo = 06; endif
   if (mon = 'JUL') ; mo = 07; endif
   if (mon = 'AUG') ; mo = 08; endif
   if (mon = 'SEP') ; mo = 09; endif
   if (mon = 'OCT') ; mo = 10; endif
   if (mon = 'NOV') ; mo = 11; endif
   if (mon = 'DEC') ; mo = 12; endif
   inv='d='year mo day hr min ':' inv
   say "new inv=" inv
endif

* find the undefined value
'query undef'
if (subwrd(result,1) = 'Invalid')
  say 'old grads found undef=9.999e20'
* control file specific value
  undef=9.999e20
else
  undef=subwrd(result,7)
  say 'new grads found undef=' undef
endif

if (build_template = 1)
* make a template file
say 'making template file'
say '! ' wgrib2 ' ' template0 ' -d 1 -lola ' lon0 ':' nx ':' dlon ' ' lat0 ':' ny ':' dlat ' ' template ' grib'
'! ' wgrib2 ' ' template0 ' -d 1 -lola ' lon0 ':' nx ':' dlon ' ' lat0 ':' ny ':' dlat ' ' template ' grib'
endif

* open binary output file
'q fwrite'
info=result
line=sublin(info,1)
open=subwrd(line,4)
if (open = 'open')
  say 'closing fwrite'
  'disable fwrite'
endif

'set fwrite -sq -be ' filetmp
say 'opening fwrite ' filetmp
'set gxout fwrite'
say 'going to display ' var
'd ' var
say 'result is 'result
if (subwrd(result,2) = 'Error:')
   say "error:  expression/data to convert to grib2"
   'disable fwrite'
   'set gxout 'graph
   exit
endif
if (subwrd(result,3) = 'Error:')
   say "error:  data "
   'disable fwrite'
   'set gxout 'graph
   exit
endif

'disable fwrite'

r='1:0:' inv ':'
say 'metadata = ' r

err=write(fileinv, r)
err=close(fileinv)

* for speed set -import_ieee to -import_bin
say '! ' wgrib2 ' ' append ' ' template ' -import_ieee ' filetmp ' -set_metadata ' fileinv ' -undefine_val ' undef ' -grib_out 'file
'! ' wgrib2 ' ' append ' ' template ' -import_ieee ' filetmp ' -set_grib_type c3 -set_metadata ' fileinv ' -undefine_val ' undef ' -grib_out 'file
say result
say '!rm ' filetmp ' ' fileinv
'!rm ' filetmp ' ' fileinv
if (build_template = 1)
   say '!rm ' template
  '!rm ' template
endif


'set gxout 'graph
exit
