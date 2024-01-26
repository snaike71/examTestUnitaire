type Book = {
    id: number;
    title: string;
    author: string;
    avaible: boolean;
    rate: number
}
interface IBookCollection {
    addBook(book: Book): void;
    removeBookByTitle(title: string): void;
    findBookByTitle(title: string): Book | undefined;
    findBookByAuthor(author: string): Book | undefined;
    getAllBooks(): Book[];
}
export class BookCollection implements IBookCollection {
    private books: Book[] = [];

    addBook(book: Book): void {
        if (this.books.some((u) => u.id === book.id)) {
            throw new Error("Book ID already exists");
        }
        if (this.books.some((u) => u.title === book.title)) {
            throw new Error("Book title already exists");
        }
        this.books.push(book);
    }
    removeBookByTitle(title: string): void {
        this.books = this.books.filter((book) => book.title !== title);
    }
    findBookByTitle(title: string): Book | undefined {
        const result = this.books.find((u) => u.title === title)
        return result;
    }
    findBookByAuthor(author: string): Book | undefined {
        return this.books.find((book) => book.author === author);
    }
    getAllBooks(): Book[] {
        return this.books;
    }
    borrowBookByTitle(title: string): Book {
        let bookBorrow = this.books.find((u) => u.title === title)
        if (!bookBorrow) {
            throw new Error("book doesn't exist")
        }
        else if (bookBorrow.avaible===false) {
            throw new Error("book already borrow")
        }
        bookBorrow.avaible = false
        return bookBorrow
    }
    returnBookByTitle(title:string): Book{
        let bookReturn = this.findBookByTitle(title)
        if (!bookReturn) {
            throw new Error("book doesn't exist")
        }
        if(bookReturn.avaible===true){
            throw new Error("book already return")
        }
        bookReturn.avaible = true
        return bookReturn
    }
    getBookByBestRate(): Book[] | undefined {
        const highestRating = Math.max(...this.books.map(book => book.rate?? 0));

        if (highestRating === 0) return undefined;

        return this.books.filter(book => book.rate === highestRating);
    }
}