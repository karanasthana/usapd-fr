SELECT SUM(COUNT) FROM
(SELECT table_name, to_number(extractvalue(xmltype(dbms_xmlgen.getxml('select count(*) c FROM '||owner||'.'||table_name)),'/ROWSET/ROW/C')) 
AS count 
FROM all_tables 
WHERE owner = 'VDHAVALESWARAPU');
