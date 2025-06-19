// Animation de la timeline au défilement
document.addEventListener('DOMContentLoaded', function() {
  // Sélectionner tous les éléments de la timeline
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  // Fonction pour vérifier si un élément est visible à l'écran
  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight * 0.8) &&
      rect.bottom >= 0
    );
  };

  // Fonction pour gérer le défilement
  const handleScroll = () => {
    timelineItems.forEach(item => {
      if (isElementInViewport(item) && !item.classList.contains('visible')) {
        item.classList.add('visible');
      }
    });
  };

  // Écouter l'événement de défilement
  window.addEventListener('scroll', handleScroll);
  
  // Vérifier les éléments visibles au chargement initial
  handleScroll();

  // Animation des éléments d'engagement
  const engagementItems = document.querySelectorAll('.engagement-list li');
  
  engagementItems.forEach((item, index) => {
    // Délai d'animation pour chaque élément
    item.style.transitionDelay = `${index * 0.1}s`;
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    
    // Ajouter la classe d'animation lorsque l'élément est visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(item);
  });
});
