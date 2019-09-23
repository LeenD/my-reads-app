import React from 'react'

const BookshelfsContainer = props => {
  return (
    <div className="list-books-content">
      <div>
        {
          props.bookshelfs.map(bookshelf => {
            return <div key={bookshelf.shelfTitle} className="bookshelf">
                    <h2 className="bookshelf-title">{bookshelf.shelfTitle}</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {
                          bookshelf.books.map(book => {
                            return <li key={book.title}>
                                    <div className="book">
                                      <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                        <div className="book-shelf-changer">
                                          <select value={bookshelf.shelfTitle} onChange={(e) => {


                                            if (e.target.value !== bookshelf.shelfTitle) {
                                              if (e.target.value !== 'None') {
                                                let bookshelf = ''

                                                e.target.value === 'Currently Reading' 
                                                ? bookshelf = 'currentlyReading'
                                                : e.target.value === 'Want to Read'
                                                  ? bookshelf = 'wantToRead'
                                                  : bookshelf = 'read'

                                                props.changeBookshelf(book, bookshelf)
                                              } else {
                                                props.changeBookshelf(book, 'none') 
                                              }
                                            }
                                          }}>
                                            <option value="initial" disabled>Move to...</option>
                                            <option>Currently Reading</option>
                                            <option>Want to Read</option>
                                            <option>Read</option>
                                            <option>None</option>
                                          </select>
                                        </div>
                                      </div>
                                      <div className="book-title">{book.title}</div>
                                      {
                                        book.authors
                                        ? book.authors.map(author => <div key={Math.random().toString(36).substr(-8)} className="book-authors">{author}</div>)
                                        : null
                                      }
                                    </div>
                                  </li>
                          })
                        }
                      </ol>
                    </div>
                  </div>
          })
        }
      </div>
    </div>
  )
}

export default BookshelfsContainer
