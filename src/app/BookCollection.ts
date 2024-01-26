type Book = {
    id: number;
    title: string;
    author: string;
}

export class BookCollection {
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
    findBookByTitle(title: string): Book| undefined  {
        const result = this.books.find((u) => u.title === title)
        return result;
    }
    findBookByAuthor(author: string): Book | undefined {
        return this.books.find((book) => book.author === author);
    }
    getAllBooks(): Book[] {
        return this.books;
    }
}