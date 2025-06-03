import { useState, useEffect } from "react";
import { db } from "../client/databases";
import { Layout } from "../components";
import { Note } from "../components";
// import { databases, collections } from "../client/appwrite";

export const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const response = await db.notes.list();
    setNotes(response.documents);
  };

  return (
    <Layout>
      {notes.map((note) => (
        <Note key={note.$id} note={note} />
      ))}
    </Layout>
  );
};
