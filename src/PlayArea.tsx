import { type RefObject } from "react";

type PlayAreaProps = {
  ref: RefObject<HTMLDivElement> | RefObject<null>;
};

const PlayArea = ({ ref }: PlayAreaProps) => {
  return <div ref={ref}>hello</div>;
};

export default PlayArea;
