"use client";

import { useState, useEffect } from 'react';

export default function Home() {

  const [todos, setTodos] = useState([]);
  const [showtodos, setShowTodos] = useState(true);
  const [inputname, setName] = useState('');
  const [inputdspt, setDspt] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {

  
  //測試用資料
  const data = [
    {
      "id": 305,
      "name": "1",
      "description": "1",
      "is_completed": false,
      "created_at": "2023-12-30T00:08:34.000Z",
      "updated_at": "2023-12-30T00:08:34.000Z"
    },
    {
      "id": 306,
      "name": "2",
      "description": "2",
      "is_completed": true,
      "created_at": "2023-12-30T00:08:37.000Z",
      "updated_at": "2023-12-30T01:17:14.000Z"
    },
    {
      "id": 307,
      "name": "3",
      "description": "3",
      "is_completed": false,
      "created_at": "2023-12-30T00:08:40.000Z",
      "updated_at": "2023-12-30T01:17:18.000Z"
    },
    {
      "id": 308,
      "name": "4",
      "description": "4",
      "is_completed": false,
      "created_at": "2023-12-30T00:08:43.000Z",
      "updated_at": "2023-12-30T01:17:21.000Z"
    },
    {
      "id": 309,
      "name": "5",
      "description": "5",
      "is_completed": false,
      "created_at": "2023-12-30T00:08:45.000Z",
      "updated_at": "2023-12-30T01:17:24.000Z"
    },
    {
      "id": 310,
      "name": "6",
      "description": "6",
      "is_completed": false,
      "created_at": "2023-12-30T00:08:51.000Z",
      "updated_at": "2023-12-30T01:17:27.000Z"
    },
    {
      "id": 311,
      "name": "7",
      "description": "7",
      "is_completed": false,
      "created_at": "2023-12-30T00:09:00.000Z",
      "updated_at": "2023-12-30T01:17:35.000Z"
    },
    {
      "id": 312,
      "name": "8",
      "description": "8",
      "is_completed": false,
      "created_at": "2023-12-30T00:09:08.000Z",
      "updated_at": "2023-12-30T01:17:40.000Z"
    },
    {
      "id": 313,
      "name": "9",
      "description": "9",
      "is_completed": false,
      "created_at": "2023-12-30T00:43:04.000Z",
      "updated_at": "2023-12-30T00:43:04.000Z"
    },
    {
      "id": 314,
      "name": "10",
      "description": "10",
      "is_completed": false,
      "created_at": "2023-12-30T00:46:09.000Z",
      "updated_at": "2023-12-30T00:46:09.000Z"
    }
  ];
  setTodos(data);
    return () => {
    };
  }, []);
  

  const toggleShowTodos = () => {
    // 切換是否顯示已完成Task
    setShowTodos(!showtodos);
  };

  const ShowComp = (todo) => {
    // 判斷是否顯示已完成Task
    if(showtodos){
      return true;
    }else {
      return !todo.is_completed;
    } 
  };
  const InputNameChange = (event) => {
    // 新增任務名稱欄位
    setName(event.target.value);
  };

  const InputDSPTChange = (event) => {
    // 新增任務描述欄位
    setDspt(event.target.value);
  };

  const ConfirmAdd = () => {
    // 新增Task
    if(!inputname || !inputdspt){
      setError("必填欄位為空值");
      return;
    }
    setError("");
    const lastId = todos[todos.length - 1].id;

    const newTask = {
      "id": lastId + 1,
      "name": inputname,
      "description": inputdspt,
      "is_completed": false,
      "created_at": new Date().toISOString(),
      "updated_at": new Date().toISOString()
    }
    setTodos((prevTodos) => [...prevTodos, newTask]);
  
  };

  const ConfirmUpdate = (id) => {
    // 編輯Task
    if(!inputname || !inputdspt){
      setError("必填欄位為空值");
      return;
    }
    setError("");

    const newTask = {
      "name": inputname,
      "description": inputdspt,
      "updated_at": new Date().toISOString()
    }
    
    setTodos(
      prevTodos => prevTodos.map(todo => (todo.id === id ? {...todo, name: inputname, description: inputdspt ,updated_at: new Date().toISOString() } : todo))
    );
  
  };

  const InputKeyDown = (event) => {
    // 偵測輸入欄位enter動作
    if (event.keyCode === 13) { // Enter鍵(keyCode13)
      ConfirmAdd();
    }
  };

  const toggleComp = (id) => {
    // 更新已完成、未完成
    setTodos(
      prevTodos => prevTodos.map(todo => (todo.id === id ? {...todo, is_completed: !todo.is_completed, updated_at: new Date().toISOString() } : todo))
    );

  };

  const deleteTask = (id) => {
    // 刪除Task
    const updatedData = todos.filter(todo => todo.id !== id);
    setTodos(updatedData);

  };

  return (
    <div>
      <h1>Todo List</h1>
      <h2>Task檢視列表</h2>
      <button onClick={toggleShowTodos}>
        {showtodos ? '隱藏已完成' : '顯示已完成'}
      </button>
      <ul>
        {todos.map(todo => 
        ShowComp(todo) && (
          <li key={todo.id}>
            <strong>任務名稱：{todo.name}</strong>
            <p>任務描述：{todo.description} &nbsp; 創建時間：{todo.created_at}</p>
            <p>完成狀態：{todo.is_completed ? '已完成' : '未完成'}  &nbsp; 更新時間：{todo.updated_at}</p>
            <button onClick={() => toggleComp(todo.id)}>更新完成狀態</button> &nbsp;
            <button onClick={() => deleteTask(todo.id)}>刪除Task</button> &nbsp;
            <button onClick={() => ConfirmUpdate(todo.id)}>更新名稱及描述</button>
            <br />
          </li>
        )) }
      </ul>

      <h2>新增/編輯Task輸入區</h2>
      <label>
        任務名稱:
        <input type="text" value={inputname} onChange={InputNameChange} onKeyDown={InputKeyDown}/>
      </label>
      <br />
      <label>
        任務描述:
        <input type="text" value={inputdspt} onChange={InputDSPTChange} onKeyDown={InputKeyDown}/>
      </label>
      <br />
      <button onClick={ConfirmAdd}>
        確認新增Task
      </button>
      {error}
    </div>
    
  );
}
