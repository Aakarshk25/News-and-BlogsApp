import { useEffect,useState } from "react";
import Weather from "./Weather";
import Calendar from "./Calendar";
import "./News.css";
import userImg from "../assets/images/user.jpg";
import noImg from "../assets/images/no-img.png";
import axios from 'axios'


const News = () => {
  const [headline,setHeadline] = useState(null)
  const [news,setNews] = useState([])

  useEffect(() => {
    const fetchNews = async() => {
      // const url = 'https://gnews.io/api/v4/top-headlines?category=general&lang=hi&apikey=d2ba8216c37ec9feb24d2836026c7a79'
      const url = 'https://gnews.io/api/v4/top-headlines?category=general&lang=en&apikey=d2ba8216c37ec9feb24d2836026c7a79'
      const response = await axios.get(url)
      const fetchedNews  = response.data.articles

      fetchNews.forEach[(article)=>{
        if(!article.image){
          article.image=noImg
        }
    }]

      setHeadline(fetchedNews[0])
      setNews(fetchedNews.slice(1,7))
      console.log(news)
    }
    fetchNews()
  },[])

  return (
    <div className="news">
      <header className="news-header">
        <h1 className="logo">News and Blogs</h1>
        <div className="search-bar">
          <form>
            <input type="text" placeholder="Search News..." />
            <button type="submit">
              {" "}
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
              <a href="#" className="nav-link">
                General
              </a>
              <a href="#" className="nav-link">
                World
              </a>
              <a href="#" className="nav-link">
                Business
              </a>
              <a href="#" className="nav-link">
                Technology
              </a>
              <a href="#" className="nav-link">
                Entertainenent
              </a>
              <a href="#" className="nav-link">
                Sports
              </a>
              <a href="#" className="nav-link">
                Science
              </a>
              <a href="#" className="nav-link">
                Health
              </a>
              <a href="#" className="nav-link">
                Bookmarks <i className="fa-regular fa-bookmark"></i>
              </a>
            </div>
          </nav>
        </div>
        <div className="news-section">
          {headline && ( <div className="headline">
            <img src={headline.image || noImg} alt= {headline.title} />
            <h2 className="headline-title">
               {headline.title}
              <i className="fa-regular fa-bookmark bookmark"></i>
            </h2>
          </div>)}
         

          <div className="news-grid">
            {news.map((article,index)=> (
              <div key={index} className="news-grid-item">
              <img src={article.image || noImg}  alt={article.title} />
              <h3>{article.title}
              <i className="fa-regular fa-bookmark bookmark"></i>
              </h3>
            </div>
            ))}
          </div>
        </div>
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
