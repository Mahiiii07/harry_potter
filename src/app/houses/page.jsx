import Houses from "@/components/houses";

export default async function Page({ searchParams }) {
  const currentPage = (await searchParams).page;

  const totalPages = async () => {
    try {
      const response = await fetch(
        "https://potterapi-fedeperin.vercel.app/en/houses",
      );
      const data = await response.json();
      const endIndex = currentPage * 8;
      const startIndex = endIndex - 8;
      return [Math.ceil(data.length / 8), data.slice(startIndex, endIndex)];
    } catch (error) {
      console.log(error);
    }
  };

  const data = await totalPages();

  return (
    <main className="max-w-7xl mx-auto py-20 px-6 lg:px-8">
      <h1 className="title">Houses</h1>
      <Houses initialHouses={data[1]} totalPages={data[0]} />
    </main>
  );
}
