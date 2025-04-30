import { v4 as uuidv4 } from 'uuid';

export interface Note {
  id: string;
  title: string;
  description: string;
};
export const testNotes = [
  {
    id: uuidv4(),
    title: "Lorem Ipsum Dolor",
    description: "<p><strong>Lorem</strong> ipsum dolor sit amet, <em>consectetur</em> adipiscing elit.</p>"
  },
  {
    id: uuidv4(),
    title: "Sed Do Eiusmod",
    description: "<p>Sed do eiusmod <u>tempor incididunt</u> ut labore et dolore magna aliqua.</p>"
  },
  {
    id: uuidv4(),
    title: "Ut Enim Ad Minim",
    description: "<p>Ut enim ad <strong>minim veniam</strong>, quis nostrud exercitation ullamco.</p>"
  },
  {
    id: uuidv4(),
    title: "Laboris Nisi Ut",
    description: "<p>Laboris nisi ut aliquip <span style='color: blue;'>ex ea commodo</span> consequat.</p>"
  },
  {
    id: uuidv4(),
    title: "Duis Aute Irure",
    description: "<p>Duis aute irure dolor in <em>reprehenderit</em> in voluptate velit esse cillum.</p>"
  },
  {
    id: uuidv4(),
    title: "Fugiat Nulla Pariatur",
    description: "<p>Fugiat nulla pariatur. Excepteur <u>sint occaecat</u> cupidatat non proident.</p>"
  },
  {
    id: uuidv4(),
    title: "Sunt In Culpa",
    description: "<p>Sunt in culpa qui officia <strong>deserunt mollit</strong> anim id est laborum.</p>"
  },
  {
    id: uuidv4(),
    title: "Curabitur Non Nulla",
    description: "<p>Curabitur non nulla sit amet <em>nisl tempus</em> convallis quis ac lectus.</p>"
  },
  {
    id: uuidv4(),
    title: "Vivamus Magna",
    description: "<p>Vivamus magna justo, lacinia eget <span style='color: green;'>consectetur sed</span>, convallis at tellus.</p>"
  },
  {
    id: uuidv4(),
    title: "Donec Rutrum",
    description: "<p>Donec rutrum congue leo eget <strong>malesuada</strong>.</p>"
  }
]