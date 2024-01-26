import { BookCollection } from "../app/BookCollection";

describe("BookCollection", () => {
    let bookCollection: BookCollection;
    const mockBook = { id: 1, author: "Gille Marc", title: "Dune" }
    beforeEach(() => {
        bookCollection = new BookCollection();
    })
    test("add a new book", () => {
        bookCollection.addBook(mockBook)
        expect(bookCollection.getAllBooks()).toContainEqual(mockBook)
    })
    test("book with an existing id", () => {
        bookCollection.addBook(mockBook)
        expect(() => bookCollection.addBook(mockBook)).toThrow("Book ID already exists")
    })
    test("book with an existing title", () => {
        bookCollection.addBook(mockBook)
        const mockBookSameTitle = {
            id: 2,
            author: "Gille Marc",
            title: "Dune"
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


})
