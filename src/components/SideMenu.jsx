import { useState } from "react";
import ListCard from "./ListCard";
import IconButton from "./IconButton";
import IconTextInput from "./IconTextInput";

export default function SideMenu({
  listCollection,
  createList,
  changeCurrentListId,
  currentListId,
  deleteList,
}) {
  const [showSideMenu, setShowSideMenu] = useState(true);
  const [listName, setListName] = useState("");

  function handleShowMenu() {
    setShowSideMenu((prevShowSideMenu) => !prevShowSideMenu);
  }

  function handleClickCreateList() {
    //verify if listName is not empty
    if (listName) {
      createList(listName);
      //after adding new list clear the listName
      setListName("");
    }
  }

  // const searchBar = () => {
  //   return (
  //     <IconTextInput
  //     name={searchValue}
  //     iconType="search"
  //     placeholder="Search"
  //     inputOnChangeAction={handleSearch}
  //     buttonOnClickAction={handleSearch}
  //   />
  //   );
  // };

  const listContainer = () => {
    return (
      <div className="mt-8 border-b border-zinc-200/40">
        <h2 className="text-xs font-bold">LIST</h2>
        <IconTextInput
          value={listName}
          iconType="add"
          inputOnChangeAction={(e) => setListName(e.target.value)}
          buttonOnClickAction={handleClickCreateList}
        />
        <div className="py-5 space-y-2">
          {listCollection.map((list, index) => (
            <ListCard
              key={index}
              name={list.name}
              selected={currentListId === list.id ? true : false}
              count={list.tasks?.length}
              onClickAction={() => changeCurrentListId(list.id)}
              onDeleteClickAction={() => deleteList(list.id)}
              defaultList={listCollection[0].id === list.id ? true : false}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`
      ${
        showSideMenu
          ? "w-full bg-secondary inset-0 py-6  min-h-screen "
          : "sm:w-0 end-0"
      } fixed
      sm:min-h-full sm:py-6 px-5 sm:transition-all 
      sm:max-w-80 sm:relative sm:rounded-2xl`}
    >
      <header className="flex justify-between w-full mb-5">
        {showSideMenu && <div className="text-xl font-bold ">Menu</div>}
        <IconButton
          iconType={showSideMenu ? "close" : "menu"}
          onClickAction={handleShowMenu}
        />
      </header>
      {showSideMenu && listContainer()}
      {showSideMenu && (
        <div className="absolute bottom-3">
          <div className="flex items-center py-1 text-sm font-bold cursor-pointer gap-x-3">
            <span className="material-symbols-outlined">tune</span>
            <span>Settings</span>
          </div>
          <div className="flex items-center py-1 text-sm font-bold cursor-pointer gap-x-3">
            <span className="material-symbols-outlined">logout</span>
            <span>Sign out</span>
          </div>
        </div>
      )}
    </div>
  );
}
