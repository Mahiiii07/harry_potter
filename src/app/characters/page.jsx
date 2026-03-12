import Characters from "@/components/characters";

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const currentPage = parseInt(params.page) || 1;
  const searchTerm = params.search || "";

  const fetchData = async () => {
    try {
      const url = searchTerm
        ? `https://potterapi-fedeperin.vercel.app/en/characters?search=${searchTerm}`
        : "https://potterapi-fedeperin.vercel.app/en/characters";

      const response = await fetch(url);
      const data = await response.json();

      const totalPages = Math.ceil(data?.length / 8) || 1;
      const startIndex = (currentPage - 1) * 8;
      const endIndex = startIndex + 8;

      return {
        totalPages,
        characters: data.slice(startIndex, endIndex),
      };
    } catch (error) {
      console.log("Error fetching characters:", error);
      return { totalPages: 1, characters: [] };
    }
  };

  const { totalPages, characters } = await fetchData();

  return (
    <>
      <Characters
        characters={characters}
        totalPages={totalPages}
        currentPage={currentPage}
        searchTerm={searchTerm}
      />
    </>
  );
}
