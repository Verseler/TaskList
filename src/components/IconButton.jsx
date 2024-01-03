export default function IconButton({iconType, onClickAction}) {
  return <button className="outline-primary" onClick={onClickAction}><span className="h-full align-middle material-symbols-outlined">{iconType}</span></button>;
}
