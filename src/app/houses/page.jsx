import Houses from "@/components/houses";

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const currentPage = parseInt(params.page) || 1;
  const searchTerm = params.search || "";

  const fetchData = async () => {
    try {
      const url = searchTerm
        ? `https://potterapi-fedeperin.vercel.app/en/houses?search=${searchTerm}`
        : "https://potterapi-fedeperin.vercel.app/en/houses";

      const response = await fetch(url);
      const data = await response.json();

      const totalPages = Math.ceil(data?.length / 8) || 1;
      const startIndex = (currentPage - 1) * 8;
      const endIndex = startIndex + 8;

      return {
        totalPages,
        houses: data.slice(startIndex, endIndex),
      };
    } catch (error) {
      console.log("Error fetching houses:", error);
      return { totalPages: 1, houses: [] };
    }
  };

  const { totalPages, houses } = await fetchData();

  return (
    <>
      <Houses
        houses={houses}
        totalPages={totalPages}
        currentPage={currentPage}
        searchTerm={searchTerm}
      />
    </>
  );
}
