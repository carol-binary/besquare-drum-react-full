import "./score.css";
import { useStores } from "../../stores";
import { observer } from "mobx-react-lite";

const ScoreContainer = () => {
  const { main_store } = useStores();

  return (
    <div className="score container">
      <div className="card score-card">
        <div className="score-header">Score</div>
        <div id="score">{main_store.score}</div>
      </div>
    </div>
  );
};

export default observer(ScoreContainer);
