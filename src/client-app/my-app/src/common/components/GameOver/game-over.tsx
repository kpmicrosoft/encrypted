import BaseLayout from "../../layouts/base";

export default function GameOver() {
  return (
    <BaseLayout>
      <div className="game-over">
        <h1>Congratulations!</h1>
        <p>
          You've completed all levels! Please add your name to the leader board.
        </p>
        <img src="\img\space-fireworks.gif" alt="Game Over" />
        <a
          href={"/leaderboard"}
          className="next-level-link flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
        >
          Leader Board
        </a>
      </div>
    </BaseLayout>
  );
}