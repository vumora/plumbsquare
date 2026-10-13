/*!
 * PlumbSquare — Core Carpentry Math, Fractional Tape-Measure Engine,
 * URL Permalink State, and Jobsite Blueprint PNG Exporter (assets/app.js)
 * 100% Client-Side, Zero External Dependencies.
 */
(function () {
  "use strict";

  function gcd(a, b) {
    a = Math.abs(Math.round(a));
    b = Math.abs(Math.round(b));
    while (b) {
      var t = b;
      b = a % b;
      a = t;
    }
    return a || 1;
  }

  var PS = {
    unitMode: localStorage.getItem("ps_unit_mode") || "imperial", // 'imperial' | 'metric'

    /* Convert decimal inches to nearest 1/16" (or 1/32") tape-measure string */
    toFraction: function (inches, denom) {
      denom = denom || 16;
      if (!isFinite(inches)) return "—";
      var neg = inches < 0 ? "-" : "";
      var val = Math.abs(inches);
      var whole = Math.floor(val + 1e-9);
      var rem = val - whole;
      var num = Math.round(rem * denom);
      if (num === denom) {
        whole += 1;
        num = 0;
      }
      if (num === 0) return neg + whole + '"';
      var g = gcd(num, denom);
      var n = num / g;
      var d = denom / g;
      return neg + (whole > 0 ? whole + " " : "") + n + "/" + d + '"';
    },

    /* Convert decimal inches to Feet + Fractional Inches: e.g. 14' 6 3/16" */
    toFeetInches: function (inches, denom) {
      denom = denom || 16;
      if (!isFinite(inches)) return "—";
      if (PS.unitMode === "metric") {
        var mm = inches * 25.4;
        return (mm / 1000).toFixed(2) + " m (" + Math.round(mm) + " mm)";
      }
      var totalSixteenths = Math.round(Math.abs(inches) * denom);
      var totalIn = totalSixteenths / denom;
      var ft = Math.floor(totalIn / 12 + 1e-9);
      var remIn = totalIn - ft * 12;
      if (ft === 0) return PS.toFraction(remIn, denom);
      return ft + "' " + PS.toFraction(remIn, denom);
    },

    /* Format a length (stored internally in inches) according to active unit mode */
    fmtLen: function (inches, denom) {
      if (!isFinite(inches)) return "—";
      if (PS.unitMode === "metric") {
        var mm = inches * 25.4;
        if (Math.abs(mm) >= 1000) {
          return (mm / 1000).toFixed(3) + " m (" + Math.round(mm) + " mm)";
        }
        return Math.round(mm) + " mm";
      }
      return PS.toFraction(inches, denom || 16);
    },

    /* Format dual output: e.g., 14 3/16" (360 mm) */
    fmtDual: function (inches, denom) {
      if (!isFinite(inches)) return "—";
      var frac = PS.toFraction(inches, denom || 16);
      var mm = Math.round(inches * 25.4);
      return PS.unitMode === "metric"
        ? mm + " mm (" + frac + ")"
        : frac + " (" + mm + " mm)";
    },

    /* Parse user input string that may be decimal ("14.375") or fraction ("14 3/8") */
    parseFrac: function (str) {
      if (typeof str === "number") return str;
      str = String(str || "").trim().replace(/"|in|mm|cm/gi, "").trim();
      if (!str) return 0;
      var parts = str.split(/\s+/);
      if (parts.length === 2 && parts[1].indexOf("/") > -1) {
        var whole = parseFloat(parts[0]) || 0;
        var f = parts[1].split("/");
        var frac = (parseFloat(f[0]) || 0) / (parseFloat(f[1]) || 1);
        return whole >= 0 ? whole + frac : whole - frac;
      }
      if (str.indexOf("/") > -1) {
        var f2 = str.split("/");
        return (parseFloat(f2[0]) || 0) / (parseFloat(f2[1]) || 1);
      }
      return parseFloat(str) || 0;
    },

    /* Toast notification */
    toast: function (msg) {
      var old = document.querySelector(".ps-toast");
      if (old) old.remove();
      var el = document.createElement("div");
      el.className = "ps-toast";
      el.textContent = msg;
      document.body.appendChild(el);
      setTimeout(function () {
        if (el.parentNode) el.remove();
      }, 2800);
    },

    /* Switch global unit mode */
    setUnitMode: function (mode) {
      PS.unitMode = mode === "metric" ? "metric" : "imperial";
      try {
        localStorage.setItem("ps_unit_mode", PS.unitMode);
      } catch (e) {}
      document.querySelectorAll(".unit-btn").forEach(function (b) {
        b.classList.toggle("active", b.getAttribute("data-unit") === PS.unitMode);
      });
      if (typeof window.onPSUnitChange === "function") {
        window.onPSUnitChange(PS.unitMode);
      }
    },

    /* Load URL query parameters into form inputs (#id) */
    loadUrlParams: function () {
      var params = new URLSearchParams(window.location.search);
      var loaded = false;
      params.forEach(function (val, key) {
        if (key === "unit" && (val === "imperial" || val === "metric")) {
          PS.unitMode = val;
          return;
        }
        var el = document.getElementById(key);
        if (el && (el.tagName === "INPUT" || el.tagName === "SELECT")) {
          if (el.type === "checkbox") el.checked = val === "1" || val === "true";
          else el.value = val;
          loaded = true;
        }
      });
      return loaded;
    },

    /* Copy shareable permalink with current calculator inputs */
    copyShareLink: function () {
      var params = new URLSearchParams();
      params.set("unit", PS.unitMode);
      document.querySelectorAll(".calc-workspace input, .calc-workspace select").forEach(function (el) {
        if (!el.id) return;
        if (el.type === "checkbox") params.set(el.id, el.checked ? "1" : "0");
        else if (el.value !== "") params.set(el.id, el.value);
      });
      var url = window.location.origin + window.location.pathname + "?" + params.toString();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () {
          PS.toast("✅ Shareable project link copied to clipboard!");
        });
      } else {
        window.prompt("Copy your project link:", url);
      }
    },

    /* Render current SVG diagram + KPIs + Cut List into a high-res PNG shop card */
    exportBlueprintPNG: function (toolTitle) {
      var svgEl = document.querySelector(".svg-stage svg");
      var kpis = [];
      document.querySelectorAll(".kpi-card").forEach(function (c) {
        var lbl = c.querySelector(".kpi-label");
        var val = c.querySelector(".kpi-val");
        var sub = c.querySelector(".kpi-sub");
        if (lbl && val) {
          kpis.push({
            label: lbl.textContent.trim(),
            value: val.textContent.trim(),
            sub: sub ? sub.textContent.trim() : ""
          });
        }
      });

      var rows = [];
      var table = document.querySelector(".calc-workspace table.data-table");
      if (table) {
        table.querySelectorAll("tr").forEach(function (tr, idx) {
          if (idx > 10) return;
          var cells = [];
          tr.querySelectorAll("th, td").forEach(function (td) {
            cells.push(td.textContent.trim());
          });
          if (cells.length) rows.push(cells);
        });
      }

      var canvas = document.createElement("canvas");
      var W = 1200;
      var tableH = rows.length ? 48 + rows.length * 34 : 0;
      var H = 640 + tableH;
      canvas.width = W;
      canvas.height = H;
      var ctx = canvas.getContext("2d");

      // Background
      ctx.fillStyle = "#0f1e36";
      ctx.fillRect(0, 0, W, H);

      // Subtle Blueprint Grid
      ctx.strokeStyle = "rgba(96, 165, 250, 0.12)";
      ctx.lineWidth = 1;
      for (var gx = 0; gx < W; gx += 25) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
      }
      for (var gy = 0; gy < H; gy += 25) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
      }

      // Header Banner
      ctx.fillStyle = "#172e5c";
      ctx.fillRect(0, 0, W, 78);
      ctx.fillStyle = "#fbbf24";
      ctx.fillRect(0, 75, W, 3);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 26px system-ui, -apple-system, sans-serif";
      ctx.fillText("PLUMBSQUARE · JOBSITE CUT & LAYOUT SHEET", 32, 48);

      ctx.fillStyle = "#fbbf24";
      ctx.font = "bold 18px system-ui, -apple-system, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(toolTitle || document.title.split("–")[0].trim(), W - 32, 48);
      ctx.textAlign = "left";

      // Draw KPI boxes on the left
      var kx = 32, ky = 104;
      kpis.slice(0, 6).forEach(function (k, idx) {
        var col = idx % 2;
        var row = Math.floor(idx / 2);
        var bx = kx + col * 220;
        var by = ky + row * 94;
        ctx.fillStyle = "rgba(255,255,255,0.07)";
        ctx.strokeStyle = "rgba(147,197,253,0.35)";
        ctx.lineWidth = 1.5;
        ctx.fillRect(bx, by, 206, 82);
        ctx.strokeRect(bx, by, 206, 82);

        ctx.fillStyle = "#93c5fd";
        ctx.font = "bold 12px system-ui, sans-serif";
        ctx.fillText(k.label.toUpperCase().slice(0, 26), bx + 12, by + 24);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 22px monospace";
        ctx.fillText(k.value.slice(0, 16), bx + 12, by + 52);

        if (k.sub) {
          ctx.fillStyle = "#d1d5db";
          ctx.font = "11px system-ui, sans-serif";
          ctx.fillText(k.sub.slice(0, 28), bx + 12, by + 71);
        }
      });

      function finishAndDownload() {
        // Draw table if present
        if (rows.length) {
          var ty = 420;
          ctx.fillStyle = "#fbbf24";
          ctx.font = "bold 16px system-ui, sans-serif";
          ctx.fillText("TAPE-MEASURE HOOK MARKS / CUT SCHEDULE", 32, ty - 12);
          var colW = Math.floor((W - 64) / (rows[0].length || 1));
          rows.forEach(function (r, rIdx) {
            var ry = ty + rIdx * 32;
            ctx.fillStyle = rIdx === 0 ? "#1e3a8a" : (rIdx % 2 === 0 ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.1)");
            ctx.fillRect(32, ry, W - 64, 30);
            ctx.fillStyle = rIdx === 0 ? "#fbbf24" : "#f3f4f6";
            ctx.font = (rIdx === 0 ? "bold 13px " : "13px ") + "monospace";
            r.forEach(function (cell, cIdx) {
              ctx.fillText(String(cell).slice(0, 28), 44 + cIdx * colW, ry + 20);
            });
          });
        }

        // Footer
        ctx.fillStyle = "#93c5fd";
        ctx.font = "13px system-ui, sans-serif";
        ctx.fillText("Generated free on PlumbSquare · Verify all measurements on-site before cutting lumber.", 32, H - 18);

        var a = document.createElement("a");
        var slug = (location.pathname.split("/").pop() || "blueprint").replace(/\.html$/, "");
        a.download = "plumbsquare-" + slug + "-plan.png";
        a.href = canvas.toDataURL("image/png");
        a.click();
        PS.toast("📷 Jobsite Blueprint PNG downloaded!");
      }

      if (svgEl) {
        var xml = new XMLSerializer().serializeToString(svgEl);
        var svg64 = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(xml);
        var img = new Image();
        img.onload = function () {
          ctx.drawImage(img, 485, 100, 680, 290);
          finishAndDownload();
        };
        img.onerror = finishAndDownload;
        img.src = svg64;
      } else {
        finishAndDownload();
      }
    }
  };

  window.PS = PS;

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".unit-btn").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-unit") === PS.unitMode);
      btn.addEventListener("click", function () {
        PS.setUnitMode(btn.getAttribute("data-unit"));
      });
    });
  });
})();
