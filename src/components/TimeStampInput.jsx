export default function TimeStampInput({label, type, value, onChangeAction}) {
  return (
    <div className="flex items-center gap-8">
      <label>{label}</label>
      <input
        className="p-1 p-2 text-sm transition-colors bg-transparent border rounded-md cursor-pointer border-zinc-200 outline-primary hover:border-primary"
        type={type}
        value={value}
        onChange={onChangeAction}
      />
    </div>
  );
}
