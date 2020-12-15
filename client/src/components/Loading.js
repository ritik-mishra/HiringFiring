import React, { Component } from 'react';

import "./Loading.scss";
class Loading extends Component {
    render() {
        return (
            <div style={{ marginTop: "20rem" }} className="bookshelf_wrapper">
                <ul class="books_list">
                    <li className="book_item first"></li>
                    <li className="book_item second"></li>
                    <li className="book_item third"></li>
                    <li className="book_item fourth"></li>
                    <li className="book_item fifth"></li>
                    <li className="book_item sixth"></li>
                </ul>
                <div className="shelf"></div>
            </div>
        )
    }
}

export default Loading;