(() => {
  'use strict';

  class RaquisCyber extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.render();
      this.bind();
      this.mountGoogleReviews();
      if (!this.hasAttribute('contained')) {
        this.fullBleed();
        this._resize = () => this.fullBleed();
        window.addEventListener('resize', this._resize, { passive: true });
      }
    }

    disconnectedCallback() {
      if (this._resize) window.removeEventListener('resize', this._resize);
    }

    fullBleed() {
      const w = document.documentElement.clientWidth || window.innerWidth;
      const s = this.style;
      s.setProperty('display', 'block', 'important');
      s.setProperty('position', 'relative', 'important');
      s.setProperty('left', `calc(50% - ${w / 2}px)`, 'important');
      s.setProperty('width', `${w}px`, 'important');
      s.setProperty('max-width', 'none', 'important');
      s.setProperty('margin-left', '0', 'important');
      s.setProperty('margin-right', '0', 'important');
    }

    get offers() {
      return [
        {
          category: 'Quiropráctica',
          description: 'Planes Cyber para continuar tu atención con un valor preferente.',
          items: [
            { discount: '40% DCTO.', title: 'Plan 10 sesiones de quiropráctica', cyber: '$210.000', normal: '$350.000', saving: '$140.000', meta: 'Vigencia: 10 meses', key: 'quiro-10' },
            { discount: '30% DCTO.', title: 'Plan 4 sesiones de quiropráctica', cyber: '$98.000', normal: '$140.000', saving: '$42.000', meta: 'Vigencia: 4 meses', key: 'quiro-4' }
          ]
        },
        {
          category: 'Kinesiología',
          description: 'Elige el plan que mejor se ajuste a tu tratamiento.',
          items: [
            { discount: '30% OFF', title: 'Plan 10 sesiones de kinesiología', cyber: '$175.000', normal: '$250.000', saving: '$75.000', meta: 'Excluye Prof. Roberto Urzua', key: 'kine-10' },
            { discount: '25% OFF', title: 'Plan 5 sesiones de kinesiología', cyber: '$93.750', normal: '$125.000', saving: '$31.500', meta: 'Excluye Prof. Roberto Urzua', key: 'kine-5' }
          ]
        },
        {
          category: 'Masoterapia',
          description: 'Planes de masoterapia con vigencia extendida.',
          items: [
            { discount: '25% DCTO.', title: 'Plan 8 sesiones de masoterapia', cyber: '$180.000', normal: '$240.000', saving: '$60.000', meta: 'Vigencia: 10 meses', key: 'maso-8' },
            { discount: '20% DCTO.', title: 'Plan 4 sesiones de masoterapia', cyber: '$96.000', normal: '$120.000', saving: '$24.000', meta: 'Vigencia: 6 meses', key: 'maso-4' }
          ]
        },
        {
          category: 'Ondas de choque',
          description: 'Plan Cyber para tratamiento con ondas de choque.',
          items: [
            { discount: '25% DCTO.', title: 'Plan 5 sesiones de ondas de choque', cyber: '$112.500', normal: '$150.000', saving: '$37.500', meta: 'Valor por sesión: $30.000', key: 'ondas-5' }
          ]
        },
        {
          category: 'Gift Cards',
          description: 'Regala una sesión Raquis con precio Cyber.',
          items: [
            { discount: '20% DCTO.', title: 'Gift Card de masoterapia · 1 sesión', cyber: '$24.000', normal: '$30.000', saving: '$6.000', meta: 'Vigencia: 2 meses', key: 'gift-maso' },
            { discount: '15% DCTO.', title: 'Gift Card de quiropráctica · 1 sesión', cyber: '$30.000', normal: '$35.000', saving: '$5.000', meta: 'Vigencia: 2 meses', key: 'gift-quiro' }
          ]
        }
      ];
    }

    purchaseUrl(key) {
      const attr = this.getAttribute(`buy-${key}`);
      return attr || '#';
    }

    card(item) {
      const href = this.purchaseUrl(item.key);
      const disabled = href === '#';
      return `
        <article class="offer-card ${item.wide ? 'offer-card--wide' : ''}">
          <div class="offer-media">
            <span class="discount-badge">${item.discount}</span>
            <div class="image-placeholder">
              <span>IMAGEN DEL SERVICIO</span>
              <small>Agregarás esta imagen después</small>
            </div>
          </div>
          <div class="offer-body">
            <h3>${item.title}</h3>
            <div class="price-row">
              <strong class="cyber-price">${item.cyber}</strong>
              <s class="normal-price">${item.normal}</s>
            </div>
            <div class="saving">Ahorras <strong>${item.saving}</strong></div>
            <div class="meta">${item.meta}</div>
            <a class="buy js-buy ${disabled ? 'is-disabled' : ''}" data-offer="${item.key}" href="${href}" ${disabled ? 'aria-disabled="true"' : 'target="_blank" rel="noopener noreferrer"'}>COMPRAR →</a>
          </div>
        </article>`;
    }

    render() {
      const offers = this.offers.map(group => `
        <section class="offer-section" id="${group.category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-')}">
          <div class="section-head">
            <div>
              <h2>${group.category}</h2>
              <p>${group.description}</p>
            </div>
          </div>
          <div class="cards ${group.items.length === 1 ? 'cards--single' : ''}">
            ${group.items.map(item => this.card(item)).join('')}
          </div>
        </section>
      `).join('');

      this.shadowRoot.innerHTML = `
        <style>
          :host{--orange:#e84a05;--orange-dark:#c93b00;--ink:#25211f;--muted:#6f6761;--line:#eadbd1;--soft:#fff6ef;display:block;background:#fff;color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased}
          *{box-sizing:border-box}.page{overflow:hidden;background:linear-gradient(180deg,#fffaf7 0,#fff 36%,#fffaf7 100%)}.wrap{width:min(1180px,calc(100% - 48px));margin:auto}
          .hero{padding:64px 0 34px}.hero-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(360px,.82fr);gap:44px;align-items:center}.eyebrow{display:inline-flex;padding:7px 12px;border:1px solid var(--orange);border-radius:999px;color:var(--orange);font-weight:850;font-size:.82rem;letter-spacing:.04em}.hero h1{margin:18px 0 16px;max-width:700px;font-size:clamp(3rem,5.7vw,5.6rem);line-height:.93;letter-spacing:-.055em}.hero h1 .orange{color:var(--orange)}.hero p{max-width:690px;margin:0;color:var(--muted);font-size:1.15rem;line-height:1.55}.hero-cta{display:inline-flex;margin-top:26px;min-height:58px;padding:0 26px;align-items:center;justify-content:center;background:linear-gradient(#ef5509,#df4501);border-radius:13px;color:#fff;text-decoration:none;font-weight:850;box-shadow:0 12px 28px rgba(210,65,0,.2)}.hero-visual{min-height:390px;border:1px dashed #d8b9a6;border-radius:24px;background:linear-gradient(135deg,#fff1e7,#f8eee7);display:grid;place-items:center;text-align:center;color:#8a7569}.hero-visual strong{display:block;font-size:1.1rem}.hero-visual small{display:block;margin-top:6px}
          .trust-strip{margin-top:34px;border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:rgba(255,255,255,.72)}.trust-grid{display:grid;grid-template-columns:repeat(4,1fr)}.trust-item{padding:18px 20px;text-align:center;font-weight:750;font-size:.9rem}.trust-item+.trust-item{border-left:1px solid var(--line)}
          .offers{padding:54px 0 18px}.offer-section{margin-bottom:48px}.section-head{display:flex;justify-content:space-between;gap:24px;align-items:flex-end;margin-bottom:18px}.section-head h2{margin:0;font-size:2rem;letter-spacing:-.03em}.section-head p{margin:6px 0 0;color:var(--muted)}
          .cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.cards--single{grid-template-columns:repeat(2,minmax(0,1fr))}.offer-card{display:grid;grid-template-columns:minmax(190px,.9fr) minmax(0,1.1fr);min-height:250px;background:#fff;border:1px solid #ecdcd2;border-radius:20px;overflow:hidden;box-shadow:0 12px 34px rgba(57,39,29,.06)}.offer-card--wide{grid-template-columns:minmax(240px,.7fr) minmax(0,1.3fr)}.offer-media{position:relative;background:#f4ebe5}.image-placeholder{height:100%;min-height:250px;display:grid;place-content:center;text-align:center;color:#9c877b;padding:22px}.image-placeholder span{font-weight:800;font-size:.88rem;letter-spacing:.05em}.image-placeholder small{margin-top:6px}.discount-badge{position:absolute;z-index:2;top:14px;left:14px;width:72px;height:72px;border-radius:50%;display:grid;place-items:center;text-align:center;padding:8px;background:var(--orange);color:#fff;font-weight:900;font-size:.86rem;line-height:1.05;box-shadow:0 8px 20px rgba(190,55,0,.2)}.offer-body{display:flex;flex-direction:column;padding:22px}.offer-body h3{margin:0 0 12px;font-size:1.16rem;line-height:1.18}.price-row{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap}.cyber-price{color:var(--orange);font-size:2rem;line-height:1;letter-spacing:-.04em}.normal-price{color:#766d67}.saving{display:inline-flex;align-self:flex-start;margin:12px 0 10px;padding:6px 10px;border-radius:8px;background:#fff0e6;color:#6d4f40;font-size:.9rem}.meta{margin-bottom:16px;color:#5d5550;font-size:.88rem}.buy{margin-top:auto;min-height:46px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:var(--orange);color:#fff;text-decoration:none;font-weight:850;font-size:.9rem}.buy:hover{background:var(--orange-dark)}.buy.is-disabled{background:#d8cec8;color:#7f746d;cursor:not-allowed}
          .reviews{padding:48px 0;border-top:1px solid var(--line)}.reviews h2,.faq h2{margin:0 0 10px;font-size:2rem;letter-spacing:-.03em}.reviews>div>p,.faq>div>p{margin:0 0 24px;color:var(--muted)}.reviews-frame{min-height:200px;border:1px solid #ecdcd2;border-radius:18px;background:#fff;padding:18px;box-shadow:0 12px 34px rgba(57,39,29,.05)}::slotted([slot="google-reviews"]){display:block;width:100%}.reviews-placeholder{min-height:160px;display:grid;place-content:center;text-align:center;color:#8b7569}.reviews-placeholder strong{display:block}.reviews-placeholder small{display:block;margin-top:6px}
          .confidence{padding:22px 0;background:#fff1e7;border-top:1px solid #f0d5c3;border-bottom:1px solid #f0d5c3}.confidence-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.confidence-item{text-align:center;font-weight:800;font-size:.9rem}
          .clinics{padding:52px 0;border-top:1px solid var(--line)}.clinics h2{margin:0 0 8px;font-size:2rem;letter-spacing:-.03em}.clinics-intro{margin:0 0 24px;color:var(--muted)}.clinic-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.clinic-card{display:grid;grid-template-columns:minmax(190px,.9fr) minmax(0,1.1fr);min-height:270px;background:#fff;border:1px solid #ecdcd2;border-radius:20px;overflow:hidden;box-shadow:0 12px 34px rgba(57,39,29,.06)}.clinic-media{background:#f4ebe5;display:grid;place-content:center;text-align:center;color:#9c877b;padding:22px}.clinic-media strong{font-size:.88rem;letter-spacing:.05em}.clinic-media small{margin-top:6px}.clinic-body{display:flex;flex-direction:column;padding:22px}.clinic-body h3{margin:0 0 10px;font-size:1.35rem;line-height:1.15}.clinic-address{margin:0 0 14px;color:#5d5550;line-height:1.5}.clinic-contact{display:grid;gap:7px;margin-bottom:18px;font-size:.9rem}.clinic-contact a{color:var(--ink);text-decoration:none}.clinic-contact a:hover{text-decoration:underline}.clinic-actions{display:grid;grid-template-columns:1fr;gap:10px;margin-top:auto}.clinic-actions a{min-height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;text-decoration:none;font-weight:850;font-size:.86rem}.clinic-actions .primary{background:var(--orange);color:#fff}.clinic-actions .secondary{border:1px solid #e4c9b9;color:var(--orange);background:#fff}
          .faq{padding:50px 0 74px}.faq-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.faq details{border:1px solid #eadbd1;border-radius:12px;background:#fff;padding:15px 18px}.faq summary{cursor:pointer;font-weight:750}.faq details p{margin:12px 0 0;color:var(--muted);line-height:1.5;font-size:.93rem}
          @media(max-width:920px){.hero-grid{grid-template-columns:1fr}.hero-visual{min-height:280px}.trust-grid,.confidence-grid{grid-template-columns:1fr 1fr}.cards,.clinic-grid{grid-template-columns:1fr}.offer-card,.offer-card--wide,.clinic-card{grid-template-columns:minmax(180px,.8fr) minmax(0,1.2fr)}}
          @media(max-width:640px){.wrap{width:calc(100% - 28px)}.hero{padding-top:36px}.hero h1{font-size:clamp(2.7rem,14vw,4rem)}.trust-grid,.confidence-grid,.faq-grid{grid-template-columns:1fr}.trust-item+.trust-item{border-left:0;border-top:1px solid var(--line)}.offer-card,.offer-card--wide,.clinic-card{grid-template-columns:1fr}.offer-media,.image-placeholder,.clinic-media{min-height:210px}.discount-badge{width:64px;height:64px}.section-head h2{font-size:1.65rem}.clinic-actions{grid-template-columns:1fr}.hero-cta{width:100%}}
        </style>
        <main class="page">
          <section class="hero">
            <div class="wrap hero-grid">
              <div>
                <span class="eyebrow">CYBER RAQUIS</span>
                <h1>Tu bienestar también está <span class="orange">en Cyber</span></h1>
                <p>Descuentos especiales en quiropráctica, kinesiología, masoterapia, ondas de choque y Gift Cards. Compra online la promoción que más te acomode.</p>
                <a class="hero-cta" href="#promociones">VER PROMOCIONES ↓</a>
              </div>
              <div class="hero-visual">
                <div><strong>ESPACIO PARA HERO</strong><small>Sin imagen por ahora</small></div>
              </div>
            </div>
            <div class="trust-strip">
              <div class="wrap trust-grid">
                <div class="trust-item">Promociones por tiempo limitado</div>
                <div class="trust-item">Compra online</div>
                <div class="trust-item">Equipo profesional</div>
                <div class="trust-item">Clínica Providencia · Clínica Santiago Centro</div>
              </div>
            </div>
          </section>

          <div class="wrap offers" id="promociones">${offers}</div>

          <section class="reviews">
            <div class="wrap">
              <h2>Lo que dicen nuestros pacientes</h2>
              <p>Reseñas reales de pacientes de Raquis.</p>
              <div class="reviews-frame">
                <slot name="google-reviews">
                  <div class="reviews-placeholder">
                    <div><strong>Cargando reseñas de Google…</strong></div>
                  </div>
                </slot>
              </div>
            </div>
          </section>

          <section class="confidence">
            <div class="wrap confidence-grid">
              <div class="confidence-item">Equipo profesional</div>
              <div class="confidence-item">2 clínicas</div>
              <div class="confidence-item">Compra online</div>
              <div class="confidence-item">Vigencias informadas</div>
            </div>
          </section>


          <section class="clinics">
            <div class="wrap">
              <h2>Nuestras Clínicas</h2>
              <p class="clinics-intro">Puedes utilizar tu promoción en cualquiera de nuestras clínicas: Santiago Centro o Providencia.</p>
              <div class="clinic-grid">
                <article class="clinic-card">
                  <div class="clinic-media">
                    <strong>IMAGEN CLÍNICA SANTIAGO CENTRO</strong>
                    <small>Agregarás esta imagen después</small>
                  </div>
                  <div class="clinic-body">
                    <h3>Clínica Santiago Centro</h3>
                    <p class="clinic-address">Nueva York 57, Of. 603, Santiago Centro.<br>Metro Universidad de Chile.</p>
                    <div class="clinic-contact">
                      <a href="mailto:recepcionsc@raquischile.cl">recepcionsc@raquischile.cl</a>
                      <a href="tel:+56232451349">+56 2 3245 1349</a>
                      <a href="https://wa.me/56985300287" target="_blank" rel="noopener noreferrer">WhatsApp: +56 9 8530 0287</a>
                    </div>
                    <div class="clinic-actions">
                      <a class="primary" href="https://www.google.com/maps/search/?api=1&query=Nueva+York+57+Oficina+603+Santiago+Centro+Chile" target="_blank" rel="noopener noreferrer">¿CÓMO LLEGAR?</a>
                    </div>
                  </div>
                </article>
                <article class="clinic-card">
                  <div class="clinic-media">
                    <strong>IMAGEN CLÍNICA PROVIDENCIA</strong>
                    <small>Agregarás esta imagen después</small>
                  </div>
                  <div class="clinic-body">
                    <h3>Clínica Providencia</h3>
                    <p class="clinic-address">Dr. Manuel Barros Borgoño 71, Of. 806, Providencia.<br>Metro Manuel Montt.</p>
                    <div class="clinic-contact">
                      <a href="mailto:recepcion@raquischile.cl">recepcion@raquischile.cl</a>
                      <a href="tel:+56222060643">+56 2 2206 0643</a>
                      <a href="https://wa.me/56941263259" target="_blank" rel="noopener noreferrer">WhatsApp: +56 9 4126 3259</a>
                    </div>
                    <div class="clinic-actions">
                      <a class="primary" href="https://www.google.com/maps/search/?api=1&query=Dr+Manuel+Barros+Borgono+71+Oficina+806+Providencia+Chile" target="_blank" rel="noopener noreferrer">¿CÓMO LLEGAR?</a>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section class="faq">
            <div class="wrap">
              <h2>Preguntas frecuentes</h2>
              <p>Información importante antes de comprar.</p>
              <div class="faq-grid">
                <details><summary>¿Hasta cuándo puedo comprar las promociones Cyber?</summary><p>Puedes aprovechar las promociones Cyber hasta el <strong>miércoles 7 de octubre</strong> o hasta agotar stock. Te recomendamos comprar con anticipación para asegurar tu promoción.</p></details>
                <details><summary>¿Cuánto tiempo tengo para usar mi plan?</summary><p>Cada plan o Gift Card tiene una vigencia específica, indicada en cada promoción. El plazo comienza a contar desde el día en que realizas la compra.</p></details>
                <details><summary>¿Puedo usar las promociones en ambas clínicas?</summary><p>Sí. Puedes agendar tus sesiones en cualquiera de nuestras clínicas: <strong>Santiago Centro o Providencia</strong>.</p></details>
                <details><summary>¿Las promociones son acumulables con otros descuentos?</summary><p>No. Las promociones Cyber no son acumulables con otros descuentos o promociones vigentes.</p></details>
                <details><summary>¿Cómo recibo mi compra o Gift Card?</summary><p>Realiza el pago a través de <strong>Getnet</strong> e ingresa correctamente tus datos de contacto. Una vez confirmado el pago, nuestro equipo se comunicará contigo para continuar con el proceso.</p><p>Si compraste una <strong>Gift Card</strong>, la recibirás en formato digital en el correo electrónico que ingresaste al momento de la compra.</p></details>
              </div>
            </div>
          </section>
        </main>`;
    }

    mountGoogleReviews() {
      if (this.querySelector('[data-raquis-google-reviews]')) return;

      const host = document.createElement('div');
      host.setAttribute('slot', 'google-reviews');
      host.setAttribute('data-raquis-google-reviews', '');
      host.style.width = '100%';

      const script = document.createElement('script');
      script.src = 'https://cdn.trustindex.io/loader.js?cc33fc47993d918046660850d56';
      script.defer = true;
      script.async = true;

      host.appendChild(script);
      this.appendChild(host);
    }

    bind() {
      this.shadowRoot.querySelectorAll('.js-buy').forEach(link => {
        link.addEventListener('click', event => {
          if (link.getAttribute('aria-disabled') === 'true') {
            event.preventDefault();
            return;
          }
          const detail = {
            event: 'raquis_cyber_buy_click',
            offer: link.dataset.offer,
            destination: link.href
          };
          try {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push(detail);
          } catch (_) {}
          this.dispatchEvent(new CustomEvent('raquis:cyber-buy', { bubbles: true, composed: true, detail }));
        });
      });
    }
  }

  if (!customElements.get('raquis-cyber')) {
    customElements.define('raquis-cyber', RaquisCyber);
  }
})();