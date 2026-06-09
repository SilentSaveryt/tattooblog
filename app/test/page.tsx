import { supabase } from "@/lib/supabase";

export default async function TestPage() {
  const { data, error } = await supabase
    .from("articles")
    .select("*");

  return (
    <main className="p-10">
      <h1>Supabase Test</h1>

      <h2>Error:</h2>
      <pre>{JSON.stringify(error, null, 2)}</pre>

      <h2>Data:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}