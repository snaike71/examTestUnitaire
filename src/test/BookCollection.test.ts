import { BookCollection } from "../app/BookCollection";

describe("BookCollection", () => {
    let bookCollection: BookCollection;
    const mockBook = { id: 1, author: "Gille Marc", title: "Dune",avaible: true, rate:2 }
    beforeEach(() => {
        bookCollection = new BookCollection();
    })
    test("add a new book", () => {
        bookCollection.addBook(mockBook)
        expect(bookCollection.getAllBooks()).toContainEqual(mockBook)
    })
    test("throws error when adding a book with an existing id", () => {
        bookCollection.addBook(mockBook)
        expect(() => bookCollection.addBook(mockBook)).toThrow("Book ID already exists")
    })
    test("throws error when adding a book with an existing title", () => {
        bookCollection.addBook(mockBook)
        const mockBookSameTitle = {
            id: 2,
            author: "Gille Marc",
            title: "Dune",
            avaible: true,
            rate:2
        }
        expect(() => bookCollection.addBook(mockBookSameTitle)).toThrow("Book title already exists")
    })
    test("removes a book", () => {
        bookCollection.addBook(mockBook);
        bookCollection.removeBookByTitle(mockBook.title);
        expect(bookCollection.findBookByTitle(mockBook.title)).toBeUndefined();
    });
    test("finds a book by title", () => {
        bookCollection.addBook(mockBook);
        expect(bookCollection.findBookByTitle(mockBook.title)).toEqual(mockBook);
    });
    test("this book doesn't exists",()=>{
        expect(bookCollection.findBookByTitle("Dune")).toBeUndefined();
    })
    test("finds a book by author", () => {
        bookCollection.addBook(mockBook);
        expect(bookCollection.findBookByAuthor(mockBook.author)).toEqual(mockBook);
    });
    test("borrow book by title",()=>{
        bookCollection.addBook(mockBook);
        expect(bookCollection.borrowBookByTitle(mockBook.title).avaible).toBeFalsy();
    })
    test("throws error when borrow a book with bad title", () => {
        bookCollection.addBook(mockBook)
        expect(() => bookCollection.borrowBookByTitle("DU")).toThrow("book doesn't exist")
    })
    test("throws error when borrow a book with already borrow", () => {
        const mockBook = { id: 1, author: "Gille Marc", title: "Dune",avaible: false, rate:2 }
        bookCollection.addBook(mockBook)
        expect(() => bookCollection.borrowBookByTitle(mockBook.title)).toThrow("book already borrow")
    })
    test("return book by title",()=>{
        bookCollection.addBook(mockBook);
        expect(bookCollection.returnBookByTitle(mockBook.title).avaible).toBeTruthy();
    })
    test("throws error when return a book with bad title", () => {
        bookCollection.addBook(mockBook)
        expect(() => bookCollection.returnBookByTitle("DU")).toThrow("book doesn't exist")
    })
    test("throws error when return a book with already return", () => {
        const mockBook = { id: 1, author: "Gille Marc", title: "Dune",avaible: true, rate:2 }
        bookCollection.addBook(mockBook)
        expect(() => bookCollection.returnBookByTitle(mockBook.title)).toThrow("book already return")
    })
    test("get books By best rate",()=>{
        bookCollection.addBook(mockBook);
        const mockBook2 = { id: 2, author: "Gille Myarc", title: "DAne",avaible: true, rate:1 }
        bookCollection.addBook(mockBook2);
        expect(bookCollection.getBookByBestRate()).toContain(mockBook)
    })
    test("get books rate without book rate",()=>{
        expect(bookCollection.getBookByBestRate()).toBeUndefined()
    })



})
const getAveragePrice = require('../app/BookService');


jest.mock('../app/BookService', () => jest.fn().mockReturnValue(20));


describe('mock test', () => {
    let bookCollection: BookCollection;
    const mockBook = { id: 1, author: "Gille Marc", title: "Dune",avaible: true }
    beforeEach(() => {
        bookCollection = new BookCollection();
    })
    
    test('should use the mocked value of getAveragePrice', () => {
        expect(getAveragePrice(mockBook.title,"FR")).toBe(20) 
    });

    test("getaverage",()=>{
        expect(getAveragePrice()).toEqual(20)
    })


});