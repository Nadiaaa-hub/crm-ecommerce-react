import "../../styles/PlaceholderPage.css";

export default function PlaceholderPage({ title }) {
  return (
    <div className="placeholder-page">
      <h1 className="placeholder-title">{title}</h1>
      <p>({title} is empty)</p>
    </div>
  );
}
