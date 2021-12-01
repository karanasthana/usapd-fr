DROP VIEW dateData;

--Create View dateData AS
--Select dc.date_id, dc.year, (dc.month || '/' || dc.day || '/' || dc.year) as date_str, TO_CHAR(TO_DATE(dc.month || '/' || dc.day || '/' || dc.year, 'MM/DD/YYYY'), 'DAY') as weekday from VDHAVALESWARAPU.datecollected dc;

Select * from dateData;

select * from VDHAVALESWARAPU.state;
select * from VDHAVALESWARAPU.site;
select * from VDHAVALESWARAPU.county;

Create view getStateSites1 AS
Select site_code
from VDHAVALESWARAPU.State state
    join VDHAVALESWARAPU.County county on county.state_code = state.state_code
        join VDHAVALESWARAPU.Site site on site.county_code = county.county_code
where state_name = 'Florida';
Select * from getStateSites1;

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
    
DROP VIEW dateData;
Create View dateData as
Select dc.date_id,
    dc.year,
    (dc.month || '/' || dc.day || '/' || dc.year) as date_str,
    to_char(to_date(dc.month || '/' || dc.day || '/' || dc.year, 'MM/DD/YYYY'), 'DAY') as weekday
from VDHAVALESWARAPU.datecollected dc;
Select * from dateData;

SELECT
    * FROM VDHAVALESWARAPU.observation;
    
    


Select dc.year,
    dc.weekday,
    avg(ap.arithmetic_mean)
from allPollObs ap
    join dateData dc on ap.date_id = dc.date_id
group by dc.year, dc.weekday
order by dc.weekday, dc.year;
