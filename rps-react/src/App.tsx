import React, { useState } from "react";

import { Button, Col, Container, Row } from "react-bootstrap";

import "./App.scss";
import Score from "./score/Score";
import { Player } from "./utilities/Player";

const App: React.FC = () => {
  const [userName, setUserName] = useState("PEYTON");
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const incrementPlayerScore = (player: Player): void => {
    if (player === Player.User) {
      setUserScore((previousScore) => {
        return previousScore + 1;
      });
    } else {
      setComputerScore((previousScore) => {
        return previousScore + 1;
      });
    }
  };

  return (
    <Container className="text-light" fluid>
      <Row className="scoreboard">
        <Score name={userName} playerType={Player.User} score={userScore} />
        <Score name="COMPUTER" playerType={Player.Computer} score={computerScore} />
      </Row>
      <Row>
        <Button variant="primary" onClick={(): void => incrementPlayerScore(Player.User)}>
          Player wins
        </Button>
        <Button variant="danger" onClick={(): void => incrementPlayerScore(Player.Computer)}>
          Computer wins
        </Button>
      </Row>
    </Container>
  );
};

export default App;
