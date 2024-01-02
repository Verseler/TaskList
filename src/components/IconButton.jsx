export default function IconButton({iconType, onClickAction}) {
  return <button onClick={onClickAction}><span className="h-full align-middle material-symbols-outlined">{iconType}</span></button>;
}
