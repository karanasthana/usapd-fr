
Create View dateData AS
Select dc.date_id, dc.year, (dc.month || '/' || dc.day || '/' || dc.year) as date_str, TO_CHAR(TO_DATE(dc.month || '/' || dc.day || '/' || dc.year, 'MM/DD/YYYY'), 'MM') as month from VDHAVALESWARAPU.datecollected dc;



Create view getStateSites1 AS
Select site_code
from VDHAVALESWARAPU.State state
    join VDHAVALESWARAPU.County county on county.state_code = state.state_code
        join VDHAVALESWARAPU.Site site on site.county_code = county.county_code
where state_name = 'Florida';

Create view allPollObs AS
Select *
from VDHAVALESWARAPU.observation o
where (
    o.pollutant_code = (Select pollutant_code
                        from VDHAVALESWARAPU.pollutant p
                        where (
                            p.pollutant_name = 'NO2'
                            )
                        )
    ) and (
        o.site_code in (Select *
                        from getStateSites1)
    );
 
Create View dateData1 as
Select dc.date_id,
    dc.year,
    (dc.month || '/' || dc.day || '/' || dc.year) as date_str,
    to_char(to_date(dc.month || '/' || dc.day || '/' || dc.year, 'MM/DD/YYYY'), 'MM') as month
from VDHAVALESWARAPU.datecollected dc;

    


Select dc.year,
    dc.month,
    avg(ap.arithmetic_mean),
    case
        when dc.month in (3,4,5) then 'Spring'
        when dc.month in (6,7,8) then 'Summer'
        when dc.month in (9,10,11) then 'Fall'
        when dc.month in (12,1,2) then 'Winter'
        end 
from allPollObs ap
    join dateData1 dc on ap.date_id = dc.date_id

group by dc.year, dc.month
order by dc.year;
