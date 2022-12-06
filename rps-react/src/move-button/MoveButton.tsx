import { Button, Col } from "react-bootstrap";

import "./MoveButton.scss";
import { Move } from "../utilities/Move";

interface MoveButtonProperties {
  icon: string;
  move: Move;
  pickMove: (move: Move) => void;
}

const MoveButton: React.FC<MoveButtonProperties> = ({
  icon,
  move,
  pickMove,
}: MoveButtonProperties) => {
  return (
    <Col className="text-center" xs={4}>
      <div>
        <Button className="move-button" variant="primary" onClick={(): void => pickMove(move)}>
          <div className="fs-1">{icon}</div>
        </Button>
      </div>
    </Col>
  );
};

export default MoveButton;
