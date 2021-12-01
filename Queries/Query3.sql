Select to_date(dc.month || '/' || dc.day || '/' || dc.year) as day from VDHAVALESWARAPU.datecollected dc;

select TO_CHAR(TO_DATE(dc.month || '/' || dc.day || '/' || dc.year, 'MM/DD/YYYY'), 'DAY') as day from VDHAVALESWARAPU.datecollected dc;

select DATENAME(dw, TO_DATE(dc.month || '/' || dc.day || '/' || dc.year, 'MM/DD/YYYY')) as day from VDHAVALESWARAPU.datecollected dc;

Select * from dateData;

Create View dateData AS
Select dc.date_id, dc.year, (dc.month || '/' || dc.day || '/' || dc.year) as date_str, TO_CHAR(TO_DATE(dc.month || '/' || dc.day || '/' || dc.year, 'MM/DD/YYYY'), 'WW') as week from VDHAVALESWARAPU.datecollected dc;


Create view getStateSites1 AS
Select site_code
from VDHAVALESWARAPU.State state
    join VDHAVALESWARAPU.County county on county.state_code = state.state_code
        join VDHAVALESWARAPU.Site site on site.county_code = county.county_code
where state_name = 'Florida';

drop view getStateSites1;

Select * from getStateSites1;

SELECT * FROM obs_temp;

Create view allPollObs AS
Select *
from VDHAVALESWARAPU.observation o
where (
    o.pollutant_code = (Select pollutant_code
                        from VDHAVALESWARAPU.pollutant p
                        where (
                            p.pollutant_name = 'Ozone'
                            )
                        )
    ) and (
        o.site_code in (Select *
                        from getStateSites1)
    );
    
select * from allPollObs;

Create View dateData1 as
Select dc.date_id,
    dc.year,
    to_char(to_date(dc.month || '/' || dc.day || '/' || dc.year, 'MM/DD/YYYY'), 'DAY') as DAY
from VDHAVALESWARAPU.datecollected dc;
Select * from dateData1;

select * from dateData1;

SELECT * FROM vdhavaleswarapu.observation;

Select dc.year, ap.max_hour, count(max_hour)
from allPollObs ap
    join dateData1 dc on ap.date_id = dc.date_id
group by dc.year, ap.max_hour
order by ap.max_hour, dc.year;
    



