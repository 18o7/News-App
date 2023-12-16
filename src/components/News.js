import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import propTypes from 'prop-types'


export default function News(props) {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter=(text) =>{

   return text.charAt(0).toUpperCase() + text.slice(1);

   }

  document.title=`${capitalizeFirstLetter(props.category)} - News Buzz`;


  const updatedNews= async ()=>{
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=946c212845cb4c649281c04ca5a01a92&page=${page}&pageSize=${props.pageSize}`;

      setLoading(true)
      let response = await fetch(url);
      let data = await response.json();
      setArticle(data.articles);
      setTotalResults(data.totalResults);
      setLoading(false);

    } 
    catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }

  }

  useEffect(() => {
    async function fetchData() {
      try {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=946c212845cb4c649281c04ca5a01a92&page=1&pageSize=${props.pageSize}`;

        setLoading(true)
        let response = await fetch(url);
        let data = await response.json();
        setArticle(data.articles);
        setTotalResults(data.totalResults);
        setLoading(false);

      } 
      catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData(); // Call the fetchData function
  }, [props.pageSize]); // Include props.pageSize in the dependency array


  const handlePrevClick = async () => {
    console.log("pre");
    if (page > 1) {
      let prevPage = page - 1;
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=946c212845cb4c649281c04ca5a01a92&page=${prevPage}&pageSize=${props.pageSize}`;

      setLoading(true)
      let response = await fetch(url);
      let data = await response.json();
      

      if (data.articles.length > 0) {
        setArticle(data.articles);
        setPage(prevPage);
        setLoading(false)
      } else {
        console.log("No more articles available");
      }
    } else {
      console.log("Already on the first page");
    }

    setLoading(false);

    // setArticle({page:page-1})
    // updatedNews()
  };

  const handleNextClick = async () => {
    console.log("next");
    if (page + 1 <= Math.ceil(totalResults / props.pageSize)) {
      let nextPage = page + 1;
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=946c212845cb4c649281c04ca5a01a92&page=${nextPage}&pageSize=${props.pageSize}`;
      
      setLoading(true)
      let response = await fetch(url);
      let data = await response.json();
    

      if (data.articles.length > 0) {
        setArticle(data.articles);
        setPage(nextPage);
        setLoading(false)
      } else {
        console.log("No more articles available");
      }
    } else {
      console.log("Already on the last page");
    }

    setLoading(false);

    // setArticle({page:page+1})
    // updatedNews()
  };

  return (
    <div className="container my-5">
      <h1 className="text-center">News Buzz- Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      {loading && <Spinner/>}

      <div className="row my-5">
        {!loading && article.map((element) => (
          <div className="col-md-4" key={element.url}>
            <NewsItem
              cardTitle={element.title ? element.title.slice(0, 40) : ""}
              cardDes={
                element.description ? element.description.slice(0, 88) : ""
              }
              imageUrl={element.urlToImage}
              newsUrl={element.url}
              author={element.author}
              date={element.publishedAt}
              source={element.source.name}
            />
          </div>
        ))}
      </div>
      <div className="container d-flex justify-content-between">
        <button
          type="button"
          disabled={page <= 1}
          className="btn btn-dark"
          onClick={handlePrevClick}
        >
          &larr; Previous
        </button>
        <button
          type="button"
          disabled={page >= Math.ceil(totalResults / props.pageSize)}
          className="btn btn-dark"
          onClick={handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}
News.propTypes={
  country: propTypes.string,
  pageSize:propTypes.number,
  category:propTypes.string

}
News.defaultProps={
  country:"in",
  pageSize:5,
  category:"general"
}
