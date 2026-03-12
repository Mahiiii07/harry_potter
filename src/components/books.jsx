import Link from "next/link";
import Pagination from "./pagination";
import Search from "./search";

export default function Books({ books, totalPages, currentPage, searchTerm }) {
  const hasBooks = books && books.length > 0;

  return (
    <main className="max-w-7xl mx-auto py-20 px-6 lg:px-8">
      <div className="flex max-sm:flex-col justify-between items-center mb-4">
        <h1 className="title">Books</h1>

        <Search placeholder="Search Books..." initialSearchTerm={searchTerm} />
      </div>

      {!hasBooks && (
        <p className="text-gray-600 text-center">No books found.</p>
      )}

      {hasBooks && (
        <div className="card-grid">
          {books.map((book, i) => {
            return (
              <div
                key={i}
                className="card min-h-40 flex flex-col justify-between"
              >
                <h1 className="card-title truncate">{book.title}</h1>
                <p className="text-gray-600 mb-8">
                  <span className="font-medium">Release Date:</span>{" "}
                  {book.releaseDate}
                </p>
                <Link
                  href={`/books/${book.index}`}
                  className="bg-blue-500 rounded-xl p-2 text-center w-full mt-auto text-white"
                >
                  Details
                </Link>
              </div>
            );
          })}
        </div>
      )}

      {hasBooks &&
        hasBooks.length>8 &&(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          searchTerm={searchTerm}
        />
      )}
    </main>
  );
}
