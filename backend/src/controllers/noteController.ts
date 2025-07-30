import { Request, Response } from "express";
import Note from "../models/Note";

export const getNotes = async (req: any, res: Response) => {
  const notes = await Note.find({ userId: req.user.id });
  res.json(notes);
};

export const createNote = async (req: any, res: Response) => {
  const { title, content } = req.body;
  const note = await Note.create({ title, content, userId: req.user.id });
  res.json(note);
};

export const deleteNote = async (req: any, res: Response) => {
  await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: "Note deleted" });
};
