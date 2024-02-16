import { Card } from "react-bootstrap";
import "../styles/stylesComp/taskCard.scss";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskCard({ task }) {
  const { deleteTask } = useTasks();
  // console.log(task);
  return (
    <div className="taskContainer">
      <Card
        style={{
          background: "#454545",
          color: "#fff",
          width: "20rem",
        }}>
        <Card.Body style={{ borderRadius: "5px" }}>
          <Card.Title>{task.title}</Card.Title>
          <Card.Text>{task.description}</Card.Text>
          <p>{dayjs(task.date).utc().format("DD/MM/YYYY")}</p>
          <Link to={`/tasks/${task._id}`}>
            <button className="buttonCard">Edit Task</button>
          </Link>
          <Link className="Link">
            <button
              className="buttonCard"
              onClick={() => {
                deleteTask(task._id);
              }}>
              Delete Task
            </button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default TaskCard;
