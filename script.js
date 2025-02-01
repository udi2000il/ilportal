// script.js

// Your NewsAPI key (sign up at https://newsapi.org/ to get your free API key)
const apiKey = 'YOUR_NEWSAPI_KEY';

// The Israeli news source parameter
const sources = 'ynet,haaretz,jerusalem-post,channel-12';

// Function to fetch the latest news articles from Israeli sources
async function fetchNews() {
    const url = `https://newsapi.org/v2/top-headlines?sources=${sources}&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'ok') {
        displayNews(data.articles);
    } else {
        console.error('Error fetching news:', data);
    }
}

// Function to display the news articles
function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; // Clear any previous content

    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');
        
        // Create image element if it exists
        const imgUrl = article.urlToImage || 'https://via.placeholder.com/300x200?text=No+Image';
        const image = `<img src="${imgUrl}" alt="Article Image">`;

        // Article content
        const content = `
            <div class="content">
                <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                <p>${article.description || 'No description available.'}</p>
            </div>
        `;

        // Combine image and content
        newsItem.innerHTML = image + content;
        newsContainer.appendChild(newsItem);
    });
}

// Fetch news when the page loads
window.onload = fetchNews;
