import { notesEndpoint } from "../utils";

export const fetchNotes = async (setNotes) => {
    try {
      const response = await fetch(notesEndpoint);

      if (!response.ok) {
        throw new Error('Failed to fetch notes')
      }

      const data = await response.text()
      setNotes(JSON.parse(data));
    } catch (err) {
      console.error(`Error fetching the Notes: ${err}`)
    }
}