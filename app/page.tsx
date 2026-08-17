import { db } from "@/db";
import { notes } from "@/db/schema";

export default async function Home() {
  const allNotes = await db.select().from(notes);

  return (
    <main>
      <h1>Notes Library</h1>
      <p>Welcome to the Notes Library!</p>
      <p>{allNotes.length} notes in the library.</p>
    </main>
  );
}
