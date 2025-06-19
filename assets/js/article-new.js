document.addEventListener('DOMContentLoaded', function() {
  // Animation des titres au défilement
  function animateOnScroll() {
    const elements = document.querySelectorAll('h2, h3, .grid-demo, .animate-button');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight * 0.85) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }

  // Initialiser les animations
  function initAnimations() {
    const animatedElements = document.querySelectorAll('h2, h3, .grid-demo, .animate-button');
    
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Démarrer les animations
    setTimeout(animateOnScroll, 100);
  }

  // Gestion du partage
  function setupShareButtons() {
    const shareButtons = document.querySelectorAll('.share-button');
    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);
    
    shareButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = button.getAttribute('data-platform');
        let shareUrl = '';
        
        switch(platform) {
          case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
            break;
          case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
            break;
          case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
            break;
          default:
            return;
        }
        
        window.open(shareUrl, 'Partager', 'width=600,height=400');
      });
    });
  }
  
  // Copier le lien de partage
  function setupCopyLink() {
    const copyButton = document.querySelector('.copy-link');
    if (!copyButton) return;
    
    copyButton.addEventListener('click', (e) => {
      e.preventDefault();
      const url = window.location.href;
      
      navigator.clipboard.writeText(url).then(() => {
        const originalText = copyButton.innerHTML;
        copyButton.innerHTML = '<i class="fas fa-check"></i> Lien copié !';
        
        setTimeout(() => {
          copyButton.innerHTML = originalText;
        }, 2000);
      }).catch(err => {
        console.error('Erreur lors de la copie : ', err);
      });
    });
  }
  
  // Gestion du bouton "Retour en haut"
  function setupBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Retour en haut de la page');
    document.body.appendChild(backToTop);
    
    // Afficher/cacher le bouton au défilement
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
    
    // Retour en haut au clic
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Table des matières automatique
  function generateTableOfContents() {
    const toc = document.querySelector('.table-of-contents');
    if (!toc) return;
    
    const headings = document.querySelectorAll('h2, h3');
    if (headings.length === 0) {
      toc.style.display = 'none';
      return;
    }
    
    let tocHTML = '<h3>Table des matières</h3><ul>';
    let h2Count = 0;
    
    headings.forEach((heading, index) => {
      const id = `section-${index}`;
      heading.setAttribute('id', id);
      
      if (heading.tagName === 'H2') {
        h2Count++;
        tocHTML += `<li><a href="#${id}">${h2Count}. ${heading.textContent}</a></li>`;
      } else {
        tocHTML += `<li class="sub-item"><a href="#${id}">${heading.textContent}</a></li>`;
      }
    });
    
    tocHTML += '</ul>';
    toc.innerHTML = tocHTML;
  }
  
  // Initialisation
  function init() {
    initAnimations();
    setupShareButtons();
    setupCopyLink();
    setupBackToTop();
    generateTableOfContents();
    
    // Écouter le défilement pour les animations
    window.addEventListener('scroll', animateOnScroll);
  }
  
  // Démarrer l'initialisation
  init();
});
