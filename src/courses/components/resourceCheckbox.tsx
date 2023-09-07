import { MouseEventHandler } from "react";

export interface ResCheckBoxProps {
  name: string;
  field: string;
  onClick: MouseEventHandler<HTMLInputElement>;
}

export function ResCheckBox(props: ResCheckBoxProps) {
  const finalName = `${props.name}-${props.field}`;

  return (
    <div className="input-label">
      <input
        type="checkbox"
        name={finalName}
        id={finalName}
        onClick={props.onClick}
      />
      <label htmlFor={finalName}>{props.field}</label>
    </div>
  );
}
