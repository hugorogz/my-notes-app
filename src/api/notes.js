import { notesEndpoint, userAId } from "../utils";

export const GetNotesByUserId = async (setNotes, setIsLoading) => {
    try {
        // hardcoded fetching for UserA for now, to simulate fetching of UserA Notes
        const response = await fetch(`${notesEndpoint}${userAId}`);

        if (!response.ok) {
            throw new Error('Failed to fetch notes')
        }

        const data = await response.json();
        setNotes(data);
    } catch (err) {
        console.error(`Error fetching the Notes: ${err}`)
    } finally {
        setIsLoading(false);
    }
}