import EditablePage from './components/editable-page';

export function App() {
  return (
    <>
      <h1 className="Logo">Mini notion</h1>
      <p className="Intro">
        Hello{" "}
        <span role="img" aria-label="greetings" className="Emoji">
        👋
      </span>{" "}
        You can add content below. Type <span className="Code">/</span> to see
        available elements.
      </p>
      <EditablePage />
    </>
  );
}

export default App;
