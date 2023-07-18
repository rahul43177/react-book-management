import { create } from "json-server";
import { createContext ,useState } from "react";
import axios from 'react'
const BooksContext = createContext()

function Provider({children }) {
    const [books , setBooks] = useState([]) 

    const fetchBooks = async function() {
        const response = await axios.get('http://localhost:3001/books')
        setBooks(response.data)
    } 
    const editBookById = async (id , newTitle) =>{
        const response = await axios.put(`http://localhost:3001/books/${id}` , {
            title : newTitle
        })

        const updatedBooks = books.map((book)=>{
            if(book.id === id) {
                return {...book , ...response.data}
            }
        })
        setBooks(updatedBooks)
    }

    const deleteBookById = async (id) =>{
         await axios.delete(`http://localhost:3000/book/${id}`)
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
    const valueToShare = {
        books:books , 
        deleteBookById : deleteBookById ,
        editBookById : editBookById ,
        createBook : createBook ,
        fetchBooks : fetchBooks
    }


    return <BooksContext.Provider value ={valueToShare} >
        {children}
    </BooksContext.Provider>
}
export {Provider }
export default BooksContext;
