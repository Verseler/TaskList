export default function Banner({ type, text }) {
  return (
    <span className={`${type === "danger" && "bg-red-600 text-white"} text-xs py-0.5 px-2 rounded`}>
      {text}
    </span>
  );
}
