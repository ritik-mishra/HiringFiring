import React, { Component } from 'react';
import "./Loading.scss";


class Loading extends Component {
    render() {
        return (
            <div className="bookshelf_wrapper">
                <ul style={{ height: "auto", width: "30rem" }} className="books_list">
                    <li style={{ height: "2rem", width: "30rem" }} className="book_item first"></li>
                    <li style={{ height: "2rem", width: "30rem" }} className="book_item second"></li>
                    <li style={{ height: "2rem", width: "30rem" }} className="book_item third"></li>
                    <li style={{ height: "2rem", width: "30rem" }} className="book_item fourth"></li>
                    <li style={{ height: "2rem", width: "30rem" }} className="book_item fifth"></li>
                    <li style={{ height: "2rem", width: "30rem" }} className="book_item sixth"></li>
                </ul>
                <div style={{ height: "2rem", width: "30rem" }} className="shelf"></div>
            </div>
        )
    }
}

export default Loading;