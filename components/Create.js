




import { toast } from "react-toastify";
import { useEffect } from "react";
const Create = (props) => {
  const {
    title,
    settitle,
    description,
    setDescription,
    status,
    setStatus,
    activeTask,
    tasks,
    setTasks,
    setActiveTask,
  } = props;


useEffect(() => {
    try {
      // Load tasks from local storage when the component mounts
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks from local storage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      // Save tasks to local storage whenever the tasks state changes
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to local storage:", error);
    }
  }, [tasks]);
  
  const SubmitHandler = (e) => {
    e.preventDefault();

    // validation
    if (title.length < 5 || description.length < 20) {
      toast.error(
        "Title and Description must be more than 5 and 20 characters respectively"
      );

      return;
    }

    const newtask = {
      date: new Date().toLocaleDateString(),
      title,
      description,
      status,
    };

    setTasks([...tasks, newtask]);

    settitle("");
    setDescription("");
    setStatus("due");
  };

  const UpdateTask = (e) => {
    e.preventDefault();
    const copyTasks = [...tasks];
    copyTasks[activeTask] = {
      ...copyTasks[activeTask],
      title,
      description,
      status,
    };
    setTasks(copyTasks);
    setActiveTask(null);
    settitle("");
    setDescription("");
    setStatus("due");
  };

  return (
    <form className="w-50">
      <h2 className="mb-3">Create Your Tasks</h2>
      <input
        onChange={(e) => settitle(e.target.value)}
        value={title}
        className="form-control mb-3"
        type="text"
        placeholder="Title"
      />
      <textarea
        style={{ resize: "none" }}
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="form-control mb-3"
        placeholder="description here..."
      ></textarea>
      <select
        onChange={(e) => setStatus(e.target.value)}
        className="form-control mb-3"
        value={status}
      >
        <option value="due">Due</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      {activeTask === null ? (
        <button onClick={SubmitHandler} className="btn btn-primary mb-3">
          Create Task
        </button>
      ) : (
        <button onClick={UpdateTask} className="btn btn-primary mb-3">
          Update Task
        </button>
      )}
    </form>
  );
};

export default Create;