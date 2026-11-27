/* Finish menu labels without replacing the report engines or their event handlers. */
(function(){
 const root=document.documentElement;
 function sync(){
  const en=root.lang.startsWith('en'),dark=root.dataset.theme==='dark';
  const labels={Company:['公司研究','Company'],CorporateCulture:['企业文化','Culture'],SeniorExecutive:['管理团队','Leadership'],hardware:['硬件产品','Products'],software:['软件生态','Software']};
  document.querySelectorAll('#companySubfolderHub .co-hub-meta').forEach(n=>{const key=n.dataset.category||n.textContent.trim();n.dataset.category=key;if(labels[key])n.textContent=labels[key][en?1:0]});
  const sidebar=document.getElementById('muiSidebar'),toggle=document.getElementById('sidebarToggleBtn');
  if(sidebar)sidebar.setAttribute('aria-label',en?'Company reports and article contents':'公司研报与文章目录');
  const expanded=toggle?.getAttribute('aria-expanded')==='true';
  if(toggle){toggle.title=en?(expanded?'Collapse contents':'Expand contents'):(expanded?'收起目录':'展开目录');toggle.setAttribute('aria-label',toggle.title)}
  const theme=document.getElementById('appbarThemeBtn');
  if(theme){theme.title=en?(dark?'Switch to light mode':'Switch to dark mode'):(dark?'切换浅色模式':'切换深色模式');theme.setAttribute('aria-label',theme.title)}
  ['zh','en'].forEach(l=>document.getElementById(l==='zh'?'langZhBtn':'langEnBtn')?.setAttribute('aria-pressed',String(l===(en?'en':'zh'))));
 }
 const hub=document.getElementById('companySubfolderHub');if(hub)new MutationObserver(sync).observe(hub,{childList:true});
 new MutationObserver(sync).observe(root,{attributes:true,attributeFilter:['lang','data-theme','data-sidebar-collapsed']});
 document.getElementById('sidebarToggleBtn')?.addEventListener('click',()=>queueMicrotask(sync));
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',sync,{once:true});else sync();
})();
