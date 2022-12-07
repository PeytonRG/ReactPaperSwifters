import React, { useState } from "react";

import { Container, Row } from "react-bootstrap";

import "./App.scss";
import MoveButton from "./move-button/MoveButton";
import Score from "./score/Score";
import { Move, Player, Result } from "./utilities";

const App: React.FC = () => {
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const incrementPlayerScore = (player: Player): void => {
    player === Player.User
      ? setUserScore((previousScore) => {
          return previousScore + 1;
        })
      : setComputerScore((previousScore) => {
          return previousScore + 1;
        });
  };

  const calculateComputerMove = (): Move => {
    // TS generates a reverse mapping for each case, so ignore them
    const length = Object.keys(Move).length / 2;
    const index = Math.floor(Math.random() * length) as Move;

    return index;
  };

  const pickMove = (move: Move): void => {
    const computerMove = calculateComputerMove();
    let result: Result;

    if (move === computerMove) {
      result = Result.Tie;
    } else {
      switch (computerMove) {
        case Move.Rock: {
          if (move === Move.Paper) {
            incrementPlayerScore(Player.User);
            result = Result.Win;
          } else {
            incrementPlayerScore(Player.Computer);
            result = Result.Loss;
          }
          break;
        }
        case Move.Paper: {
          if (move === Move.Scissors) {
            incrementPlayerScore(Player.User);
            result = Result.Win;
          } else {
            incrementPlayerScore(Player.Computer);
            result = Result.Loss;
          }
          break;
        }
        case Move.Scissors: {
          if (move === Move.Rock) {
            incrementPlayerScore(Player.User);
            result = Result.Win;
          } else {
            incrementPlayerScore(Player.Computer);
            result = Result.Loss;
          }
          break;
        }
      }
    }

    alert(`The computer picked ${Move[computerMove].toLowerCase()}. ${getResultString(result)}`);
  };

  const getResultString = (result: Result): string => {
    switch (result) {
      case Result.Win: {
        return "You won!";
      }
      case Result.Loss: {
        return "You lost.";
      }
      case Result.Tie: {
        return "You tied.";
      }
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-between flex-fill text-light" fluid>
      <Row className="scoreboard">
        <Score name="PLAYER" playerType={Player.User} score={userScore} />
        <Score name="COMPUTER" playerType={Player.Computer} score={computerScore} />
      </Row>
      <Row className="mb-5">
        <MoveButton text="🪨" move={Move.Rock} pickMove={pickMove}></MoveButton>
        <MoveButton text="📃" move={Move.Paper} pickMove={pickMove}></MoveButton>
        <MoveButton text="✂️" move={Move.Scissors} pickMove={pickMove}></MoveButton>
      </Row>
    </Container>
  );
};

export default App;
