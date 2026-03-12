import Link from "next/link";
import Pagination from "./pagination";
import Search from "./search";

export default function Houses({
  houses,
  totalPages,
  currentPage,
  searchTerm,
}) {
  const hasHouses = houses && houses.length > 0;

  return (
    <main className="max-w-7xl mx-auto py-20 px-6 lg:px-8">
      <div className="flex max-sm:flex-col justify-between items-center mb-4">
        <h1 className="title">Houses</h1>

        <Search placeholder="Search houses..." initialSearchTerm={searchTerm} />
      </div>

      {!hasHouses && (
        <p className="text-gray-600 text-center">No houses found.</p>
      )}

      {hasHouses && (
        <div className="card-grid">
          {houses.map((house, i) => {
            return (
              <div
                key={i}
                className="card min-h-40 flex flex-col justify-between"
              >
                <h1 className="card-title">{house.house}</h1>
                <p className="text-gray-600 mb-8">
                  <span className="font-medium">Emoji:</span> {house.emoji}
                </p>
                <Link
                  href={`/houses/${house.index}`}
                  className="bg-blue-500 rounded-xl p-2 text-center w-full mt-auto text-white"
                >
                  Details
                </Link>
              </div>
            );
          })}
        </div>
      )}

      {hasHouses && hasHouses.length > 8 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          searchTerm={searchTerm}
        />
      )}
    </main>
  );
}
