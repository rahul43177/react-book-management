import {useState , useEffect} from 'react'
import BookCreate from './components/BookCreate'
import BookList from './components/BookList'
import axios from 'axios'
function App() {
    const [books , setBooks] = useState([]) 

    const fetchBooks = async function() {
        const response = await axios.get('http://localhost:3001/books')
        setBooks(response.data)
    } 

    useEffect(()=>{
        fetchBooks()
    },[])
    

    const editBookById = (id , newTitle) =>{
        const updateBooks = books.map((book)=>{
            if(book.id === id) {
                return {...book , title : newTitle}
            }
            return book
        })
        setBooks(updateBooks)
    }

    const deleteBookById = (id) =>{
        const updatedBooks = books.filter((book)=>{
            return (book.id !== id)
        })
        setBooks(updatedBooks)
    }


    const createBook = async (title) => {
        // const updatedBooks = [...books , { id : Math.round(Math.random()*999), title: title}]
        // setBooks(updatedBooks)
        const response = await axios.post('http://localhost:3001/books' , {
            title : title
        })
        const updatedBooks = [...books , response.data]

        setBooks(updatedBooks)
    }


   return (
   <div className='app'>
        <h1>Reading List</h1>
        <BookList onEdit= {editBookById} books = {books}  onDelete={deleteBookById}/>
        <BookCreate onCreate = {createBook}/>
    </div>
   )
}

export default App