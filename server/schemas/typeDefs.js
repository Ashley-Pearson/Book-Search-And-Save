const { gql } = require('apollo-server-express');

const typeDefs = gql`
 type User {
    _id: ID!
    name: String! 
    email: String
    savedBooks: [Book]!  
    bookCount: Int 
 }
 type Book {
    bookId: ID!
    title: String
    authors: String
    image: String
    description: String
    link: String!
 }

 type Auth {
    token: ID!
    user: User
    }

 type Query {
    users: [User]
    user(userId: ID!): User
    books: [Books]
     }
 
 type Mutation {
    saveBook(book: SaveBookInput): User
    removeBook(boodId: String!) User
    login(email: String!, password: String!): Auth
    addUser(username: String!, email String!, password: String!): Auth
 }
 `;

 module.exports = typeDefs;
