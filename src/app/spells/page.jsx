import Spells from "@/components/spells";

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const currentPage = parseInt(params.page) || 1;
  const searchTerm = params.search || "";

  const fetchData = async () => {
    try {
      const url = searchTerm
        ? `https://potterapi-fedeperin.vercel.app/en/spells?search=${searchTerm}`
        : "https://potterapi-fedeperin.vercel.app/en/spells";

      const response = await fetch(url);
      const data = await response.json();

      const totalPages = Math.ceil(data?.length / 8) || 1;
      const startIndex = (currentPage - 1) * 8;
      const endIndex = startIndex + 8;

      return {
        totalPages,
        spells: data.slice(startIndex, endIndex),
      };
    } catch (error) {
      console.log("Error fetching spells:", error);
      return { totalPages: 1, spells: [] };
    }
  };

  const { totalPages, spells } = await fetchData();

  return (
    <>
      <Spells
        spells={spells}
        totalPages={totalPages}
        currentPage={currentPage}
        searchTerm={searchTerm}
      />
    </>
  );
}
