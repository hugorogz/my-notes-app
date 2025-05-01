import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NotesGrid from '../src/components/NotesGrid';
import { Note } from '../src/utils';

const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Note 1',
    description: '<p>Description 1</p>',
    created_at: new Date().toISOString(),
    updated_at: null,
  },
  {
    id: '2',
    title: 'Note 2',
    description: '<p>Description 2</p>',
    created_at: new Date().toISOString(),
    updated_at: null,
  },
];

const handleEdit = jest.fn();
const handleDelete = jest.fn();
const setEditNoteId = jest.fn();

describe('NotesGrid', () => {
  it('renders all notes', () => {
    render(
      <NotesGrid
        notes={mockNotes}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        editNoteId={null}
        setEditNoteId={setEditNoteId}
      />
    );

    expect(screen.getByText('Note 1')).toBeInTheDocument();
    expect(screen.getByText('Note 2')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  it('disables edit and delete buttons when editNoteId is not null', () => {
    render(
      <NotesGrid
        notes={mockNotes}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        editNoteId={'1'}
        setEditNoteId={setEditNoteId}
      />
    );

    const editButtons = screen.getAllByText('Edit');
    const deleteButtons = screen.getAllByText('Delete');

    editButtons.forEach((btn) => expect(btn).toBeDisabled());
    deleteButtons.forEach((btn) => expect(btn).toBeDisabled());
  });

  it('calls setEditNoteId and opens DeleteNoteConfirm on delete click', () => {
    render(
      <NotesGrid
        notes={mockNotes}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        editNoteId={null}
        setEditNoteId={setEditNoteId}
      />
    );

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    expect(setEditNoteId).toHaveBeenCalledWith('1');
  });

  it('calls handleEdit when clicking edit', () => {
    render(
      <NotesGrid
        notes={mockNotes}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        editNoteId={null}
        setEditNoteId={setEditNoteId}
      />
    );

    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);

    expect(handleEdit).toHaveBeenCalledWith(mockNotes[0]);
  });
});
