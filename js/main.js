/* Site behaviour: smooth scroll, header, reveal animations, counters, marquee, pinned steps, process line, showpieces,
   section rails, dark section, photo drift, scroll dot, page transition. */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isDesktop = window.matchMedia("(min-width: 769px)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  var hasGsap = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";

  /* ========== Company info ==========
     Every page shows its company details, contact links, policy sheets and search data from these values. */
  var INFO = {
    company: "주식회사 트리페이먼츠",
    ceo: "이동근",
    address: "부산광역시 남구 용소로 14번길 10, 대성빌딩 4층",
    bizNo: "102-81-48634",
    mailOrderNo: "2026-부산남구-0609",
    tel: "1600-1268",
    fax: "070-7614-1095",
    mail: "treepayments@naver.com",
    hours: "평일 09:00 – 18:00",
    privacyOfficer: "김관우",
    policyDate: "2026년 1월 1일",
    site: "https://treepayments.net"
  };
  /* ========== /Company info ========== */

  /* ========== Privacy policy ========== */
  var PRIVACY = `
      <p>${INFO.company}(이하 "회사")는 「개인정보 보호법」 등 관련 법령을 지키며, 이용자의 개인정보를 안전하게 처리하기 위해 다음과 같이 개인정보처리방침을 둡니다. 이 방침은 회사가 운영하는 홈페이지와 결제 서비스 전반에 적용됩니다.</p>
      <h3>제1조 (수집하는 개인정보 항목)</h3>
      <p>회사는 상담과 계약, 서비스 제공을 위해 아래 정보를 수집합니다.</p>
      <ul>
        <li>가맹 상담: 이메일로 보내 주신 이름, 연락처, 이메일, 상호명, 업종</li>
        <li>가맹 계약: 대표자 이름, 생년월일, 사업자등록번호, 사업장 주소, 정산 계좌 정보</li>
        <li>홈페이지 이용 중 자동으로 생기는 정보: 접속 기록, 접속 IP</li>
      </ul>
      <h3>제2조 (개인정보의 수집 및 이용 목적)</h3>
      <p>회사는 수집한 개인정보를 다음 목적으로만 이용하며, 목적이 바뀌면 미리 동의를 받습니다.</p>
      <ul>
        <li>가맹 상담 응대와 심사, 계약 체결</li>
        <li>결제 연동과 결제 대금 정산</li>
        <li>단말기 제공, 장애 대응 등 서비스 운영</li>
        <li>관련 법령에 따른 기록 보관과 분쟁 대응</li>
      </ul>
      <h3>제3조 (개인정보의 보유 및 이용 기간)</h3>
      <p>회사는 이용 목적을 이루면 개인정보를 지체 없이 파기합니다. 다만 관련 법령에 따라 보관해야 하는 정보는 아래 기간 동안 보관합니다.</p>
      <ul>
        <li>전자금융거래에 관한 기록: 5년 (전자금융거래법)</li>
        <li>계약 또는 청약철회, 대금 결제 및 재화 공급에 관한 기록: 5년 (전자상거래법)</li>
        <li>소비자 불만 또는 분쟁 처리에 관한 기록: 3년 (전자상거래법)</li>
        <li>홈페이지 접속 기록: 3개월 (통신비밀보호법)</li>
      </ul>
      <h3>제4조 (개인정보의 제3자 제공)</h3>
      <p>회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 다만 결제 승인과 정산을 위해 카드사와 VAN사에 필요한 최소한의 정보를 전달하는 경우와, 법령에 따라 수사기관 등이 요구하는 경우에는 예외로 합니다.</p>
      <h3>제5조 (개인정보 처리의 위탁)</h3>
      <p>회사는 현재 개인정보 처리 업무를 외부에 맡기지 않습니다. 앞으로 위탁하게 되면 위탁받는 회사와 맡기는 업무를 이 방침에 공개하고, 위탁받은 회사가 개인정보를 안전하게 처리하도록 관리·감독합니다.</p>
      <h3>제6조 (이용자의 권리와 행사 방법)</h3>
      <p>이용자는 언제든 자신의 개인정보를 열람하거나 정정, 삭제, 처리 정지를 요구할 수 있습니다. 서면, 전화, 이메일로 요청하시면 회사는 10일 이내에 조치하고 결과를 알려 드립니다. 대리인을 통해 요청하실 때는 위임장을 함께 제출해 주셔야 합니다.</p>
      <h3>제7조 (개인정보의 파기 절차 및 방법)</h3>
      <p>파기 사유가 생긴 개인정보는 개인정보 보호책임자의 승인을 거쳐 파기합니다. 전자 파일은 복구할 수 없는 방법으로 지우고, 종이 문서는 분쇄하거나 소각합니다.</p>
      <h3>제8조 (개인정보의 안전성 확보 조치)</h3>
      <p>회사는 개인정보를 안전하게 지키기 위해 다음과 같은 조치를 하고 있습니다.</p>
      <ul>
        <li>관리적 조치: 내부 관리 계획 수립, 담당자 정기 교육</li>
        <li>기술적 조치: 접근 권한 관리, 중요 정보 암호화, 보안 프로그램 설치와 갱신</li>
        <li>물리적 조치: 전산실과 자료 보관실 출입 통제</li>
      </ul>
      <h3>제9조 (개인정보 보호책임자)</h3>
      <p>개인정보와 관련한 문의, 불만, 피해 구제는 아래 책임자에게 연락해 주시기 바랍니다.</p>
      <ul>
        <li>개인정보 보호책임자: ${INFO.privacyOfficer}</li>
        <li>전화: ${INFO.tel}</li>
        <li>이메일: ${INFO.mail}</li>
      </ul>
      <h3>제10조 (권익침해 구제 방법)</h3>
      <p>개인정보 침해로 인한 구제를 받으려면 아래 기관에 분쟁 해결이나 상담을 신청할 수 있습니다.</p>
      <ul>
        <li>개인정보분쟁조정위원회: 1833-6972 (www.kopico.go.kr)</li>
        <li>개인정보침해신고센터: 118 (privacy.kisa.or.kr)</li>
        <li>대검찰청: 1301 (www.spo.go.kr)</li>
        <li>경찰청: 182 (ecrm.police.go.kr)</li>
      </ul>
      <h3>제11조 (방침의 변경)</h3>
      <p>이 방침이 바뀌면 시행 7일 전부터 홈페이지를 통해 알려 드립니다.</p>
      <p class="sheet__date">이 방침은 ${INFO.policyDate}부터 적용합니다.</p>`;
  /* ========== /Privacy policy ========== */

  /* ========== Terms of service ========== */
  var TERMS = `
      <h3>제1조 (목적)</h3>
      <p>이 약관은 ${INFO.company}(이하 "회사")가 제공하는 결제 연동·정산 서비스와 관련 부가 서비스의 이용 조건과 절차, 회사와 가맹점의 권리와 의무를 정하는 것을 목적으로 합니다.</p>
      <h3>제2조 (용어의 정의)</h3>
      <p>이 약관에서 쓰는 용어의 뜻은 다음과 같습니다.</p>
      <ul>
        <li>"서비스"란 회사가 제공하는 PG 단말기, 정산, 매출관리 전산, 온라인 결제 연동 서비스를 말합니다.</li>
        <li>"가맹점"이란 이 약관에 동의하고 회사와 가맹 계약을 맺은 사업자를 말합니다.</li>
        <li>"결제 대금"이란 가맹점의 고객이 결제한 금액에서 수수료를 뺀 금액을 말합니다.</li>
        <li>"정산"이란 회사가 결제 대금을 가맹점에 지급하는 것을 말합니다.</li>
      </ul>
      <h3>제3조 (약관의 게시와 변경)</h3>
      <p>회사는 이 약관을 홈페이지에 게시합니다. 회사는 관련 법령을 어기지 않는 범위에서 약관을 바꿀 수 있으며, 바꿀 때는 적용일 7일 전부터 알립니다. 가맹점에 불리하게 바뀌는 경우에는 30일 전부터 알립니다.</p>
      <h3>제4조 (이용 계약의 성립)</h3>
      <p>이용 계약은 가맹점이 되려는 사업자가 약관에 동의하고 신청한 뒤, 회사가 심사를 거쳐 승낙하면 성립합니다.</p>
      <h3>제5조 (가맹 심사와 계약 제한)</h3>
      <p>회사는 신청 내용과 제출 서류를 확인해 가맹 여부를 정합니다. 신청 내용이 사실과 다르거나, 관련 법령이 제한하는 업종이거나, 카드사가 승인을 거절한 경우에는 계약을 맺지 않을 수 있습니다.</p>
      <h3>제6조 (서비스의 내용)</h3>
      <p>회사가 제공하는 서비스는 다음과 같습니다.</p>
      <ul>
        <li>PG 단말기 제공과 관리</li>
        <li>결제 대금 정산과 전자지갑 송금</li>
        <li>매출과 수수료를 확인하는 전산 제공</li>
        <li>쇼핑몰과 앱의 온라인 결제 연동</li>
      </ul>
      <h3>제7조 (수수료와 정산)</h3>
      <p>가맹점은 계약서에 정한 수수료를 회사에 지급합니다. 회사는 정해진 정산 주기에 따라 결제 대금을 가맹점의 전자지갑 또는 등록된 계좌로 지급합니다. 취소나 환불이 생긴 금액은 다음 정산에서 빼고 지급합니다.</p>
      <h3>제8조 (회사의 의무)</h3>
      <p>회사는 관련 법령과 이 약관을 지키며 서비스를 안정적으로 제공하기 위해 노력합니다. 서비스 장애가 생기면 지체 없이 복구하고, 가맹점의 정보를 안전하게 관리합니다.</p>
      <h3>제9조 (가맹점의 의무)</h3>
      <p>가맹점은 실제 거래에 대해서만 결제를 받아야 하며, 신용카드 회원을 부당하게 차별하거나 결제 대금을 나눠 받아서는 안 됩니다. 사업자 정보나 정산 계좌가 바뀌면 바로 회사에 알려야 합니다.</p>
      <h3>제10조 (서비스의 중단)</h3>
      <p>회사는 설비 점검, 교체, 고장, 통신 두절 등의 사유가 있으면 서비스를 일시 중단할 수 있습니다. 미리 알 수 있는 중단은 사전에 알리고, 그렇지 못한 경우에는 사후에 바로 알립니다.</p>
      <h3>제11조 (계약의 해지)</h3>
      <p>가맹점은 언제든 회사에 해지를 요청할 수 있습니다. 회사는 가맹점이 이 약관을 어기거나 부정 거래가 확인된 경우 계약을 해지할 수 있으며, 해지 전에 이유를 알립니다.</p>
      <h3>제12조 (손해배상)</h3>
      <p>회사 또는 가맹점이 이 약관을 어겨 상대방에게 손해를 입힌 경우, 그 손해를 배상해야 합니다.</p>
      <h3>제13조 (면책)</h3>
      <p>회사는 천재지변, 전쟁, 정전 등 불가항력으로 서비스를 제공할 수 없는 경우 책임을 지지 않습니다. 가맹점의 잘못으로 생긴 서비스 이용 장애에 대해서도 책임을 지지 않습니다.</p>
      <h3>제14조 (분쟁의 해결)</h3>
      <p>이 약관과 관련한 분쟁은 회사와 가맹점이 성실히 협의해 해결합니다. 협의로 해결되지 않으면 민사소송법에 따른 관할 법원에서 해결합니다.</p>
      <p class="sheet__date">이 약관은 ${INFO.policyDate}부터 시행합니다.</p>`;
  /* ========== /Terms of service ========== */

  /* The values written into the page as soon as the script runs, before anything is measured or shown: each
     [data-info] element takes its value, email and phone links their address, the two sheets are built into the
     footer, and the home page gets its structured company data. */
  function applyInfo() {
    document.querySelectorAll("[data-info]").forEach(function (el) {
      var value = INFO[el.getAttribute("data-info")];
      if (value != null) el.textContent = value;
    });
    document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) { a.href = "mailto:" + INFO.mail; });
    var dial = "tel:" + INFO.tel.replace(/[^0-9+]/g, "");
    document.querySelectorAll('a[href^="tel:"]').forEach(function (a) { a.href = dial; });

    var footer = document.querySelector(".footer");
    if (footer && !document.getElementById("privacy")) {
      [["privacy", "개인정보처리방침", PRIVACY], ["terms", "이용약관", TERMS]].forEach(function (s) {
        var sheet = document.createElement("dialog");
        sheet.className = "sheet";
        sheet.id = s[0];
        sheet.setAttribute("aria-labelledby", s[0] + "-title");
        sheet.innerHTML =
          '<div class="sheet__head"><span class="sheet__grip" aria-hidden="true"></span>' +
          '<h2 class="sheet__title" id="' + s[0] + '-title">' + s[1] + '</h2>' +
          '<button class="sheet__close" type="button" aria-label="닫기"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button></div>' +
          '<div class="sheet__body" data-lenis-prevent>' + s[2] + '</div>';
        footer.appendChild(sheet);
      });
    }

    if (!document.body.classList.contains("is-sub")) {
      var desc = document.querySelector('meta[name="description"]');
      var org = {
        "@type": "Organization",
        "@id": INFO.site + "/#organization",
        "name": INFO.company,
        "alternateName": ["트리페이먼츠", "Treepayments"],
        "url": INFO.site + "/",
        "logo": INFO.site + "/assets/logo/logo.png",
        "image": INFO.site + "/assets/img/og.jpg",
        "description": desc ? desc.content : "",
        "email": INFO.mail,
        "telephone": "+82-" + INFO.tel,
        "faxNumber": "+82-" + INFO.fax.replace(/^0/, ""),
        "taxID": INFO.bizNo,
        "address": { "@type": "PostalAddress", "streetAddress": INFO.address, "addressCountry": "KR" },
        "contactPoint": { "@type": "ContactPoint", "contactType": "customer service", "email": INFO.mail, "telephone": "+82-" + INFO.tel, "areaServed": "KR", "availableLanguage": "Korean" }
      };
      var ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [org, { "@type": "WebSite", "@id": INFO.site + "/#website", "url": INFO.site + "/", "name": "트리페이먼츠", "inLanguage": "ko-KR", "publisher": { "@id": INFO.site + "/#organization" } }]
      });
      document.head.appendChild(ld);
    }
  }
  applyInfo();

  if (hasGsap) {
    /* no automatic re-measure at "load": it lands in the middle of the first screen's motion; init() does it once
       that motion is over, or at the first sign of scrolling */
    ScrollTrigger.config({ autoRefreshEvents: "visibilitychange,DOMContentLoaded,resize" });
    gsap.registerPlugin(ScrollTrigger);
    /* The mobile address bar showing and hiding should not re-measure every trigger mid-scroll */
    ScrollTrigger.config({ ignoreMobileResize: true });
  } else {
    /* Without the animation library nothing would fade in, so show everything as is */
    document.documentElement.classList.remove("js");
  }

  var EASE = "expo.out";
  var DUR = 0.7;

  function tokenPx(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name);
    var n = parseFloat(v);
    return isNaN(n) ? fallback : n;
  }

  /* Easing curves are read from tokens.css so CSS and script share one definition.
     GSAP has no cubic-bezier ease built in, so the curve is solved here (Newton steps, then bisection). */

  function bezier(x1, y1, x2, y2) {
    var cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
    var cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    function curveX(t) { return ((ax * t + bx) * t + cx) * t; }
    function curveY(t) { return ((ay * t + by) * t + cy) * t; }
    function slopeX(t) { return (3 * ax * t + 2 * bx) * t + cx; }
    return function (x) {
      var t = x;
      for (var i = 0; i < 8; i++) {
        var err = curveX(t) - x;
        if (Math.abs(err) < 1e-5) return curveY(t);
        var d = slopeX(t);
        if (Math.abs(d) < 1e-6) break;
        t -= err / d;
      }
      var lo = 0, hi = 1;
      t = x;
      while (hi - lo > 1e-6) {
        var v = curveX(t);
        if (Math.abs(v - x) < 1e-5) break;
        if (x > v) lo = t; else hi = t;
        t = (lo + hi) / 2;
      }
      return curveY(t);
    };
  }

  function easeToken(name) {
    var value = getComputedStyle(document.documentElement).getPropertyValue(name);
    var m = value.match(/cubic-bezier\(([^)]+)\)/);
    if (!m) return "power2.out";
    var p = m[1].split(",").map(parseFloat);
    return bezier(p[0], p[1], p[2], p[3]);
  }

  function formatNumber(value, decimals) {
    var fixed = value.toFixed(decimals);
    var parts = fixed.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  /* Scroll speed in pixels per millisecond, shared by the marquee and the scroll dot.
     The position is taken from scroll events, so the frame loop never reads layout,
     and the loop sleeps once every listener reports that it has settled (returns false). */

  var scrollFrame = { fns: [], y: 0, lastY: 0, t: 0, running: false };

  function wakeScrollFrame() {
    if (scrollFrame.running) return;
    scrollFrame.running = true;
    scrollFrame.t = performance.now();
    requestAnimationFrame(function loop(now) {
      var dt = Math.max(1, now - scrollFrame.t);
      var v = (scrollFrame.y - scrollFrame.lastY) / dt;
      scrollFrame.lastY = scrollFrame.y;
      scrollFrame.t = now;
      var busy = v !== 0;
      scrollFrame.fns.forEach(function (f) { if (f(v)) busy = true; });
      if (busy) requestAnimationFrame(loop);
      else scrollFrame.running = false;
    });
  }

  function onScrollFrame(fn) {
    if (!scrollFrame.fns.length) {
      scrollFrame.y = scrollFrame.lastY = window.scrollY;
      window.addEventListener("scroll", function () {
        scrollFrame.y = window.scrollY;
        wakeScrollFrame();
      }, { passive: true });
    }
    scrollFrame.fns.push(fn);
  }

  /* Smooth scroll */

  var lenis = null;

  function scrollToTop() {
    if (lenis) lenis.scrollTo(0, { duration: tokenPx("--dur-slow", 1.2), easing: motion.easeInout });
    else window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  function initSmoothScroll() {
    if (!hasGsap || reduceMotion || !finePointer || typeof Lenis === "undefined") return;

    lenis = new Lenis({ lerp: 0.12, smoothWheel: true });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -tokenPx("--header-h", 72) });
      });
    });

    /* Lenis smooths only the wheel. A key pressed while the page is still gliding would be overridden by the glide,
       so Home and End glide to the ends themselves and the other scrolling keys stop the glide first. */
    window.addEventListener("keydown", function (e) {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      var el = e.target;
      if (el.isContentEditable || /^(input|textarea|select)$/i.test(el.tagName)) return;
      if (e.key === "Home" || e.key === "End") {
        e.preventDefault();
        /* The page can grow after load (images, pinned sections), so the bottom is measured now */
        lenis.resize();
        lenis.scrollTo(e.key === "Home" ? 0 : document.documentElement.scrollHeight - window.innerHeight, { duration: tokenPx("--dur-slow", 1.2), easing: motion.easeInout });
      } else if (/^(PageUp|PageDown|ArrowUp|ArrowDown| )$/.test(e.key) && lenis.isScrolling) {
        lenis.scrollTo(window.scrollY, { immediate: true });
      }
    });
  }

  /* Header */

  function initHeader() {
    var header = document.querySelector(".header");
    if (!header) return;

    var toggle = header.querySelector(".header__toggle");
    var menu = document.querySelector(".menu");

    /* The header markup is identical on every page, so the current page is marked here */
    var page = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".header__nav a, .menu__list a").forEach(function (a) {
      if (a.getAttribute("href") === page) {
        a.classList.add("is-active");
        a.setAttribute("aria-current", "page");
      }
    });

    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 10);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (!toggle || !menu) return;

    function setOpen(open) {
      header.classList.toggle("is-open", open);
      menu.classList.toggle("is-open", open);
      document.body.classList.toggle("is-locked", open);
      toggle.setAttribute("aria-expanded", String(open));
    }

    toggle.addEventListener("click", function () {
      setOpen(!header.classList.contains("is-open"));
    });

    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) setOpen(false);
    });
  }

  /* Reveal: text starts blurred and sharpens, photos and tiles rise without blur (DESIGN.md 5-2) */

  var motion = {};
  var HEADING = ".t-display, .t-h1, .t-h2";
  var HEADS = ".section__head, .hero__head";

  function readMotion() {
    motion.y = tokenPx("--reveal-y", 24);
    motion.blur = tokenPx("--reveal-blur", 16);
    motion.riseY = tokenPx("--rise-y", 120);
    motion.dur = tokenPx("--dur-reveal", 1);
    motion.durRise = tokenPx("--dur-rise", 0.8);
    motion.stagger = tokenPx("--reveal-stagger", 0.1);
    motion.focusBlur = tokenPx("--focus-blur", 6);
    motion.focusDim = tokenPx("--focus-dim", 0.15);
    motion.focusStagger = tokenPx("--focus-stagger", 0.12);
    motion.durUnveil = tokenPx("--dur-unveil", 1.4);
    motion.unveilScale = tokenPx("--unveil-scale", 1.3);
    motion.parallaxScale = tokenPx("--parallax-scale", 1.1);
    motion.parallaxShift = tokenPx("--parallax-shift", 4);
    motion.easeText = easeToken("--ease-text");
    motion.easeHeading = easeToken("--ease-heading");
    motion.easeRise = easeToken("--ease-out");
    motion.easeInout = easeToken("--ease-inout");
  }

  /* The photo frame inside a revealed element, if the element is a photo rather than a tile */
  function mediaOf(el) {
    if (el.matches(".media")) return el;
    if (el.matches(".section__visual") && !el.querySelector(".tile")) return el.querySelector(".media");
    return null;
  }

  /* Large section photos sit slightly enlarged so they can drift inside their frame */
  function restScale(img) {
    return img.closest(".section") && img.closest(".media--xl") ? motion.parallaxScale : 1;
  }

  function kindOf(el) {
    var type = el.getAttribute("data-reveal");
    if (el.matches(".marquee")) return "stream";
    if (type === "rise" || type === "fade" || type === "focus") return type;
    if (mediaOf(el)) return "unveil";
    if (el.matches(".tile, .section__visual")) return "rise";
    if (el.matches(HEADING)) return "heading";
    if (el.matches(".btn, .link-arrow")) return "action";
    return "text";
  }

  /* Wrap each word in an inline-block span. Inline elements such as .accent stay inside their word. */
  function splitWords(el) {
    if (el.wordSpans) return el.wordSpans;
    var words = [];
    var frag = document.createDocumentFragment();
    var current = null;

    function add(text, wrapper) {
      text.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          current = null;
          frag.appendChild(document.createTextNode(" "));
          return;
        }
        if (!current) {
          current = document.createElement("span");
          current.className = "word";
          frag.appendChild(current);
          words.push(current);
        }
        var piece = wrapper ? wrapper.cloneNode(false) : document.createTextNode(part);
        if (wrapper) piece.textContent = part;
        current.appendChild(piece);
      });
    }

    Array.prototype.slice.call(el.childNodes).forEach(function (node) {
      if (node.nodeType === 3) add(node.textContent, null);
      else if (node.nodeName === "BR") { current = null; frag.appendChild(node); }
      else if (node.nodeType === 1 && node.hasAttribute("data-keep")) {
        /* Kept whole as one word, inner structure and all (the hero blank) */
        current = document.createElement("span");
        current.className = "word";
        current.appendChild(node);
        frag.appendChild(current);
        words.push(current);
      }
      else if (node.nodeType === 1) add(node.textContent, node);
    });

    el.textContent = "";
    el.appendChild(frag);
    el.wordSpans = words;
    splitHeadings.push(el);
    return words;
  }

  /* Line number of each word. Reading word positions in the middle of scrolling would force the whole page to be
     laid out again (a visible stutter), so all headings are measured together in one go: at start, when the web
     font has loaded, and after a resize. */
  var splitHeadings = [];

  function measureLines(el) {
    var tops = [];
    el.wordLines = el.wordSpans.map(function (w) {
      var top = Math.round(w.offsetTop);
      var i = tops.indexOf(top);
      if (i < 0) { tops.push(top); i = tops.length - 1; }
      return i;
    });
  }

  function measureAllLines() {
    splitHeadings.forEach(measureLines);
  }

  function lineOf(el) {
    if (!el.wordLines) measureLines(el);
    return el.wordLines;
  }

  function hide(el, kind) {
    var blur = "blur(" + motion.blur + "px)";
    if (kind === "unveil") {
      var media = mediaOf(el);
      var img = media.querySelector("img");
      media.revealRadius = getComputedStyle(media).borderTopLeftRadius;
      gsap.set(el, { opacity: 1 });
      gsap.set(media, { clipPath: "inset(100% 0% 0% 0% round " + media.revealRadius + ")" });
      if (img && !img.closest(".hero")) gsap.set(img, { scale: motion.unveilScale });
    } else if (kind === "stream") {
      gsap.set(el, { opacity: 1 });
      /* Staggered cards keep their own vertical offset (.stream__item--up), so the rise is added to it */
      Array.prototype.forEach.call(el.querySelector(".marquee__track").children, function (item) {
        item.restY = gsap.getProperty(item, "y");
        if (item.querySelector(".media")) gsap.set(item, { opacity: 0, y: item.restY + motion.riseY });
        else gsap.set(item, { opacity: 0, y: item.restY + motion.y, filter: blur });
      });
    } else if (kind === "heading" || kind === "focus") {
      var words = splitWords(el);
      gsap.set(el, { opacity: 1 });
      if (kind === "focus") gsap.set(words, { opacity: motion.focusDim, filter: "blur(" + motion.focusBlur + "px)" });
      else gsap.set(words, { opacity: 0, y: motion.y, filter: blur });
    } else if (kind === "rise") {
      gsap.set(el, { opacity: 0, y: motion.riseY });
    } else if (kind === "fade") {
      gsap.set(el, { opacity: 0 });
    } else if (kind === "action") {
      gsap.set(el, { opacity: 0, y: motion.y });
    } else {
      gsap.set(el, { opacity: 0, y: motion.y, filter: blur });
    }
  }

  /* Adds one element to a timeline at a time position and returns how long the next item should wait */
  function show(tl, el, kind, at) {
    if (kind === "heading") {
      var words = el.wordSpans;
      var lines = lineOf(el);
      words.forEach(function (w, i) {
        tl.to(w, { opacity: 1, y: 0, filter: "blur(0px)", duration: motion.dur, ease: motion.easeHeading, clearProps: "filter,transform" }, at + lines[i] * motion.stagger);
      });
      return (Math.max.apply(null, lines) + 2) * motion.stagger;
    }
    if (kind === "focus") {
      /* Time-based, not tied to the scroll position, so the words never stay blurred when scrolling stops */
      var dim = el.wordSpans;
      dim.forEach(function (w, i) {
        tl.to(w, { opacity: 1, filter: "blur(0px)", duration: motion.dur, ease: motion.easeText, clearProps: "filter" }, at + i * motion.focusStagger);
      });
      return (dim.length - 1) * motion.focusStagger + 2 * motion.stagger;
    }
    if (kind === "unveil") {
      var media = mediaOf(el);
      var img = media.querySelector("img");
      tl.to(media, { clipPath: "inset(0% 0% 0% 0% round " + media.revealRadius + ")", duration: motion.durUnveil, ease: motion.easeInout, clearProps: "clipPath" }, at);
      if (img && !img.closest(".hero")) tl.to(img, { scale: restScale(img), duration: motion.durUnveil + 0.2, ease: motion.easeRise }, at);
      return motion.stagger;
    }
    if (kind === "stream") {
      /* Copies of the same item come in together, so whatever part of the moving strip is on screen appears at once */
      var track = el.querySelector(".marquee__track");
      var size = track.setSize || track.children.length;
      Array.prototype.forEach.call(track.children, function (item, i) {
        var card = !!item.querySelector(".media");
        tl.to(item, card
          ? { opacity: 1, y: item.restY, duration: motion.durRise, ease: motion.easeRise, clearProps: "transform" }
          : { opacity: 1, y: item.restY, filter: "blur(0px)", duration: motion.dur, ease: motion.easeText, clearProps: "filter,transform" },
        at + (i % size) * motion.stagger);
      });
      return motion.stagger;
    }
    var vars = { opacity: 1, duration: motion.dur, ease: motion.easeText, clearProps: "filter,transform" };
    if (kind === "rise") {
      vars.y = 0;
      vars.duration = motion.durRise;
      vars.ease = motion.easeRise;
    } else if (kind !== "fade") {
      vars.y = 0;
      if (kind === "text") vars.filter = "blur(0px)";
    }
    tl.to(el, vars, at);
    return kind === "text" ? 2 * motion.stagger : motion.stagger;
  }

  /* Plays label → heading lines → lead → button as one sequence */
  function sequence(items, delay) {
    var tl = gsap.timeline({ delay: delay || 0 });
    var t = 0;
    items.forEach(function (el) {
      t += parseFloat(el.getAttribute("data-reveal-delay")) || 0;
      t += show(tl, el, kindOf(el), t);
    });
    return tl;
  }

  function initReveal() {
    if (!hasGsap || reduceMotion) return;

    var heads = [];
    var singles = [];

    gsap.utils.toArray("[data-reveal]").forEach(function (el) {
      /* a section with a title intro brings in its own words and content (initTitleIntro, initForge) */
      if (el.closest(".has-intro")) return;
      var kind = kindOf(el);
      hide(el, kind);

      var head = el.parentElement && el.parentElement.matches(HEADS) ? el.parentElement : null;
      if (!head) { singles.push(el); return; }
      if (heads.indexOf(head) < 0) heads.push(head);
    });

    heads.forEach(function (head) {
      var items = Array.prototype.filter.call(head.children, function (el) {
        return el.hasAttribute("data-reveal");
      });
      if (!items.length) return;
      ScrollTrigger.create({ trigger: head, start: "top 80%", once: true, onEnter: function () { sequence(items); } });
    });

    singles.forEach(function (el) {
      ScrollTrigger.create({ trigger: el, start: "top 85%", once: true, onEnter: function () { sequence([el]); } });
    });

    gsap.utils.toArray("[data-reveal-group]").forEach(function (group) {
      var items = Array.prototype.slice.call(group.children);
      items.forEach(function (el) { hide(el, "text"); });
      ScrollTrigger.create({
        trigger: group,
        start: "top 85%",
        once: true,
        onEnter: function () {
          var tl = gsap.timeline();
          items.forEach(function (el, i) { show(tl, el, "text", i * motion.stagger); });
        }
      });
    });
  }

  /* Number counters */

  function initCounters() {
    var els = document.querySelectorAll("[data-count]");
    if (!els.length) return;
    var barsMove = hasGsap && !reduceMotion;

    els.forEach(function (el) {
      /* Numbers on growing bars count with their bar (initStatBars) */
      if (barsMove && el.closest(".stats--bars")) return;
      var target = parseFloat(el.getAttribute("data-count"));
      var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
      var prefix = el.getAttribute("data-prefix") || "";
      var suffix = el.getAttribute("data-suffix") || "";

      function render(v) {
        el.textContent = prefix + formatNumber(v, decimals) + suffix;
      }

      if (!hasGsap || reduceMotion) {
        render(target);
        return;
      }

      render(0);
      var state = { v: 0 };
      gsap.to(state, {
        v: target,
        duration: 1.6,
        ease: EASE,
        delay: 0.2,
        onUpdate: function () { render(state.v); },
        /* Same point as the reveal of the numbers, so they count up while they come in */
        scrollTrigger: { trigger: el, start: "top 85%", once: true }
      });
    });
  }

  /* Marquee */

  /* The track slides by half its width, so its two halves must be identical and each half must be wider than
     the widest screen; otherwise the end of the strip shows up empty. The items are repeated as often as needed
     and the loop time grows with the repeats, so the speed stays the same. */
  function initMarquee() {
    document.querySelectorAll(".marquee__track").forEach(function (track) {
      if (track.getAttribute("data-cloned")) return;
      var items = Array.prototype.slice.call(track.children);
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      var setWidth = items.reduce(function (w, item) { return w + item.getBoundingClientRect().width + gap; }, 0);
      var widest = Math.max(window.screen.width || 0, window.innerWidth);
      var spare = track.querySelector("img") ? 0 : 1;
      var repeats = setWidth > 0 ? Math.ceil(widest / setWidth) + spare : 1;
      for (var r = 0; r < repeats * 2 - 1; r++) {
        items.forEach(function (item) {
          var clone = item.cloneNode(true);
          clone.setAttribute("aria-hidden", "true");
          track.appendChild(clone);
        });
      }
      track.style.setProperty("--marquee-repeat", repeats);
      track.setAttribute("data-cloned", "true");
      track.setSize = items.length;
    });
  }

  /* Marquees run faster while the page scrolls and slow down under the mouse (they never stop),
     always easing towards the new speed */
  function initMarqueeSpeed() {
    if (reduceMotion) return;
    var tracks = Array.prototype.slice.call(document.querySelectorAll(".marquee__track"));
    if (!tracks.length || !tracks[0].getAnimations) return;
    var boost = tokenPx("--marquee-boost", 5);
    var states = tracks.map(function (track) { return { track: track, anims: [], rate: 1, applied: 1, hover: false }; });

    /* Collected once (and after a resize); asking for them every frame would force a style update */
    function collect() {
      states.forEach(function (st) { st.anims = st.track.getAnimations(); st.applied = 0; });
    }
    collect();
    window.addEventListener("resize", collect);

    states.forEach(function (st) {
      var marquee = st.track.parentElement;
      marquee.addEventListener("pointerenter", function (e) {
        if (e.pointerType !== "mouse") return;
        st.hover = true;
        wakeScrollFrame();
      });
      marquee.addEventListener("pointerleave", function () {
        st.hover = false;
        wakeScrollFrame();
      });
    });

    onScrollFrame(function (v) {
      var scrolling = Math.abs(v) > 0.05;
      var speed = 1 + Math.min(boost - 1, Math.abs(v) * 2.2);
      var busy = false;
      states.forEach(function (st) {
        var target = speed * (st.hover ? 0.3 : 1);
        st.rate += (target - st.rate) * (target > st.rate ? (scrolling ? 0.2 : 0.05) : 0.05);
        if (Math.abs(st.rate - target) < 0.005) st.rate = target;
        if (Math.abs(st.rate - st.applied) >= 0.02 || (st.rate === target && st.applied !== target)) {
          st.applied = st.rate;
          st.anims.forEach(function (a) { a.playbackRate = st.rate; });
        }
        if (st.rate !== target) busy = true;
      });
      return busy;
    });
  }

  /* Showpieces */

  var showpieces = [];

  function registerShowpiece(el, controller) {
    el.setAttribute("data-sp-ready", "true");
    showpieces.push({ el: el, play: controller.play, pause: controller.pause, restart: controller.restart || controller.play, showcase: controller.showcase });
    return controller;
  }

  /* A scene shown once: from its start up to its result ("peak"), where it stays; done() when it gets there. What
     the scene's callbacks set is put back by reset(); its tweens go back by themselves when it jumps to its start. */
  function showcase(tl, reset) {
    var run = null;
    return function (done) {
      if (run) run.kill();
      tl.pause(0);
      if (reset) reset();
      run = tl.tweenFromTo(0, "peak", { onComplete: function () { run = null; if (done) done(); } });
      return { kill: function () { if (run) { run.kill(); run = null; } } };
    };
  }

  function controllerFor(el) {
    for (var i = 0; i < showpieces.length; i++) {
      if (showpieces[i].el === el || showpieces[i].el.contains(el) || el.contains(showpieces[i].el)) return showpieces[i];
    }
    return null;
  }

  function spTerminal(el) {
    var card = el.querySelector(".mock-card");
    var rings = el.querySelectorAll(".term__ring");
    var idle = el.querySelector(".term__idle");
    var done = el.querySelector(".term__done");
    var check = el.querySelector(".term__check");

    gsap.set(card, { x: 150, y: 130, rotate: -14, opacity: 0 });
    gsap.set(done, { opacity: 0 });
    gsap.set(check, { scale: 0.6 });

    var tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.2 });
    tl.to(card, { x: 0, y: 0, rotate: -8, opacity: 1, duration: 1, ease: EASE })
      .addLabel("tap")
      .fromTo(rings, { scale: 0.6, opacity: 0.9 }, { scale: 2.4, opacity: 0, duration: 1.1, stagger: 0.22, ease: "power2.out" }, "tap")
      .to(idle, { opacity: 0, duration: 0.2 }, "tap+=0.15")
      .to(done, { opacity: 1, duration: 0.3 }, "tap+=0.35")
      .to(check, { scale: 1, duration: 0.5, ease: "back.out(1.8)" }, "tap+=0.35")
      .addLabel("peak")
      .to({}, { duration: 1.6 })
      .to(card, { x: 170, y: 150, opacity: 0, duration: 0.8, ease: "power2.in" })
      .to(done, { opacity: 0, duration: 0.3 }, "-=0.4")
      .to(idle, { opacity: 1, duration: 0.3 }, "<")
      .set(card, { x: 150, y: 130, rotate: -14 })
      .set(check, { scale: 0.6 });

    return registerShowpiece(el, { play: function () { tl.play(); }, pause: function () { tl.pause(); }, restart: function () { tl.restart(); }, showcase: showcase(tl, null) });
  }

  function spWallet(el) {
    var balance = el.querySelector(".wallet__balance .t-h3");
    var pill = el.querySelector(".wallet__pill");
    var trackFill = el.querySelector(".wallet__trackfill");
    var doneIcon = el.querySelector(".wallet__done");
    var status = el.querySelector(".wallet__bank .t-small");
    var startValue = parseFloat(el.getAttribute("data-balance")) || 3284000;
    var amount = parseFloat(el.getAttribute("data-amount")) || 1200000;
    var idleText = status.textContent;
    var state = { v: startValue };

    function render() { balance.textContent = formatNumber(state.v, 0) + "원"; }
    render();
    /* the amount travels down the line and is gone before it reaches the bank card */
    gsap.set(pill, { y: -30, opacity: 0 });
    gsap.set(doneIcon, { opacity: 0, scale: 0.5 });

    var tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.2 });
    tl.to(pill, { opacity: 1, duration: 0.3 })
      .to(pill, { y: 22, duration: 1.1, ease: "power2.inOut" }, "<")
      .to(trackFill, { scaleY: 1, duration: 1.1, ease: "power2.inOut" }, "<")
      .to(state, { v: startValue - amount, duration: 1.1, ease: "power2.inOut", onUpdate: render }, "<")
      .to(pill, { opacity: 0, duration: 0.25 }, "-=0.3")
      .to(doneIcon, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.8)" }, "-=0.1")
      .add(function () { status.textContent = "송금 완료 · " + formatNumber(amount, 0) + "원"; status.classList.add("is-done"); })
      .addLabel("peak")
      .to({}, { duration: 2 })
      .to(doneIcon, { opacity: 0, scale: 0.5, duration: 0.3 })
      .add(function () { status.textContent = idleText; status.classList.remove("is-done"); })
      .to(state, { v: startValue, duration: 0.4, onUpdate: render }, "<")
      .to(trackFill, { scaleY: 0, duration: 0.4 }, "<")
      .set(pill, { y: -30 });

    return registerShowpiece(el, { play: function () { tl.play(); }, pause: function () { tl.pause(); }, restart: function () { tl.restart(); }, showcase: showcase(tl, function () { status.textContent = idleText; status.classList.remove("is-done"); }) });
  }

  function spChart(el) {
    var line = el.querySelector(".line");
    var area = el.querySelector(".area");
    var dot = el.querySelector(".dot");
    var halo = el.querySelector(".halo");
    var kpi = el.querySelector(".win__kpi .t-h3");
    var delta = el.querySelector(".win__delta");
    var target = parseFloat(el.getAttribute("data-total")) || 4382000;
    var length = line.getTotalLength();
    var state = { v: 0 };

    function render() { kpi.textContent = formatNumber(state.v, 0) + "원"; }
    gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
    gsap.set([area, dot, halo, delta], { opacity: 0 });
    render();

    var tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 2.2 });
    tl.to(line, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" })
      .to(state, { v: target, duration: 1.8, ease: "power2.inOut", onUpdate: render }, "<")
      .to(area, { opacity: 1, duration: 0.9 }, "-=1.1")
      .fromTo(halo, { scale: 0.4, transformOrigin: "center", opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }, "-=0.2")
      .to(dot, { opacity: 1, duration: 0.2 }, "<")
      .fromTo(delta, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: EASE }, "<")
      .addLabel("peak")
      .to({}, { duration: 2.4 })
      .to([area, dot, halo, delta], { opacity: 0, duration: 0.4 })
      .to(line, { strokeDashoffset: length, duration: 0.5 }, "<")
      .to(state, { v: 0, duration: 0.5, onUpdate: render }, "<");

    return registerShowpiece(el, { play: function () { tl.play(); }, pause: function () { tl.pause(); }, restart: function () { tl.restart(); }, showcase: showcase(tl, null) });
  }

  function spFlow(el) {
    var btn = el.querySelector(".flow__btn");
    var dot = el.querySelector(".flow__dot");
    var fill = el.querySelector(".flow__fill");
    var nodes = el.querySelectorAll(".flow__node");
    var progress = { p: 0 };

    function setNodes(p) {
      nodes.forEach(function (n, i) {
        n.classList.toggle("is-on", p >= i / (nodes.length - 1) - 0.001);
      });
    }

    setNodes(0);

    var label = btn.querySelector(".flow__btn-text");
    var doneLabel = btn.querySelector(".flow__btn-done");
    var tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.4 });
    /* the click: pressed down hard and quick, back with a snap */
    tl.to(btn, { scale: 0.9, duration: 0.08, ease: "power2.in" })
      .to(btn, { scale: 1, duration: 0.3, ease: "back.out(3)" })
      .set(dot, { opacity: 1, left: "0%" })
      .to(progress, {
        p: 1,
        duration: 1.9,
        ease: "power1.inOut",
        onUpdate: function () {
          gsap.set(dot, { left: progress.p * 100 + "%" });
          gsap.set(fill, { scaleX: progress.p });
          setNodes(progress.p);
        }
      })
      /* approved: the button clicks again and the green "결제 완료" rolls up into it */
      .to(btn, { scale: 0.92, duration: 0.08, ease: "power2.in" })
      .add(function () { btn.classList.add("is-done"); })
      .to(btn, { scale: 1, duration: 0.35, ease: "back.out(3)" })
      .to(label, { yPercent: -100, duration: 0.3, ease: "power2.out" }, "<")
      .to(doneLabel, { yPercent: -100, duration: 0.3, ease: "power2.out" }, "<")
      .to(dot, { opacity: 0, duration: 0.3 }, "<")
      .addLabel("peak")
      .to({}, { duration: 2 })
      .add(function () { btn.classList.remove("is-done"); progress.p = 0; setNodes(0); })
      .set([label, doneLabel], { yPercent: 0 })
      .to(fill, { scaleX: 0, duration: 0.4 });

    return registerShowpiece(el, { play: function () { tl.play(); }, pause: function () { tl.pause(); }, restart: function () { tl.restart(); }, showcase: showcase(tl, function () { btn.classList.remove("is-done"); progress.p = 0; setNodes(0); }) });
  }

  /* Outline of the Korean peninsula, north and south, as [longitude, latitude] going round clockwise from the
     mouth of the Yalu river; then Jeju. Ulleungdo and Dokdo are single dots. */
  var KOREA = [
    [124.35, 40.05], [124.9, 40.45], [125.45, 40.65], [126.0, 40.9], [126.6, 41.35], [126.95, 41.8], [127.3, 41.5],
    [128.0, 41.45], [128.3, 41.6], [128.05, 42.0], [128.6, 42.02], [129.3, 42.4], [129.75, 42.45], [130.2, 42.9],
    [130.6, 42.6], [130.7, 42.3], [130.45, 42.25], [130.0, 41.95], [129.75, 41.75], [129.65, 41.2], [129.35, 40.85],
    [129.0, 40.7], [128.6, 40.35], [128.05, 40.0], [127.6, 39.8], [127.4, 39.4], [127.55, 39.1], [127.95, 38.8],
    [128.35, 38.55], [128.6, 38.2], [128.9, 37.8], [129.1, 37.5], [129.35, 37.0], [129.45, 36.5], [129.4, 36.1],
    [129.57, 36.05], [129.45, 35.6], [129.3, 35.3], [129.05, 35.05], [128.75, 34.98], [128.6, 34.8], [128.35, 34.85],
    [128.05, 34.9], [127.75, 34.7], [127.5, 34.65], [127.3, 34.45], [127.0, 34.55], [126.75, 34.32], [126.5, 34.3],
    [126.35, 34.55], [126.4, 34.8], [126.35, 35.1], [126.45, 35.45], [126.7, 35.9], [126.55, 36.1], [126.5, 36.4],
    [126.2, 36.75], [126.4, 36.95], [126.7, 37.0], [126.6, 37.35], [126.55, 37.6], [126.25, 37.75], [125.8, 37.85],
    [125.3, 37.7], [124.75, 38.05], [124.9, 38.3], [125.3, 38.6], [125.15, 38.9], [125.4, 39.3], [125.0, 39.55],
    [124.65, 39.6]
  ];
  var JEJU = [[126.15, 33.3], [126.3, 33.22], [126.6, 33.23], [126.9, 33.33], [126.95, 33.5], [126.7, 33.56], [126.4, 33.52], [126.2, 33.45]];
  /* Ulleungdo as a small cluster of three dots, Dokdo as its two islets */
  var ISLETS = [[130.86, 37.5, 3], [131.87, 37.24, 2]];
  /* Rough line of the military demarcation line, west to east: dots north of it are drawn faint */
  var BORDER = [[124.0, 37.9], [125.8, 37.72], [126.55, 37.76], [126.68, 37.96], [127.0, 38.15], [127.3, 38.27],
    [127.7, 38.31], [128.0, 38.3], [128.35, 38.62], [129.5, 38.62]];

  function northOfBorder(lon, lat) {
    for (var i = 1; i < BORDER.length; i++) {
      if (lon <= BORDER[i][0]) {
        var a = BORDER[i - 1], b = BORDER[i];
        return lat > a[1] + (b[1] - a[1]) * (lon - a[0]) / (b[0] - a[0]);
      }
    }
    return lat > BORDER[BORDER.length - 1][1];
  }

  function inside(x, y, poly) {
    var hit = false;
    for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      var a = poly[i], b = poly[j];
      if ((a[1] > y) !== (b[1] > y) && x < (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]) + a[0]) hit = !hit;
    }
    return hit;
  }

  /* Map showpiece: the peninsula is drawn in dots once per size; approval chips light up place after place */
  function spMap(el, still) {
    var canvas = el.querySelector("canvas");
    var ctx = canvas.getContext("2d");
    var pins = Array.prototype.slice.call(el.querySelectorAll(".map__pin"));
    /* The chips live in their own layer over the section, not on the map: however the map is turned or sized,
       each chip shows at its own size and upright, and is only moved to stand over its spot */
    var host = el.closest(".section") || el.parentNode;
    var layer = document.createElement("div");
    layer.className = "map__tags";
    layer.setAttribute("aria-hidden", "true");
    host.appendChild(layer);
    var tags = pins.map(function (pin) {
      var tag = document.createElement("div");
      tag.className = "map__tag";
      var chip = pin.querySelector(".chip");
      if (chip) tag.appendChild(chip);
      layer.appendChild(tag);
      return tag;
    });
    function setOn(i, on) {
      pins[i].classList.toggle("is-on", on);
      tags[i].classList.toggle("is-on", on);
    }
    function placeTags() {
      var base = layer.getBoundingClientRect();
      for (var i = 0; i < pins.length; i++) {
        var r = pins[i].getBoundingClientRect();
        tags[i].style.transform = "translate(" + (r.left + r.width / 2 - base.left).toFixed(1) + "px, " + (r.top + r.height / 2 - base.top).toFixed(1) + "px)";
      }
    }
    /* The view is the south with only a strip of the north above the border */
    var west = 124.4, east = 132.1, north0 = 39.3, south0 = 33.0;
    var kx = Math.cos(38 * Math.PI / 180);
    var TAU = Math.PI * 2;
    /* The dots are drawn once into a second canvas; while the map is on screen each frame copies that and adds
       the few dots that are sparkling at the moment */
    var base = document.createElement("canvas");
    var bctx = base.getContext("2d");
    var sparks = [];
    var dotR = 0;
    var cw = 0, ch = 0;
    /* Entrance: the first time the map is on screen its dots pop up one by one in random order (1.4s). Until
       then the map is empty; afterwards the drawn copy is used. */
    var dots = [];
    var introAt = still ? -1 : 0;
    var introDone = !!still;
    var INTRO = 1400;

    function draw() {
      var w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      /* drawn as finely as the largest size the map is shown at (el.mapZoom), so it stays sharp when enlarged */
      var dpr = Math.min(window.devicePixelRatio || 1, 2) * (el.mapZoom || 1);
      canvas.width = base.width = Math.round(w * dpr);
      canvas.height = base.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cw = w;
      ch = h;
      sparks = [];
      dots = [];

      var scale = Math.min(w / ((east - west) * kx), h / (north0 - south0));
      var ox = (w - (east - west) * kx * scale) / 2;
      var oy = (h - (north0 - south0) * scale) / 2;
      function project(lon, lat) { return [ox + (lon - west) * kx * scale, oy + (north0 - lat) * scale]; }

      var land = [KOREA, JEJU].map(function (poly) { return poly.map(function (pt) { return project(pt[0], pt[1]); }); });
      var step = Math.max(5, w / 44);
      var r = step * 0.3;
      var south = new Path2D();
      var north = new Path2D();
      var isles = new Path2D();
      dotR = r;
      /* About one dot in six sparkles now and then. Its beat and its starting point come from two other hashes,
         so the beats never line up and there is always some sparkling somewhere. */
      function hash(x, y, a, b, c) {
        var n = Math.sin(x * a + y * b) * c;
        return n - Math.floor(n);
      }
      function addSpark(x, y) {
        if (hash(x, y, 12.9898, 78.233, 43758.5453) >= 0.17) return;
        sparks.push({ x: x, y: y, phase: hash(x, y, 39.3468, 11.1351, 24634.6345) * TAU, period: 4 + hash(x, y, 73.156, 52.235, 13758.937) * 3 });
      }
      for (var y = step / 2; y < h; y += step) {
        for (var x = step / 2; x < w; x += step) {
          var onJeju = inside(x, y, land[1]);
          if (onJeju || inside(x, y, land[0])) {
            var lon = west + (x - ox) / (kx * scale);
            var lat = north0 - (y - oy) / scale;
            var far = northOfBorder(lon, lat);
            var group = onJeju ? isles : far ? north : south;
            group.moveTo(x + r, y);
            group.arc(x, y, r, 0, TAU);
            dots.push({ x: x, y: y, r: r, alpha: onJeju ? 0.8 : far ? 0.16 : 0.55 });
            if (!far) addSpark(x, y);
          }
        }
      }
      ISLETS.forEach(function (pt) {
        var p = project(pt[0], pt[1]);
        var gap = step * (pt[2] === 3 ? 0.42 : 0.34);
        var spots = pt[2] === 3 ? [[-gap, gap * 0.5], [gap, gap * 0.5], [0, -gap * 0.8]] : [[-gap, 0], [gap, 0]];
        var size = pt[2] === 3 ? r : r * 0.8;
        spots.forEach(function (o) {
          isles.moveTo(p[0] + o[0] + size, p[1] + o[1]);
          isles.arc(p[0] + o[0], p[1] + o[1], size, 0, TAU);
          dots.push({ x: p[0] + o[0], y: p[1] + o[1], r: size, alpha: 0.8 });
        });
        addSpark(p[0], p[1] + spots[0][1]);
      });
      /* the far coins first, so the near ones lie over them */
      dots.sort(function (a, b) { return a.y - b.y; });
      paintBase();
      dots.forEach(function (d) {
        var n = Math.sin(d.x * 7.13 + d.y * 3.71) * 43758.5453;
        d.at = (n - Math.floor(n)) * 0.82;
      });
      paint(0);

      pins.forEach(function (pin) {
        var p = project(parseFloat(pin.getAttribute("data-lon")), parseFloat(pin.getAttribute("data-lat")));
        pin.style.left = (p[0] / w * 100).toFixed(2) + "%";
        pin.style.top = (p[1] / h * 100).toFixed(2) + "%";
      });
    }

    /* The dots drawn once: flat discs, or coins with a little height when the map is seen at a slant (el.mapDepth
       0 to 1): each has a darker rim under its face, as a coin lying on a table seen from the front. Jeju, Ulleungdo
       and Dokdo are a little brighter (alpha 0.8), the south 0.55, the north above the border 0.16. */
    var depthDrawn = -1;
    function paintBase() {
      var depth = el.mapDepth || 0;
      depthDrawn = depth;
      bctx.clearRect(0, 0, cw, ch);
      var t = dotR * 2 * depth;
      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        bctx.globalAlpha = Math.min(1, d.alpha * (1 + 0.7 * depth));
        if (t > 0.2) {
          bctx.fillStyle = "#1c6a46";
          bctx.beginPath();
          for (var q = 1; q <= 5; q++) {
            var f = q / 5;
            bctx.moveTo(d.x + t * 0.45 * f + d.r, d.y + t * f);
            bctx.arc(d.x + t * 0.45 * f, d.y + t * f, d.r, 0, TAU);
          }
          bctx.fill();
        }
        bctx.fillStyle = "#8CE0B5";
        bctx.beginPath();
        bctx.arc(d.x, d.y, d.r, 0, TAU);
        bctx.fill();
      }
      bctx.globalAlpha = 1;
    }
    el.repaint = function () {
      if (Math.abs((el.mapDepth || 0) - depthDrawn) < 0.01) return;
      paintBase();
      if (introDone) paint(lastTime);
    };
    var lastTime = 0;

    /* A sparkle is the same green laid over the dot for a moment, so the dot brightens gently and fades back */
    function paint(time) {
      lastTime = time;
      ctx.clearRect(0, 0, cw, ch);
      if (!introDone) {
        if (!introAt || !time) return;
        var k = (time - introAt) / INTRO;
        if (k < 1) {
          drawIntro(k);
          return;
        }
        introDone = true;
      }
      ctx.drawImage(base, 0, 0, cw, ch);
      if (!time) return;
      var t = time / 1000;
      ctx.fillStyle = "#8CE0B5";
      for (var i = 0; i < sparks.length; i++) {
        var sp = sparks[i];
        var b = Math.sin(t * TAU / sp.period + sp.phase);
        if (b <= 0.55) continue;
        b = (b - 0.55) / 0.45;
        ctx.globalAlpha = 0.5 * b;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, dotR * (1 + 0.1 * b), 0, TAU);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    /* Each dot pops up at its own moment: it grows past its size and settles back (a short overshoot) */
    function drawIntro(k) {
      ctx.fillStyle = "#8CE0B5";
      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        var u = (k - d.at) / 0.18;
        if (u <= 0) continue;
        if (u > 1) u = 1;
        var grow = 1 + 2.2 * Math.pow(u - 1, 3) + 1.2 * Math.pow(u - 1, 2);
        ctx.globalAlpha = d.alpha * Math.min(1, u * 2);
        var rr = d.r * Math.max(0, grow), th = dotR * 2 * (el.mapDepth || 0);
        if (th > 0.2) {
          ctx.fillStyle = "#1c6a46";
          ctx.beginPath();
          for (var q = 1; q <= 5; q++) {
            ctx.moveTo(d.x + th * 0.45 * q / 5 + rr, d.y + th * q / 5);
            ctx.arc(d.x + th * 0.45 * q / 5, d.y + th * q / 5, rr, 0, TAU);
          }
          ctx.fill();
          ctx.fillStyle = "#8CE0B5";
        }
        ctx.beginPath();
        ctx.arc(d.x, d.y, rr, 0, TAU);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    draw();
    window.addEventListener("resize", draw);
    el.redraw = function () { draw(); if (introDone) paint(lastTime); };

    placeTags();
    window.addEventListener("resize", placeTags);
    if (still) {
      setOn(0, true);
      setOn(1, true);
      return null;
    }

    /* Two chips are up at a time: every 1.6s the next place lights up and the older one goes out.
       The pins are listed so that places next to each other in the list are far apart on the map. */
    var next = 0;
    var timer = null;
    function tick() {
      setOn(next, true);
      setOn((next + pins.length - 2) % pins.length, false);
      next = (next + 1) % pins.length;
    }

    var frame = 0;
    function loop(time) {
      if (!introDone && !introAt) introAt = time;
      paint(time);
      placeTags();
      frame = requestAnimationFrame(loop);
    }

    return registerShowpiece(el, {
      play: function () {
        if (!timer) { tick(); timer = setInterval(tick, 1600); }
        if (!frame) frame = requestAnimationFrame(loop);
      },
      pause: function () {
        clearInterval(timer);
        timer = null;
        cancelAnimationFrame(frame);
        frame = 0;
        if (introAt) introDone = true;
        paint(0);
      }
    });
  }

  /* Scene strip (wide screens with the side lines): each photo is blurred inside its own card by how much of the card
     is outside the lines (up to 6px), so the cards soften as they leave the middle and sharpen as they come in.
     Read and written each frame only while the strip is on screen; a card is only touched when its value changes. */
  function initStreamFocus() {
    if (reduceMotion) return;
    var strip = document.querySelector(".sec-stream .marquee");
    if (!strip) return;
    var wide = window.matchMedia("(min-width: 1400px)");
    var small = window.matchMedia("(max-width: 1024px)");
    var imgs = Array.prototype.slice.call(strip.querySelectorAll(".stream__item .media img"));
    var last = imgs.map(function () { return -1; });
    var frame = 0, on = false;
    function step() {
      frame = 0;
      if (!on) return;
      /* where the two lines stand: beside the page's content on wide screens, a quarter in from each side on phones and
         tablets (the middle photo between them) */
      var side = small.matches ? window.innerWidth * 0.25 - tokenPx("--gap-card", 16) / 2
        : (window.innerWidth - tokenPx("--container", 1200)) / 2 - tokenPx("--sp-8", 64);
      var left = side, right = window.innerWidth - side;
      for (var i = 0; i < imgs.length; i++) {
        var r = imgs[i].parentNode.getBoundingClientRect();
        var out = r.width ? (Math.max(0, left - r.left) + Math.max(0, r.right - right)) / r.width : 0;
        var b = wide.matches || small.matches ? Math.round(Math.min(1, out) * 12) / 2 : 0;
        if (b === last[i]) continue;
        last[i] = b;
        imgs[i].style.filter = b ? "blur(" + b + "px)" : "";
        imgs[i].style.transform = b ? "scale(1.06)" : "";
      }
      frame = requestAnimationFrame(step);
    }
    /* the browser itself says when the strip is on screen (the section is held while it plays, which scroll
       positions would misjudge) */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        on = entries[0].isIntersecting;
        if (on && !frame) frame = requestAnimationFrame(step);
      }).observe(strip);
    }
  }

  /* Pictures that slide in from out of sight (the partner strips and columns) would be fetched only once the
     browser sees them on screen, which can be too late when they come in quickly: they are fetched and decoded when
     their group comes within two screens */
  function initEarlyImages() {
    if (!hasGsap) return;
    document.querySelectorAll(".partner-strips, .partner-cols").forEach(function (group) {
      ScrollTrigger.create({
        trigger: group,
        start: function () { return "top bottom+=" + window.innerHeight * 2; },
        once: true,
        onEnter: function () {
          group.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
            img.loading = "eager";
            if (img.decode) img.decode().catch(function () {});
          });
        }
      });
    });
  }

  /* Particle title: as the section comes up the screen (its top from the bottom of the screen to the top), a few
     thousand small dots fly in from all round and settle into the shape of its title, at the size and place the
     title starts its intro from (startOf() gives its scale s and shift dx, dy); then the real title takes over.
     The shape comes from the title's own glyphs: each character is drawn in the title's face at its own place
     (taken from the text's layout) on a hidden canvas, and the dots are its filled pixels, every few pixels. */
  function particleTitle(section, title, startOf) {
    var canvas = document.createElement("canvas");
    canvas.className = "title-dust";
    canvas.setAttribute("aria-hidden", "true");
    section.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    var dots = [], colour = "#111927", W = 0, H = 0, dpr = 1, seed = 41;
    function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
    function sample() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = section.clientWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      /* the title's own layout, without the intro's transform */
      var saved = title.style.transform;
      title.style.transform = "none";
      var sec = section.getBoundingClientRect(), box = title.getBoundingClientRect();
      var cs = getComputedStyle(title);
      colour = cs.color;
      var font = cs.fontWeight + " " + cs.fontSize + " " + cs.fontFamily;
      var glyphs = [];
      var walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
      var range = document.createRange();
      for (var node = walker.nextNode(); node; node = walker.nextNode()) {
        for (var i = 0; i < node.length; i++) {
          var ch = node.data[i];
          if (!ch.trim()) continue;
          range.setStart(node, i);
          range.setEnd(node, i + 1);
          var r = range.getBoundingClientRect();
          glyphs.push({ ch: ch, x: r.left - box.left, y: r.top - box.top });
        }
      }
      title.style.transform = saved;
      var bw = Math.ceil(box.width) + 4, bh = Math.ceil(box.height) + 4;
      var off = document.createElement("canvas");
      off.width = bw;
      off.height = bh;
      var o = off.getContext("2d");
      o.font = font;
      o.fillStyle = "#000";
      o.textBaseline = "alphabetic";
      var asc = o.measureText("가").fontBoundingBoxAscent || parseFloat(cs.fontSize) * 0.9;
      glyphs.forEach(function (g) { o.fillText(g.ch, g.x, g.y + asc); });
      var data = o.getImageData(0, 0, bw, bh).data;
      var st = startOf();
      var cx = box.left - sec.left + box.width / 2, cy = box.top - sec.top + box.height / 2;
      var step = Math.max(2, Math.round(Math.sqrt(bw * bh / 9000)));
      dots = [];
      seed = 41;
      for (var y = 0; y < bh; y += step) {
        for (var x = 0; x < bw; x += step) {
          if (data[(y * bw + x) * 4 + 3] < 128) continue;
          var px = box.left - sec.left + x, py = box.top - sec.top + y;
          var tx = cx + (px - cx) * st.s + (st.dx || 0), ty = cy + (py - cy) * st.s + (st.dy || 0);
          var a = rnd() * Math.PI * 2, d = (0.35 + rnd() * 0.75) * Math.max(W, H) * 0.6;
          dots.push({ tx: tx, ty: ty, sx: tx + Math.cos(a) * d, sy: ty + Math.sin(a) * d * 0.8, delay: rnd() * 0.3, size: (0.8 + rnd() * 0.7) * step * st.s * 0.62 });
        }
      }
    }
    function draw(p) {
      ctx.clearRect(0, 0, W, H);
      var fade = Math.min(1, Math.max(0, (p - 0.9) / 0.1));
      title.style.opacity = fade.toFixed(3);
      if (fade >= 1) return;
      ctx.fillStyle = colour;
      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        var k = Math.min(1, Math.max(0, (p - d.delay) / 0.62));
        if (k <= 0) continue;
        var e = 1 - Math.pow(1 - k, 3);
        ctx.globalAlpha = Math.min(1, k * 2.5) * (1 - fade);
        ctx.fillRect(d.sx + (d.tx - d.sx) * e - d.size / 2, d.sy + (d.ty - d.sy) * e - d.size / 2, d.size, d.size);
      }
      ctx.globalAlpha = 1;
    }
    title.style.opacity = "0";
    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "top top",
      scrub: 0.5,
      onRefresh: function (self) { sample(); draw(self.progress); },
      onUpdate: function (self) { draw(self.progress); }
    });
  }

  /* Title intro (home, after the "상품 판매와 정산, 이것마저도 토스로" section of toss.im). The title starts large in the
     middle of the screen (up to 1.35 times its size, at most 88% of the screen wide) and, with the scroll, rises and
     shrinks into its place; then the label and the words under the title, and after them the rest of the section,
     come up. titleIntro(section) prepares a section and returns into(timeline), which adds that part at the start
     of a timeline and returns when it is over. */
  function docTop(el) {
    var y = 0;
    for (var e = el; e; e = e.offsetParent) y += e.offsetTop;
    return y;
  }
  /* an element's distance from the top of the held section it is in (the section's top is the screen's top then) */
  function introTop(el) {
    var section = el.closest(".has-intro");
    return section ? docTop(el) - docTop(section) : 0;
  }
  function titleIntro(section) {
    var head = section.querySelector(".section__head");
    var title = head && head.querySelector(".t-h1");
    if (!title) return null;
    section.classList.add("has-intro", "is-intro");
    var others = Array.prototype.filter.call(head.children, function (c) { return c !== title; });
    var rest = [];
    Array.prototype.forEach.call(section.children, function (c) {
      if (c === head) return;
      if (c.contains(head)) Array.prototype.forEach.call(c.children, function (k) { if (k !== head && !k.contains(head)) rest.push(k); });
      else rest.push(c);
    });
    if (section.classList.contains("sec-forge")) rest = [];
    /* these words and blocks are brought in by the intro, so they drop the usual reveal's hidden start */
    [title].concat(others, rest).forEach(function (el) { el.removeAttribute("data-reveal"); });
    gsap.set(title, { transformOrigin: "50% 50%" });
    var cardsAt = -1, cardsToggle = null;
    /* the size and place it starts from, measured from the layout (transforms do not change it) */
    function start() {
      var range = document.createRange();
      range.selectNodeContents(title);
      var textW = range.getBoundingClientRect().width / (gsap.getProperty(title, "scaleX") || 1);
      var s = Math.max(1, Math.min(1.35, window.innerWidth * 0.88 / (textW || 1)));
      var dy = window.innerHeight / 2 - (introTop(title) + title.offsetHeight / 2);
      return { s: s, dy: dy };
    }
    /* the title gathers from particles as the section comes up, at the size and place the intro starts from */
    particleTitle(section, title, function () { var st = start(); return { s: st.s, dx: 0, dy: st.dy }; });
    return {
      into: function (tl) {
        tl.fromTo(title, { scale: function () { return start().s; }, y: function () { return start().dy; } }, { scale: 1, y: 0, duration: 1, ease: "power2.inOut" }, 0);
        /* the words beside the title and the rest wait out of sight while the section has .is-intro (sections.css);
           a class rather than tweens, so a re-measured page can never leave them showing early */
        /* a strip of photo cards comes up card by card, from the one furthest left on screen (the strip keeps
           flowing, so the order is read from where the cards stand when this part starts) */
        var strip = rest.filter(function (el) { return el.matches(".marquee"); });
        var others2 = rest.filter(function (el) { return !el.matches(".marquee"); });
        others2.forEach(function (el, i) {
          el.classList.add("intro-rest");
          el.style.transitionDelay = (0.1 + i * 0.1) + "s";
        });
        tl.to({}, { duration: 0.3 }, 1);
        strip.forEach(function (m) {
          /* the strip itself shows (it is held hidden for the usual reveal until then); its cards come in on their
             own clock once the scroll reaches their part, one after another from the left of the screen, and go
             back if the scroll returns above it */
          gsap.set(m, { opacity: 1 });
          var cards = Array.prototype.slice.call(m.querySelectorAll(".stream__item .media"));
          gsap.set(cards, { opacity: 0, y: 90, scale: 0.96 });
          var shown = false;
          tl.call(function () {}, null, 0.9);
          cardsAt = 0.8;
          cardsToggle = function (on) {
            if (on === shown) return;
            shown = on;
            if (on) {
              var order = cards.map(function (c) { return { c: c, x: c.getBoundingClientRect().left }; })
                .filter(function (o) { return o.x > -window.innerWidth * 0.3 && o.x < window.innerWidth * 1.1; })
                .sort(function (a, b) { return a.x - b.x; });
              var rest2 = cards.filter(function (c) { return !order.some(function (o) { return o.c === c; }); });
              gsap.set(rest2, { opacity: 1, y: 0, scale: 1 });
              gsap.to(order.map(function (o) { return o.c; }), { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out", stagger: 0.12, overwrite: true });
            } else {
              gsap.to(cards, { opacity: 0, y: 90, scale: 0.96, duration: 0.4, ease: "power2.in", overwrite: true });
            }
          };
        });
        return rest.length ? 1.6 : 1.1;
      },
      /* called with the timeline's time as the scroll moves it */
      at: function (time) {
        section.classList.toggle("is-intro", time < 0.85);
        if (cardsToggle) cardsToggle(time >= cardsAt);
      }
    };
  }

  function initTitleIntro() {
    if (!hasGsap || reduceMotion) return;
    document.querySelectorAll("[data-title-intro]").forEach(function (section) {
      var intro = titleIntro(section);
      if (!intro) return;
      var tl = gsap.timeline({ onUpdate: function () { intro.at(tl.time()); } });
      var dur = intro.into(tl);
      /* the process steps (desktop, in a row) are drawn while the section is still held; a photo strip stays held a
         while after its cards have come in (less on phones and tablets). The intro itself takes the first 0.6 screen; the rest of the hold is
         plain time at the end of the timeline, so the title does not move slower for it. */
      var wide = window.matchMedia("(min-width: 1025px)").matches;
      /* phones and tablets: a swipe moves less than a wheel, so the photo strip is held a shorter while there */
      var extra = section.querySelector(".process") && wide ? 1.6
        : section.querySelector(".stream") ? (wide ? 0.9 : 0.35) : 0;
      if (extra) tl.to({}, { duration: dur * extra / 0.6 }, dur);
      section.introPin = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: function () { return "+=" + window.innerHeight * (0.6 + extra); },
        pin: true,
        scrub: 0.6,
        animation: tl,
        invalidateOnRefresh: true
      });
    });
  }

  /* Forge (development): a scrolled scene in three beats. 1: the back office fills the stage. 2: it shrinks and
     leans away to the right while the shop page comes up large in front and is assembled by a cursor. 3: the cursor
     presses pay: the button turns to "paid", the two windows settle side by side and the back office's figures count
     up. Only the two windows: nothing is drawn between or over them. On a desktop the section is held while this
     plays; on narrow screens it plays on its own when it comes into view. */
  function initForge() {
    if (!hasGsap || reduceMotion) return;
    document.querySelectorAll("[data-forge]").forEach(function (forge) {
      var section = forge.closest(".section");
      var bo = forge.querySelector(".bo");
      var shop = forge.querySelector(".shop");
      var shopParts = forge.querySelectorAll(".shop__nav, .shop__banner, .shop__item, .shop__pay");
      var btn = forge.querySelector(".shop__btn");
      var btnText = forge.querySelector(".shop__btn-text");
      var btnDone = forge.querySelector(".shop__btn-done");
      var cursor = forge.querySelector(".forge__cursor");
      var darkShot = forge.querySelector(".bo__shot--dark");
      var darkFlag = { k: 0 };
      /* the live figures sit where the picture leaves blanks (data-bo-at: left, top, height, size, then the sizes of
         the won sign before the digits and of the won after them, all in window pixels) */
      var counters = Array.prototype.map.call(forge.querySelectorAll("[data-bo-count]"), function (el) {
        var v = el.getAttribute("data-bo-count").split(":");
        var at = el.getAttribute("data-bo-at").split(",");
        el.style.left = at[0] + "px";
        el.style.top = at[1] + "px";
        el.style.height = at[2] + "px";
        el.style.lineHeight = at[2] + "px";
        el.style.fontSize = at[3] + "px";
        Array.prototype.forEach.call(el.querySelectorAll("small"), function (u, i) { u.style.fontSize = (i === 0 ? at[4] : at[5] || at[4]) + "px"; });
        return { el: el, num: el.querySelector("span") || el, from: +v[0], to: +v[1], v: +v[0] };
      });
      var pinned = section.classList.contains("sec-forge") && window.matchMedia("(min-width: 1025px) and (min-height: 700px)").matches;
      if (pinned) section.classList.add("is-scene");
      /* held on a desktop: the scene opens with the title intro (initTitleIntro) before the back office comes up */
      var intro = pinned && hasGsap ? titleIntro(section) : null;

      /* sizes: the stage decides how large each window may get, 18px above and below kept for the shadows; on a
         tall screen the windows stop growing at the size a 620px stage gives them, so they are never blown up soft */
      var W = 0, H = 0, R = 0;
      function fit() {
        W = forge.clientWidth;
        H = forge.clientHeight;
        R = Math.min(H, 656) - 36;
        /* narrow stages keep a margin at the sides of the screen */
        var narrow = W < 900;
        return { bo: Math.min(W * (narrow ? 0.86 : 0.96) / 1040, R / 674), shop: Math.min(W * (narrow ? 0.78 : 0.9) / 440, R * 0.95 / 470) };
      }
      var S = fit();

      function reset() {
        gsap.set(bo, { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: S.bo * 0.92, rotationY: 0, opacity: 0 });
        gsap.set(shop, { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: S.shop * 0.5, opacity: 0 });
        gsap.set(shopParts, { scaleX: 0, opacity: 0 });
        gsap.set(btn, { scale: 1 });
        gsap.set(btn, { clearProps: "backgroundColor" });
        gsap.set([btnText, btnDone], { yPercent: 0 });
        gsap.set(cursor, { opacity: 0, scale: 1 });
        if (darkShot) gsap.set(darkShot, { "--reveal": 0 });
        darkFlag.k = 0;
        bo.classList.remove("is-dark");
        counters.forEach(function (c) { c.v = c.from; c.num.textContent = formatNumber(c.from, 0); });
      }
      reset();

      /* a part's centre in stage coordinates once its window stands at a given centre and scale; offsets are
         read from the layout, so nothing is measured while the scene plays and the timeline can be built up front */
      function within(el, win) {
        /* layout offsets summed up to the window itself: unaffected by whatever transform the window has then */
        var x = 0, y = 0;
        for (var e = el; e && e !== win && win.contains(e); e = e.offsetParent) { x += e.offsetLeft; y += e.offsetTop; }
        return { x: x + el.offsetWidth / 2, y: y + el.offsetHeight / 2 };
      }
      function place(el, win, winW, winH, cx, cy, scale) {
        var c = within(el, win);
        return { x: cx + (c.x - winW / 2) * scale, y: cy + (c.y - winH / 2) * scale };
      }

      /* the one timeline is kept (its ScrollTrigger holds it) and refilled whenever the page is laid out again */
      var tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" }, onUpdate: function () { if (intro) intro.at(tl.time()); } });
      function build() {
        tl.clear();
        /* beat 2 geometry: the shop large in front, a little left; the back office small, right and leaning */
        var narrow = W < 900;
        var shopX = narrow ? 0 : -W * 0.12, shopCx = W / 2 + shopX, shopCy = H / 2;
        /* beat 3 geometry: the two windows side by side */
        var gap = 24;
        var boS = Math.min(W * (narrow ? 0.86 : 0.6) / 1040, R / 674), shopS = Math.min(W * (narrow ? 0.42 : 0.34) / 440, R * (narrow ? 0.7 : 0.85) / 470);
        var boW = 1040 * boS, shopW = 440 * shopS, left = (W - (boW + gap + shopW)) / 2;
        var boX = narrow ? 0 : left + boW / 2 - W / 2, shopX3 = narrow ? W / 2 - shopW / 2 - W * 0.07 : left + boW + gap + shopW / 2 - W / 2;
        var shopY3 = narrow ? H / 2 - shopS * 470 / 2 - 8 : 0;

        /* 0. the title, large in the middle of the screen, rises and shrinks into its place */
        var t0 = intro ? intro.into(tl) : 0;
        /* 1. the back office rises and fills the stage */
        tl.to(bo, { opacity: 1, scale: S.bo, duration: 1.2, ease: "power3.out" }, t0)
          .to({}, { duration: 0.9 });
        /* 2. it shrinks and leans away; the shop grows in front and the cursor assembles it */
        tl.to(bo, { scale: S.bo * (narrow ? 0.9 : 0.62), x: narrow ? 0 : W * 0.24, y: narrow ? -H * 0.06 : 0, rotationY: narrow ? 0 : -14, opacity: narrow ? 0.35 : 1, duration: 1.4, ease: "power3.inOut" }, "lean")
          .to(shop, { opacity: 1, scale: S.shop, x: shopX, duration: 1.4, ease: "power3.inOut" }, "lean")
          .set(cursor, { x: shopCx - 120, y: shopCy + 200 }, "lean")
          .to(cursor, { opacity: 1, duration: 0.2 }, "lean+=1.0");
        shopParts.forEach(function (part, i) {
          var c = place(part, shop, 440, 470, shopCx, shopCy, S.shop);
          tl.to(cursor, { x: c.x - 30, y: c.y + 10, duration: 0.3, ease: "power2.inOut" }, "lean+=" + (1.1 + i * 0.3))
            .to(part, { scaleX: 1, opacity: 1, duration: 0.32 }, "lean+=" + (1.3 + i * 0.3));
        });
        var tEnd = 1.3 + (shopParts.length - 1) * 0.3 + 0.4;
        /* 3. pay: the click turns the button to paid, the windows settle side by side, and the figures count up as
           the back office arrives */
        var bc = place(btn, shop, 440, 470, shopCx, shopCy, S.shop);
        tl.to(cursor, { x: bc.x, y: bc.y, duration: 0.4, ease: "power2.inOut" }, "lean+=" + tEnd)
          .to(btn, { scale: 0.88, duration: 0.1, ease: "power2.in" }, "lean+=" + (tEnd + 0.55))
          .to(btn, { scale: 1, duration: 0.3, ease: "back.out(3)" })
          .add("paid", "<")
          .to(cursor, { opacity: 0, duration: 0.2 }, "paid")
          .to(btn, { backgroundColor: "#0F9A5F", duration: 0.25 }, "paid")
          .to([btnText, btnDone], { yPercent: -100, duration: 0.3, ease: "power2.out" }, "paid")
          .add("side", "paid+=0.3")
          .to(bo, { scale: boS, x: boX, y: 0, rotationY: 0, opacity: 1, duration: 1.1, ease: "power3.inOut" }, "side")
          .to(shop, { scale: shopS, x: shopX3, y: shopY3, duration: 1.1, ease: "power3.inOut" }, "side");
        counters.forEach(function (c) {
          tl.to(c, { v: c.to, duration: 1, ease: "power2.out", onUpdate: function () { c.num.textContent = formatNumber(c.v, 0); } }, "side+=0.8");
        });
        /* 4. the shop has done its part: the view zooms in on the back office, both windows together as one picture,
           so the back office grows to fill the stage and the shop beside it is carried out of the frame; then it
           stays large a moment before the dark mode */
        var cam = { k: 0 };
        var bc0 = W / 2 + boX, zoom = S.bo / boS;
        function camera() {
          var z = 1 + (zoom - 1) * cam.k, pan = (W / 2 - bc0) * cam.k;
          gsap.set(bo, { x: bc0 + pan - W / 2, y: 0, scale: boS * z });
          if (!narrow) gsap.set(shop, { x: bc0 + (W / 2 + shopX3 - bc0) * z + pan - W / 2, y: shopY3 * z, scale: shopS * z });
        }
        tl.add("solo", "side+=2.0")
          .to(cam, { k: 1, duration: 1.3, ease: "power2.inOut", onUpdate: camera }, "solo");
        if (narrow) tl.to(shop, { x: W * 0.8, duration: 0.8, ease: "power3.in" }, "solo");
        tl.to(shop, { opacity: 0, duration: 0.3 }, "solo+=1.0");
        /* 5. dark mode: the cursor clicks the back office's own dark mode button (at 814, 40 in its page, under the
           34px bar) and the real dark mode spreads from it; the figures and the bar take its colours */
        if (darkShot) {
          var tg = { x: W / 2 + (814 - 520) * S.bo, y: H / 2 + (34 + 40 - 337) * S.bo };
          tl.add("dark", "solo+=1.75")
            .set(cursor, { x: tg.x + 150, y: tg.y + 190, scale: 1 }, "dark")
            .to(cursor, { opacity: 1, duration: 0.2 }, "dark")
            .to(cursor, { x: tg.x - 4, y: tg.y - 2, duration: 0.6, ease: "power2.inOut" }, "dark")
            .to(cursor, { scale: 0.8, duration: 0.08, ease: "power2.in", yoyo: true, repeat: 1 }, "dark+=0.68")
            .to(darkShot, { "--reveal": 1, duration: 0.9, ease: "power2.inOut" }, "dark+=0.78")
            .to(darkFlag, { k: 1, duration: 0.05, onUpdate: function () { bo.classList.toggle("is-dark", darkFlag.k > 0.5); } }, "dark+=0.9")
            .to(cursor, { opacity: 0, duration: 0.25 }, "dark+=1.15");
        }
        tl.to({}, { duration: 1.4 });
      }

      build();
      if (pinned) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: function () { return "+=" + window.innerHeight * (intro ? 4.2 : 3.8); },
          pin: true,
          scrub: 0.8,
          animation: tl,
          invalidateOnRefresh: true
        });
      } else {
        ScrollTrigger.create({
          trigger: forge,
          start: "top 80%",
          once: true,
          onEnter: function () { tl.play(); }
        });
      }
      ScrollTrigger.addEventListener("refreshInit", function () {
        var p = tl.progress();
        S = fit();
        reset();
        build();
        if (!pinned && p > 0) tl.progress(1);
      });
    });
  }

  /* Project the live interface onto the photographed screen's four corners. */
  function fitTerminalScreen(el) {
    var screen = el.querySelector(".term__screen");
    var photo = el.querySelector(".term__photo");
    var quad = el.getAttribute("data-screen").split(/\s+/).map(Number);
    if (!screen || !photo || quad.length !== 8 || !quad.every(Number.isFinite)) return;

    function fit() {
      var width = el.clientWidth, height = el.clientHeight;
      var sw = screen.offsetWidth, sh = screen.offsetHeight;
      if (!width || !height || !sw || !sh) return;
      var x = [], y = [];
      for (var i = 0; i < 4; i++) {
        x.push(quad[i * 2] * width);
        y.push(quad[i * 2 + 1] * height);
      }
      var dx1 = x[1] - x[2], dx2 = x[3] - x[2];
      var dy1 = y[1] - y[2], dy2 = y[3] - y[2];
      var dx3 = x[0] - x[1] + x[2] - x[3];
      var dy3 = y[0] - y[1] + y[2] - y[3];
      var determinant = dx1 * dy2 - dx2 * dy1;
      if (Math.abs(determinant) < 0.000001) return;
      var g = (dx3 * dy2 - dx2 * dy3) / determinant;
      var h = (dx1 * dy3 - dx3 * dy1) / determinant;
      var a = x[1] - x[0] + g * x[1];
      var b = x[3] - x[0] + h * x[3];
      var d = y[1] - y[0] + g * y[1];
      var e = y[3] - y[0] + h * y[3];
      screen.style.transform = "matrix3d(" + [
        a / sw, d / sw, 0, g / sw,
        b / sh, e / sh, 0, h / sh,
        0, 0, 1, 0,
        x[0], y[0], 0, 1
      ].join(",") + ")";
    }

    photo.addEventListener("load", fit);
    if ("ResizeObserver" in window) new ResizeObserver(fit).observe(el);
    else window.addEventListener("resize", fit);
    fit();
  }

  function initShowpieces() {
    document.querySelectorAll(".term--photo[data-screen]").forEach(fitTerminalScreen);
    if (!hasGsap || reduceMotion) {
      /* No animation: draw the map once with a few chips so the stats section is not left empty */
      document.querySelectorAll(".sp-map").forEach(function (el) { spMap(el, true); });
      return;
    }

    document.querySelectorAll(".sp-terminal").forEach(spTerminal);
    document.querySelectorAll(".sp-wallet").forEach(spWallet);
    document.querySelectorAll(".sp-chart").forEach(spChart);
    document.querySelectorAll(".sp-flow").forEach(spFlow);
    document.querySelectorAll(".sp-map").forEach(spMap);

    if (!("IntersectionObserver" in window)) {
      showpieces.forEach(function (s) { s.play(); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var s = controllerFor(entry.target);
        if (!s) return;
        var pinned = entry.target.closest("[data-pin-steps]");
        if (pinned) return;
        if (entry.isIntersecting) s.play(); else s.pause();
      });
    }, { threshold: 0.25 });

    showpieces.forEach(function (s) { observer.observe(s.el); });
  }

  /* Pinned step sections */

  function initPinSteps() {
    var sections = document.querySelectorAll("[data-pin-steps]");
    if (!sections.length) return;

    sections.forEach(function (section) {
      var steps = Array.prototype.slice.call(section.querySelectorAll(".step"));
      var visuals = Array.prototype.slice.call(section.querySelectorAll(".step-visual"));
      if (!steps.length) return;
      /* held and turned like a notebook on every screen; without the script the steps are simply stacked */
      var live = hasGsap && !reduceMotion;
      if (live) section.classList.add("is-pinned");

      /* the cards stand at step i; the scene on the front card starts over from its beginning when it comes to the
         front (start), the others wait */
      function activate(i, start) {
        steps.forEach(function (s, k) { s.classList.toggle("is-active", k === i); });
        visuals.forEach(function (v, k) {
          v.classList.toggle("is-active", k === i);
          v.classList.toggle("is-before", k < i);
          v.classList.toggle("is-next", k === i + 1);
          v.classList.toggle("is-later", k === i + 2);
          var sp = live ? controllerFor(v) : null;
          if (v.shown) { v.shown.kill(); v.shown = null; }
          if (sp) {
            if (k === i && start && sp.showcase) {
              /* the scene plays to its result, and only then is the page ringed */
              v.shown = sp.showcase(function () { if (current === k) ringTo(k, true); });
            } else if (k === i && start) sp.restart();
            else sp.pause();
          }
          if (rings && rings[k]) {
            /* the page just turned by the scroll before its ring was drawn gets it drawn quickly as it turns, so a
               ring never appears already drawn; a ring still being drawn carries on */
            if (k === i - 1 && start) ringTo(k, true, false, true);
            else ringTo(k, k < i, true);
          }
        });
      }

      var rings = null;
      activate(0, false);

      /* A big green coloured-pencil ring round each notebook page, drawn before the page turns: a hand-drawn loop of a
         little more than one turn, slightly tilted and uneven, its two ends overlapping */
      rings = visuals.map(function (v, k) {
        /* the ring goes round the whole page of the card, and turns over with it */
        var target = v;
        if (!live) return null;
        var NS = "http://www.w3.org/2000/svg";
        var svg = document.createElementNS(NS, "svg");
        svg.setAttribute("class", "pencil");
        svg.setAttribute("aria-hidden", "true");
        var tilt = (k % 2 ? -1 : 1) * 0.05;
        /* three thin strands a little apart, as a coloured pencil goes round two or three times; the paper's tooth
           (#pencilPaper) leaves the colour lighter in places without breaking the line */
        var group = document.createElementNS(NS, "g");
        group.setAttribute("filter", "url(#pencilPaper)");
        svg.appendChild(group);
        var strands = [[0, 0, 0], [1.1, 0.7, 1], [-0.8, 1.2, 2]];
        var lines = strands.map(function (sd, n) {
          var line = document.createElementNS(NS, "path");
          line.setAttribute("class", n ? "pencil__line pencil__line--thin" : "pencil__line");
          group.appendChild(line);
          return line;
        });
        target.appendChild(svg);
        var state = { p: 0 }, lens = [1, 1, 1];
        /* drawn at the ring's real size in pixels, so its length (and the dash that draws it) is exact */
        function shape() {
          var w = svg.clientWidth || 1, h = svg.clientHeight || 1;
          svg.setAttribute("viewBox", "0 0 " + w + " " + h);
          lines.forEach(function (line, n) {
            var sd = strands[n], d = "";
            for (var m = 0; m <= 90; m++) {
              var a = -2.2 + m / 90 * Math.PI * 2 * (1.12 + n * 0.02);
              var wob = 1 + Math.sin(a * 3 + k + n * 0.9) * 0.025 + m / 90 * 0.04;
              var x = Math.cos(a) * (w / 2 - 6) * wob, y = Math.sin(a) * (h / 2 - 6) * wob;
              d += (m ? "L" : "M") + (w / 2 + sd[0] + x * Math.cos(tilt) - y * Math.sin(tilt)).toFixed(1) + " " + (h / 2 + sd[1] + x * Math.sin(tilt) + y * Math.cos(tilt)).toFixed(1);
            }
            line.setAttribute("d", d);
            lens[n] = Math.ceil(line.getTotalLength()) + 2;
            line.setAttribute("stroke-dasharray", lens[n] + " " + (lens[n] + 10));
          });
          ring.set(state.p);
        }
        var ring = {
          set: function (p) { state.p = p; lines.forEach(function (l, n) { l.setAttribute("stroke-dashoffset", (lens[n] * (1 - p)).toFixed(1)); }); },
          state: state, on: false, shape: shape
        };
        shape();
        return ring;
      });
      ScrollTrigger.addEventListener("refresh", function () { rings.forEach(function (r) { if (r) r.shape(); }); });
      /* a ring is drawn in one go (0.7 s) when its card's scene reaches its result; cards already turned keep theirs
         (instant), cards still to come have none */
      function ringTo(k, on, instant, quick) {
        var ring = rings && rings[k];
        if (!ring) return;
        if (ring.on === on && !instant) return;
        ring.on = on;
        gsap.killTweensOf(ring.state);
        if (instant) ring.set(on ? 1 : 0);
        else gsap.to(ring.state, { p: on ? 1 : 0, duration: on ? (quick ? 0.35 : 0.7) : 0.25, delay: on && !quick ? 0.15 : 0, ease: on ? "power2.inOut" : "power1.out", onUpdate: function () { ring.set(ring.state.p); } });
      }

      if (!live) return;

      /* Phones: the cards have one fixed height, so each card's scene is scaled down (never up) to fit inside its
         padding, centred. Sizes come from layout offsets, which the cards' own transforms do not change. */
      function fitCards() {
        visuals.forEach(function (v) {
          var sp = v.querySelector(".sp");
          var tile = v.querySelector(".tile");
          if (!sp || !tile) return;
          sp.style.transform = "";
          if (window.innerWidth > 768) return;
          var cs = getComputedStyle(tile);
          var aw = tile.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
          var ah = tile.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
          var x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
          Array.prototype.forEach.call(sp.children, function (c) {
            x0 = Math.min(x0, c.offsetLeft); y0 = Math.min(y0, c.offsetTop);
            x1 = Math.max(x1, c.offsetLeft + c.offsetWidth); y1 = Math.max(y1, c.offsetTop + c.offsetHeight);
          });
          if (!isFinite(x0)) return;
          var s = Math.min(1, aw * 0.96 / (x1 - x0), ah * 0.94 / (y1 - y0));
          var dx = -s * ((x0 + x1) / 2 - sp.offsetWidth / 2), dy = -s * ((y0 + y1) / 2 - sp.offsetHeight / 2);
          sp.style.transform = "translate(" + dx.toFixed(1) + "px, " + dy.toFixed(1) + "px) scale(" + s.toFixed(3) + ")";
        });
      }
      fitCards();
      ScrollTrigger.addEventListener("refreshInit", fitCards);

      var pinned = section.querySelector(".steps-grid") || section.querySelector(".split") || section;
      var current = -1;
      /* the held scene opens with the title intro: the title, large in the middle of the screen, moves to its place
         over the first 0.8 screen, and the steps, the notebook and the tree come in after it (.is-intro, sections.css) */
      var title = section.querySelector(".steps-grid__head .t-h1");
      var introLen = function () { return title ? window.innerHeight * 0.45 : 0; };
      var stepsLen = function () { return steps.length * window.innerHeight * 0.75; };
      var pinLength = function () { return "+=" + (introLen() + stepsLen()); };
      if (title) {
        section.classList.add("has-intro", "is-intro");
        gsap.set(title, { transformOrigin: "50% 50%" });
        /* from the middle of the screen, measured from the layout of the held grid */
        /* the title's offset inside the held grid, the same whether the grid is held (fixed) or not */
        var rel = function (el, prop) {
          var v = 0, e = el;
          while (e && e !== pinned) { v += e[prop]; e = e.offsetParent; }
          if (e === pinned) return v;
          for (var f = pinned; f; f = f.offsetParent) v -= f[prop];
          return v;
        };
        var from = function () {
          var range = document.createRange();
          range.selectNodeContents(title);
          var textW = range.getBoundingClientRect().width / (gsap.getProperty(title, "scaleX") || 1);
          var left = pinned.getBoundingClientRect().left + rel(title, "offsetLeft");
          if (getComputedStyle(title).textAlign === "center") left += (title.offsetWidth - textW) / 2;
          return {
            s: Math.max(1, Math.min(1.35, window.innerWidth * 0.88 / (textW || 1))),
            dx: window.innerWidth / 2 - (left + textW / 2),
            dy: window.innerHeight / 2 - (rel(title, "offsetTop") + title.offsetHeight / 2)
          };
        };
        var intro = gsap.timeline();
        intro.fromTo(title, {
          scale: function () { return from().s; },
          x: function () { return from().dx; },
          y: function () { return from().dy; }
        }, { scale: 1, x: 0, y: 0, duration: 1, ease: "power2.inOut" }, 0);
        intro.to({}, { duration: 0.15 });
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: function () { return "+=" + introLen(); },
          scrub: 0.6,
          animation: intro,
          invalidateOnRefresh: true,
          onUpdate: function (self) { section.classList.toggle("is-intro", self.progress < 0.85); },
          onLeaveBack: function () { section.classList.add("is-intro"); }
        });
        particleTitle(section, title, from);
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: pinLength,
        pin: pinned,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: function (self) {
          /* the steps count from the end of the intro; during the intro nothing plays */
          var t = (self.scroll() - self.start - introLen()) / stepsLen();
          if (t < 0) {
            if (current !== -1) { current = -1; activate(0, false); }
            return;
          }
          var i = Math.min(steps.length - 1, Math.max(0, Math.floor(Math.min(0.999, t) * steps.length)));
          if (i !== current) {
            current = i;
            activate(i, true);
          }
        },
        onToggle: function (self) {
          visuals.forEach(function (v, k) {
            var sp = controllerFor(v);
            if (!sp) return;
            if (self.isActive && k === current) { if (!v.shown) sp.play(); } else sp.pause();
          });
        }
      });

      growTree(section, introLen, stepsLen);
    });
  }

  /* Tree (home steps): the outline tree, drawn line by line from the ground up while the steps scroll */
  function growTree(section, introLen, stepsLen) {
    var tree = section.querySelector(".tree");
    if (!tree || !window.matchMedia("(min-width: 1025px)").matches) return;
    /* The lane is as tall as the notebook card and level with it, so the tree never hangs below the card */
    var card = section.querySelector(".step-visual");
    function fitLane() {
      if (!card) return;
      tree.style.top = card.offsetTop + "px";
      tree.style.height = card.offsetHeight + "px";
      tree.style.bottom = "auto";
    }
    fitLane();
    ScrollTrigger.addEventListener("refreshInit", fitLane);
    /* the tree grows over the steps part of the held scene, after the title intro */
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: function () { return "top top-=" + introLen(); },
        end: function () { return "+=" + stepsLen(); },
        scrub: 0.8,
        invalidateOnRefresh: true
      }
    });
    /* Three passes run the same way, from the roots out to the branch tips, one after another: the outlines are drawn
       (each line at its own data-at / data-span, fractions of the drawing), then the pattern follows (grain, knots,
       midribs, and each leaf's hatching at its data-fill), then the colour (pale wood band by band, pale mint in
       each leaf). pathLength="100": whole-number dash values, which GSAP keeps; the offset of 101 keeps a round line
       cap from showing as a dot before its line starts. The whole drawing is done at 88% of the steps part. */
    tree.querySelectorAll("svg path:not(.tree__wash)").forEach(function (line) {
      gsap.set(line, { strokeDasharray: "100 200", strokeDashoffset: 101 });
      tl.to(line, { strokeDashoffset: 0, duration: +line.getAttribute("data-span"), ease: "none" }, +line.getAttribute("data-at"));
    });
    tree.querySelectorAll(".tree__leaf[data-fill]").forEach(function (leaf) {
      tl.to(leaf, { fillOpacity: 1, duration: 0.04, ease: "none" }, +leaf.getAttribute("data-fill"));
    });
    tree.querySelectorAll(".tree__wash").forEach(function (wash) {
      tl.to(wash, { opacity: 1, duration: +wash.getAttribute("data-span"), ease: "none" }, +wash.getAttribute("data-at"));
    });
    tl.set({}, {}, 0.97);
    /* the leaves sway in the breeze once the painting is done, while the section is on screen */
    var onScreen = false, painted = false;
    function sway() { tree.classList.toggle("is-swaying", onScreen && painted); }
    tl.eventCallback("onUpdate", function () { painted = tl.time() >= 0.86; sway(); });
    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onToggle: function (self) { onScreen = self.isActive; sway(); }
    });
  }

  /* Process line */

  /* The line is drawn as the steps scroll by. Each dot lights up and each number fills with colour
     exactly where the tip of the line passes it (sideways on desktop, downwards when the steps are stacked). */
  function initProcess() {
    if (!hasGsap || reduceMotion) return;
    document.querySelectorAll(".process").forEach(function (process) {
      var fill = process.querySelector(".process__fill");
      var items = Array.prototype.slice.call(process.querySelectorAll(".process__item"));
      if (!fill) return;
      var vertical = window.matchMedia("(max-width: 1024px)").matches;
      var length = 0;
      var marks = [];

      /* Typewriter: each step's title and description stay hidden until the step's number has filled with colour,
         then type out one letter at a time, title first, with a blinking caret after the last letter typed. Each
         step starts on its own number; a finished step hands its caret over when the next one starts. */
      items.forEach(function (item) {
        item.querySelectorAll(".t-h3, .t-body").forEach(function (el) { splitChars(el); });
      });
      process.classList.add("is-typewriter");
      var carets = items.map(function () { return null; });
      function setCaret(k, ch) {
        if (carets[k]) carets[k].classList.remove("is-caret");
        carets[k] = ch;
        if (ch) ch.classList.add("is-caret");
      }
      function type(k) {
        items.forEach(function (other, j) { if (j !== k && other.typeDone) setCaret(j, null); });
        var item = items[k];
        var title = splitChars(item.querySelector(".t-h3"));
        var chars = title.concat(splitChars(item.querySelector(".t-body")));
        var i = 0;
        (function step() {
          if (i >= chars.length) {
            item.typeDone = true;
            return;
          }
          chars[i].classList.add("is-typed");
          setCaret(k, chars[i]);
          i += 1;
          /* Titles type at a steady pace, descriptions quicker, with a short breath between them */
          setTimeout(step, i === title.length ? 200 : i < title.length ? 60 : 30);
        })();
      }

      /* Positions are measured on refresh only, never while scrolling */
      function measure() {
        length = vertical ? process.offsetHeight : process.offsetWidth;
        marks = items.map(function (item) {
          var num = item.querySelector(".process__num");
          var start = vertical ? item.offsetTop : item.offsetLeft;
          var numStart = start + (vertical ? num.offsetTop : num.offsetLeft);
          return { item: item, num: num, dot: start, from: numStart, size: vertical ? num.offsetHeight : num.offsetWidth, typed: item.typed };
        });
      }
      measure();
      ScrollTrigger.addEventListener("refresh", measure);

      var vars = {
        ease: "none",
        /* desktop with the title intro: drawn while the section is held, after the intro (0.6 screen), over 1.3
           screens, leaving 0.3 screen for the last step to finish typing; stacked: as the steps scroll by */
        scrollTrigger: process.closest(".has-intro") && !vertical && process.closest(".has-intro").introPin ? {
          trigger: process.closest(".has-intro"),
          /* from the hold's own start (the section's place on the page includes the space the hold adds) */
          start: function () { return process.closest(".has-intro").introPin.start + Math.round(window.innerHeight * 0.6); },
          end: function () { return "+=" + Math.round(window.innerHeight * 1.3); },
          scrub: 0.6,
          invalidateOnRefresh: true
        } : process.closest(".has-intro") ? {
          trigger: process,
          pinnedContainer: process.closest(".has-intro"),
          start: function () { return "top " + Math.round(introTop(process) - 10) + "px"; },
          end: "bottom 55%",
          scrub: 0.6
        } : { trigger: process, start: "top 75%", end: "bottom 55%", scrub: 0.6 },
        onUpdate: function () {
          var tip = this.progress() * length;
          marks.forEach(function (m, k) {
            m.item.classList.toggle("is-on", tip >= m.dot);
            var pct = Math.min(1, Math.max(0, (tip - m.from) / m.size)) * 100;
            m.num.style.setProperty("--fill", pct.toFixed(1) + "%");
            /* The step types once its number is completely filled */
            if (pct >= 100 && !m.item.typed) {
              m.item.typed = true;
              type(k);
            }
          });
        }
      };
      vars[vertical ? "scaleY" : "scaleX"] = 1;
      gsap.to(fill, vars);
    });
  }

  /* Information chip: grows in from 0.9 and draws its check mark */
  function popChip(chip, delay) {
    var check = chip.querySelector(".chip__icon path");
    gsap.set(chip, { opacity: 0, y: 16, scale: 0.9 });
    if (check) gsap.set(check, { attr: { pathLength: 1 }, strokeDasharray: 1, strokeDashoffset: 1 });
    return function () {
      var tl = gsap.timeline({ delay: delay });
      tl.to(chip, { opacity: 1, y: 0, scale: 1, duration: motion.durRise, ease: motion.easeRise });
      if (check) tl.to(check, { strokeDashoffset: 0, duration: 0.5, ease: motion.easeInout }, "-=0.45");
    };
  }

  function initChips() {
    if (!hasGsap || reduceMotion) return;
    document.querySelectorAll(".chip--floating:not(.hero__chip)").forEach(function (chip) {
      var play = popChip(chip, 0.9);
      ScrollTrigger.create({ trigger: chip, start: "top 85%", once: true, onEnter: play });
    });
  }

  /* First screen: hero on the home page, page head on sub pages */

  function initHero() {
    if (!hasGsap || reduceMotion) return;
    var delay = 0.15;
    var items = gsap.utils.toArray("[data-intro]");
    if (items.length) {
      items.forEach(function (el) { hide(el, kindOf(el)); });
      sequence(items, delay);
    }

    /* Side captions come in after the words, their letters closing up from wide apart to their set spacing */
    var sides = gsap.utils.toArray(".hero__side");
    if (sides.length) {
      gsap.from(sides, { opacity: 0, letterSpacing: "1.2em", duration: 1.8, ease: motion.easeText, delay: delay + 0.9, clearProps: "opacity,letterSpacing" });
    }

    var hero = document.querySelector(".hero");
    var card = hero && hero.querySelector(".hero__card");
    if (!card) return;

    /* Scene (sections.css): the stage is pinned for one screen of scrolling while the photo card rises from
       82% of the screen to nearly cover it. The white copy of the words inside the card moves the opposite way,
       so it stays exactly over the dark words and shows only where the card is. */
    hero.classList.add("is-scene");
    var stage = hero.querySelector(".hero__stage");
    var light = hero.querySelector(".hero__layer--light");
    var img = card.querySelector("img");
    var chip = hero.querySelector(".hero__chip");
    var playChip = chip ? popChip(chip, 0) : null;

    /* the card first shows --hero-peek of the screen (tokens.css), the space kept free under the words; read once per
       refresh, not on every frame */
    var peek = 0.18;
    function readPeek() {
      var v = parseFloat(getComputedStyle(hero).getPropertyValue("--hero-peek"));
      peek = isNaN(v) ? 0.18 : v / 100;
    }
    readPeek();
    ScrollTrigger.addEventListener("refreshInit", readPeek);
    function startY() { return window.innerHeight * (1 - peek) - card.offsetTop; }

    /* The card also starts at 80% of its size and grows to full size as it rises (scaled about its top edge).
       The white copy inside it gets the opposite move and scale, so it stays exactly over the dark words.
       Only transforms change, so nothing is repainted while scrolling. */
    var lift = { y: 0, s: 1 };
    /* Origins are set when the layout is measured; each frame only writes four numbers (quick setters, no layout reads) */
    function setOrigins() {
      gsap.set(card, { transformOrigin: "50% 0%" });
      gsap.set(light, { transformOrigin: "50% " + card.offsetTop + "px" });
    }
    setOrigins();
    ScrollTrigger.addEventListener("refresh", setOrigins);
    var cardY = gsap.quickSetter(card, "y", "px");
    var cardSX = gsap.quickSetter(card, "scaleX");
    var cardSY = gsap.quickSetter(card, "scaleY");
    var lightY = gsap.quickSetter(light, "y", "px");
    var lightSX = gsap.quickSetter(light, "scaleX");
    var lightSY = gsap.quickSetter(light, "scaleY");
    function moveCard() {
      cardY(lift.y);
      cardSX(lift.s);
      cardSY(lift.s);
      lightY(-lift.y / lift.s);
      lightSX(1 / lift.s);
      lightSY(1 / lift.s);
    }

    gsap.from(card, { opacity: 0, duration: motion.durRise, ease: motion.easeRise, delay: delay + 0.6 });

    /* The blank in the title: one underlined slot per letter, so the number of letters shows. With the first bit
       of scrolling, or with the pointer on the blank, "트리페이먼츠" pops up into it letter by letter with a small
       bounce (in both the dark words and the white copy). Back at the top with the pointer away, it sinks into
       the slots again; each slot clips its letter below the line. */
    var fills = Array.prototype.slice.call(hero.querySelectorAll(".hero__fill"));
    if (fills.length) {
      var grow = gsap.timeline({ paused: true });
      fills.forEach(function (fill) {
        var letters = fill.textContent.split("").map(function (ch) {
          var slot = document.createElement("span");
          var letter = document.createElement("span");
          slot.className = "hero__slot";
          letter.className = "hero__letter";
          letter.textContent = ch;
          slot.appendChild(letter);
          return slot;
        });
        fill.textContent = "";
        letters.forEach(function (slot) { fill.appendChild(slot); });
        fill.parentNode.classList.add("has-slots");
        var inner = letters.map(function (slot) { return slot.firstChild; });
        gsap.set(inner, { yPercent: 110, scaleY: 0.3, transformOrigin: "50% 100%" });
        grow.to(inner, { yPercent: 0, scaleY: 1, duration: 0.7, ease: "back.out(1.7)", stagger: 0.06 }, 0);
      });

      var scrolled = false;
      var pointed = false;
      var grown = false;
      var update = function () {
        var want = scrolled || pointed;
        if (want === grown) return;
        grown = want;
        if (want) grow.play(); else grow.reverse();
      };
      window.addEventListener("scroll", function () {
        scrolled = window.scrollY > 2;
        update();
      }, { passive: true });
      hero.querySelectorAll(".hero__blank").forEach(function (blank) {
        blank.addEventListener("pointerenter", function () { pointed = true; update(); });
        blank.addEventListener("pointerleave", function () { pointed = false; update(); });
      });
      scrolled = window.scrollY > 2;
      update();
    }

    var scene = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: function () { return "+=" + window.innerHeight; },
        pin: stage,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: function (self) {
          if (playChip && self.progress > 0.75) { playChip(); playChip = null; }
        }
      }
    })
      .fromTo(lift, { y: startY, s: 0.8 }, { y: 0, s: 1, ease: "none", onUpdate: moveCard, immediateRender: true }, 0)
      .fromTo(img, { scale: 1.15 }, { scale: 1, ease: "none" }, 0);
    /* The point terrain behind the words fades out over the first half of the rise */
    if (hero.terrainFade) scene.to(hero.terrainFade, { k: 0, ease: "none", duration: 0.5 }, 0);
    moveCard();

    /* Once the photo has covered the screen and the whole scene starts moving up with the page, the button folds up
       from its left end into its round arrow (in both copies of the words) over the next 35% of a screen */
    gsap.fromTo(hero.querySelectorAll(".hero__head .btn"), { "--fold": 0 }, {
      "--fold": 1,
      ease: "power2.inOut",
      scrollTrigger: {
        start: function () { return scene.scrollTrigger.end; },
        end: function () { return scene.scrollTrigger.end + window.innerHeight * 0.35; },
        scrub: true,
        invalidateOnRefresh: true
      }
    });
  }

  /* Photo drift: large section photos move a little inside their frame while they pass the screen */

  function initParallax() {
    if (!hasGsap || reduceMotion) return;
    gsap.utils.toArray(".section .media--xl img").forEach(function (img) {
      gsap.set(img, { scale: motion.parallaxScale });
      gsap.fromTo(img, { yPercent: -motion.parallaxShift }, {
        yPercent: motion.parallaxShift,
        ease: "none",
        scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true }
      });
    });
  }

  /* Section rails: two side lines per section (base.css), drawn down as the section scrolls by.
     They are real elements scaled with a transform; a variable on the section would restyle everything inside it each frame. */

  /* Partner columns: pointing at a column (or reaching it with the keyboard) opens it. On a touch screen the first
     tap opens a closed column instead of following its link. */
  function initPartnerCols() {
    document.querySelectorAll(".partner-cols").forEach(function (group) {
      var cols = Array.prototype.slice.call(group.querySelectorAll(".partner-col"));
      function open(col) {
        cols.forEach(function (c) { c.classList.toggle("is-open", c === col); });
      }
      cols.forEach(function (col) {
        col.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") open(col); });
        col.addEventListener("focus", function () { if (col.matches(":focus-visible")) open(col); });
        col.addEventListener("click", function (e) {
          if (!col.classList.contains("is-open")) {
            e.preventDefault();
            open(col);
          }
        });
      });
    });
  }

  /* Bar chart of numbers (home). On a desktop screen tall enough, the band stops once it fills the screen, with
     the title and the map in the middle. Scrolling on, the bars shoot out of the left edge of the screen one after
     another, each number counting up with its bar, while the title and the map make way into the right half of the
     screen (out into the right margin), the title on top and the map under it, the map only shrinking if the
     screen is too low for it. Elsewhere the bars grow under the title as the page scrolls. */
  function initStatBars() {
    if (!hasGsap || reduceMotion) return;
    document.querySelectorAll(".stats--bars").forEach(function (chart) {
      var section = chart.closest(".section");
      var intro = section.querySelector(".stats-intro");
      var rows = Array.prototype.slice.call(chart.querySelectorAll(".stat"));
      var scene = window.matchMedia("(min-width: 1025px) and (min-height: 700px)").matches;
      if (scene) section.classList.add("is-scene");
      /* The light runs along the bars only while the band is on screen */
      ScrollTrigger.create({ trigger: chart, start: "top bottom", end: "bottom top", toggleClass: { targets: section, className: "is-glowing" } });
      var tl = gsap.timeline({
        scrollTrigger: scene
          ? { trigger: section, start: "top top", end: function () { return "+=" + window.innerHeight * 1.6; }, pin: true, scrub: 0.8, invalidateOnRefresh: true }
          : { trigger: chart, start: "top 90%", end: "bottom 75%", scrub: 0.8 }
      });

      /* The map arrives large and close, turned a little to the left, and settles into place as the band comes up;
         rotation and depth are separate from the x, y and scale the scene moves later, so they never fight */
      var mapIn = intro.querySelector(".map");
      if (mapIn) {
        gsap.set(mapIn, { transformPerspective: 1200 });
        if (scene) {
          /* the scene owns the map: the usual fade-in would clear its size and slant when it finishes */
          mapIn.removeAttribute("data-reveal");
          mapIn.removeAttribute("data-reveal-delay");
          /* in the held scene the map simply stands at a slant (its dots coins with height) until the scene moves it
             aside and lays it flat; one owner for its turn, so nothing else can push it out of size */
          gsap.set(mapIn, { rotationY: -16, rotationX: 28, z: 0, transformPerspective: 3200 });
        } else {
          gsap.fromTo(mapIn, { rotationY: -26, rotationX: 9, z: 280 }, {
            rotationY: 0, rotationX: 0, z: 0,
            ease: "power2.out",
            scrollTrigger: { trigger: mapIn, start: "top 95%", end: "top 35%", scrub: 0.6 }
          });
        }
      }

      if (scene) {
        var head = intro.querySelector(".section__head");
        var map = intro.querySelector(".map");
        var spot = { hx: 0, hy: 0, mx: 0, my: 0, ms: 1 };
        /* Where the title and the map go, worked out from the layout whenever the page is laid out */
        var within = function (el) {
          var x = 0, y = 0;
          for (var e = el; e && e !== section; e = e.offsetParent) { x += e.offsetLeft; y += e.offsetTop; }
          return { left: x, top: y, width: el.offsetWidth, height: el.offsetHeight };
        };
        var place = function () {
          /* Layout sizes, not drawn boxes, so the turned or moved map measures the same */
          var vw = window.innerWidth, vh = window.innerHeight;
          var box = { left: 0, top: 0 };
          var h = within(head), m = within(map);
          var left = vw * 0.54;
          var right = vw - Math.max(tokenPx("--gutter", 24), 48);
          var top = tokenPx("--header-h", 72) + 32;
          var bottom = vh - 48;
          var gap = 40;
          var s = Math.min(1, (bottom - top - h.height - gap) / m.height, (right - left) / m.width);
          var total = h.height + gap + m.height * s;
          var y0 = top + Math.max(0, (bottom - top - total) / 2);
          spot.hx = left - (h.left - box.left);
          spot.hy = y0 - (h.top - box.top);
          spot.mx = left - (m.left - box.left);
          spot.my = y0 + h.height + gap - (m.top - box.top);
          spot.ms = s;
        };
        place();
        ScrollTrigger.addEventListener("refreshInit", place);
        gsap.set(map, { transformOrigin: "0 0" });
        /* beside the title the map is larger (1.3 times, about its middle) and its dots are coins with height */
        var big = 1.4;
        map.mapDepth = 1;
        map.mapZoom = big;
        if (map.redraw) map.redraw();
        var depth = { v: 1 };
        var bigAt = function () { return { x: -(big - 1) * map.offsetWidth / 2 + map.offsetWidth * 0.12, y: -(big - 1) * map.offsetHeight / 2 }; };
        /* the title intro: the title starts larger and shrinks to its size on the way aside */
        var bigTitle = head.querySelector(".t-h1");
        if (bigTitle) {
          gsap.set(bigTitle, { transformOrigin: "0% 50%" });
          tl.fromTo(bigTitle, { scale: 1.2 }, { scale: 1, duration: 1, ease: "power3.inOut" }, 0.05);
        }
        tl.fromTo(head, { x: 0, y: 0 }, { x: function () { return spot.hx; }, y: function () { return spot.hy; }, duration: 1, ease: "power3.inOut" }, 0.05)
          .fromTo(map, { x: function () { return bigAt().x; }, y: function () { return bigAt().y; }, scale: big }, { x: function () { return spot.mx; }, y: function () { return spot.my; }, scale: function () { return spot.ms; }, duration: 1, ease: "power3.inOut" }, 0.05)
          /* on the way it turns flat and the coins lose their height */
          .fromTo(mapIn, { rotationX: 28, rotationY: -16 }, { rotationX: 0, rotationY: 0, duration: 0.8, ease: "power2.inOut", immediateRender: false }, 0.05)
          .fromTo(depth, { v: 1 }, { v: 0, duration: 0.8, ease: "power2.inOut", immediateRender: false, onUpdate: function () { map.mapDepth = depth.v; if (map.repaint) map.repaint(); } }, 0.05);
      }

      rows.forEach(function (row, i) {
        var num = row.querySelector("[data-count]");
        var text = row.querySelector(".stat__text");
        var target = num ? parseFloat(num.getAttribute("data-count")) : 0;
        var suffix = num ? num.getAttribute("data-suffix") || "" : "";
        var state = { p: 0 };
        gsap.set(row, { "--p": 0 });
        tl.fromTo(state, { p: 0 }, {
          p: 1,
          duration: 1,
          ease: "power2.out",
          onUpdate: function () {
            row.style.setProperty("--p", state.p.toFixed(4));
            if (num) num.textContent = formatNumber(target * state.p, 0) + suffix;
          }
        }, 0.35 + i * 0.45)
          .fromTo(text, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power1.out", immediateRender: true }, 0.35 + i * 0.45);
      });
      tl.set({}, {}, "+=0.3");
    });
  }

  /* Sub page details: the three photos under the story drift at different depths, the photo behind the closing
     band settles from a slight zoom, and the small pictures and icons on cards pop in as their group comes in */
  function initSubMotion() {
    if (!hasGsap || reduceMotion) return;
    if (isDesktop) {
      document.querySelectorAll(".photo-row").forEach(function (row) {
        var depth = [70, -40, 110];
        Array.prototype.slice.call(row.children).forEach(function (photo, i) {
          gsap.fromTo(photo, { y: depth[i % 3] }, {
            y: -depth[i % 3],
            ease: "none",
            scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: 0.6 }
          });
        });
      });
    }
    document.querySelectorAll(".cta-band__photo").forEach(function (photo) {
      gsap.fromTo(photo, { scale: 1.18 }, {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: photo.parentElement, start: "top bottom", end: "bottom bottom", scrub: 0.6 }
      });
    });
    document.querySelectorAll(".values, .cards").forEach(function (group) {
      var pics = group.querySelectorAll(".value__pic, .card__pic, .card__num");
      if (!pics.length) return;
      gsap.set(pics, { scale: 0.4, opacity: 0 });
      ScrollTrigger.create({
        trigger: group,
        start: "top 85%",
        once: true,
        onEnter: function () {
          gsap.to(pics, { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(2)", stagger: 0.1, delay: 0.2, clearProps: "transform,opacity" });
        }
      });
    });
  }

  /* Pointer position over the window, -1 to 1 each way, shared by the scenes that lean with it (mouse only) */
  var pointer = { x: 0, y: 0, on: false };
  function watchPointer() {
    if (pointer.on || !window.matchMedia("(hover: hover)").matches) return;
    pointer.on = true;
    window.addEventListener("pointermove", function (e) {
      pointer.x = e.clientX / window.innerWidth * 2 - 1;
      pointer.y = e.clientY / window.innerHeight * 2 - 1;
    }, { passive: true });
  }

  /* Cube (home hero): one large wireframe cube, faint, right behind the words, turning slowly on a tilted axis.
     Each corner carries a short label for something the company does, drawn in small capitals-like type; the
     corners nearest the viewer are a little darker and larger. It leans a little with the mouse, fades out as the
     photo rises, and only draws while the hero is on screen. */
  function initTerrain() {
    if (!hasGsap || reduceMotion) return;
    var canvas = document.querySelector(".hero__net");
    if (!canvas) return;
    watchPointer();
    var hero = canvas.closest(".hero");
    var ctx = canvas.getContext("2d");
    var w = 0, h = 0;
    function size() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();
    ScrollTrigger.addEventListener("refresh", size);

    var LABELS = ["PG 단말기", "가맹점 정산", "전자지갑", "매출관리 전산", "온라인 결제", "쇼핑몰 제작", "영업용 전산", "WEB · APP"];
    var V = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    var E = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
    function rot(p, axis, ang) {
      /* rotation about a unit axis */
      var l = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);
      var x = axis[0] / l, y = axis[1] / l, z = axis[2] / l, c = Math.cos(ang), s = Math.sin(ang), t = 1 - c;
      return [
        p[0] * (t * x * x + c) + p[1] * (t * x * y - s * z) + p[2] * (t * x * z + s * y),
        p[0] * (t * x * y + s * z) + p[1] * (t * y * y + c) + p[2] * (t * y * z - s * x),
        p[0] * (t * x * z - s * y) + p[1] * (t * y * z + s * x) + p[2] * (t * z * z + c)
      ];
    }
    var fade = { k: 1 };
    hero.terrainFade = fade;
    /* lines, corner dots and labels in the side captions' colour (--sage-200), at the same full strength */
    var hex = getComputedStyle(document.documentElement).getPropertyValue("--sage-200").trim().replace("#", "") || "D7DBD9";
    var tone = [0, 2, 4].map(function (i) { return parseInt(hex.slice(i, i + 2), 16); }).join(", ");
    /* the button: the cube's lines stop 5px short of it, as they do round the outlined words */
    var button = hero.querySelector(".hero__layer:not(.hero__layer--light) .hero__head .btn");
    var lean = { x: 0, y: 0 };
    var frame = 0;
    var font = (isDesktop ? 11 : 9) + "px " + getComputedStyle(document.body).fontFamily;
    /* the drawing-in: edges appear one after another along a path round the cube, each growing from its first
       corner; the corner dots and labels follow once their edge has arrived */
    var born = null, lastT = 0;
    var ORDER = [0, 1, 2, 3, 8, 4, 5, 6, 7, 9, 10, 11];
    /* the clock is paused over long gaps between frames (a busy page, a hidden tab), so the edges are always seen
       being drawn rather than appearing finished */
    function tick(t) {
      if (born === null) born = t;
      else if (t - lastT > 0.1) born += t - lastT - 1 / 60;
      lastT = t;
    }
    function drawn(e, t) {
      var age = t - born - 0.4;
      var k = (age - ORDER.indexOf(e) * 0.16) / 0.5;
      return k < 0 ? 0 : k > 1 ? 1 : k * k * (3 - 2 * k);
    }
    function draw(time) {
      var t = time / 1000;
      tick(t);
      lean.x += (pointer.x - lean.x) * 0.04;
      lean.y += (pointer.y - lean.y) * 0.04;
      ctx.clearRect(0, 0, w, h);
      if (fade.k <= 0.01) { frame = requestAnimationFrame(draw); return; }
      /* half the cube's edge: by the band's height, held to a share of the width that grows on narrower screens */
      var R = Math.min(h * 0.24, w * (w < 769 ? 0.24 : w < 1025 ? 0.18 : 0.14));
      var cx = w / 2 + lean.x * 18, cy = h * 0.5 + Math.sin(t * 0.4) * 5 + lean.y * 10;
      var pts = [];
      for (var i = 0; i < 8; i++) {
        var p = rot(V[i], [1, 0.9, 0.35], t * 0.12);
        p = rot(p, [0, 1, 0], lean.x * 0.3);
        p = rot(p, [1, 0, 0], -lean.y * 0.22);
        var f = 5 / (5 + p[2]);
        pts.push([cx + p[0] * R * f, cy + p[1] * R * f, p[2]]);
      }
      ctx.lineJoin = "round";
      var seen = [0, 0, 0, 0, 0, 0, 0, 0];
      for (var e = 0; e < E.length; e++) {
        var A = pts[E[e][0]], B = pts[E[e][1]];
        var d = drawn(e, t);
        if (d <= 0) continue;
        if (d >= 1) { seen[E[e][0]] = 1; seen[E[e][1]] = 1; } else { seen[E[e][0]] = Math.max(seen[E[e][0]], 0.5); }
        var near = 0.5 - (A[2] + B[2]) / 4;
        ctx.beginPath();
        ctx.moveTo(A[0], A[1]);
        ctx.lineTo(A[0] + (B[0] - A[0]) * d, A[1] + (B[1] - A[1]) * d);
        ctx.strokeStyle = "rgba(" + tone + ", " + fade.k + ")";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.font = font;
      ctx.textBaseline = "middle";
      for (var k = 0; k < 8; k++) {
        if (!seen[k]) continue;
        var q = pts[k], nr = 0.5 - q[2] / 2, on = seen[k];
        /* the corner dot */
        ctx.beginPath();
        ctx.arc(q[0], q[1], (2 + 1.5 * nr) * on, 0, 6.2832);
        ctx.fillStyle = "rgba(" + tone + ", " + (fade.k * on) + ")";
        ctx.fill();
        if (on < 1) continue;
        /* its label, set off to the side away from the cube's middle */
        var right = q[0] >= cx;
        /* kept 6px inside the screen, so a corner near the edge of a narrow screen does not cut its label */
        var tw = ctx.measureText(LABELS[k]).width;
        var lx = right ? Math.min(q[0] + 9, w - 6 - tw) : Math.max(q[0] - 9, 6 + tw);
        ctx.textAlign = right ? "left" : "right";
        ctx.fillStyle = "rgba(" + tone + ", " + fade.k + ")";
        ctx.fillText(LABELS[k], lx, q[1]);
      }
      if (button) {
        var cr = canvas.getBoundingClientRect(), br = button.getBoundingClientRect(), pad = 5;
        var bx = br.left - cr.left - pad, by = br.top - cr.top - pad, bw = br.width + pad * 2, bh = br.height + pad * 2;
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(bx, by, bw, bh, bh / 2); else ctx.rect(bx, by, bw, bh);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      }
      frame = requestAnimationFrame(draw);
    }
    ScrollTrigger.create({
      trigger: hero,
      start: "top bottom",
      end: "bottom top",
      onToggle: function (self) {
        cancelAnimationFrame(frame);
        frame = 0;
        if (self.isActive) frame = requestAnimationFrame(draw);
      }
    });
  }

  /* Point tree (home navy statement, after the point-cloud shapes on korpay.com): a tree in 3D made of a few thousand
     small points, mint on the leaves and pale on the wood. Before the section turns navy the points float scattered
     in a wide cloud; with the scroll they fly into place, the ground and trunk first and the crown last. The tree
     turns slowly, and the view leans a little with the mouse. Drawn on a canvas only while the section is on
     screen; points of the same colour and brightness are filled together. */
  function initCloud() {
    if (!hasGsap || reduceMotion) return;
    watchPointer();
    document.querySelectorAll(".sec-statement .statement-tree").forEach(function (layer) {
      /* Building the tree takes a few hundred milliseconds, so it waits until the first screen has settled and the
         browser is idle, or until the section comes within two screens, whichever is first */
      var built = false;
      function build() {
        if (built) return;
        built = true;
        buildCloud(layer);
      }
      var idle = window.requestIdleCallback || function (f) { return setTimeout(f, 1800); };
      setTimeout(function () { idle(build, { timeout: 2500 }); }, 2600);
      ScrollTrigger.create({
        trigger: layer.closest(".section"),
        start: function () { return "top bottom+=" + window.innerHeight * 2; },
        once: true,
        onEnter: build
      });
    });
  }

  function buildCloud(layer) {
    {
      var section = layer.closest(".section");
      var canvas = document.createElement("canvas");
      canvas.className = "statement-tree__cloud";
      canvas.setAttribute("aria-hidden", "true");
      layer.appendChild(canvas);
      var ctx = canvas.getContext("2d");

      var seed = 20261026;
      function rand() {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      }
      function ball() {
        var x, y, z;
        do { x = rand() * 2 - 1; y = rand() * 2 - 1; z = rand() * 2 - 1; } while (x * x + y * y + z * z > 1);
        return [x, y, z];
      }

      /* The tree, about 1.1 units tall, is grown as a set of solids: a trunk with root lobes, limbs that fork two or
         three ways five times over with side twigs along the way, bending up while young and drooping at the tips,
         kept inside a canopy egg; tufts of leaves hang on the outer twigs only, so the limbs show through below and
         between them. Points sit on the SURFACE of the union of the solids (a point on one solid is dropped if it
         lies inside another), so the silhouette reads like a scan; each point keeps its surface normal for shading. */
      var solids = [];
      /* the skeleton: a glowing line down the middle of every piece of wood, drawn as the points gather there */
      var bones = [];
      function cyl(a, b, r0, r1, kind, flare) {
        var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
        var len = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (len < 0.0005) return;
        var rm = Math.max(r0, r1) + (flare ? 0.03 : 0);
        solids.push({ t: "c", a: a, d: [dx / len, dy / len, dz / len], len: len, r0: r0, r1: r1, kind: kind, flare: flare || 0,
          area: Math.PI * (r0 + r1) * len * (flare ? 1.5 : 1) * 3,
          bc: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], br: len / 2 + rm });
        bones.push({ a: a, b: b, r: (r0 + r1) / 2, t0: 0.08 + Math.min(1, Math.max(0, a[1] / 1.15)) * 0.34, t1: 0.08 + Math.min(1, Math.max(0, b[1] / 1.15)) * 0.34,
          /* how much of the line shows: the trunk and the big limbs fully, the twigs among the leaves hardly at all */
          show: Math.min(1, Math.max(0.12, ((r0 + r1) / 2 - 0.008) / 0.04)) });
      }
      function ell(c, rx, ry, rz, kind) {
        var p = 1.6;
        solids.push({ t: "e", c: c, r: [rx, ry, rz], kind: kind,
          area: 4 * Math.PI * Math.pow((Math.pow(rx * ry, p) + Math.pow(ry * rz, p) + Math.pow(rx * rz, p)) / 3, 1 / p),
          bc: c, br: Math.max(rx, ry, rz) });
      }
      function norm(d) {
        var l = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]) || 1;
        return [d[0] / l, d[1] / l, d[2] / l];
      }
      function perp(d) {
        var o = ball();
        var k = o[0] * d[0] + o[1] * d[1] + o[2] * d[2];
        return norm([o[0] - d[0] * k, o[1] - d[1] * k, o[2] - d[2] * k]);
      }
      function turn(d, p, deg) {
        var r = deg * Math.PI / 180, c = Math.cos(r), s = Math.sin(r);
        return norm([d[0] * c + p[0] * s, d[1] * c + p[1] * s, d[2] * c + p[2] * s]);
      }
      var ENV = [0, 0.76, 0], ER = [0.62, 0.42, 0.62];
      function outside(p) {
        var ex = (p[0] - ENV[0]) / ER[0], ey = (p[1] - ENV[1]) / ER[1], ez = (p[2] - ENV[2]) / ER[2];
        return ex * ex + ey * ey + ez * ez > 1;
      }
      var maxDepth = isDesktop ? 6 : 5;
      function tuft(at, r) {
        ell([at[0] + (rand() - 0.5) * r * 0.6, at[1] + r * 0.35, at[2] + (rand() - 0.5) * r * 0.6], r, r * 0.8, r, 2);
      }
      function branch(pos, dir, len, r, depth) {
        var lift = depth < 2 ? 0.26 : depth < 4 ? 0.08 : -0.1;
        var ol = Math.sqrt(pos[0] * pos[0] + pos[2] * pos[2]);
        var ow = ol > 0.04 && depth < 4 ? 0.14 : 0;
        var d2 = norm([dir[0] + (ol ? pos[0] / ol : 0) * ow, dir[1] + lift, dir[2] + (ol ? pos[2] / ol : 0) * ow]);
        var mid = [pos[0] + dir[0] * len * 0.5, pos[1] + dir[1] * len * 0.5, pos[2] + dir[2] * len * 0.5];
        var end = [mid[0] + d2[0] * len * 0.5, mid[1] + d2[1] * len * 0.5, mid[2] + d2[2] * len * 0.5];
        if (outside(end)) {
          len *= 0.55;
          mid = [pos[0] + dir[0] * len * 0.5, pos[1] + dir[1] * len * 0.5, pos[2] + dir[2] * len * 0.5];
          end = [mid[0] + d2[0] * len * 0.5, mid[1] + d2[1] * len * 0.5, mid[2] + d2[2] * len * 0.5];
          if (outside(end)) { tuft(pos, 0.04 + rand() * 0.03); return; }
        }
        var r1 = r * 0.78;
        cyl(pos, mid, r, (r + r1) / 2, 1, 0);
        cyl(mid, end, (r + r1) / 2, r1, 1, 0);
        var last = depth >= maxDepth || len < 0.04 || r1 < 0.0035;
        /* leaves: a tuft at most outer forks, and on the last twigs one more midway and one beside the tip */
        if (depth >= 2 && (last || rand() < 0.7)) tuft(end, 0.045 + rand() * 0.04 + (last ? 0.01 : 0));
        if (last) {
          tuft(mid, 0.035 + rand() * 0.03);
          if (rand() < 0.6) tuft([end[0] + (rand() - 0.5) * 0.09, end[1] + 0.02 + rand() * 0.04, end[2] + (rand() - 0.5) * 0.09], 0.04 + rand() * 0.03);
          return;
        }
        /* a side twig partway along, thinner and turned well away */
        if (depth >= 1 && depth <= 3 && rand() < 0.65) {
          var u = 0.35 + rand() * 0.4;
          var at = [pos[0] + (end[0] - pos[0]) * u, pos[1] + (end[1] - pos[1]) * u, pos[2] + (end[2] - pos[2]) * u];
          branch(at, turn(d2, perp(d2), 48 + rand() * 24), len * (0.5 + rand() * 0.15), r1 * 0.5, depth + 2);
        }
        var kids = depth <= 2 && rand() < 0.35 ? 3 : 2;
        var p = perp(d2);
        var q = norm([d2[1] * p[2] - d2[2] * p[1], d2[2] * p[0] - d2[0] * p[2], d2[0] * p[1] - d2[1] * p[0]]);
        for (var i = 0; i < kids; i++) {
          var ang = kids === 2 ? (i ? Math.PI : 0) + (rand() - 0.5) * 0.8 : i * 2.094 + (rand() - 0.5) * 0.6;
          var axis = [p[0] * Math.cos(ang) + q[0] * Math.sin(ang), p[1] * Math.cos(ang) + q[1] * Math.sin(ang), p[2] * Math.cos(ang) + q[2] * Math.sin(ang)];
          var spread = (kids === 3 ? 30 : 24) + rand() * 20;
          branch(end, turn(d2, axis, spread), len * (0.68 + rand() * 0.14), r1 * (kids === 3 ? 0.66 : 0.74), depth + 1);
        }
      }
      var top = [0.015, 0.3, 0.01];
      /* the trunk runs a little below the ground line and widens gently towards it, no roots showing */
      cyl([0, -0.04, 0], top, 0.064, 0.052, 1, 1);
      /* the trunk runs on a little above the fork, tapering, so it does not stop short where the limbs leave it
         (no random numbers are drawn here, so the crown keeps its shape) */
      cyl(top, [0.03, 0.4, -0.005], 0.052, 0.036, 1, 0);
      var limbs = 4 + (isDesktop ? 1 : 0);
      for (var l = 0; l < limbs; l++) {
        var la = l * Math.PI * 2 / limbs + rand() * 0.6, le = (48 + rand() * 18) * Math.PI / 180;
        var base = [top[0], top[1] - 0.03 + rand() * 0.05, top[2]];
        branch(base, norm([Math.cos(le) * Math.cos(la), Math.sin(le), Math.cos(le) * Math.sin(la)]), 0.25 + rand() * 0.05, 0.034, 1);
      }
      branch(top, norm([0.1, 1, -0.08]), 0.22, 0.03, 1);

      function radius(c, u) { return c.r0 + (c.r1 - c.r0) * u + (c.flare && u < 0.3 ? Math.pow((0.3 - u) / 0.3, 3) * 0.03 : 0); }
      /* A grid over the tree: each cell lists the solids whose bounding sphere reaches into it, so a point is tested
         against the few solids near it instead of all of them (the answer is the same, found much faster) */
      var CELL = 0.06, gx0 = Infinity, gy0 = Infinity, gz0 = Infinity, gx1 = -Infinity, gy1 = -Infinity, gz1 = -Infinity;
      solids.forEach(function (o) {
        gx0 = Math.min(gx0, o.bc[0] - o.br); gy0 = Math.min(gy0, o.bc[1] - o.br); gz0 = Math.min(gz0, o.bc[2] - o.br);
        gx1 = Math.max(gx1, o.bc[0] + o.br); gy1 = Math.max(gy1, o.bc[1] + o.br); gz1 = Math.max(gz1, o.bc[2] + o.br);
      });
      var GX = Math.ceil((gx1 - gx0) / CELL) + 1, GY = Math.ceil((gy1 - gy0) / CELL) + 1, GZ = Math.ceil((gz1 - gz0) / CELL) + 1;
      var grid = new Array(GX * GY * GZ);
      solids.forEach(function (o) {
        var ax = Math.floor((o.bc[0] - o.br - gx0) / CELL), bx = Math.floor((o.bc[0] + o.br - gx0) / CELL);
        var ay = Math.floor((o.bc[1] - o.br - gy0) / CELL), by = Math.floor((o.bc[1] + o.br - gy0) / CELL);
        var az = Math.floor((o.bc[2] - o.br - gz0) / CELL), bz = Math.floor((o.bc[2] + o.br - gz0) / CELL);
        for (var cx = ax; cx <= bx; cx++) for (var cy = ay; cy <= by; cy++) for (var cz = az; cz <= bz; cz++) {
          var key = (cx * GY + cy) * GZ + cz;
          (grid[key] || (grid[key] = [])).push(o);
        }
      });
      function inside(x, y, z, skip) {
        var cx = Math.floor((x - gx0) / CELL), cy = Math.floor((y - gy0) / CELL), cz = Math.floor((z - gz0) / CELL);
        if (cx < 0 || cy < 0 || cz < 0 || cx >= GX || cy >= GY || cz >= GZ) return false;
        var near = grid[(cx * GY + cy) * GZ + cz];
        if (!near) return false;
        for (var i = 0; i < near.length; i++) {
          var o = near[i];
          if (o === skip) continue;
          var bx = x - o.bc[0], by = y - o.bc[1], bz = z - o.bc[2];
          if (bx * bx + by * by + bz * bz > o.br * o.br) continue;
          if (o.t === "e") {
            var ex = (x - o.c[0]) / o.r[0], ey = (y - o.c[1]) / o.r[1], ez = (z - o.c[2]) / o.r[2];
            if (ex * ex + ey * ey + ez * ez < 0.98) return true;
          } else {
            var px = x - o.a[0], py = y - o.a[1], pz = z - o.a[2];
            var along = px * o.d[0] + py * o.d[1] + pz * o.d[2];
            if (along < 0 || along > o.len) continue;
            var qx = px - o.d[0] * along, qy = py - o.d[1] * along, qz = pz - o.d[2] * along;
            if (Math.sqrt(qx * qx + qy * qy + qz * qz) < radius(o, along / o.len) * 0.97) return true;
          }
        }
        return false;
      }
      var areaTotal = 0;
      solids.forEach(function (o) { areaTotal += o.area; });

      var N = isDesktop ? 36000 : 12000;
      var tx = new Float32Array(N), ty = new Float32Array(N), tz = new Float32Array(N);
      var nx = new Float32Array(N), ny = new Float32Array(N), nz = new Float32Array(N);
      var sx = new Float32Array(N), sy = new Float32Array(N), sz = new Float32Array(N);
      var delay = new Float32Array(N), kind = new Uint8Array(N), drift = new Float32Array(N), dot = new Float32Array(N);
      var i = 0, guard = 0;
      /* sampled a few milliseconds per frame, so the page never stops while it is built; the points and their order
         are the same as in one go */
      function sample(budget) {
        var until = performance.now() + budget;
      while (i < N && guard++ < N * 60) {
        if ((guard & 127) === 0 && performance.now() > until) return false;
        var x, y, z, k, mx, my, mz, inner = false;
        {
          var pick = rand() * areaTotal, o = solids[0];
          for (var j = 0; j < solids.length; j++) { pick -= solids[j].area; if (pick <= 0) { o = solids[j]; break; } }
          if (o.t === "e") {
            var q = ball(), ql = Math.sqrt(q[0] * q[0] + q[1] * q[1] + q[2] * q[2]) || 1;
            /* leaves: mostly on the tuft's surface, a few inside for body */
            var depthIn = rand() < 0.2 ? 0.55 + rand() * 0.4 : 1;
            inner = depthIn < 1;
            x = o.c[0] + q[0] / ql * o.r[0] * depthIn; y = o.c[1] + q[1] / ql * o.r[1] * depthIn; z = o.c[2] + q[2] / ql * o.r[2] * depthIn;
            mx = q[0] / ql / o.r[0]; my = q[1] / ql / o.r[1]; mz = q[2] / ql / o.r[2];
          } else {
            var u = rand(), ang = rand() * Math.PI * 2, r = radius(o, u);
            var ax = Math.abs(o.d[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
            var ux = o.d[1] * ax[2] - o.d[2] * ax[1], uy = o.d[2] * ax[0] - o.d[0] * ax[2], uz = o.d[0] * ax[1] - o.d[1] * ax[0];
            var ul = Math.sqrt(ux * ux + uy * uy + uz * uz); ux /= ul; uy /= ul; uz /= ul;
            var vx = o.d[1] * uz - o.d[2] * uy, vy = o.d[2] * ux - o.d[0] * uz, vz = o.d[0] * uy - o.d[1] * ux;
            mx = ux * Math.cos(ang) + vx * Math.sin(ang); my = uy * Math.cos(ang) + vy * Math.sin(ang); mz = uz * Math.cos(ang) + vz * Math.sin(ang);
            x = o.a[0] + o.d[0] * o.len * u + mx * r; y = o.a[1] + o.d[1] * o.len * u + my * r; z = o.a[2] + o.d[2] * o.len * u + mz * r;
          }
          if (!inner && inside(x, y, z, o)) continue;
          k = o.kind;
          var ml = Math.sqrt(mx * mx + my * my + mz * mz) || 1; mx /= ml; my /= ml; mz /= ml;
          /* leaves facing up are sunlit and paler, those facing down are in shade and deeper green */
          if (k === 2) k = my > 0.4 ? 3 : my < -0.45 ? 4 : 2;
          if (!inner) {
            /* a little inward scatter, and a few strays just outside the surface */
            var jit = rand() < 0.05 ? rand() * 0.025 : -rand() * 0.008;
            x += mx * jit; y += my * jit; z += mz * jit;
          }
        }
        tx[i] = x; ty[i] = y; tz[i] = z; nx[i] = mx; ny[i] = my; nz[i] = mz; kind[i] = k;
        var c = ball();
        sx[i] = c[0] * 4.2; sy[i] = 0.55 + c[1] * 1.9; sz[i] = c[2] * 2.6;
        /* when each point sets off, by height: the crown's last points land exactly as the gathering is whole (1) */
        delay[i] = 0.3 + Math.min(1, Math.max(0, y / 1.15)) * 0.33 + rand() * 0.05;
        drift[i] = rand() * Math.PI * 2;
        dot[i] = (inner ? 0.6 : 0.85) + rand() * 0.6;
        i++;
      }
        return true;
      }
      function step() {
        if (!sample(6)) { requestAnimationFrame(step); return; }
        finish();
      }
      requestAnimationFrame(step);

      function finish() {
      N = i;

      var w = 0, h = 0;
      function size() {
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = layer.clientWidth;
        h = layer.clientHeight;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      size();

      /* Drawing: points of the same colour and brightness step are gathered into one shape and filled together. */
      var colours = ["rgba(226, 247, 235, 1)", "rgba(255, 255, 255, 1)", "rgba(140, 224, 181, 1)", "rgba(191, 238, 213, 1)", "rgba(34, 182, 118, 1)"];
      var levels = 8;
      var lean = { x: 0, y: 0 };
      var frame = 0;
      function draw(time) {
        var grown = layer.growth || 0;
        lean.x += (pointer.x - lean.x) * 0.05;
        lean.y += (pointer.y - lean.y) * 0.05;
        /* it turns slowly by itself (one turn a minute), so it is drawn every frame while on screen */
        var yaw = lean.x * 0.45 + time * 0.000105;
        var pitch = 0.16 + lean.y * 0.14;
        var ca = Math.cos(yaw), sa = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
        /* size and footing: on a phone held upright the tree stands in the lower part under the words, its foot well
           off the bottom; on an upright tablet it is as large as the width allows behind the words; elsewhere its
           height follows the screen's */
        var S, cy;
        if (w < 600 && h > w) { S = Math.min(h * 0.46, w * 0.72); cy = h * 0.93 - 0.45 * S; }
        else if (h > w) { S = Math.min(h * 0.6, w * 0.78); cy = h * 0.95 - 0.45 * S; }
        else { S = Math.min(h * 0.72, w * 0.6); cy = h * 0.97 - 0.45 * S; }
        var cx = w / 2 + lean.x * 14;
        var paths = [];
        for (var b = 0; b < colours.length * levels; b++) paths.push(new Path2D());
        var t = time * 0.0004;
        for (var i = 0; i < N; i++) {
          var q = (grown - delay[i]) / 0.32;
          q = q < 0 ? 0 : q > 1 ? 1 : q;
          var e = q * q * (3 - 2 * q);
          var loose = 1 - e;
          var x = sx[i] + (tx[i] - sx[i]) * e + Math.sin(t + drift[i]) * 0.03 * loose;
          var y = sy[i] + (ty[i] - sy[i]) * e + Math.cos(t * 1.3 + drift[i]) * 0.03 * loose;
          var z = sz[i] + (tz[i] - sz[i]) * e;
          var X = x * ca - z * sa, Z = x * sa + z * ca;
          var Y = y - 0.45;
          var Y2 = Y * cp - Z * sp, Z2 = Y * sp + Z * cp;
          var f = 2.6 / (2.6 + Z2);
          var px = cx + X * S * f, py = cy - Y2 * S * f;
          if (px < -4 || px > w + 4 || py < -4 || py > h + 4) continue;
          /* shade: the surface normal turned with the view, lit from the upper front left, a faint rim light from
             behind, and depth fog; scattered points are dim until they settle */
          var NX = nx[i] * ca - nz[i] * sa, NZ0 = nx[i] * sa + nz[i] * ca;
          var NY = ny[i] * cp - NZ0 * sp, NZ = ny[i] * sp + NZ0 * cp;
          var lit = NX * -0.35 + NY * 0.55 + NZ * -0.76;
          var rim = NZ > 0.6 ? (NZ - 0.6) * 0.9 : 0;
          var near = 1 - (Z2 + 1) / 2;
          var light = (0.22 + 0.78 * (lit < 0 ? 0 : lit) + rim) * (0.6 + 0.4 * (near < 0 ? 0 : near > 1 ? 1 : near));
          light = light * (0.4 + 0.6 * e) + 0.14 * (1 - e);
          if (light > 1) light = 1;
          var level = Math.min(levels - 1, Math.floor(light * levels));
          var s = (kind[i] >= 2 ? 1.15 : 1.35) * f * dot[i];
          paths[kind[i] * levels + level].rect(px, py, s, s);
        }
        ctx.clearRect(0, 0, w, h);
        /* skeleton: each bone draws from its base upward as the gathering reaches it; a soft wide glow under a
           thin bright core, both fading once the points have settled around it */
        var glowStrong = new Path2D(), coreStrong = new Path2D(), glowFaint = new Path2D(), coreFaint = new Path2D(), boneAlpha = 0, drawn = 0;
        for (var bi = 0; bi < bones.length; bi++) {
          var bn = bones[bi];
          /* the skeleton grows first, from the ground up; the points arrive later and settle on it */
          var s0 = bn.t0, s1 = bn.t1;
          if (grown <= s0) continue;
          var reach = grown >= s1 ? 1 : (grown - s0) / ((s1 - s0) || 0.0001);
          if (reach <= 0) continue;
          reach = reach > 1 ? 1 : reach;
          /* once the points along this bone have landed (their delay plus the 0.32 gather) the line is gone: the
             bone from the ground up to where the points have reached is cut away */
          var landFrom = 0.3 + Math.min(1, Math.max(0, bn.a[1] / 1.15)) * 0.33 + 0.3, landTo = 0.3 + Math.min(1, Math.max(0, bn.b[1] / 1.15)) * 0.33 + 0.3;
          var gone = grown >= landTo ? 1 : grown <= landFrom ? 0 : (grown - landFrom) / ((landTo - landFrom) || 0.0001);
          if (gone >= 1) continue;
          var ex = bn.a[0] + (bn.b[0] - bn.a[0]) * reach, ey = bn.a[1] + (bn.b[1] - bn.a[1]) * reach, ez = bn.a[2] + (bn.b[2] - bn.a[2]) * reach;
          var g0 = gone || 0;
          var ax0 = bn.a[0] + (bn.b[0] - bn.a[0]) * g0, ay0 = bn.a[1] + (bn.b[1] - bn.a[1]) * g0, az0 = bn.a[2] + (bn.b[2] - bn.a[2]) * g0;
          if (g0 >= reach) continue;
          var A0 = ax0 * ca - az0 * sa, A2 = ax0 * sa + az0 * ca, AY = ay0 - 0.45;
          var AY2 = AY * cp - A2 * sp, AZ2 = AY * sp + A2 * cp, Af = 2.6 / (2.6 + AZ2);
          var B0 = ex * ca - ez * sa, B2 = ex * sa + ez * ca, BY = ey - 0.45;
          var BY2 = BY * cp - B2 * sp, BZ2 = BY * sp + B2 * cp, Bf = 2.6 / (2.6 + BZ2);
          var strong = bn.show > 0.5;
          (strong ? glowStrong : glowFaint).moveTo(cx + A0 * S * Af, cy - AY2 * S * Af);
          (strong ? glowStrong : glowFaint).lineTo(cx + B0 * S * Bf, cy - BY2 * S * Bf);
          (strong ? coreStrong : coreFaint).moveTo(cx + A0 * S * Af, cy - AY2 * S * Af);
          (strong ? coreStrong : coreFaint).lineTo(cx + B0 * S * Bf, cy - BY2 * S * Bf);
          /* the bone is brightest while its points are still arriving, then settles to a faint trace */
          boneAlpha += 1;
          drawn++;
        }
        if (drawn) {
          var ba = boneAlpha / drawn;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          /* trunk and limbs: a thin bright thread with a soft glow; twigs in the crown: a whisper, so the leaves read */
          ctx.strokeStyle = "rgba(140, 224, 181, " + (0.1 * ba) + ")";
          ctx.lineWidth = 4;
          ctx.stroke(glowStrong);
          ctx.strokeStyle = "rgba(226, 247, 235, " + (0.38 * ba + 0.06) + ")";
          ctx.lineWidth = 0.8;
          ctx.stroke(coreStrong);
          ctx.strokeStyle = "rgba(140, 224, 181, " + (0.04 * ba) + ")";
          ctx.lineWidth = 2;
          ctx.stroke(glowFaint);
          ctx.strokeStyle = "rgba(226, 247, 235, " + (0.1 * ba + 0.02) + ")";
          ctx.lineWidth = 0.6;
          ctx.stroke(coreFaint);
        }
        for (var p = 0; p < paths.length; p++) {
          ctx.globalAlpha = ((p % levels) + 0.5) / levels;
          ctx.fillStyle = colours[Math.floor(p / levels)];
          ctx.fill(paths[p]);
        }
        ctx.globalAlpha = 1;
        frame = requestAnimationFrame(draw);
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onToggle: function (self) {
          cancelAnimationFrame(frame);
          frame = 0;
          if (self.isActive) frame = requestAnimationFrame(draw);
        }
      });
      ScrollTrigger.addEventListener("refresh", size);
      }
    }
  }

  /* Fairy dust (home navy statement, after the starfield on korpay.com): small soft lights, white and mint, each
     twinkling on its own beat and rising slowly with a little sway. Each sits at its own depth, so scrolling moves
     the near ones further than the far ones. Drawn on a canvas in the layer that stays over the visible part of the
     section; the loop runs only while the section is on screen. */
  function initDust() {
    if (!hasGsap || reduceMotion) return;
    watchPointer();
    document.querySelectorAll(".sec-statement .statement-tree").forEach(function (layer) {
      var section = layer.closest(".section");
      var canvas = document.createElement("canvas");
      canvas.className = "statement-tree__dust";
      canvas.setAttribute("aria-hidden", "true");
      layer.insertBefore(canvas, layer.firstChild);
      var ctx = canvas.getContext("2d");

      /* One soft round light drawn once per colour, then stamped at each particle's size */
      function sprite(rgb) {
        var c = document.createElement("canvas");
        c.width = c.height = 64;
        var g = c.getContext("2d");
        var grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, "rgba(" + rgb + ",1)");
        grad.addColorStop(0.25, "rgba(" + rgb + ",0.55)");
        grad.addColorStop(1, "rgba(" + rgb + ",0)");
        g.fillStyle = grad;
        g.fillRect(0, 0, 64, 64);
        return c;
      }
      var lights = [sprite("255,255,255"), sprite("140,224,181"), sprite("226,247,235")];

      var w = 0, h = 0, dots = [];
      var count = isDesktop ? 170 : 80;
      function size() {
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = layer.clientWidth;
        h = layer.clientHeight;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      function spawn(d, anywhere) {
        var depth = Math.random();
        d.depth = depth;
        d.x = Math.random() * w;
        d.y = anywhere ? Math.random() * h : h + 10;
        d.r = 1.4 + depth * depth * 3.2;
        d.rise = 0.08 + depth * 0.35;
        d.sway = Math.random() * Math.PI * 2;
        d.swaySpeed = 0.004 + Math.random() * 0.01;
        d.beat = 0.6 + Math.random() * 2.2;
        d.phase = Math.random() * Math.PI * 2;
        d.light = lights[Math.random() < 0.55 ? 0 : Math.random() < 0.6 ? 1 : 2];
        d.peak = 0.35 + depth * 0.6;
        return d;
      }
      size();
      for (var i = 0; i < count; i++) dots.push(spawn({}, true));

      var lastY = window.scrollY;
      var frame = 0;
      var lean = { x: 0, y: 0 };
      function draw(time) {
        var t = time / 1000;
        lean.x += (pointer.x - lean.x) * 0.05;
        lean.y += (pointer.y - lean.y) * 0.05;
        var dy = window.scrollY - lastY;
        lastY = window.scrollY;
        ctx.clearRect(0, 0, w, h);
        for (var i = 0; i < dots.length; i++) {
          var d = dots[i];
          d.y -= d.rise + dy * d.depth * 0.25;
          d.sway += d.swaySpeed;
          if (d.y < -20 || d.y > h + 40) spawn(d, false);
          var twinkle = 0.5 + 0.5 * Math.sin(t * d.beat + d.phase);
          ctx.globalAlpha = d.peak * (0.15 + 0.85 * twinkle * twinkle);
          var r = d.r * (0.8 + 0.3 * twinkle);
          ctx.drawImage(d.light, d.x + Math.sin(d.sway) * 6 + lean.x * d.depth * 24 - r, d.y + lean.y * d.depth * 14 - r, r * 2, r * 2);
        }
        ctx.globalAlpha = 1;
        frame = requestAnimationFrame(draw);
      }
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onToggle: function (self) {
          cancelAnimationFrame(frame);
          frame = 0;
          if (self.isActive) {
            lastY = window.scrollY;
            frame = requestAnimationFrame(draw);
          }
        }
      });
      ScrollTrigger.addEventListener("refresh", size);
    });
  }

  /* Sub page scenes (after the bolder second half of toss.im): the big title rises letter by letter and lifts away
     as the page scrolls, the first photo opens to the screen edges, sentences darken word by word with the scroll,
     the navy list lights the item in the middle of the screen, cards are dealt up from lying flat, service rows fly
     in at an angle over huge outlined numbers, and the closing band opens from a card to the full screen while its
     phone number rolls up. Only transforms, opacity and clip-path move. */
  function initSubScenes() {
    if (!hasGsap || reduceMotion || !document.body.classList.contains("is-sub")) return;
    document.body.classList.add("has-scenes");
    var wide = isDesktop;

    /* Page head */
    document.querySelectorAll(".page-head__en").forEach(function (title) {
      var chars = splitChars(title);
      gsap.from(chars, { yPercent: 115, rotation: 8, duration: 1.2, ease: "expo.out", stagger: 0.035, delay: 0.1, transformOrigin: "0% 100%" });
    });
    document.querySelectorAll(".sec-page").forEach(function (section) {
      var head = section.querySelector(".page-head");
      gsap.to(head, {
        y: -110,
        opacity: 0.1,
        ease: "none",
        scrollTrigger: { trigger: head, start: "top " + (tokenPx("--header-h", 72) + 40), end: "bottom top", scrub: true }
      });
      var photo = section.querySelector(".page-head__photo");
      if (!photo) return;
      gsap.from(photo, { y: 90, opacity: 0, duration: 1.3, ease: motion.easeText, delay: 0.55 });
      gsap.fromTo(photo, { "--open": 0 }, {
        "--open": 1,
        ease: "power1.inOut",
        scrollTrigger: { trigger: photo, start: "top 80%", end: "top 12%", scrub: 0.8 }
      });
      var img = photo.querySelector("img");
      if (img) {
        gsap.fromTo(img, { scale: 1.22 }, {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: photo, start: "top bottom", end: "bottom top", scrub: true }
        });
      }
    });

    /* Sentences that darken word by word */
    document.querySelectorAll("[data-scrub-text]").forEach(function (el) {
      var words = splitWords(el);
      gsap.set(words, { opacity: 0.16 });
      gsap.to(words, {
        opacity: 1,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 45%", scrub: true }
      });
    });

    /* Navy list: lit in the middle of the screen, dimmed once passed */
    document.querySelectorAll(".band__item").forEach(function (item) {
      ScrollTrigger.create({
        trigger: item,
        start: "top 62%",
        end: "bottom 38%",
        onToggle: function (self) {
          item.classList.toggle("is-focus", self.isActive);
          if (self.isActive) item.classList.add("is-seen");
        }
      });
    });

    /* Cards dealt up from lying flat, one after another */
    document.querySelectorAll(".cards").forEach(function (group) {
      var cards = Array.prototype.slice.call(group.children);
      var from = { y: 160, rotationX: -32, opacity: 0, transformPerspective: 1100, transformOrigin: "50% 100%" };
      var to = { y: 0, rotationX: 0, opacity: 1, ease: "power2.out" };
      if (wide && group.children.length > 1 && getComputedStyle(group).gridTemplateColumns.split(" ").length > 1) {
        gsap.fromTo(cards, from, Object.assign({}, to, {
          stagger: 0.14,
          scrollTrigger: { trigger: group, start: "top 92%", end: "top 48%", scrub: 0.8 }
        }));
      } else {
        cards.forEach(function (card) {
          gsap.fromTo(card, from, Object.assign({}, to, {
            duration: 1, ease: motion.easeText,
            scrollTrigger: { trigger: card, start: "top 90%", once: true }
          }));
        });
      }
    });

    /* Service rows: the visual flies in at an angle from its own side, the outlined number drifts the other way */
    document.querySelectorAll(".detail").forEach(function (row) {
      var visual = row.querySelector(".detail__visual");
      var num = row.querySelector(".detail__num");
      var side = row.classList.contains("detail--flip") && wide ? -1 : 1;
      if (visual) {
        gsap.fromTo(visual, { x: side * (wide ? 180 : 60), rotation: side * 7, scale: 0.86, opacity: 0 }, {
          x: 0, rotation: 0, scale: 1, opacity: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 95%", end: "center 62%", scrub: 0.9 }
        });
      }
      if (num) {
        gsap.fromTo(num, { yPercent: 35, opacity: 0 }, {
          yPercent: -35, opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true }
        });
      }
    });

    /* Partner columns rise one after another */
    document.querySelectorAll(".partner-cols").forEach(function (group) {
      var cols = group.querySelectorAll(".partner-col");
      gsap.fromTo(cols, { yPercent: 45, opacity: 0 }, {
        yPercent: 0, opacity: 1,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: { trigger: group, start: "top 95%", end: "top 45%", scrub: 0.8 }
      });
    });

    /* Closing band: from a rounded card to the full screen, then its buttons and lines come up one after another */
    document.querySelectorAll(".cta-band").forEach(function (band) {
      var r = tokenPx("--r-xl", 40);
      gsap.fromTo(band, { clipPath: "inset(7% " + (wide ? 5 : 3) + "% 7% " + (wide ? 5 : 3) + "% round " + r + "px)" }, {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        ease: "none",
        scrollTrigger: { trigger: band, start: "top bottom", end: "top 25%", scrub: 0.6 }
      });
      var rest = band.querySelectorAll(".cta-band__actions > *");
      gsap.set(rest, { opacity: 0, y: motion.y });
      ScrollTrigger.create({
        trigger: band,
        start: "top 55%",
        once: true,
        onEnter: function () {
          gsap.to(rest, { opacity: 1, y: 0, duration: motion.dur, ease: motion.easeText, stagger: motion.stagger, clearProps: "transform" });
        }
      });
    });
  }

  /* Widening photo (home, B): after the photo has come in, scrolling on opens it to the edges of the screen */
  function initWidePhotos() {
    if (!hasGsap || reduceMotion) return;
    document.querySelectorAll(".sec-visual .section__visual").forEach(function (frame) {
      if (!frame.querySelector(":scope > .media")) return;
      gsap.fromTo(frame, { "--open": 0 }, {
        "--open": 1,
        ease: "power1.inOut",
        scrollTrigger: { trigger: frame, start: "top 60%", end: "top 10%", scrub: 0.8 }
      });
    });
  }

  /* Section dots: one per section down the left edge (components.css). The dot of the section in the middle of the
     screen lights up and steps out; a click scrolls to that section. */
  function initSectionNav() {
    var sections = Array.prototype.slice.call(document.querySelectorAll("main .hero, main .section"));
    if (sections.length < 4 || !hasGsap) return;
    var nav = document.createElement("nav");
    nav.className = "section-nav";
    nav.setAttribute("aria-label", "섹션 바로가기");
    var dots = sections.map(function (section, i) {
      var heading = section.querySelector(".page-head__ko, h1, h2");
      var name = heading ? heading.textContent.replace(/\s+/g, " ").trim() : "섹션 " + (i + 1);
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "section-nav__dot";
      dot.setAttribute("aria-label", name);
      var label = document.createElement("span");
      label.className = "section-nav__label";
      label.textContent = name;
      dot.appendChild(label);
      dot.addEventListener("click", function () {
        if (lenis) lenis.scrollTo(section, { duration: 1.2 });
        else section.scrollIntoView({ behavior: "smooth" });
      });
      nav.appendChild(dot);
      return dot;
    });
    function setActive(i) {
      dots.forEach(function (dot, k) {
        dot.classList.toggle("is-active", k === i);
        if (k === i) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    }
    sections.forEach(function (section, i) {
      ScrollTrigger.create({
        trigger: pinSpan(section),
        start: "top 50%",
        end: "bottom 50%",
        onToggle: function (self) { if (self.isActive) setActive(i); }
      });
    });
    setActive(0);
    document.body.appendChild(nav);
  }

  /* Partner strips (home): once the section is on screen, the strips rise one after another from the left as the
     page scrolls on, and stand in place when the section reaches the top of the screen */
  function initPartnerStrips() {
    if (!hasGsap || reduceMotion) return;
    /* Phone: the strips are rows. They slide in from the left one after another, and the row in the middle of the
       screen shows in colour. */
    if (!window.matchMedia("(min-width: 769px)").matches) {
      document.querySelectorAll(".partner-strips").forEach(function (group) {
        var strips = group.querySelectorAll(".partner-strip");
        gsap.timeline({
          scrollTrigger: { trigger: group, start: "top 85%", end: "top 35%", scrub: 0.8 }
        }).from(strips, { xPercent: -100, duration: 1, ease: "power2.out", stagger: 0.3 });
        strips.forEach(function (strip) {
          ScrollTrigger.create({ trigger: strip, start: "top 58%", end: "bottom 42%", toggleClass: "is-lit" });
        });
      });
      return;
    }
    document.querySelectorAll(".partner-strips").forEach(function (group) {
      var strips = group.querySelectorAll(".partner-strip");
      /* One timeline from when the section comes into view until it has left the screen, so the way in and the way
         out never fight over the same values. In (first 0.75 screen): the first strip starts at once, the others
         follow, all stand just before the section fills the screen. Then 0.3 screen of rest. Out (last 0.75
         screen): they lift away one after another from the left and fade. 1 screen of scrolling = 2.2 / 0.75 units. */
      var unit = 2.2 / 0.75;
      gsap.timeline({
        scrollTrigger: { trigger: group, start: "top 80%", end: "bottom top", scrub: 1 }
      })
        .fromTo(strips, { yPercent: 100, opacity: 1 }, { yPercent: 0, duration: 1, ease: "power2.out", stagger: 0.3 }, 0)
        .fromTo(strips, { yPercent: 0, opacity: 1 }, { yPercent: -60, opacity: 0, duration: 1, ease: "power2.in", stagger: 0.3, immediateRender: false }, 2.2 + 0.3 * unit);
    });
  }

  /* Notice banner: on wide screens it rises out of the bottom of the section with the scroll, from the moment the
     section's top passes 40% of the screen until it reaches the top, and its lines follow one by one. On narrower
     screens it sits below the call and simply comes in when reached. */
  function initNotice() {
    if (!hasGsap || reduceMotion) return;
    document.querySelectorAll(".notice").forEach(function (notice) {
      var lines = notice.querySelectorAll(".notice__head > *, .notice__item, .notice__foot");
      var section = notice.closest(".section");
      var sweep = section.querySelector(".notice-sweep");
      if (sweep && window.matchMedia("(min-width: 1200px)").matches) {
        /* The grey comes in from the right edge until it fills the section, then closes in on the banner's place;
           the lines follow. Sizes in pixels, measured again whenever the page is laid out. */
        var full = function () { return "inset(0px 0px 0px 0px)"; };
        var none = function () { return "inset(0px 0px 0px " + section.offsetWidth + "px)"; };
        var banner = function () {
          var right = section.offsetWidth - notice.offsetLeft - notice.offsetWidth;
          return "inset(0px " + right + "px 0px " + notice.offsetLeft + "px)";
        };
        var sweepIn = gsap.fromTo(sweep, { clipPath: none }, { clipPath: full, duration: 0.45, ease: "power2.inOut" });
        var gather = gsap.to(sweep, { clipPath: banner, duration: 0.4, ease: "power2.inOut" });
        /* The section stops once it fills the screen and the whole sweep plays over a screen and a half of scrolling */
        gsap.timeline({
          scrollTrigger: { trigger: section, start: "top top", end: function () { return "+=" + window.innerHeight * 1.5; }, pin: true, scrub: 1, invalidateOnRefresh: true }
        })
          .add(sweepIn, 0)
          .add(gather, 0.45)
          .fromTo(lines, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out", stagger: 0.03 }, 0.75)
          .set({}, {}, "+=0.1");
        /* Only the cut-outs depend on the layout; the lines keep their hidden start */
        ScrollTrigger.addEventListener("refreshInit", function () {
          sweepIn.invalidate();
          gather.invalidate();
        });
        return;
      }
      gsap.set(notice, { y: 40, opacity: 0 });
      gsap.set(lines, { opacity: 0, y: 16 });
      ScrollTrigger.create({
        trigger: notice,
        start: "top 90%",
        once: true,
        onEnter: function () {
          gsap.timeline()
            .to(notice, { y: 0, opacity: 1, duration: 1, ease: motion.easeText })
            .to(lines, { opacity: 1, y: 0, duration: 0.8, ease: motion.easeText, stagger: 0.08 }, 0.4);
        }
      });
    });
  }

  /* Bottom sheets (privacy policy, terms): the footer links open them. The panel pops up from the bottom over a dimmed
     page while the page behind stays still; the close button, a click on the dimmed page or Esc slide it back down
     before it closes. */
  function initSheets() {
    var sheets = Array.prototype.slice.call(document.querySelectorAll(".sheet"));
    if (!sheets.length || typeof sheets[0].showModal !== "function") return;

    function open(sheet) {
      sheet.showModal();
      sheet.querySelector(".sheet__body").scrollTop = 0;
      if (sheet.measureDot) sheet.measureDot();
      document.documentElement.classList.add("has-sheet");
      if (lenis) lenis.stop();
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { sheet.classList.add("is-open"); });
      });
    }

    function close(sheet) {
      if (!sheet.open) return;
      sheet.classList.remove("is-open");
      setTimeout(function () {
        sheet.close();
        document.documentElement.classList.remove("has-sheet");
        if (lenis) lenis.start();
      }, reduceMotion ? 0 : tokenPx("--dur-sheet", 0.5) * 1000);
    }

    document.querySelectorAll("[data-sheet]").forEach(function (link) {
      var sheet = document.getElementById(link.getAttribute("data-sheet"));
      if (!sheet) return;
      link.addEventListener("click", function (e) {
        e.preventDefault();
        open(sheet);
      });
    });
    sheets.forEach(function (sheet) {
      /* Scroll dot inside the sheet: follows the text's scroll position and can be dragged along its track */
      var body = sheet.querySelector(".sheet__body");
      var dot = document.createElement("span");
      dot.className = "sheet__dot";
      dot.setAttribute("aria-hidden", "true");
      sheet.appendChild(dot);
      var track = { top: 0, travel: 0 };
      function measureDot() {
        var size = dot.offsetWidth;
        track.top = body.offsetTop + 8;
        track.travel = Math.max(0, body.offsetTop + body.clientHeight - 8 - size - track.top);
        dot.style.display = body.scrollHeight > body.clientHeight + 1 ? "" : "none";
      }
      function placeDot() {
        var max = body.scrollHeight - body.clientHeight;
        var k = max > 0 ? body.scrollTop / max : 0;
        dot.style.transform = "translateY(" + (track.top + k * track.travel).toFixed(1) + "px)";
      }
      body.addEventListener("scroll", placeDot, { passive: true });
      sheet.measureDot = function () { measureDot(); placeDot(); };
      window.addEventListener("resize", function () { if (sheet.open) sheet.measureDot(); });
      dot.addEventListener("pointerdown", function (e) {
        e.preventDefault();
        dot.setPointerCapture(e.pointerId);
        dot.classList.add("is-dragging");
        var startY = e.clientY, startTop = body.scrollTop;
        var max = body.scrollHeight - body.clientHeight;
        function move(ev) {
          if (!track.travel) return;
          body.scrollTop = startTop + (ev.clientY - startY) / track.travel * max;
        }
        function up() {
          dot.classList.remove("is-dragging");
          dot.removeEventListener("pointermove", move);
          dot.removeEventListener("pointerup", up);
          dot.removeEventListener("pointercancel", up);
        }
        dot.addEventListener("pointermove", move);
        dot.addEventListener("pointerup", up);
        dot.addEventListener("pointercancel", up);
      });

      sheet.querySelector(".sheet__close").addEventListener("click", function () { close(sheet); });
      /* A click on the dimmed page reaches the dialog itself, not its contents */
      sheet.addEventListener("click", function (e) { if (e.target === sheet) close(sheet); });
      sheet.addEventListener("cancel", function (e) {
        e.preventDefault();
        close(sheet);
      });
    });
  }

  function initRails() {
    /* Sub pages have no rails */
    if (document.body.classList.contains("is-sub")) return;
    document.querySelectorAll(".section:not(.section--dark):not([data-pin-steps]):not([data-phrases]):not(.sec-logos):not(.sec-cta):not(.sec-process)").forEach(function (section) {
      var rails = ["rail rail--left", "rail rail--right"].map(function (cls) {
        var rail = document.createElement("span");
        rail.className = cls;
        rail.setAttribute("aria-hidden", "true");
        section.appendChild(rail);
        return rail;
      });
      /* Title + single visual: the rails stop above the picture, as far above it as they start below the section
         top. Measured from the layout (offsets, not transforms) whenever the page is laid out. */
      var visual = section.matches(".sec-visual") ? section.querySelector(".section__visual") : null;
      if (visual) {
        var fitRails = function () {
          var y = 0;
          for (var el = visual; el && el !== section; el = el.offsetParent) y += el.offsetTop;
          var stop = section.offsetHeight - y + tokenPx("--sp-8", 64);
          rails.forEach(function (rail) { rail.style.bottom = stop + "px"; });
        };
        fitRails();
        if (hasGsap) ScrollTrigger.addEventListener("refresh", fitRails);
      }
      if (!hasGsap || reduceMotion) return;
      gsap.fromTo(rails, { scaleY: 0 }, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top 70%", end: "bottom 70%", scrub: 0.6 }
      });
    });
  }

  /* Scroll dot: a small circle on the right edge that follows the scroll position and can be dragged.
     The back-to-top button rides right above it. */

  function initScrollDot() {
    if (!document.documentElement.classList.contains("js")) return;

    var dot = document.createElement("div");
    dot.className = "scroll-dot";
    dot.setAttribute("aria-hidden", "true");
    document.body.appendChild(dot);

    /* Placed right after the dot so CSS can hide it together with the dot (.scroll-dot.is-idle + .scroll-top) */
    var up = document.createElement("button");
    up.type = "button";
    up.className = "scroll-top";
    up.setAttribute("aria-label", "맨 위로");
    up.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 15.5 7-7 7 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    document.body.appendChild(up);

    var edge = tokenPx("--sp-1", 4);
    var gap = tokenPx("--sp-2", 8);
    var dotSize = tokenPx("--dot-size", 20);
    var dotBox = tokenPx("--sp-6", 32);
    var upBox = tokenPx("--top-hit", 44);
    var circleInset = (upBox - tokenPx("--top-size", 20)) / 2;
    var grabOffset = 0;
    var idleTimer = null;
    var dotY = 0;
    var stretch = 1;
    var scrollY = window.scrollY;
    var viewH = window.innerHeight;
    var max = 0;
    var topEdge = edge;
    if (!finePointer) dot.classList.add("is-touch", "is-idle");

    /* Page and window sizes are measured only when they can change, never while scrolling */
    /* The dot runs below the header so it never sits on the menu button */
    function measure() {
      viewH = window.innerHeight;
      max = document.documentElement.scrollHeight - viewH;
      topEdge = tokenPx("--header-h", 72) + edge;
      dot.classList.toggle("is-empty", max <= 0);
    }
    function track() { return viewH - dotBox - topEdge - edge; }

    /* The button keeps the same gap above the dot, so a stretched dot pushes it up */
    function placeUp() {
      var dotTop = dotY + dotBox / 2 - dotSize * stretch / 2;
      var y = dotTop - gap - upBox + circleInset;
      up.style.transform = "translate3d(0, " + y.toFixed(1) + "px, 0)";
      up.classList.toggle("is-shown", scrollY > viewH * 0.5 && y + circleInset >= topEdge);
    }

    up.addEventListener("click", scrollToTop);

    function place() {
      var progress = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      dotY = topEdge + progress * track();
      dot.style.transform = "translate3d(0, " + dotY.toFixed(1) + "px, 0)";
      placeUp();
      if (!finePointer) {
        dot.classList.remove("is-idle");
        clearTimeout(idleTimer);
        idleTimer = setTimeout(function () { dot.classList.add("is-idle"); }, 1000);
      }
    }

    function scrollToProgress(clientY) {
      var progress = Math.min(1, Math.max(0, (clientY - grabOffset - topEdge) / track()));
      var y = progress * max;
      if (lenis) lenis.scrollTo(y, { immediate: true });
      else window.scrollTo(0, y);
    }

    dot.addEventListener("pointerdown", function (e) {
      if (!finePointer) return;
      e.preventDefault();
      dot.setPointerCapture(e.pointerId);
      dot.classList.add("is-dragging");
      grabOffset = e.clientY - dot.getBoundingClientRect().top;
    });

    dot.addEventListener("pointermove", function (e) {
      if (dot.classList.contains("is-dragging")) scrollToProgress(e.clientY);
    });

    function release() { dot.classList.remove("is-dragging"); }
    dot.addEventListener("pointerup", release);
    dot.addEventListener("pointercancel", release);

    function remeasure() { measure(); place(); }
    window.addEventListener("scroll", function () { scrollY = window.scrollY; place(); }, { passive: true });
    window.addEventListener("resize", remeasure);
    window.addEventListener("load", remeasure);
    if (hasGsap) ScrollTrigger.addEventListener("refresh", remeasure);
    remeasure();

    /* A fast scroll pulls the dot into a capsule up to 2.2 times its height, slightly thinner */
    if (reduceMotion) return;
    onScrollFrame(function (v) {
      var target = 1 + Math.min(1.2, Math.abs(v) * 0.45);
      var next = stretch + (target - stretch) * 0.2;
      if (Math.abs(next - stretch) < 0.002 && Math.abs(target - next) < 0.002) return false;
      stretch = next;
      dot.style.setProperty("--sy", stretch.toFixed(3));
      dot.style.setProperty("--sx", (1 - (stretch - 1) * 0.2).toFixed(3));
      placeUp();
      return true;
    });
  }

  /* Page transition: the page lifts and fades (base.css) before following a link to another page of the site */

  function pageKey(path) {
    return path.replace(/\/index\.html$/, "/");
  }

  function internalLink(a) {
    if (!a || (a.target && a.target !== "_self")) return null;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#" || /^(tel|mailto):/.test(href)) return null;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin || pageKey(url.pathname) === pageKey(location.pathname)) return null;
    return url;
  }

  /* A link to the page already open (the logo on the home page) scrolls to the top instead of reloading */
  function linkToThisPage(a) {
    if (!a || (a.target && a.target !== "_self")) return false;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#" || /^(tel|mailto):/.test(href)) return false;
    var url = new URL(a.href, location.href);
    return url.origin === location.origin && !url.hash && pageKey(url.pathname) === pageKey(location.pathname);
  }

  function initPageLeave() {
    var root = document.documentElement;

    document.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (!linkToThisPage(a)) return;
      e.preventDefault();
      scrollToTop();
    });

    if (reduceMotion) return;
    var leaveMs = tokenPx("--dur-leave", 0.4) * 1000;
    var prefetched = {};

    /* Fetch the next page while the pointer rests on its link, so it is ready when the fade ends */
    document.addEventListener("pointerover", function (e) {
      var url = internalLink(e.target.closest ? e.target.closest("a") : null);
      if (!url || prefetched[url.pathname] || location.protocol === "file:") return;
      prefetched[url.pathname] = true;
      var link = document.createElement("link");
      link.rel = "prefetch";
      link.href = url.href;
      document.head.appendChild(link);
    });

    document.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (!internalLink(a)) return;
      e.preventDefault();
      if (root.classList.contains("is-leaving")) return;
      root.classList.add("is-leaving");
      setTimeout(function () { location.href = a.href; }, leaveMs);
    });

    /* Coming back with the browser's back button restores this page from cache, still faded */
    window.addEventListener("pageshow", function (e) {
      if (e.persisted) root.classList.remove("is-leaving");
    });
  }

  /* Statement sentences (data-phrases): the sentence sits in the very middle of the screen while the sentences take
     turns, one per half screen of scrolling. A change flips the letters like a scoreboard: the old letters tip over
     one after another and the new ones swing in behind them. Each change plays to the end. */

  function splitChars(el) {
    if (el.charSpans) return el.charSpans;
    var chars = [];
    splitWords(el).forEach(function (word) {
      var walker = document.createTreeWalker(word, NodeFilter.SHOW_TEXT);
      var texts = [];
      while (walker.nextNode()) texts.push(walker.currentNode);
      texts.forEach(function (node) {
        var frag = document.createDocumentFragment();
        node.textContent.split("").forEach(function (ch) {
          var span = document.createElement("span");
          span.className = "char";
          span.textContent = ch;
          frag.appendChild(span);
          chars.push(span);
        });
        node.parentNode.replaceChild(frag, node);
      });
    });
    el.charSpans = chars;
    return chars;
  }

  function initPhrases() {
    if (!hasGsap || reduceMotion) return;
    document.querySelectorAll("[data-phrases]").forEach(function (section) {
      var phrases = Array.prototype.slice.call(section.querySelectorAll(".phrase"));
      if (phrases.length < 2) return;
      var container = section.querySelector(".container");
      var spot = section.querySelector(".phrases");
      var link = section.querySelector(".link-arrow");
      section.classList.add("is-scene");
      /* without smooth scrolling (touch screens) the browser holds the words and the tree in place (sections.css) */
      var sticky = !lenis;
      if (sticky) section.classList.add("is-sticky");
      section.style.setProperty("--phrase-count", phrases.length);

      /* Each letter turns on an axis a little behind it, like the flaps of a scoreboard. The 3D turn is only on the
         letters while they move: a letter at rest has no transform, so it does not become a layer of its own. */
      var flap = { transformPerspective: 500, transformOrigin: "50% 50% -14px" };
      var parts = phrases.map(function (phrase) {
        var chars = splitChars(phrase.querySelector(".t-h1")).concat(splitChars(phrase.querySelector(".t-lead")));
        gsap.set(chars, { opacity: 0 });
        return chars;
      });
      if (link) gsap.set(link, { opacity: 0, y: motion.y });

      /* current is -1 before the first sentence has come in */
      var current = -1;
      var change = null;

      function turn(to) {
        if (to === current) return;
        var dir = to > current ? 1 : -1;
        var out = current >= 0 ? parts[current] : null;
        var into = to >= 0 ? parts[to] : null;
        current = to;
        if (change) change.progress(1).kill();
        change = gsap.timeline();
        if (out) {
          gsap.set(out, flap);
          change.to(out, { rotationX: dir * 90, opacity: 0, duration: 0.28, ease: "power2.in", stagger: 0.012, overwrite: true, clearProps: "transform" }, 0);
        }
        if (into) {
          change.fromTo(into, { rotationX: -dir * 90, opacity: 0, transformPerspective: flap.transformPerspective, transformOrigin: flap.transformOrigin },
            { rotationX: 0, opacity: 1, duration: 0.45, ease: "back.out(1.6)", stagger: 0.012, overwrite: true, clearProps: "transform" }, out ? 0.18 : 0);
        }
        if (link) change.to(link, { opacity: to >= 0 ? 1 : 0, y: to >= 0 ? 0 : motion.y, duration: 0.6, ease: motion.easeText, overwrite: true }, 0.2);
      }

      /* Point tree behind the sentences (initCloud draws it): how far it has gathered follows the scroll with a
         little lag, kept on the layer for the drawing loop to read */
      var tree = section.querySelector(".statement-tree");
      var treeY = null;
      var toDrawn = null;
      if (tree) {
        var drawn = { p: 0 };
        tree.growth = 0;
        treeY = gsap.quickSetter(tree, "y", "px");
        toDrawn = gsap.quickTo(drawn, "p", { duration: 0.8, ease: "power3", onUpdate: function () { tree.growth = drawn.p; } });
      }

      /* Sizes are measured when the page is laid out (refresh), never while scrolling */
      var top = 0;
      var height = 0;
      var middle = 0;
      var headerH = 0;
      var focus = 0.5;
      var covered = false;
      var setY = gsap.quickSetter(container, "y", "px");
      /* The title intro: a new first part of the run (0.8 screen) in which the first sentence's title stands large
         in the middle of the screen, then rises and shrinks into its place over its lead; the lead and the link come
         in at its end. Everything after it (the sentences changing, the tree gathering) waits for it. */
      var firstTitle = phrases[0].querySelector(".t-h1");
      var firstLead = phrases[0].querySelector(".t-lead");
      var setTitleSX = gsap.quickSetter(firstTitle, "scaleX");
      var setTitleSY = gsap.quickSetter(firstTitle, "scaleY");
      var setTitleY = gsap.quickSetter(firstTitle, "y", "px");
      gsap.set(firstTitle, { transformOrigin: "50% 50%" });
      var introS = 1, introDy = 0;

      function measure() {
        gsap.set(container, { y: 0 });
        top = section.getBoundingClientRect().top + window.scrollY;
        height = section.offsetHeight;
        middle = spot.offsetTop + spot.offsetHeight / 2;
        headerH = tokenPx("--header-h", 72);
        /* the intro's start: as large as fits (at most 1.35 times, 88% of the screen wide), and moved down so the title
           alone stands in the middle of where the whole sentence block stands */
        var range = document.createRange();
        range.selectNodeContents(firstTitle);
        var textW = range.getBoundingClientRect().width / (gsap.getProperty(firstTitle, "scaleX") || 1);
        introS = Math.max(1, Math.min(1.35, window.innerWidth * 0.88 / (textW || 1)));
        introDy = spot.offsetHeight / 2 - (firstTitle.offsetTop - spot.offsetTop + firstTitle.offsetHeight / 2);
        /* on a phone held upright the words sit in the upper part, above the tree */
        focus = tree && window.innerWidth < 600 && window.innerHeight > window.innerWidth ? 0.36 : 0.5;
      }

      /* The sentences sit in the middle of the part of the section that is on screen. Once the section covers the
         screen they stay in the very middle, and the sentence changes every half screen of scrolling. */
      function place(scrollY) {
        var vh = window.innerHeight;
        var t = top - scrollY;
        var b = t + height;
        var shownTop = Math.max(t, 0);
        var shownBottom = Math.max(shownTop, Math.min(b, vh));
        /* Whole pixels: text moved to a fraction of a pixel is drawn soft */
        if (!sticky) setY(Math.round(shownTop + (shownBottom - shownTop) * focus - t - middle));

        var run = height - vh;
        var intro = vh * 0.45;
        /* the title intro, over the first 0.8 screen once the section covers the screen */
        var k = Math.min(1, Math.max(0, -t / intro));
        var e = k * k * (3 - 2 * k);
        var titleS = introS - (introS - 1) * e;
        setTitleSX(titleS);
        setTitleSY(titleS);
        setTitleY(Math.round(introDy * (1 - e)));
        section.style.setProperty("--intro-rest", Math.min(1, Math.max(0, (k - 0.7) / 0.3)).toFixed(3));
        /* The tree starts gathering once the intro is over (later by the intro than when the section turns navy) and
           is whole at 90% of the run, just before the section scrolls away */
        if (tree) {
          if (!sticky) treeY(Math.round(shownBottom - b));
          var g0 = vh * 0.6 - intro;
          toDrawn(Math.min(1, Math.max(0, (g0 - t) / (g0 + run * 0.9))));
        }
        var to = t <= vh * 0.7 ? 0 : -1;
        if (t <= -intro && run > intro) to = Math.min(phrases.length - 1, Math.floor(Math.min(1, (-t - intro) / (run - intro)) * phrases.length));
        turn(to);

        var cover = t <= 0 && b >= headerH;
        if (cover !== covered) {
          covered = cover;
          document.body.classList.toggle("is-dark", cover);
          document.body.classList.toggle("is-ink", cover);
        }
      }

      measure();
      ScrollTrigger.addEventListener("refresh", function () {
        measure();
        place(window.scrollY);
      });
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate: function (self) { place(self.scroll()); }
      });
      place(window.scrollY);
    });
  }

  /* Statement: the section turns navy while it sits in the middle of the screen (sections.css .is-lit) */

  function initStatements() {
    if (!hasGsap || reduceMotion) return;
    document.querySelectorAll(".sec-statement").forEach(function (section) {
      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "bottom 40%",
        onToggle: function (self) { section.classList.toggle("is-lit", self.isActive); }
      });
    });
  }

  /* Dark section: the header and the scroll dot switch to their dark-background colours while it is in the middle of the screen */

  /* The element that spans a section's whole stay on screen: the pin spacer around it when it is held in place */
  function pinSpan(section) {
    var parent = section.parentElement;
    return parent && parent.classList.contains("pin-spacer") ? parent : section;
  }

  function initDarkSections() {
    if (!hasGsap) return;
    /* Navy bands (sub pages) also turn the header navy */
    document.querySelectorAll(".section--ink").forEach(function (section) {
      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "bottom 40%",
        onToggle: function (self) {
          document.body.classList.toggle("is-dark", self.isActive);
          document.body.classList.toggle("is-ink", self.isActive);
        }
      });
    });
    document.querySelectorAll(".section--dark").forEach(function (section) {
      /* A section held in place sits in a longer spacer; its end is the spacer's end */
      var span = pinSpan(section);
      ScrollTrigger.create({
        trigger: span,
        start: "top 60%",
        end: "bottom 75%",
        toggleClass: { targets: document.body, className: "is-dark" }
      });
      /* When the end of the band comes up the screen it turns white, so it runs on into the white section below */
      ScrollTrigger.create({
        trigger: span,
        start: "bottom 75%",
        onEnter: function () { section.classList.add("is-day"); },
        onLeaveBack: function () { section.classList.remove("is-day"); }
      });
    });
  }

  /* Boot */

  /* Pinned sections are set up first so every later trigger is measured with the pin spacing in place */
  function init() {
    /* Setting up takes a moment; GSAP's clock (and the logo's CSS animations, .is-ready) only start on the first
       painted frame after it, so the first screen's motion is seen from its beginning rather than half over */
    if (hasGsap) gsap.globalTimeline.pause();
    if (hasGsap) readMotion();
    initHeader();
    initMarquee();
    initSmoothScroll();
    initShowpieces();
    initHero();
    initTitleIntro();
    initTerrain();
    initPhrases();
    initDust();
    initCloud();
    initPinSteps();
    initForge();
    initStatBars();
    initParallax();
    initReveal();
    initChips();
    initCounters();
    initProcess();
    initStatements();
    initDarkSections();
    initRails();
    initWidePhotos();
    initSubMotion();
    initSubScenes();
    initPartnerCols();
    initPartnerStrips();
    initEarlyImages();
    initStreamFocus();
    initNotice();
    initSheets();
    initMarqueeSpeed();
    initScrollDot();
    initSectionNav();
    initPageLeave();

    measureAllLines();
    var resizeTimer = null;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measureAllLines, 200);
    });

    if (hasGsap && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        measureAllLines();
        /* before the page has loaded, the refresh at load covers it */
        if (document.readyState === "complete") ScrollTrigger.refresh();
      });
    }

    /* held sections were set up out of page order (the intros): put the triggers back in page order; they are all
       measured once, when the page has loaded (ScrollTrigger refreshes then) */
    if (hasGsap) ScrollTrigger.sort();

    /* the first screen's motion starts once the text face is in (at most 1.2 s), so no letters change under it */
    var fontIn = document.fonts && document.fonts.load ? document.fonts.load('700 16px "Pretendard Variable"') : Promise.resolve();
    var started = false;
    function start() {
      if (started) return;
      started = true;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          if (hasGsap) gsap.globalTimeline.resume();
          document.documentElement.classList.add("is-ready");
        });
      });
    }
    fontIn.then(start, start);
    setTimeout(start, 1200);

    /* every trigger measured once, in page order, after the first screen's motion or when the scrolling starts */
    if (hasGsap) {
      var measured = false;
      var measure = function () {
        if (measured) return;
        measured = true;
        ScrollTrigger.refresh();
      };
      var soon = function () { if (!measured) measure(); };
      ["wheel", "touchstart", "keydown"].forEach(function (type) { window.addEventListener(type, soon, { once: true, passive: true }); });
      window.addEventListener("load", function () {
        /* opened part way down (a reload keeps the place): measure at once */
        if (window.scrollY > 0) { measure(); return; }
        setTimeout(function () { (window.requestIdleCallback || function (f) { setTimeout(f, 0); })(measure, { timeout: 1000 }); }, 2400);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
