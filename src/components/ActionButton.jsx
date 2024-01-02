export default function ActionButton({ bgColorStyle, label, onClickAction }) {
  return (
    <button
      className={`${bgColorStyle} max-w-64 w-full text-sm font-semibold p-3 
      border rounded-md border-zinc-200 outline-primary hover:opacity-80 active:scale-90 transition-all`}
      onClick={onClickAction}
    >
      {label}
    </button>
  );
}
