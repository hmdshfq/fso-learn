const NotesForm = ({addNote, note, setNote}) => {
    return (
        <form onSubmit={addNote}>
            <label htmlFor="add-note">
                <strong>Add note</strong>{" "}
            </label>
            <br />
            <input
                id="add-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />
            <br />
            <button type="submit">Submit</button>
        </form>
    )
}

export default NotesForm