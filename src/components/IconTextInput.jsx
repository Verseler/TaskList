import IconButton from "./IconButton";

export default function IconTextInput({value, iconType, placeholder, inputOnChangeAction, buttonOnClickAction}) {
  return (
    <div className="relative w-full mt-2">
      <input
        value={value}
        placeholder={placeholder}
        onChange={inputOnChangeAction}
        type="text"
        className="w-full py-2 transition-colors bg-transparent border border-gray-200 rounded-md ps-4 pe-10 outline-primary hover:border-primary"
      />
      <div className="absolute top-0 right-0 p-2">
        <IconButton iconType={iconType} onClickAction={buttonOnClickAction} />
      </div>
    </div>
  );
}
