import React from "react";
import blankNews from "./blankNews.jpg";

export default function NewsItem(props) {
  let blankNewsImg = blankNews;
  return (
    <div className="my-3">
      <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"91%", zIndex:"1" }}>
          {props.source}
          <span class="visually-hidden">unread messages</span>
        </span>
        <img
          src={props.imageUrl || blankNewsImg}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.cardTitle}...</h5>
          <p className="card-text">{props.cardDes}</p>
          <p className="card-text">
            <small className="text-muted">
              By {!props.author ? "Unknown" : props.author} on {props.date}{" "}
            </small>
          </p>
          <a
            href={props.newsUrl}
            target="_blank"
            className="btn btn-sm btn-primary"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}
