import {db} from "@/db";
import {notes} from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { updateNote } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function EditNote({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const [note] = await db.select().from(notes).where(eq(notes.id, Number(id)));

    if (!note) {
        notFound();
    }

    return (
        <main>
            <h1>Edit Note</h1>
            <form action={updateNote}>
                <input type="hidden" name="id" value={note.id} />
                <input name="title" defaultValue={note.title} required />
                <textarea name="body" defaultValue={note.body} required />
                <button type="submit">Save</button>
            </form>
        </main>
    );
}
