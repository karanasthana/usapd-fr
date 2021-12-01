DROP VIEW dateData;

--Create View dateData AS
--Select dc.date_id, dc.year, (dc.month || '/' || dc.day || '/' || dc.year) as date_str, TO_CHAR(TO_DATE(dc.month || '/' || dc.day || '/' || dc.year, 'MM/DD/YYYY'), 'DAY') as weekday from VDHAVALESWARAPU.datecollected dc;

Select * from dateData;

select * from VDHAVALESWARAPU.state;
select * from VDHAVALESWARAPU.site;
select * from VDHAVALESWARAPU.county;

drop view getStateSites1;
Create view getStateSites1 AS
Select site_code
from VDHAVALESWARAPU.State state
    join VDHAVALESWARAPU.County county on county.state_code = state.state_code
        join VDHAVALESWARAPU.Site site on site.county_code = county.county_code
where state_name IN ('Florida', 'California');
Select * from getStateSites1;

drop view getStateFromSite;

create view getStateFromSite as
select site_code, state_name 
from VDHAVALESWARAPU.state s
join VDHAVALESWARAPU.site si on s.state_code = si.state_code;

select * from getstatefromsite;

DROP VIEW allPollObs;

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
        o.site_code in (Select site_code
                        from getStateSites1)
    );
    
DROP VIEW dateData1;
Create View dateData1 as
Select dc.date_id,
    dc.year,
    (dc.month || '/' || dc.day || '/' || dc.year) as date_str,
    to_char(to_date(dc.month || '/' || dc.day || '/' || dc.year, 'MM/DD/YYYY'), 'MM') as month
from VDHAVALESWARAPU.datecollected dc;
Select * from dateData1;

SELECT
    * FROM VDHAVALESWARAPU.observation;
    
    


Select dc.year,
    dc.month,
    s.state_name,
    avg(ap.arithmetic_mean)
from allPollObs ap
    join dateData1 dc on ap.date_id = dc.date_id
    join getstatefromsite s on s.site_code =ap.site_code
group by s.state_name, dc.year, dc.month
order by s.state_name, dc.month, dc.year;
