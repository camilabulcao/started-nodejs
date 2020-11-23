
const express = require('express');
const bodyParser = require('body-parser');
const { request, response } = require('express');

const app = express();

app.use(bodyParser.json());

const PORT = 8080


/*app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","*");
    res.header("Access-Control-Allow-Methods","*");
    next();

});*/

app.listen(PORT, function(){
    console.log('Servidor funcionando: hello')
})

const books = [
  {
  name: 'Harry Potter',
  author:' JK ',
  id: 1

} ]

const listBooks = (request, response) =>{
  
  return response.status(200).send(books)
}

const createBook = (request, response) =>{
  const book = request.body
  console.log('BOOK', book)
  books.push(book)
  if(book.name && book.author && book.id){
    return response.status(201).send({ message: 'Livro Cadastrado com Sucesso!' })
  }else{
    return reponse.status(400).send({ message: 'Falta enviar o body corretamente'})
  }

}
const deleteBook = (request, response)=> {
  const id = request.params.id;
  let isFoundBook = false;
  if(books.length >0){
  books.find((book, index)=>{ //vai verificar se books tem valor
    if(book.id == id){
        isFoundBook = true
        books.splice(index,1)
    }
  })
  if(isFoundBook){
    return response.status(201).send({ message: "Livro deletado com sucesso!"})
  }else{
    return response.status(400).send({ message: "Livro não encontrado"})
  }
}
const updateBook = (request, response) =>{
  const id = request.params.id
  if(id){
    return response.status(201).send({ message: "Livro atualizado com sucesso!"})
  }else{
    return response.status(400).send({ message: "Não foi possível atualizar o registro!"})
  }
}
}
app.get('/book',listBooks)

app.post('/book', createBook)

app.delete('/book/:id', deleteBook) //vai receber o id pela url pela deletar

app.put('/book/:id', updateBook)