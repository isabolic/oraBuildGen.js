


SPOOL recompile.log




PRO schema sys ....


SET SCAN ON
CONNECT hrmpr/hrmpr@BILOG.HR.HRMB5
SET SCAN OFF
SET SERVEROUTPUT ON SIZE 1000000
WHENEVER SQLERROR CONTINUE


EXEC DBMS_UTILITY.compile_schema(schema => 'sys');
/



PRO schema hrm ....


SET SCAN ON
CONNECT hrm/hrm@BILOG.HR.HRMB5
SET SCAN OFF
SET SERVEROUTPUT ON SIZE 1000000
WHENEVER SQLERROR CONTINUE


EXEC DBMS_UTILITY.compile_schema(schema => 'hrm');
/



PRO schema hrmbl ....


SET SCAN ON
CONNECT hrmbl/hrmbl@BILOG.HR.HRMB5
SET SCAN OFF
SET SERVEROUTPUT ON SIZE 1000000
WHENEVER SQLERROR CONTINUE


EXEC DBMS_UTILITY.compile_schema(schema => 'hrmbl');
/



PRO schema hrmpr ....


SET SCAN ON
CONNECT hrmpr/hrmpr@BILOG.HR.HRMB5
SET SCAN OFF
SET SERVEROUTPUT ON SIZE 1000000
WHENEVER SQLERROR CONTINUE


EXEC DBMS_UTILITY.compile_schema(schema => 'hrmpr');
/



PRO schema hrm_natjecaj ....


SET SCAN ON
CONNECT hrm_natjecaj/hrm_natjecaj@BILOG.HR.HRMB5
SET SCAN OFF
SET SERVEROUTPUT ON SIZE 1000000
WHENEVER SQLERROR CONTINUE


EXEC DBMS_UTILITY.compile_schema(schema => 'hrm_natjecaj');
/



PRO schema hrm_portal ....


SET SCAN ON
CONNECT hrm_portal/hrm_portal@BILOG.HR.HRMB5
SET SCAN OFF
SET SERVEROUTPUT ON SIZE 1000000
WHENEVER SQLERROR CONTINUE


EXEC DBMS_UTILITY.compile_schema(schema => 'hrm_portal');
/



PRO schema hrm_flow ....


SET SCAN ON
CONNECT hrm_flow/hrm_flow@BILOG.HR.HRMB5
SET SCAN OFF
SET SERVEROUTPUT ON SIZE 1000000
WHENEVER SQLERROR CONTINUE


EXEC DBMS_UTILITY.compile_schema(schema => 'hrm_flow');
/


SPOOL OFF






SPOOL invalid.log




PRO schema sys ....


SET SCAN ON
CONNECT hrmpr/hrmpr@BILOG.HR.HRMB5
SET SCAN OFF
SET SERVEROUTPUT ON SIZE 1000000
WHENEVER SQLERROR CONTINUE


select Object_name || ', ' || object_type as invalid_objects from USER_OBJECTS where status != 'VALID';


PRO schema hrm ....


SET SCAN ON
CONNECT hrm/hrm@BILOG.HR.HRMB5
SET SCAN OFF
SET SERVEROUTPUT ON SIZE 1000000
WHENEVER SQLERROR CONTINUE


select Object_name || ', ' || object_type as invalid_objects from USER_OBJECTS where status != 'VALID';


PRO schema hrmbl ....


SET SCAN ON
CONNECT hrmbl/hrmbl@BILOG.HR.HRMB5
SET SCAN OFF
SET SERVEROUTPUT ON SIZE 1000000
WHENEVER SQLERROR CONTINUE


select Object_name || ', ' || object_type as invalid_objects from USER_OBJECTS where status != 'VALID';


PRO schema hrmpr ....


SET SCAN ON
CONNECT hrmpr/hrmpr@BILOG.HR.HRMB5
SET SCAN OFF
SET SERVEROUTPUT ON SIZE 1000000
WHENEVER SQLERROR CONTINUE


select Object_name || ', ' || object_type as invalid_objects from USER_OBJECTS where status != 'VALID';


PRO schema hrm_natjecaj ....


SET SCAN ON
CONNECT hrm_natjecaj/hrm_natjecaj@BILOG.HR.HRMB5
SET SCAN OFF
SET SERVEROUTPUT ON SIZE 1000000
WHENEVER SQLERROR CONTINUE


select Object_name || ', ' || object_type as invalid_objects from USER_OBJECTS where status != 'VALID';


PRO schema hrm_portal ....


SET SCAN ON
CONNECT hrm_portal/hrm_portal@BILOG.HR.HRMB5
SET SCAN OFF
SET SERVEROUTPUT ON SIZE 1000000
WHENEVER SQLERROR CONTINUE


select Object_name || ', ' || object_type as invalid_objects from USER_OBJECTS where status != 'VALID';


PRO schema hrm_flow ....


SET SCAN ON
CONNECT hrm_flow/hrm_flow@BILOG.HR.HRMB5
SET SCAN OFF
SET SERVEROUTPUT ON SIZE 1000000
WHENEVER SQLERROR CONTINUE


select Object_name || ', ' || object_type as invalid_objects from USER_OBJECTS where status != 'VALID';




SPOOL recompile.log




PRO schema sys ....


SET SCAN ON
CONNECT hrmpr/hrmpr@BILOG.HR.HRMB5
SET SCAN OFF
SET SERVEROUTPUT ON SIZE 1000000
WHENEVER SQLERROR CONTINUE


EXEC DBMS_UTILITY.compile_schema(schema => 'sys');
/



PRO schema hrm ....


SET SCAN ON
CONNECT hrm/hrm@BILOG.HR.HRMB5
SET SCAN OFF
SET SERVEROUTPUT ON SIZE 1000000
WHENEVER SQLERROR CONTINUE


EXEC DBMS_UTILITY.compile_schema(schema => 'hrm');
/



PRO schema hrmbl ....


SET SCAN ON
CONNECT hrmbl/hrmbl@BILOG.HR.HRMB5
SET SCAN OFF
SET SERVEROUTPUT ON SIZE 1000000
WHENEVER SQLERROR CONTINUE


EXEC DBMS_UTILITY.compile_schema(schema => 'hrmbl');
/



PRO schema hrmpr ....


SET SCAN ON
CONNECT hrmpr/hrmpr@BILOG.HR.HRMB5
SET SCAN OFF
SET SERVEROUTPUT ON SIZE 1000000
WHENEVER SQLERROR CONTINUE


EXEC DBMS_UTILITY.compile_schema(schema => 'hrmpr');
/



PRO schema hrm_natjecaj ....


SET SCAN ON
CONNECT hrm_natjecaj/hrm_natjecaj@BILOG.HR.HRMB5
SET SCAN OFF
SET SERVEROUTPUT ON SIZE 1000000
WHENEVER SQLERROR CONTINUE


EXEC DBMS_UTILITY.compile_schema(schema => 'hrm_natjecaj');
/



PRO schema hrm_portal ....


SET SCAN ON
CONNECT hrm_portal/hrm_portal@BILOG.HR.HRMB5
SET SCAN OFF
SET SERVEROUTPUT ON SIZE 1000000
WHENEVER SQLERROR CONTINUE


EXEC DBMS_UTILITY.compile_schema(schema => 'hrm_portal');
/



PRO schema hrm_flow ....


SET SCAN ON
CONNECT hrm_flow/hrm_flow@BILOG.HR.HRMB5
SET SCAN OFF
SET SERVEROUTPUT ON SIZE 1000000
WHENEVER SQLERROR CONTINUE


EXEC DBMS_UTILITY.compile_schema(schema => 'hrm_flow');
/


