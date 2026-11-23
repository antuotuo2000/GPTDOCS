
 (function () {
 try {
 if (window.localStorage.getItem('arm_mui_portal_sidebar_collapsed_v1') === '1') {
 document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 }
 var d = window.localStorage.getItem('arm_mui_clarity_density_v1');
 if (d === 'compact') document.documentElement.setAttribute('data-density', 'compact');
 } catch (e) {}
 })();
 