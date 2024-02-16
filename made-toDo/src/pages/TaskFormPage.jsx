import { useForm } from "react-hook-form";
import "../styles/stylesComp/textForm.scss";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const TaskFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs.utc(task.date).format("DD/MM/YYYY"));
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };

    console.log(dataValid);
    //  If parms.id exists you are editin a task
    if (params.id) {
      updateTask(params.id, dataValid);
    }
    //  Else, you are creating
    else {
      createTask(dataValid);
    }
    navigate("/tasks");
  });

  return (
    <div className="formContainer">
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          placeholder="Title"
          {...register("title")}
          autoFocus
          className="newTask"
        />
        <label htmlFor="description">Description</label>
        <textarea
          type=""
          rows="3"
          placeholder="Description"
          {...register("description")}
          className="newTask"></textarea>
        <label htmlFor="date">Date</label>
        <input type="date" {...register("date")} />
        <button>Save</button>
      </form>
    </div>
  );
};

export default TaskFormPage;
