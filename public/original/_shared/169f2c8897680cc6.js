
 (function () {
 var hub = document.getElementById('companySubfolderHub');
 if (!hub) return;
 hub.addEventListener('click', function (e) {
 var b = e.target.closest('[data-co-cat]');
 if (!b) return;
 e.preventDefault();
 var cat = b.getAttribute('data-co-cat') || 'ALL';
 var ps = hub.querySelectorAll('[data-co-cat]');
 for (var i = 0; i < ps.length; i++) ps[i].classList.toggle('active', ps[i] === b);
 var its = hub.querySelectorAll('[data-co-item-cat]');
 for (var j = 0; j < its.length; j++) {
 its[j].classList.toggle('co-hub-hidden', !(cat === 'ALL' || its[j].getAttribute('data-co-item-cat') === cat));
 }
 });
 })();
 