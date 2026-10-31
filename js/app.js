(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  var R = window.RESTAURANTS || [];
  var byId = {}; R.forEach(function (r) { byId[r.id] = r; });
  var STAR = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.8z"/></svg>';
  var HEART = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.5-9.2C1 8.3 3.2 4.5 7 4.5c2.1 0 3.6 1.2 5 3 1.4-1.8 2.9-3 5-3 3.8 0 6 3.8 4.5 7.3C19.5 16.4 12 21 12 21z"/></svg>';

  var ratingBadge = function (r) {
    return '<span class="rating ' + (r >= 4 ? "hi" : "mid") + '" aria-label="Rated ' + r.toFixed(1) + ' out of 5">' + r.toFixed(1) + " " + STAR + "</span>";
  };
  var price = function (p) { return (p % 1 ? p.toFixed(1) : p) + " SAR"; };

  /* ---------- Header ---------- */
  var toggle = $(".menu-toggle"), nav = $(".nav");
  if (toggle) toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
  });
  var page = document.body.dataset.page;
  $$(".nav a").forEach(function (a) { if (a.dataset.page === page) a.setAttribute("aria-current", "page"); });
  var y = $("#year"); if (y) y.textContent = new Date().getFullYear();

  /* ---------- Favorites ---------- */
  var favs = store.get("otg-favs", []);
  var isFav = function (id) { return favs.indexOf(id) > -1; };
  var toggleFav = function (id) {
    favs = isFav(id) ? favs.filter(function (f) { return f !== id; }) : favs.concat(id);
    store.set("otg-favs", favs);
  };

  /* ---------- Cards + menu dialog ---------- */
  var card = function (r) {
    var cat = (window.CATEGORIES[r.category] || {}).name || "";
    return '<article class="card">' +
      '<div class="card-img"><img src="' + esc(r.image) + '" alt="' + esc(r.name) + '" loading="lazy">' +
        '<span class="card-tag">' + esc(cat) + "</span>" +
        '<button type="button" class="fav" data-fav="' + r.id + '" aria-pressed="' + isFav(r.id) + '" aria-label="Save ' + esc(r.name) + ' to favourites">' + HEART + "</button>" +
      "</div>" +
      '<div class="card-body">' +
        '<div class="card-title"><h3>' + esc(r.name) + "</h3>" + ratingBadge(r.rating) + "</div>" +
        "<p>" + esc(r.tagline) + "</p>" +
        '<div class="card-foot"><button type="button" class="btn btn-primary" data-menu="' + r.id + '">View menu</button>' +
          '<span class="note">' + (r.menu.length ? r.menu.length + " items" : "Menu coming soon") + "</span></div>" +
      "</div></article>";
  };

  var dialog = $("#menu-dialog");
  var openMenu = function (id) {
    var r = byId[id]; if (!r || !dialog) return;
    var items = r.menu.length
      ? '<ul class="menu-list">' + r.menu.map(function (m) {
          return "<li><div><strong>" + esc(m.name) + "</strong>" + (m.isNew ? '<span class="new">New</span>' : "") +
            (m.desc ? "<small>" + esc(m.desc) + "</small>" : "") + '</div><span class="price">' + price(m.price) + "</span></li>";
        }).join("") + "</ul>"
      : '<p class="menu-empty">We haven\'t added this menu yet. Check back soon.</p>';
    $(".menu-head img", dialog).src = r.image;
    $(".menu-head img", dialog).alt = r.name;
    $(".menu-body", dialog).innerHTML =
      "<h3>" + esc(r.name) + "</h3>" +
      '<p class="menu-meta">' + ratingBadge(r.rating) + "<span>" + esc((window.CATEGORIES[r.category] || {}).name) + "</span></p>" +
      items +
      '<p style="margin-top:1.1rem"><a class="btn btn-ghost" href="reviews.html?restaurant=' + r.id + '#write">Review ' + esc(r.name) + "</a></p>";
    if (typeof dialog.showModal === "function") dialog.showModal();
  };
  if (dialog) {
    $(".close", dialog).addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
  }
  document.addEventListener("click", function (e) {
    var m = e.target.closest("[data-menu]"); if (m) { openMenu(m.dataset.menu); return; }
    var f = e.target.closest("[data-fav]");
    if (f) {
      toggleFav(f.dataset.fav);
      $$('[data-fav="' + f.dataset.fav + '"]').forEach(function (b) { b.setAttribute("aria-pressed", String(isFav(f.dataset.fav))); });
      if (page === "drive-thrus" && state.favs) render();
    }
  });

  /* ---------- Home ---------- */
  if (page === "home") {
    $("#specialties").innerHTML = (window.SPECIALTIES || []).map(function (s) {
      return '<article class="special"><img src="' + esc(s.image) + '" alt="' + esc(s.name) + '" loading="lazy"><div><h3>' +
        esc(s.name) + "</h3>" + (s.place ? "<p>" + esc(s.place) + "</p>" : "") + "</div></article>";
    }).join("");
    $$("[data-count]").forEach(function (el) {
      var n = R.filter(function (r) { return r.category === el.dataset.count; }).length;
      el.textContent = n + " drive-thrus";
    });
    var top = R.slice().sort(function (a, b) { return b.rating - a.rating; }).slice(0, 3);
    $("#top-rated").innerHTML = top.map(card).join("");
    $("#stat-places").textContent = R.length;
    $("#stat-items").textContent = R.reduce(function (n, r) { return n + r.menu.length; }, 0);
    $("#hero-search").addEventListener("submit", function (e) {
      e.preventDefault();
      var q = $("#hero-q").value.trim();
      location.href = "drive-thrus.html" + (q ? "?q=" + encodeURIComponent(q) : "");
    });
  }

  /* ---------- Drive-thrus ---------- */
  var state = { cat: "all", q: "", sort: "rating", favs: false };
  var render = function () {};
  if (page === "drive-thrus") {
    var params = new URLSearchParams(location.search);
    state.cat = params.get("category") || "all";
    state.q = params.get("q") || "";
    var chips = $("#chips"), grid = $("#grid"), q = $("#q"), sort = $("#sort");
    q.value = state.q;
    var cats = [["all", "All"]].concat(Object.keys(window.CATEGORIES).map(function (k) { return [k, window.CATEGORIES[k].name]; }));
    chips.innerHTML = cats.map(function (c) {
      var n = c[0] === "all" ? R.length : R.filter(function (r) { return r.category === c[0]; }).length;
      return '<button type="button" class="chip" data-cat="' + c[0] + '" aria-pressed="' + (state.cat === c[0]) + '">' + esc(c[1]) + ' <span class="n">' + n + "</span></button>";
    }).join("") + '<button type="button" class="chip" id="fav-chip" aria-pressed="false">' + HEART.replace('width="', 'width="') + " Saved</button>";
    $("#fav-chip svg").setAttribute("width", "16"); $("#fav-chip svg").setAttribute("height", "16");

    render = function () {
      var term = state.q.toLowerCase();
      var list = R.filter(function (r) {
        if (state.cat !== "all" && r.category !== state.cat) return false;
        if (state.favs && !isFav(r.id)) return false;
        if (!term) return true;
        var hay = [r.name, r.tagline].concat(r.menu.map(function (m) { return m.name + " " + (m.desc || ""); })).join(" ").toLowerCase();
        return hay.indexOf(term) > -1;
      });
      list.sort(state.sort === "name"
        ? function (a, b) { return a.name.localeCompare(b.name); }
        : function (a, b) { return b.rating - a.rating; });
      grid.innerHTML = list.length ? list.map(card).join("")
        : '<p class="empty">' + (state.favs ? "No saved drive-thrus yet. Tap the heart on any card to save it." : 'Nothing matches "' + esc(state.q) + '". Try another dish or choose All.') + "</p>";
      $("#result-count").textContent = list.length + (list.length === 1 ? " drive-thru" : " drive-thrus");
    };
    chips.addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      if (b.id === "fav-chip") { state.favs = !state.favs; b.setAttribute("aria-pressed", String(state.favs)); }
      else {
        state.cat = b.dataset.cat;
        $$(".chip[data-cat]", chips).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      }
      render();
    });
    q.addEventListener("input", function () { state.q = q.value.trim(); render(); });
    sort.addEventListener("change", function () { state.sort = sort.value; render(); });
    render();
  }

  /* ---------- Reviews ---------- */
  if (page === "reviews") {
    var mine = store.get("otg-reviews", []);
    var list = $("#review-list"), select = $("#r-place");
    select.innerHTML = '<option value="">Choose a drive-thru</option>' + R.map(function (r) { return '<option value="' + r.id + '">' + esc(r.name) + "</option>"; }).join("");
    var pre = new URLSearchParams(location.search).get("restaurant");
    if (pre && byId[pre]) select.value = pre;

    var renderReviews = function () {
      var all = mine.map(function (r) { r.mine = true; return r; }).concat(window.REVIEWS || []);
      list.innerHTML = all.map(function (r) {
        var place = byId[r.restaurant];
        return '<article class="review"><span class="stars" aria-label="' + r.stars + ' out of 5 stars">' + "★★★★★".slice(0, r.stars) + '<span style="color:#d6d4e5">' + "★★★★★".slice(r.stars) + "</span></span>" +
          "<blockquote>" + esc(r.text) + "</blockquote>" +
          "<footer><span><b>" + esc(r.name) + "</b>" + (r.mine ? '<span class="mine">Your review</span>' : "") + "</span>" +
          "<span>" + (place ? esc(place.name) : "") + "</span></footer></article>";
      }).join("");
      var avg = all.reduce(function (s, r) { return s + r.stars; }, 0) / all.length;
      $("#avg").textContent = avg.toFixed(1);
      $("#avg-count").textContent = "Average from " + all.length + " review" + (all.length === 1 ? "" : "s");
    };

    var form = $("#review-form");
    var check = function (el, ok, msg) {
      el.setAttribute("aria-invalid", String(!ok));
      $("#" + el.id + "-err").textContent = ok ? "" : msg;
      return ok;
    };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = $("#r-name"), text = $("#r-text"), star = $('input[name="stars"]:checked', form);
      var ok = [
        check(name, name.value.trim().length > 1, "Please enter your name."),
        check(select, !!select.value, "Please choose a drive-thru."),
        check(text, text.value.trim().length >= 10, "Please write at least 10 characters.")
      ].every(Boolean);
      $("#r-stars-err").textContent = star ? "" : "Please choose a star rating.";
      if (!ok || !star) return;
      mine.unshift({ name: name.value.trim(), restaurant: select.value, stars: Number(star.value), text: text.value.trim() });
      store.set("otg-reviews", mine);
      form.reset();
      $("#review-ok").hidden = false;
      renderReviews();
      list.firstElementChild.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    renderReviews();
  }

  /* ---------- Contact ---------- */
  if (page === "contact") {
    var cform = $("#contact-form");
    var rules = [
      ["c-name", function (v) { return v.length > 1; }, "Name is required."],
      ["c-email", function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }, "Please enter a valid email address."],
      ["c-subject", function (v) { return v.length > 1; }, "Subject is required."],
      ["c-message", function (v) { return v.length >= 10; }, "Please write at least 10 characters."]
    ];
    cform.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = rules.map(function (r) {
        var el = $("#" + r[0]), good = r[1](el.value.trim());
        el.setAttribute("aria-invalid", String(!good));
        $("#" + r[0] + "-err").textContent = good ? "" : r[2];
        return good;
      }).every(Boolean);
      if (!ok) { $('[aria-invalid="true"]', cform).focus(); return; }
      var body = $("#c-message").value.trim() + "\n\n" + $("#c-name").value.trim() + " (" + $("#c-email").value.trim() + ")";
      location.href = "mailto:OntheGo@gmail.com?subject=" + encodeURIComponent($("#c-subject").value.trim()) + "&body=" + encodeURIComponent(body);
      $("#contact-ok").hidden = false;
    });
  }
})();
