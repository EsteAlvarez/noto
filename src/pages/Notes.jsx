import { Layout } from "../components";
import { ExampleData as notes } from "../mocks/ExampleData";
import { Note } from "../components";

export const Notes = () => {
  return (
    <Layout>
      {notes.map((note) => (
        <Note key={note.$id} note={note} />
      ))}
    </Layout>
  );
};
