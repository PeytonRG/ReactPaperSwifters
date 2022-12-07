import { Button, Col } from "react-bootstrap";

import "./MoveButton.scss";
import { Move } from "../utilities/Move";

interface MoveButtonProperties {
  text: string;
  move: Move;
  pickMove: (move: Move) => void;
}

const MoveButton: React.FC<MoveButtonProperties> = ({
  text,
  move,
  pickMove,
}: MoveButtonProperties) => {
  return (
    <Col className="text-center" xs={4}>
      <div>
        <Button className="move-button" variant="primary" onClick={(): void => pickMove(move)}>
          <div className="fs-1">{text}</div>
        </Button>
      </div>
    </Col>
  );
};

export default MoveButton;
