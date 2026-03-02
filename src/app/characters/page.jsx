import Characters from "@/components/characters";

export default async function Page({ searchParams }) {
  const currentPage = (await searchParams).page;

  const totalPages = async () => {
    try {
      const response = await fetch(
        "https://potterapi-fedeperin.vercel.app/en/characters",
      );
      const data = await response.json();
      return Math.ceil(data.length / 8);
    } catch (error) {
      console.log(error);
    }
  };

  const initialCharacters = async () => {
    try {
      const response = await fetch(
        `https://potterapi-fedeperin.vercel.app/en/characters?max=8&page=${currentPage || 1}`,
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="max-w-7xl mx-auto py-20 px-6 lg:px-8">
      <h1 className="title">Characters</h1>
      <Characters
        initialCharacters={await initialCharacters()}
        totalPages={await totalPages()}
        currentPage={parseInt(currentPage)}
      />
    </main>
  );
}
