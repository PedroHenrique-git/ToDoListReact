import './index.scss';
import { RiAddCircleFill } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import { BsFillTrashFill } from 'react-icons/bs';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Index() {
  const [task, setTask] = useState('');
  const [taskEdit, setTaskEdit] = useState('');
  const [tasks, setTasks] = useState([]);
  const nameTask = useRef(null);
  const inputEdit = useRef(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const checkIfExistsTask = (item) => {
    const index = tasks.findIndex((value) => value === item);
    if (index !== -1) return true;
    return false;
  };

  const addTask = (item) => {
    if (!checkIfExistsTask(item) && item) {
      setTasks([...tasks, item]);
      setTask('');
      toast.success('task created successfully');
    } else {
      toast.error('task already exists or invalid value');
    }
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

    if (!taskEdit || checkIfExistsTask(taskEdit)) {
      toast.error('task already exists or invalid value');

      nameTask.current.style.display = 'block';
      inputEdit.current.style.display = 'none';

      return;
    }

    copyState.splice(index, 1, taskEdit);
    setTasks(copyState);
    nameTask.current.style.display = 'block';
    inputEdit.current.style.display = 'none';
    toast.success('task edited successfully');
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
              <input
                type="text"
                placeholder="add task"
                onChange={(e) => setTask(e.target.value)}
                value={task}
                autoComplete="off"
              />
              <button type="submit">
                <RiAddCircleFill size={30} />
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
                  placeholder="edit task"
                  onBlur={() => handleFocusOutEdit(index)}
                  onChange={(e) => setTaskEdit(e.target.value)}
                  autoComplete="off"
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
