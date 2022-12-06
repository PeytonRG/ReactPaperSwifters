import { Col, Row } from "react-bootstrap";

import { Player } from "../utilities/Player";

interface ScoreProperties {
  name: string;
  playerType: Player;
  score: number;
}

const Score: React.FC<ScoreProperties> = ({ name, playerType, score }: ScoreProperties) => {
  return (
    <Col xs={6}>
      <h1 className={playerType === Player.User ? "text-primary" : "text-danger"}>{name}</h1>
      <Row className="justify-content-center">
        <Col className="score" xs={6}>
          <h1>{score}</h1>
        </Col>
      </Row>
    </Col>
  );
};

export default Score;