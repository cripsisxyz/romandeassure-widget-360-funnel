var RA360Widget=function(s){"use strict";const w='@import"https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap";:host{display:block}#ra *{box-sizing:border-box}#ra{all:initial;--brand: #ff6b00;--brand-2: #ff8a34;--ink: #032a53;--muted: #3f5873;--panel: #fff;--stroke: #e7eef6;--aura: #3b82f6;--hl-start: #fef9f5;--ok: #16a34a;--ok-bg: #e8f8ef;--ok-br: #b7ead0;font-family:IBM Plex Sans,system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;color:var(--ink);line-height:1.6;text-rendering:optimizeLegibility}.wrap,.wrap *{font-family:inherit;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.ra-card-grid{display:grid;grid-template-columns:1fr;gap:24px;margin:12px auto;max-width:1000px;padding:0 14px}.ra-card{position:relative;display:flex;flex-direction:column;align-items:center;background:var(--panel);border:1px solid var(--stroke);border-radius:18px;padding:28px 36px;cursor:pointer;isolation:isolate;box-shadow:inset 0 0 0 1px #ffffffbf,0 6px 18px #032a5314,0 10px 28px #ff6b0026;transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease,background-color .18s ease;max-width:880px;margin:0 auto}.ra-card--aura-blue{border-color:#3b82f64d;box-shadow:inset 0 0 0 1px #ffffffbf,0 0 0 2px #3b82f62e,0 8px 22px #3b82f629,0 12px 34px #ff6b002e}.ra-card--aura-blue:hover{transform:translateY(-1px);box-shadow:inset 0 0 0 1px #ffffffe6,0 0 0 3px #3b82f638,0 12px 30px #3b82f638,0 16px 40px #ff6b0038;background:linear-gradient(180deg,var(--hl-start) 0%,#f7fbff 100%)}.ra-card--pulse:after{content:"";position:absolute;inset:-10px;border-radius:22px;pointer-events:none;box-shadow:0 0 #3b82f647;animation:raAuraPulse 2.6s ease-in-out infinite}@keyframes raAuraPulse{0%{box-shadow:0 0 #3b82f642}50%{box-shadow:0 0 0 12px #3b82f61a}to{box-shadow:0 0 #3b82f600}}.ra-card__header{display:flex;align-items:center;gap:14px;justify-content:center;margin-bottom:10px}.ra-card__icon{width:40px;height:40px;border-radius:10px;display:grid;place-items:center;background:linear-gradient(180deg,#ffffffb3,#ffffff4d);border:1px solid var(--stroke);color:var(--brand);box-shadow:inset 0 0 0 1px #032a530a}.ra-card__icon svg{width:26px;height:26px;display:block}.ra-card__title{font-weight:800;margin:0;font-size:1.38rem;letter-spacing:.2px}.ra-card__hook{font-size:1.05rem;color:var(--muted);margin:6px 0 18px;text-align:center}.ra-card__hook strong{color:var(--ink)}.ra-card__hook .accent{color:var(--brand);font-weight:800}.ra-card__hook .br{display:block;margin-top:4px}.ra-badges{display:flex;flex-wrap:wrap;gap:10px 12px;justify-content:center;margin-bottom:22px}.ra-badge{padding:.42rem .9rem;border-radius:999px;background:linear-gradient(90deg,var(--brand),var(--brand-2));color:#fff;font-weight:700;font-size:.86rem;line-height:1;white-space:nowrap;box-shadow:0 3px 8px #ff6b0040;transition:transform .12s ease,box-shadow .12s ease,filter .12s ease}.ra-badge:nth-child(2n){background:linear-gradient(90deg,var(--brand-2),var(--brand))}.ra-badge:hover{transform:translateY(-1px);box-shadow:0 6px 14px #ff6b004d;filter:brightness(1.03)}.ra-reassure{display:flex;flex-wrap:wrap;gap:10px 12px;justify-content:center;margin-top:10px;margin-bottom:4px}.ra-chip{border:1px solid var(--stroke);background:#fff;padding:.42rem .9rem;border-radius:999px;font-size:.95rem;transition:box-shadow .12s ease,transform .12s ease}.ra-chip:hover{transform:translateY(-1px);box-shadow:0 4px 10px #032a5314}.ra-card__cta{display:inline-flex;align-items:center;justify-content:center;gap:10px;margin:18px auto 0;padding:.9rem 1.5rem;font-weight:800;font-size:1.05rem;border-radius:999px;background:linear-gradient(90deg,var(--brand),var(--brand-2));color:#fff;box-shadow:0 8px 18px #ff6b0052;transition:transform .14s ease,box-shadow .14s ease,filter .14s ease;width:auto;max-width:fit-content}.ra-card__cta svg{width:22px;height:22px;flex:0 0 22px}.ra-card__cta:hover{transform:translateY(-1px);box-shadow:0 10px 24px #ff6b0061;filter:brightness(1.03)}.ra-expander{overflow:hidden;height:0;transition:height .32s ease;border:1px solid var(--stroke);border-radius:16px;background:linear-gradient(180deg,#ff6b000f,#fff);box-shadow:0 4px 12px #032a530f;margin-top:2px;max-width:880px;margin-left:auto;margin-right:auto;padding:0 36px}.ra-intro{margin:22px auto 6px;max-width:640px;text-align:center;background:#f7fbff;border:1px solid #e2eefc;border-radius:14px;padding:18px}.ra-intro h4{margin:0 0 6px;font-size:1.15rem;font-weight:800;color:#0f3a6b}.ra-intro p{margin:6px 0;font-size:1rem;color:#3a5676}.ra-intro .muted{font-size:.95rem;color:#5a7594}.ra-form{display:grid;gap:20px;padding:20px 0;max-width:520px;width:100%;margin:0 auto}.ra-field{display:grid;gap:8px;min-width:0}.ra-field label{font-size:1rem;color:var(--muted);text-align:left}.input,.select{width:100%;min-width:0;height:52px;border:1px solid var(--stroke);border-radius:14px;background:#fff;padding:0 16px;font-size:1.02rem;color:var(--ink);transition:border-color .15s ease,box-shadow .15s ease;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.select{font-size:.95rem;-webkit-appearance:none;-moz-appearance:none;appearance:none;line-height:52px}.select option{white-space:nowrap}.ra-phone-row{display:grid;grid-template-columns:150px 1fr;gap:12px;min-width:0}.ra-btn{justify-self:center;border:1px solid transparent;border-radius:999px;padding:.9rem 1.35rem;font-weight:800;font-size:1.02rem;background:var(--brand);color:#fff;cursor:pointer;box-shadow:0 6px 16px #ff6b0059}.consent{display:flex;align-items:flex-start;gap:10px}.consent input[type=checkbox]{width:18px;height:18px;flex:0 0 18px;margin:3px 0 0;accent-color:var(--brand)}.consent label{display:block;margin:0;font-size:.88rem;line-height:1.4;white-space:normal}.consent img{width:16px;height:16px;margin:0 6px 0 0;vertical-align:text-top}.ra-form-hint{margin:6px 0 0;font-size:.86rem;color:var(--muted);text-align:center}.ra-form-hint strong{color:var(--ink)}.ra-form-hint--muted{margin-top:4px;font-size:.84rem;color:#5e7693;text-align:center}.ra-success{display:none;margin:22px auto 8px;padding:18px 24px;border-radius:14px;border:1px solid var(--ok-br);background:var(--ok-bg);color:#0b4a34;text-align:center;font-size:1.02rem}.ra-success.show{display:block;animation:fadeIn .25s ease}.ra-success__icon{display:block;width:44px;height:44px;margin:16px auto 0}.ra-article .ra-card-grid{max-width:760px;padding:0;margin:24px 0 32px}.ra-article .ra-card{max-width:760px;margin:0;border-radius:14px;padding:22px 20px;align-items:stretch;box-shadow:inset 0 0 0 1px #fffc,0 4px 12px #032a5314}.ra-article .ra-card--aura-blue{border-color:#3b82f62e;box-shadow:inset 0 0 0 1px #fffc,0 4px 12px #032a5314}.ra-article .ra-card--pulse:after{display:none}.ra-article .ra-card__header{justify-content:flex-start}.ra-article .ra-card__hook{text-align:left;margin:6px 0 12px}.ra-article .ra-badges{justify-content:flex-start;margin-bottom:16px}.ra-article .ra-reassure{justify-content:flex-start;margin-bottom:12px}.ra-article .ra-card__cta{margin:12px 0 0}.ra-article .ra-expander{max-width:760px;margin:0 0 8px;padding:0 20px;border-radius:14px;box-shadow:0 3px 10px #032a530f}@keyframes fadeIn{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}@media (max-width: 640px){.ra-card{padding:24px 18px}.ra-expander{padding:0 18px}.ra-form{gap:18px;max-width:100%}.ra-phone-row{grid-template-columns:118px 1fr}}',y="https://romandeassure.ch/api/register_lead",k=["Assurance Auto","Ménage","Santé","Complémentaire","LaMAL"],_=`
  <style>${w}</style>
  <div id="ra">
    <div class="wrap">
    <div class="ra-card-grid">
      <div id="accompagnement" class="ra-card ra-card--aura-blue ra-card--pulse" role="button" tabindex="0" aria-expanded="false">
        <div class="ra-card__body">
          <div class="ra-card__header">
            <div class="ra-card__icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <defs><linearGradient id="raGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#3b82f6"/><stop offset="55%" stop-color="#6ea8ff"/><stop offset="100%" stop-color="#FF6B00"/></linearGradient></defs>
                <circle cx="32" cy="32" r="18" stroke="url(#raGrad)"/>
                <path d="M32 12v8M32 44v8M12 32h8M44 32h8" stroke="url(#raGrad)"/>
                <path d="M32 24l2.8 5.2 5.7.8-4.1 4 1 5.6-5.4-2.8-5.4 2.8 1-5.6-4.1-4 5.7-.8L32 24z" stroke="url(#raGrad)"/>
              </svg>
            </div>
            <h3 class="ra-card__title">Diagnostique 360º</h3>
          </div>
          <p class="ra-card__hook"><strong>Trop d’assurances&nbsp;? Pas assez de temps&nbsp;?</strong><span class="br"></span>On s’en occupe pour vous — <span class="accent">gratuitement</span>.</p>
          <div class="ra-badges" aria-label="Catégories populaires"></div>
          <div class="ra-reassure" aria-label="Avantages">
            <span class="ra-chip">⚖️&nbsp;Service neutre & gratuit</span>
            <span class="ra-chip">🔓&nbsp;Sans engagement</span>
            <span class="ra-chip">⚡&nbsp;Réponse rapide</span>
          </div>
          <span class="ra-card__cta" role="link" aria-label="Je veux mon diagnostic gratuit">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.11 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.86.33 1.7.62 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.19a2 2 0 0 1 2.11-.45c.8.29 1.64.5 2.5.62A2 2 0 0 1 22 16.92z"/></svg>
            Je veux mon diagnostic gratuit →
          </span>
        </div>
      </div>
    </div>

    <div id="accompagnement-expander" class="ra-expander" aria-hidden="true" tabindex="-1">
      <div class="ra-intro" id="ra-intro">
        <h4>Vous ne savez pas par où commencer ? Pas de stress.</h4>
        <p>Nos conseillers <strong>RomandeAssure</strong> s’occupent de tout, en toute confidentialité et <strong>sans engagement</strong>.</p>
        <p class="muted">Remplissez le formulaire ci-dessous et recevez votre <strong>diagnostic personnalisé</strong> en moins de <strong>24&nbsp;h</strong>.</p>
      </div>

      <div id="ra-success" class="ra-success" role="status" aria-live="polite">
        Merci beaucoup de votre confiance, un agent vous contactera bientôt !
        <svg class="ra-success__icon" viewBox="0 0 24 24" fill="none" stroke="var(--ok)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
      </div>

      <form id="accompagnement-form" class="ra-form" novalidate>
        <div class="ra-field">
          <label for="acf-firstname">Prénom</label>
          <input id="acf-firstname" class="input" type="text" placeholder="p. ex. Marie" required>
        </div>

        <div class="ra-field">
          <label for="acf-phone">Téléphone</label>
          <div class="ra-phone-row">
            <select id="acf-code" class="select" aria-label="Code pays">
              <option value="+41" selected>CH +41</option>
            </select>
            <input id="acf-phone" class="input" type="tel" inputmode="tel" placeholder="79 232 93 23" maxlength="12" required>
          </div>
        </div>

        <div class="ra-field">
          <label for="acf-raison">Raison</label>
          <input id="acf-raison" class="input" type="text" list="raison-list" placeholder="LaMAL, Complémentaire, Auto… (ou écrivez la vôtre)" required>
          <datalist id="raison-list"></datalist>
        </div>

        <div class="consent">
          <input type="checkbox" id="wa" checked>
          <label for="wa"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp">Oui, je veux recevoir <strong>gratuitement</strong> mes offres détaillées sur WhatsApp.</label>
        </div>

        <div class="consent">
          <input id="c" type="checkbox" required>
          <label for="c">J’accepte que mes données soient utilisées pour me recontacter*. Voir <a href="https://romandeassure.ch/fr/politique-de-confidentialite" target="_blank" rel="noopener noreferrer">Politique de confidentialité</a>.</label>
        </div>

        <button type="submit" class="ra-btn">Envoyer la demande</button>

        <p class="ra-form-hint"><strong>Service 100% gratuit.</strong> +500 personnes ont trouvé leur assurance idéale cette année via RomandeAssure.</p>
        <p class="ra-form-hint ra-form-hint--muted">Comparaison gratuite – Sans engagement – Réseau de confiance</p>
      </form>
    </div>
    </div>
  </div>
`;function A(n){let e=n.replace(/\D+/g,"");e.startsWith("0")&&(e=e.slice(1)),e=e.slice(0,9);let a="";return e.length>0&&(a+=e.slice(0,2)),e.length>2&&(a+=" "+e.slice(2,5)),e.length>5&&(a+=" "+e.slice(5,7)),e.length>7&&(a+=" "+e.slice(7,9)),a}function g(n){if(!n)throw new Error("RA360Widget: host element not found");const e=n.shadowRoot||n.attachShadow({mode:"open"});e.innerHTML=_;const a=e,m=a.getElementById("ra");if(!m)throw new Error("RA360Widget: root element not found");typeof window!="undefined"&&window.location.pathname.includes("/blog")&&m.classList.add("ra-article");const d=a.getElementById("accompagnement"),r=a.getElementById("accompagnement-expander"),l=a.getElementById("accompagnement-form"),z=a.querySelector(".ra-badges"),I=a.getElementById("raison-list"),R=a.getElementById("acf-code"),p=a.getElementById("acf-phone"),x=a.getElementById("ra-success");k.forEach(t=>{const i=document.createElement("span");i.className="ra-badge",i.textContent=t,z.appendChild(i);const c=document.createElement("option");c.value=t,I.appendChild(c)});const h=()=>{p.value=A(p.value)};["input","blur","paste"].forEach(t=>p.addEventListener(t,h));function B(){r.setAttribute("aria-hidden","false"),d.setAttribute("aria-expanded","true"),r.style.height=r.scrollHeight+"px",r.scrollIntoView({behavior:"smooth",block:"start"})}function S(){r.setAttribute("aria-hidden","true"),d.setAttribute("aria-expanded","false"),r.style.height="0px"}function b(){r.getAttribute("aria-hidden")==="false"?S():B()}d.addEventListener("click",b),d.addEventListener("keydown",t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),b())}),new ResizeObserver(()=>{r.getAttribute("aria-hidden")==="false"&&(r.style.height=r.scrollHeight+"px")}).observe(r);function C(){x.classList.add("show"),r.style.height=r.scrollHeight+"px",x.scrollIntoView({behavior:"smooth",block:"center"}),setTimeout(()=>{x.classList.remove("show"),r.style.height=r.scrollHeight+"px"},6e3)}l.addEventListener("submit",async t=>{if(t.preventDefault(),!l.reportValidity())return;h();const i=R.value||"+41",c=p.value.trim(),L=`${i} ${c}`.trim(),o=l.querySelector(".ra-btn"),v=o.textContent;o.disabled=!0,o.textContent="Envoi…";const M={firstname:a.getElementById("acf-firstname").value.trim(),phone:L,raison:a.getElementById("acf-raison").value.trim(),whatsapp:a.getElementById("wa").checked,consent:a.getElementById("c").checked,ua:navigator.userAgent};try{const f=await fetch(y,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(M)});if(!f.ok)throw new Error(await f.text());l.reset(),o.textContent="Reçu ✔",C(),setTimeout(()=>{o.textContent=v,o.disabled=!1},1600)}catch(f){console.error("RA360Widget: lead error",f),alert("Oups, une erreur est survenue. Réessayez plus tard."),o.disabled=!1,o.textContent=v}})}function E(n="#ra"){const e=document.querySelector(n);if(!e)throw new Error(`RA360Widget: selector not found: ${n}`);g(e)}function u(n){g(n)}return typeof window!="undefined"&&(window.RAInit=u),s.RAInit=u,s.init=E,Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}),s}({});
