const knex = require('./knex');

const insertBook = (book) => {
    return knex("books").insert(book);
}

const showBooks = () => {
    return knex("books").select("*");
}

const showBook = (id) => {
    return knex("books").select("*").where("id",id);
}

const updateBook = (id, book) => {
    return knex("books").where("id",id).update(book);
}

const deleteBook = (id) => {
    return knex("books").where("id",id).del();
}

module.exports = {
    insertBook,
    showBooks,
    showBook,
    updateBook,
    deleteBook
}