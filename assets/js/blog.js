/**
 * Script principal pour la page blog
 * Gère le filtrage, le tri et la recherche des articles
 */

document.addEventListener('DOMContentLoaded', function() {
  // Éléments du DOM
  const articlesContainer = document.querySelector('.articles-grid');
  const searchInput = document.getElementById('search-input');
  const categoryRadios = document.querySelectorAll('input[name="category"]');
  const sortButtons = document.querySelectorAll('.sort-btn');
  const paginationButtons = document.querySelectorAll('.pagination-button');
  
  // Données des articles (pourrait être chargé depuis une API)
  const articles = Array.from(document.querySelectorAll('.article-card'));
  
  // État actuel des filtres
  let currentFilters = {
    searchTerm: '',
    category: 'all',
    sortBy: 'date-desc'
  };
  
  // Initialisation
  function init() {
    // Ajout des écouteurs d'événements
    setupEventListeners();
    
    // Afficher les articles initiaux
    updateArticles();
  }
  
  // Configuration des écouteurs d'événements
  function setupEventListeners() {
    // Recherche
    searchInput.addEventListener('input', function(e) {
      currentFilters.searchTerm = e.target.value.toLowerCase().trim();
      updateArticles();
    });
    
    // Filtres par catégorie
    categoryRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        currentFilters.category = this.value;
        updateArticles();
      });
    });
    
    // Boutons de tri
    sortButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Retirer la classe active de tous les boutons
        sortButtons.forEach(btn => btn.classList.remove('active'));
        // Ajouter la classe active au bouton cliqué
        this.classList.add('active');
        // Mettre à jour le tri
        currentFilters.sortBy = this.dataset.sort;
        updateArticles();
      });
    });
    
    // Pagination (simulée)
    paginationButtons.forEach(button => {
      button.addEventListener('click', function() {
        if (this.disabled) return;
        
        const currentPage = document.querySelector('.pagination-button.active').textContent;
        const totalPages = document.querySelectorAll('.pagination-button:not(:first-child):not(:last-child)').length;
        
        if (this.textContent === 'Précédent') {
          // Aller à la page précédente
          const prevPage = parseInt(currentPage) - 1;
          if (prevPage >= 1) {
            updatePagination(prevPage);
          }
        } else if (this.textContent === 'Suivant') {
          // Aller à la page suivante
          const nextPage = parseInt(currentPage) + 1;
          if (nextPage <= totalPages) {
            updatePagination(nextPage);
          }
        } else {
          // Aller à une page spécifique
          updatePagination(parseInt(this.textContent));
        }
      });
    });
  }
  
  // Mise à jour de l'affichage des articles en fonction des filtres
  function updateArticles() {
    const filteredArticles = articles.filter(article => {
      // Filtre par recherche
      const matchesSearch = article.textContent.toLowerCase().includes(currentFilters.searchTerm);
      
      // Filtre par catégorie
      const matchesCategory = currentFilters.category === 'all' || 
                            article.dataset.category === currentFilters.category;
      
      return matchesSearch && matchesCategory;
    });
    
    // Trier les articles
    sortArticles(filteredArticles);
    
    // Mettre à jour l'affichage
    renderArticles(filteredArticles);
  }
  
  // Trier les articles selon le critère sélectionné
  function sortArticles(articles) {
    const [sortBy, order] = currentFilters.sortBy.split('-');
    
    articles.sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'date') {
        const dateA = new Date(a.dataset.date);
        const dateB = new Date(b.dataset.date);
        comparison = dateB - dateA; // Par défaut du plus récent au plus ancien
      } else if (sortBy === 'title') {
        const titleA = a.querySelector('.article-title').textContent.trim().toLowerCase();
        const titleB = b.querySelector('.article-title').textContent.trim().toLowerCase();
        comparison = titleA.localeCompare(titleB);
      }
      
      // Inverser l'ordre si nécessaire
      return order === 'asc' ? comparison : -comparison;
    });
  }
  
  // Afficher les articles dans le DOM
  function renderArticles(articles) {
    // Vider le conteneur
    articlesContainer.innerHTML = '';
    
    if (articles.length === 0) {
      // Afficher un message si aucun article ne correspond aux critères
      const noResults = document.createElement('div');
      noResults.className = 'no-results';
      noResults.innerHTML = `
        <div class="no-results-content">
          <h3>Aucun article trouvé</h3>
          <p>Essayez de modifier vos critères de recherche ou de filtrage.</p>
        </div>
      `;
      articlesContainer.appendChild(noResults);
      return;
    }
    
    // Ajouter chaque article au conteneur
    articles.forEach(article => {
      articlesContainer.appendChild(article);
    });
    
    // Ajouter des classes pour l'animation
    animateArticles();
  }
  
  // Animation des articles
  function animateArticles() {
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach((card, index) => {
      // Réinitialiser l'animation
      card.style.animation = 'none';
      card.offsetHeight; // Déclencher un reflow
      
      // Appliquer l'animation avec un délai
      card.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s forwards`;
    });
  }
  
  // Mise à jour de la pagination
  function updatePagination(pageNumber) {
    // Mettre à jour les boutons actifs
    const pageButtons = document.querySelectorAll('.pagination-button:not(:first-child):not(:last-child)');
    pageButtons.forEach(button => {
      button.classList.remove('active');
      if (parseInt(button.textContent) === pageNumber) {
        button.classList.add('active');
      }
    });
    
    // Activer/désactiver les boutons précédent/suivant
    const prevButton = document.querySelector('.pagination-button:first-child');
    const nextButton = document.querySelector('.pagination-button:last-child');
    
    prevButton.disabled = pageNumber === 1;
    nextButton.disabled = pageNumber === pageButtons.length;
    
    // Ici, vous pourriez charger les articles pour la page sélectionnée
    // Pour l'instant, on se contente de faire défiler vers le haut
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  // Démarrer l'application
  init();
});
