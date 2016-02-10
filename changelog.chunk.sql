@ apex/core/pages/f100_page_608.sql;

@ apex/core/pages/f100_page_358.sql;
@ apex/core/pages/f100_page_359.sql;

@ apex/core/lists/f100_list_meni-glavni.sql;

@ apex/core/pages/f100_page_696.sql;

@ apex/core/breadcrumbs/f100_breadcrumb_glavni.sql;
@ apex/core/pages/f100_page_138.sql;
@apex/core/pages/f100_page_139.sql;
@apex/core/pages/f100_page_345.sql;
@apex/core/pages/f100_page_348.sql;
--  PUŠTENO NA COTEST!!!!!!!!!!
alter table hrm.UTL_REPORT add VRSTA varchar2(20);
comment on column hrm.UTL_REPORT.VRSTA
  is 'Vrsta J-Jasper, B-BIP, R-Oracle reports';
@ hrm/views/v$utl_urt.sql;

update hrm.utl_report set vrsta='R' where kon_id=3000 and oznaka in ('r00230','r00247','r00270','r00263','r00334');
commit;

-- KRAJ PUŠTENO NA COTEST!!!!!!!!!!
grant execute on hrmbl.errors to hrmpr;

@hrmbl/packages/p$bl_obrpla.pkb;
@hrmbl/packages/p$bl_obrpla.pks;
@hrmbl/packages/p$bl_place_bilog.pkb;
@hrmbl/packages/place.pkb;
@hrmbl/packages/place_provjera.pkb;
@hrmbl/views/v$bl_plana.sql;
@hrmbl/views/v$bl_vrpri_formula.sql;