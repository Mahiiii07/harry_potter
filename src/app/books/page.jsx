import Books from "@/components/books";

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const currentPage = parseInt(params.page) || 1;
  const searchTerm = params.search || "";

  const fetchData = async () => {
    try {
      const url = searchTerm
        ? `https://potterapi-fedeperin.vercel.app/en/books?search=${searchTerm}`
        : "https://potterapi-fedeperin.vercel.app/en/books";

      const response = await fetch(url);
      const data = await response.json();

      const startIndex = (currentPage - 1) * 8;
      const endIndex = startIndex + 8;

      return {
        totalPages: Math.ceil(data?.length / 8) || 1,
        books: data.slice(startIndex, endIndex),
      };
    } catch (error) {
      console.log("Error fetching Books:", error);
      return { totalPages: 1, books: [] };
    }
  };

  const { totalPages, books } = await fetchData();

  return (
    <>
      <Books
        books={books}
        totalPages={totalPages}
        currentPage={currentPage}
        searchTerm={searchTerm}
      />
    </>
  );
}
