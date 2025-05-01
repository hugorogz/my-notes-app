import React from "react";
import { render, screen } from "@testing-library/react";
import NoteForm from "../src/components/NoteForm";

const mockNotes = [
  {
    id: '1',
    title: 'Sample Note 1',
    description: 'sample 1',
    content: '<p>Hello world 1</p>',
    updatedAt: '2025-05-01',
  },
  {
    id: '2',
    title: 'Sample Note 2',
    description: 'sample 2',
    content: '<p>Hello world2 </p>',
    updatedAt: '2025-04-30',
  }
];

test("renders editor with edit content", () => {
  render(
    <NoteForm
      title={mockNotes[0].title}
      description={mockNotes[0].description} 
      onTitleChange={() => {}} 
      onDescriptionChange={() => {}} 
      onSave={() => {}} 
      setEditNoteId={() => {}}
      editNoteId={mockNotes[0].id} 
    />
  );
  const title = screen.getByDisplayValue("Sample Note 1");
  const description = screen.getAllByText("sample 1");

  expect(description[0].textContent).toContain("sample 1");
  expect(title).toHaveValue("Sample Note 1");
});
