import Link from "next/link";
import Pagination from "./pagination";
import Search from "./search";

export default function Characters({ characters, totalPages, currentPage, searchTerm }) {
  const hasCharacters = characters && characters.length > 0;

  return (
    <main className="max-w-7xl mx-auto py-20 px-6 lg:px-8">
      <div className="flex max-sm:flex-col justify-between items-center mb-4">
        <h1 className="title">Characters</h1>

        <Search placeholder="Search characters..." initialSearchTerm={searchTerm} />
      </div>

      {!hasCharacters && (
        <p className="text-gray-600 text-center">No characters found.</p>
      )}

      {hasCharacters && (
        <div className="card-grid">
          {characters.map((character) => (
            <div
              key={character.index}
              className="card min-h-40 flex flex-col justify-between"
            >
              <h1 className="card-title truncate">{character.fullName}</h1>

              <p className="text-gray-600 mb-8">
                <span className="font-medium">Nickname:</span>{" "}
                {character.nickname}
              </p>

              <Link
                href={`/characters/${character.index}`}
                className="bg-blue-500 rounded-xl p-2 text-center w-full mt-auto text-white"
              >
                Details
              </Link>
            </div>
          ))}
        </div>
      )}

      {hasCharacters && (
        <Pagination totalPages={totalPages} currentPage={currentPage} searchTerm={searchTerm} />
      )}
    </main>
  );
}
