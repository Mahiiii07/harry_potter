import Characters from "@/components/characters";

export default async function Page({ searchParams }) {
  const currentPage = (await searchParams).page;
  const totalPages = async () => {
    try {
      const response = await fetch(
        "https://potterapi-fedeperin.vercel.app/en/characters",
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
    <>
      <Characters initialCharacters={data[1]} initialTotalPages={data[0]} />
    </>
  );
}
