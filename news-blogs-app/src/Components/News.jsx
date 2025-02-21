import { useEffect, useState } from "react";
import Weather from "./Weather";
import Calendar from "./Calendar";
import "./News.css";
import userImg from "../assets/images/user.jpg";
import noImg from "../assets/images/no-img.png";
import axios from "axios";
import NewsModel from "./NewsModel";

const categories = [
  "general",
  "world",
  "business",
  "technology",
  "sports",
  "science",
  "health",
  "nation",
];

const News = () => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      // const url = 'https://gnews.io/api/v4/top-headlines?category=general&lang=hi&apikey=d2ba8216c37ec9feb24d2836026c7a79'
      // let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=01fe6bed4559402e0d3848cb6a44b54f`;
      let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=152539a104c08f204dc81decdd1843f3`;
      // let url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=c40d72bfb8193a4327f2897368a666a8`;


      if (searchQuery) {
        // url =   `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=01fe6bed4559402e0d3848cb6a44b54f`
        url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=152539a104c08f204dc81decdd1843f3`;
        // url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=c40d72bfb8193a4327f2897368a666a8`;

      }
      const response = await axios.get(url);
      const fetchedNews = response.data.articles;

      fetchedNews.forEach((article) => {
        if (!article.image) {
          article.image = noImg;
        }
      });

      setHeadline(fetchedNews[0]);
      setNews(fetchedNews.slice(1, 7));
      console.log(news);
    };
    fetchNews();
  }, [selectedCategory, searchQuery]);

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setSearchInput("");
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowModel(true);
  };

  return (
    <div className="news">
      <header className="news-header">
        <h1 className="logo">News and Blogs</h1>
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search News..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit">
              {/* {" "} // till now no use */}
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>
      <div className="news-content">
        <div className="navbar">
          <div className="user">
            <img src={userImg} alt="User Image" />
            <p>Aakarsh Blog</p>
          </div>
          <nav className="categories">
            <h1 className="nav-heading">Catogaries</h1>
            <div className="nav-links">
              {categories.map((category) => (
                <a
                  href="#"
                  key={category}
                  className="nav-link"
                  onClick={(e) => handleCategoryClick(e, category)}
                >
                  {category}
                </a>
              ))}
              <a href="#" className="nav-link">
                Bookmarks <i className="fa-regular fa-bookmark"></i>
              </a>
            </div>
          </nav>
        </div>
        <div className="news-section">
          {headline && (
            <div className="headline" onClick={() =>
              handleArticleClick(headline) }>
              <img src={headline.image || noImg} alt={headline.title} />
              <h2 className="headline-title">
                {headline.title}
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h2>
            </div>
          )}

          <div className="news-grid">
            {news.map((article, index) => (
              <div key={index} className="news-grid-item" onClick={() =>
                handleArticleClick(article) }>
                <img src={article.image || noImg} alt={article.title} />
                <h3>
                  {article.title}
                  <i className="fa-regular fa-bookmark bookmark"></i>
                </h3>
              </div>
            ))}
          </div>
        </div>
        <NewsModel show={showModel} 
        article={selectedArticle} onClose={()=> 
          setShowModel(false)} />
        <div className="my-blogs">My Blogs</div>
        <div className="weather-calendar">
          <Weather />
          <Calendar />
        </div>
      </div>
      <footer className="news-footer">Footer</footer>
    </div>
  );
};

export default News;
