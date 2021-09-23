import "./index.css";

const Level = () => {
  return (
    <div className="flex level">
      <span className="text">
        <p>Niveli i qetesis:</p>
      </span>
      <span className="level1"></span>
      <span className="level2"></span>
      <span className="level3"></span>
      <span className="level4"></span>
      <span className="level5"></span>
    </div>
  );
};
export default Level;

export const CircleLevel = ({ label, amountOfDots = 5 }) => {
  function renderDots(level) {
    const allDots = [];
    for (let i = 0; i < level; i++) {
      allDots.push(<span className={`level${i + 1}`} key={i}></span>);
    }
    return allDots;
  }

  return (
    <div className="flex level">
      <div className="text">{label}</div>
      <div>{renderDots(amountOfDots)}</div>
    </div>
  );
};
