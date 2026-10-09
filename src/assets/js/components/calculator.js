var calculator = {
  init: function init() {
    (function () {
      // Placeholder parameters. Replace with approved label values.
      var DOSE_PER_KG = 5; // mg/kg per dose
      var MAX_DOSE = 300; // mg per dose
      var CONC = 50; // mg/mL

      var unit = "kg",
        freq = 2,
        entry = "",
        last = null;
      var $ = function (id) {
        return document.getElementById(id);
      };
      function round(n, d) {
        var p = Math.pow(10, d);
        return Math.round(n * p) / p;
      }

      function pressKey(k) {
        if (k === "back") {
          entry = entry.slice(0, -1);
        } else if (k === ".") {
          if (entry.indexOf(".") === -1) entry = (entry || "0") + ".";
        } else {
          if (entry === "0") entry = ""; // no leading zeros
          var parts = entry.split(".");
          if (parts[1] !== undefined && parts[1].length >= 1) return; // 1 decimal place max
          if (parts[0].length >= 3 && parts[1] === undefined) return; // 3 whole digits max
          entry += k;
        }
        update();
      }

      function setDisplay() {
        var d = $("display");
        if (entry) {
          d.textContent = entry;
          d.className = "display";
        } else {
          d.textContent = "Tap the number pad";
          d.className = "display ph";
        }
      }

      function update() {
        setDisplay();
        var raw = parseFloat(entry);
        if (!raw || raw <= 0 || raw > 400) {
          last = null;
          return render();
        }
        var kg = unit === "lb" ? raw * 0.45359237 : raw;
        var dose = kg * DOSE_PER_KG,
          capped = false;
        if (dose > MAX_DOSE) {
          dose = MAX_DOSE;
          capped = true;
        }
        last = {
          kg: round(kg, 1),
          dose: round(dose, 0),
          ml: round(dose / CONC, 1),
          daily: round(dose * freq, 0),
          freq: freq,
          capped: capped,
        };
        render();
      }

      function render() {
        $("empty").style.display = last ? "none" : "block";
        $("out").style.display = last ? "block" : "none";
        $("save").disabled = !last;
        if (!last) return;
        $("mg").innerHTML = last.dose + `<span class="small">mg per dose</span>`;
        $("ml").textContent = last.ml + " mL";
        $("daily").textContent = last.daily + " mg";
        $("basis").textContent =
          last.kg +
          " kg \u00d7 " +
          DOSE_PER_KG +
          " mg/kg, " +
          last.freq +
          " dose" +
          (last.freq > 1 ? "s" : "") +
          " per day";
        var n = $("note");
        n.className = "note" + (last.capped ? " show" : "");
        n.textContent = last.capped
          ? "Capped at the " + MAX_DOSE + " mg maximum per dose."
          : "";
      }

      $("pad").addEventListener("click", function (e) {
        var b = e.target.closest(".button");
        if (b) pressKey(b.getAttribute("data-k"));
      });

      $("unit").addEventListener("click", function (e) {
        var b = e.target.closest(".button");
        if (!b) return;
        var next = b.getAttribute("data-u"),
          v = parseFloat(entry);
        if (v && next !== unit)
          entry = String(
            round(next === "lb" ? v / 0.45359237 : v * 0.45359237, 1),
          );
        unit = next;
        [].forEach.call(this.children, function (c) {
          if (c === b) c.classList.add("on");
          else c.classList.remove("on");
        });
        update();
      });

      $("freq").addEventListener("click", function (e) {
        var b = e.target.closest(".button");
        if (!b) return;
        freq = parseInt(b.getAttribute("data-f"), 10);
        [].forEach.call(this.children, function (c) {
          if (c === b) c.classList.add("on");
          else c.classList.remove("on");
        });
        update();
      });

      // Veeva CLM: write a clickstream record. Only runs inside the Veeva app.
      $("save").addEventListener("click", function () {
        if (!last) return;
        if (typeof com === "undefined" || !com.veeva || !com.veeva.clm) {
          console.log(
            "Veeva library not present (browser preview). Would save:",
            last,
          );
          return;
        }
        var record = {
          Track_Element_Id_vod__c: "dosing_calculator",
          Track_Element_Type_vod__c: "Calculator",
          Track_Element_Description_vod__c:
            "Weight " +
            last.kg +
            " kg; " +
            last.dose +
            " mg x " +
            last.freq +
            "/day",
          Answer_vod__c: String(last.dose),
        };
        com.veeva.clm.createRecord(
          "Call_Clickstream_vod__c",
          record,
          function (r) {
            console.log("Saved", r);
          },
        );
      });

      // Optional: let a desktop keyboard work too when previewing in a browser
      document.addEventListener("keydown", function (e) {
        if (/^[0-9.]$/.test(e.key)) pressKey(e.key);
        else if (e.key === "Backspace") pressKey("back");
      });

      update();
    })();
  },
};
