export default function TaskCard({ id, name, handleShowTaskView }) {
  //change this later on
  //when select multiple task item feature is created
  function handleTaskChecked(e) {
    e.stopPropagation();
    console.log(`tasks ${name} ${id} is checked`);
  }

  return (
    <button
      key={id}
      onClick={() => handleShowTaskView(id)}
      className="flex w-full px-5 py-4 transition-colors border-b cursor-pointer gap-x-3 border-zinc-200 active:bg-zinc-50"
    >
      <div className="w-6 h-6">
        <input type="checkbox" onClick={handleTaskChecked}  className="w-full align-middle bg-red-700" />
      </div>

      <p>{name}</p>

      <span className="ml-auto material-symbols-outlined">navigate_next</span>
    </button>
  );
}
