// Tableau de citations
const quotes = [
    {
      text: "Le meilleur moyen de prédire l'avenir, c'est de le créer.",
      author: "Peter Drucker"
    },
    {
      text: "Le succès, c'est d'aller d'échec en échec sans perdre son enthousiasme.",
      author: "Winston Churchill"
    },
    {
      text: "La programmation est l'art d'ordonner à un ordinateur de faire ce que vous voulez, exactement comme vous le voulez.",
      author: "Larry Wall"
    },
    {
      text: "Le code est comme l'humour. Quand vous devez l'expliquer, c'est qu'il n'est pas bon.",
      author: "Cory House"
    },
    {
      text: "La mesure de l'intelligence est la capacité à changer.",
      author: "Albert Einstein"
    },
    {
      text: "Le génie, c'est 1% d'inspiration et 99% de transpiration.",
      author: "Thomas Edison"
    },
    {
      text: "La meilleure façon de résoudre un problème est d'écrire du code.",
      author: "Bill Gates"
    },
    {
      text: "La simplicité est la sophistication suprême.",
      author: "Léonard de Vinci"
    }
];

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour afficher une citation aléatoire
    function showRandomQuote() {
        const quoteElement = document.getElementById('quote-text');
        const authorElement = document.getElementById('quote-author');
        
        if (quoteElement && authorElement) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const randomQuote = quotes[randomIndex];
            
            quoteElement.textContent = randomQuote.text;
            authorElement.textContent = randomQuote.author;
            
            // Changer de citation toutes les 10 secondes
            setTimeout(showRandomQuote, 10000);
        } else {
            // Si les éléments ne sont pas trouvés, réessayer dans 100ms
            setTimeout(showRandomQuote, 100);
        }
    }
    
    // Démarrer l'affichage des citations
    showRandomQuote();
});
