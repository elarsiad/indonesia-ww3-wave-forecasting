*
* map_LV.gs  : GrADS script for Medit_Tunisia
* ----------------------------------------------------------------
*           Scripts used :
*              colorset.gs : Sets up shading colors
*
* General set up

  t1 =   1
  tn =  73
  ts =   1

  plot_map = 'yes'
  plot_act = 'yes'
  plot_msk = 'yes'
  plot_hs  = 'yes' ; hs_type = -1
  plot_con = 'yes'
  plot_dir = 'yes'
  plot_wnd = 'yes'
  plot_bys = 'yes'
  plot_lab = 'yes'
  pan = '(a) .....'

  if ( hs_type = -1 )
    hspar = 'hs'
    thpar = 'fp'
  endif
  if ( hs_type = 0 )
    hspar = 'phs00'
    thpar = 'pth00'
  endif
  if ( hs_type = 1 )
    hspar = 'phs01'
    thpar = 'pth01'
  endif
  if ( hs_type = 2 )
    hspar = 'phs02' 
    thpar = 'pth02'
  endif
  if ( hs_type = 3 )
    hspar = 'phs03' 
    thpar = 'pth03'
  endif
  if ( hs_type = 4 )
    hspar = 'phs04' 
    thpar = 'pth04'
  endif
  if ( hs_type = 5 )
    hspar = 'phs05' 
    thpar = 'pth05'
  endif

  xpl = 1.0
  xph = 7.5
  ypl = 2.0
  yph = 9.0

  xml =   90.00
  xmh =   145.00
  yml =  -15.00
  ymh =   15.00

  vskip1 = 3
* vskip1 = 5
* vskip1 = 10
  
  wsc1 = 10.0

* clevs = '0.33 0.67 1 1.33 1.67 2 2.33 2.67 3 3.33 3.67 4 4.33 4.66 5.00'
 clevs = '0.15 0.30 0.45 0.60 0.75 0.90 1.05 1.20 1.35 1.50 1.65 1.80 1.95 2.10 2.25 2.50 3.00 3.50'
*  clevs = '0.10 0.20 0.30 0.40 0.50 0.60 0.70 0.80 0.90 1.00 1.10 1.20 1.30 1.40 1.50'
  ccols = '41 43 45 47 48 34 35 36 37 38 21 22 23 24 25 26 27 28 29'

  if ( plot_act = 'yes' )
    col_act = 69
  else
    col_act = 70
  endif
  
  if ( plot_msk = 'yes' )
    col_msk = 71
  else
    col_msk = 70
  endif

  strsiz = ( xph - xpl ) * 0.03

  pdx = ( xph - xpl ) * 0.0075
  strsiz2 = ( xph - xpl ) * 0.025

  'set display color white'
  'c'
  'run define_colors.gs'

  gdate="yyyy/mm/dd"
  '!date -u "+%Y/%m/%d" > tmp_grads_gdate'
  result = read (tmp_grads_gdate)
  gdate = sublin(result,2)
  '!rm -f tmp_grads_gdate'

* Set buoy data hardcoded

* nr = 1
* x.1 =  110.0
* y.1 =  -10.000
* s.1 = 'Test'

* Set buoy data from buoy.data

* '!cat buoy.all | wc -l > tmp_grads_nbuoys'
* result = read (tmp_grads_nbuoys)
* line   = sublin(result,2)
* nrf    = subwrd(line,1)
* '!rm -f tmp_grads_nbuoys'

* if ( nrf > 0 )
  i = 1
* nr = nrf
* while ( i <= nr )
* result = read (buoy.all)
* line   = sublin(result,2)
* x.i = subwrd(line,1)
* y.i = subwrd(line,2)
* s.i = subwrd(line,3)
* i = i + 1
* endwhile
* endif

* ID output to screen

  say ' '
  say '----------------------'
  say '*** Running map.gs ***'
  say '----------------------'
  say ' ' 
  say 'Number of ouptput points : ' nr
  say 'Time steps from ' t1 ' through ' tn ' with step ' ts

* Loop over time steps

  'open ww3'

  i = 1
  t = t1

  '!rm -f plot.grads.*'

  while ( t <= tn )
    'set t ' t

    'query time'
    gradsdate = subwrd(result,3)
    test = substr ( gradsdate, 3, 1 )
    if ( test='Z' )
      year = substr ( gradsdate, 9, 4 )
      mnth = substr ( gradsdate, 6, 3 )
      day  = substr ( gradsdate, 4, 2 )
      hour = substr ( gradsdate, 1, 2 )
      min  = '00'
    else
      year = substr ( gradsdate, 12, 4 )
        mnth = substr ( gradsdate, 9, 3 )
      day  = substr ( gradsdate, 7, 2 )
      hour = substr ( gradsdate, 1, 2 )
      min  = substr ( gradsdate, 4, 2 )
    endif

    month= '??'
    if (mnth='JAN'); month= '01'; endif;
    if (mnth='FEB'); month= '02'; endif;
    if (mnth='MAR'); month= '03'; endif;
    if (mnth='APR'); month= '04'; endif;
    if (mnth='MAY'); month= '05'; endif;
    if (mnth='JUN'); month= '06'; endif;
    if (mnth='JUL'); month= '07'; endif;
    if (mnth='AUG'); month= '08'; endif;
    if (mnth='SEP'); month= '09'; endif;
    if (mnth='OCT'); month= '10'; endif;
    if (mnth='NOV'); month= '11'; endif;
    if (mnth='DEC'); month= '12'; endif;

*   vdate = year '/' month '/' day ' ' hour ':' min 'z'
    vdate = year '/' month '/' day ' ' hour 'z'
*   vdate = pan ' ' hour ':' min 'z'
*   vdate = hour ':' min 'z'

    say '   processing time step ' t ', time is ' vdate

* Basic plot set up

*    'enable print plot.grads.' t
    'clear'
    'set grads off'
    'set lon ' xml ' ' xmh
    'set lat ' yml ' ' ymh
    'set xlint 2'
    'set ylint 2'
    'set grid on 3 60'
     'set mpdset hires'
*    'set mpdraw off'
     'set parea 0.5 8 1 11'
*    'set parea ' xpl ' ' xph ' ' ypl ' ' yph
*    'set mproj scaled'

* Plot Medit_Tunisia grid ------------------------------------------------ *

* Plot map

    if ( plot_map = 'yes' )
      'set gxout grfill'
      'set clevs -4.5 -3.5 -2.5 -1.5 -0.5  0.5 1.5'
      'set ccols 60  ' col_msk '  67   68   63   0   0  ' col_act
      'd map'
    endif

* Plot Hs

    if ( plot_hs = 'yes' )
      'set gxout shaded'
      'set clevs ' clevs
      'set ccols ' ccols
      'd ' hspar
      'run cbarn 1 0 4.5 1'
  
      if ( plot_con = 'yes' )
        'set gxout contour'
        'set cthick 1'
        'set ccolor 60'
        'set clevs ' clevs
        'set clab off'
        'd ' hspar
      endif

    endif

* Plot directions

    if ( plot_dir = 'yes' )
      'set gxout vector'
      'set cthick 6'
      'set arrscl 0.25'
*      'set arrlab off'
      'set ccolor 1'
      'd skip(cos(dp),4,4);sin(dp)'
    endif

* Plot wind

    if ( plot_wnd = 'yes' )
      'set gxout barb'
      'set cthick 6'
      'set arrscl 0.25 ' wsc1
*      'set arrlab off'
      'set ccolor 2'
      'd skip(uwnd, 4,4);vwnd'
    endif

* Plot output locations -------------------------------------------------- *

    'set strsiz ' strsiz2

    if ( plot_bys = 'yes' )
      j = 1
      'set line 1'

      while ( j <= nr )
        if ( x.j < xmh ) & (x.j > xml ) & ( y.j < ymh ) & ( y.j > yml )
          xb = xpl + ( xph - xpl ) * ( x.j - xml ) / ( xmh - xml )
          yb = ypl + ( yph - ypl ) * ( y.j - yml ) / ( ymh - yml )
          'draw recf ' xb-pdx ' ' yb-pdx ' ' xb+pdx ' ' yb+pdx
          'set string 7 l'
          'draw string ' xb + 0.14*strsiz2 ' ' yb + 1.2*strsiz2 ' ' s.j
        endif
        j = j + 1
      endwhile
    endif
 
* Panel and date marker

    if ( plot_lab = 'yes' )
      'set strsiz ' strsiz
*     'set string 0 l'
*     'draw string 1.7 9.70 ' pan
*     'set strsiz ' strsiz2
*     'set string 0 r'
*     'draw string 7.25 2.25 ' vdate
      'set strsiz ' strsiz
      'set string 0 l'
      'draw string 1.25 10.75 ' vdate
    endif
 
* Legend
    'draw title Wave Watch III Forecast 'vdate
    'set strsiz ' strsiz
    'set string 1 c'
    'draw string 4.25 1.55 Java_Sea sig. wave height (m)'
    'set string 1 l'
     'set strsiz 0.13'    
'draw string 1.35 2.05 Wave (black) & Wind Speed (red), m/sec'
* Finalize
'printim plot_grads_'t'.png'
*    pull OK
    t = t + ts
    i = i + 1
  endwhile

* End of loop over time steps

  say ' '
  say '----------------------'
  say '*** End of map.gs  ***'
  say '----------------------'
  say ' ' 

  'quit'

* end of map_hr.gs
