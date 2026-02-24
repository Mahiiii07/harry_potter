import Books from "@/components/books";

export default async function Page({ searchParams }) {
  const currentPage = (await searchParams).page;

  const totalPages = async () => {
    try {
      const response = await fetch(
        "https://potterapi-fedeperin.vercel.app/en/books",
      );
      const data = await response.json();
      return Math.ceil(data.length / 8);
    } catch (error) {
      console.log(error);
    }
  };

  const initialBooks = async () => {
    try {
      const response = await fetch(
        `https://potterapi-fedeperin.vercel.app/en/books?max=8&page=${currentPage || 1}`,
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-20">
      <h1 className="title">Books</h1>
      <Books
        initialBooks={await initialBooks()}
        totalPages={await totalPages()}
        currentPage={parseInt(currentPage)}
      />
    </div>
  );
}
