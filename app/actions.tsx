"use server";

import { db } from "@/db";
import { notes } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function createNote(formData: FormData) {
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;

    if(!title?.trim() || !body?.trim()) return;

    await db.insert(notes).values({ title, body });
    revalidatePath("/");
}

export async function deleteNote(formData: FormData) {
    const id = Number(formData.get("id"));
    if(!id) return;

    await db.delete(notes).where(eq(notes.id, id));
    revalidatePath("/");
}

export async function updateNote(formData: FormData) {
    const id = Number(formData.get("id"));
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;

    if(!id || !title?.trim() || !body?.trim()) return;
    
    await db.update(notes).set({ title, body, updatedAt: new Date() }).where(eq(notes.id, id));
    revalidatePath("/");
    redirect("/");
}