function NewsCard({ news }) {
  return (
    <div className="news-card">
      <img src={news.image} alt={news.title} />

      <div className="news-content">
        <span>{news.category}</span>

        <h3>{news.title}</h3>

        <p>{news.description}</p>
      </div>
    </div>
  );
}

export default NewsCard;