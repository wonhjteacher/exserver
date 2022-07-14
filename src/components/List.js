import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { deleteList ,updateList} from './../store/list/listSlice';
const List = ({id,content}) => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const onDelete = (e) => {
      e.preventDefault();
      dispatch(deleteList(id));
    };

    const onUpdate = (e) => {
        e.preventDefault();
        if (inputValue) {
          dispatch(updateList({ id, content: inputValue }));
          setInputValue("");
        } else {
          console.log("다시 적으세요!");
        }
      };
    return (
        <div>
            <h3>{id}.{content}</h3>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            ></input>
            <button type='button' onClick={onDelete}>
                삭제
            </button>
            <button type='button' onClick={onUpdate}>
                수정
            </button>

        </div>
    );
};

export default List;