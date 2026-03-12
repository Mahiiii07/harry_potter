import Link from "next/link";
import Pagination from "./pagination";
import Search from "./search";

export default function Spells({ spells, totalPages, currentPage, searchTerm }) {
  const hasSpells = spells && spells.length > 0;

  return (
    <main className="max-w-7xl mx-auto py-20 px-6 lg:px-8 ">
      <div className="flex max-sm:flex-col justify-between items-center mb-4">
        <h1 className="title">Spells</h1>
        <Search placeholder="Search Spells..." initialSearchTerm={searchTerm} />
      </div>

      {!hasSpells && (
        <p className="text-gray-600 text-center ">No spells found.</p>
      )}

      {hasSpells && (
        <div className="card-grid">
          {spells.map((spell, i) => {
            return (
              <div
                key={i}
                className="card min-h-40 flex flex-col justify-between"
              >
                <div>
                  <h1 className="card-title truncate">{spell.spell}</h1>
                  <p className="text-gray-600 mb-8 truncate">
                    <span className="font-medium">Use:</span> {spell.use}
                  </p>
                </div>
                <Link
                  href={`/spells/${spell.index}`}
                  className="bg-blue-500 rounded-xl p-2 text-center w-full text-white"
                >
                  Details
                </Link>
              </div>
            );
          })}
        </div>
      )}

      {hasSpells && (
        <Pagination totalPages={totalPages} currentPage={currentPage} searchTerm={searchTerm} />
      )}
    </main>
  );
}
