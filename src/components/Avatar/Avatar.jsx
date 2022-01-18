import "./avatar.css";

export default function Avatar({ name }) {
  return (
    <div className="avatar">
      <span>{name[0]}</span>
    </div>
  );
}
