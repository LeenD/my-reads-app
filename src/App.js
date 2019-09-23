import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import { MainPage, SearchPage } from './pages'
import './App.css'

class BooksApp extends React.Component {
  state = {
     bookshelfs: [] 
  }

  setBookshelfs = () => {
    BooksAPI.getAll() 
    .then(res => {
      let currReadingBooks = res.filter((book) => { 
        return book.shelf === 'currentlyReading'
      })
      let wtToReadBooks = res.filter((book) => {
        return book.shelf === 'wantToRead'
      })
      let readBooks = res.filter((book) => {
        return book.shelf === 'read'
      })

      this.setState({
        bookshelfs: [
          {
            shelfTitle: 'Currently Reading',
            books: [...currReadingBooks]  
          },
          {
            shelfTitle: 'Want to Read',
            books: [...wtToReadBooks]
          },
          {
            shelfTitle: 'Read',
            books: [...readBooks]
          }
        ]
      })

    })
    .catch(err => console.log(err))
  }

  changeBookshelf = (book, bookshelfTo) => {
    BooksAPI.update(book, bookshelfTo) 
    .then(() => {
      return this.setBookshelfs()
    })
  }

  componentDidMount(){
    return this.setBookshelfs()
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path='/' render={() => (
            <MainPage bookshelfs={this.state.bookshelfs} changeBookshelf={this.changeBookshelf}/>
          )} />
          <Route path='/search' component={() => <SearchPage changeBookshelf={this.changeBookshelf} bookshelfs={this.state.bookshelfs}/>} />
        </div>
      </Router>
    )
  }
}

export default BooksApp
