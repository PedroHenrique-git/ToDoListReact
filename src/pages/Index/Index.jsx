import './index.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import { BsFillTrashFill } from 'react-icons/bs';
import { useState, useRef } from 'react';

export default function Index() {
  const [task, setTask] = useState('');
  const [taskEdit, setTaskEdit] = useState('');
  const [tasks, setTasks] = useState([]);
  const nameTask = useRef(null);
  const inputEdit = useRef(null);

  const addTask = (item) => {
    setTasks([...tasks, item]);
  };

  const removeTask = (index) => {
    const copyState = [...tasks];
    copyState.splice(index, 1);
    setTasks(copyState);
  };

  const showInput = () => {
    nameTask.current.style.display = 'none';
    inputEdit.current.style.display = 'block';
  };

  const handleFocusOutEdit = (index) => {
    const copyState = [...tasks];
    if (!taskEdit) return;
    copyState.splice(index, 1, taskEdit);
    setTasks(copyState);
    nameTask.current.style.display = 'block';
    inputEdit.current.style.display = 'none';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
  };

  return (
    <main className="principal_container">
      <section className="task_section">
        <div className="task_section-wrap">
          <div className="task_form">
            <form onSubmit={(e) => handleSubmit(e)}>
              <input type="text" onChange={(e) => setTask(e.target.value)} />
              <button type="submit">
                <AiOutlineSearch size={42} color="#d1e5e7" />
              </button>
            </form>
          </div>
          <div className="tasks_list">
            {tasks.map((value, index) => (
              <div className="task" key={value}>
                <input
                  ref={inputEdit}
                  className="edit_input"
                  type="text"
                  onBlur={() => handleFocusOutEdit(index)}
                  onChange={(e) => setTaskEdit(e.target.value)}
                />
                <p ref={nameTask}>{value}</p>
                <div className="task_actions">
                  <button type="button" onClick={() => removeTask(index)}>
                    <BsFillTrashFill />
                  </button>
                  <button type="button" onClick={() => showInput()}>
                    <FaRegEdit />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
