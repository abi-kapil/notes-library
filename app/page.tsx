import { db } from "@/db";
import { notes } from "@/db/schema";
import { createNote, deleteNote } from "./actions";

export const dynamic = "force-dynamic";

export default async function Home() {
  const allNotes = await db.select().from(notes);

  return (
    <main>
      <h1>Notes Library</h1>
      {allNotes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <ul>
          {allNotes.map((note) => (
            <li key={note.id}>
              <h2>{note.id}. <b>{note.title}</b> - {note.body}</h2>
              <form action={deleteNote}>
                <input type="hidden" name="id" value={note.id} />
                <button type="submit">Delete</button>
              </form>
              <a href={`/notes/${note.id}`}>Edit</a>
            </li>
          ))}
        </ul>
      )}
      <form action = {createNote}>
        <input name="title" placeholder="Title" required/>
        <textarea name="body" placeholder="Body" required/>
        <button type="submit">Create Note</button>
      </form>
    </main>
  );
}
