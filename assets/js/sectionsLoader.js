// js/sectionsLoader.js

const SectionLoader = {
  /**
   * Charge dynamiquement une section dans le DOM.
   * @param {string} targetId  L’ID de la balise <section> ou <div> vide
   * @param {Object} paths     Les chemins vers les fichiers { html, css, js }
   */
  loadSection(targetId, paths) {
    return new Promise((resolve, reject) => {
      const container = document.getElementById(targetId);
      if (!container) {
        const error = `Élément avec l'ID ${targetId} non trouvé`;
        console.error(error);
        reject(new Error(error));
        return;
      }


      // 1. Charger le HTML
      fetch(paths.html)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.text();
        })
        .then(html => {
          container.innerHTML = html;

          // 2. Injecter le CSS
          if (paths.css) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = paths.css;
            link.onload = () => {};
            link.onerror = (e) => console.error(`Erreur de chargement du CSS ${paths.css}:`, e);
            document.head.appendChild(link);
          }

          // 3. Injecter le JS si présent
          if (paths.js) {
            const script = document.createElement("script");
            script.src = paths.js;
            script.onload = function() {
              resolve({ targetId, status: 'complete' });
            };
            script.onerror = (e) => {
              console.error(`Erreur de chargement du JS ${paths.js}:`, e);
              reject(e);
            };
            document.body.appendChild(script);
          } else {
            // Si pas de JS, résoudre immédiatement
            resolve({ targetId, status: 'complete' });
          }
        })
        .catch(err => {
          console.error(`Erreur lors du chargement de la section ${targetId}:`, err);
          reject(err);
        });
    });
  },

  /** Initialise toutes les sections */
  init() {
    this.loadSection("reflex-game-container", {
      html: "projects/games/reflex-test/reflex-test.html",
      css:  "projects/games/reflex-test/reflex-test.css",
      js:   "projects/games/reflex-test/reflex-test.js"
    });

    this.loadSection("mainHeader", {
      html: "pages/anyWhere/mainHeader.html",
      css: "assets/css/mainHeader.css"
    });

    this.loadSection("headLink", {
      html: "pages/anyWhere/headLink.html"
    });

    this.loadSection("mainFooter", {
      html: "pages/anyWhere/mainFooter.html",
      css: "assets/css/mainFooter.css"
    });

    this.loadSection("about", {
      html: "pages/home/about.html"
    });

    this.loadSection("citations", {
      html: "pages/home/citations/citations.html",
      css: "pages/home/citations/citations.css"
    });

    // this.loadSection("news", {
    //   html: "pages/home/news.html",
    //   js:   "pages/home/news.js",
    // });

    // this.loadSection("contact", {
    //   html: "pages/home/contact.html",
    //   js:   "pages/home/contact.js"
    // });

    // Exemples futurs :
    // this.loadSection("chatbot-container", { 
    //  html: "projets/games/chatbot/chatbot.html", 
    //  css: "projets/games/chatbot/chatbot.css", 
    //  js: "projets/games/chatbot/chatbot.js" 
    // });
  }
};

// Démarre après que le DOM de index.html soit ready
document.addEventListener("DOMContentLoaded", () => SectionLoader.init());
