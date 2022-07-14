import './App.css';
import React, { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getList , addList } from './store/list/listSlice';
import List from './components/List';
function App() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const listdata= useSelector((state) => state.list);
  useEffect(() => {
    dispatch(getList());
  }, [])

  const onCreate = (e) => {
    e.preventDefault();
    if (inputValue) {
      const newList = { content: inputValue };
      dispatch(addList(newList));
      setInputValue("");
    } else {
      console.log("적으세요!");
    }
  };
  return (
    <div className="App">
       <form action='' onSubmit={onCreate}>
          <h1>{listdata.message}</h1>
           <div>
           {listdata.data.map((ele) => (
            <List key={ele.id} id={ele.id} content={ele.content}/>

           ))}
         </div>
        <div>
          <input
          type='text'
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
         <button type='submit'>목록추가</button>
        </div>
        </form>
    </div>
  );
}

export default App;


/* 
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
*/
