Create view getStateSitesCal AS
Select site_code
from VDHAVALESWARAPU.State state
    join VDHAVALESWARAPU.County county on county.state_code = state.state_code
        join VDHAVALESWARAPU.Site site on site.county_code = county.county_code
where state_name = 'California';

Create View dateData2 as
Select dc.date_id,
    dc.year,
    dc.month
from VDHAVALESWARAPU.datecollected dc;


Create VIEW allAQIObsCal AS
Select *
from VDHAVALESWARAPU.observation o
where (
        o.site_code in (Select *
                        from getStateSitesCal)
    );


create view dateWiseObsCal1 as
Select dc.year yr, dc.date_id dateID, dc.month mnth, avg(ap.aqi) avgApi
from allAQIObsCal ap, dateData2 dc 
where ap.date_id = dc.date_id and ap.aqi != 0
group by dc.year, dc.month, dc.date_id;


(select mnth, yr, count(avgApi)
from dateWiseObsCal1
where avgApi >= 25
group by mnth, yr);

(select mnth, yr, count(avgApi)
from dateWiseObsCal1
where avgApi >= 25
group by mnth, yr)
UNION
(select mnth, yr, 0
from dateWiseObsCal1
group by mnth, yr
having max(avgAPI) < 25);
