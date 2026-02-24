import Houses from "@/components/houses";

export default async function Page({ searchParams }) {
  const currentPage = (await searchParams).page;

  const totalPages = async () => {
    try {
      const response = await fetch(
        "https://potterapi-fedeperin.vercel.app/en/houses",
      );
      const data = await response.json();
      return Math.ceil(data.length / 8);
    } catch (error) {
      console.log(error);
    }
  };

  const initialHouses = async () => {
    try {
      const response = await fetch(
        `https://potterapi-fedeperin.vercel.app/en/houses?max=8&page=${currentPage || 1}`,
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-20">
      <h1 className="title">Houses</h1>
      <Houses
        initialHouses={await initialHouses()}
        totalPages={await totalPages()}
        currentPage={parseInt(currentPage)}
      />
    </div>
  );
}
