export default function TaskCount({size, count}) {
  const width = (size === 'large') ? 'w-12' : 'w-7';
  const textSize = (size === 'large') ? 'text-3xl' : 'text-normal';
  
  return(
    <div className={`${width} ${textSize} font-bold text-center border rounded border-zinc-200`}>
    <span>{count}</span>
  </div>
  );
}