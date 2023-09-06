import { DegreeInfos } from "../types/degreeInfos";

function DegreeItem(props: DegreeItemProps) {
  const degreeInfos = props.degreeInfos;
  return (
    <div>
      <p>{degreeInfos.degree.name}</p>
      <p>{degreeInfos.earningDate}</p>
    </div>
  );
}

interface DegreeItemProps {
  degreeInfos: DegreeInfos;
}

export function DegreesList(props: DegreesListProps) {
  return (
    <details>
      <summary>Degrees</summary>
      {props.degreesInfos.map((infos) => (
        <DegreeItem key={infos.degree.id} degreeInfos={infos} />
      ))}
    </details>
  );
}

interface DegreesListProps {
  degreesInfos: DegreeInfos[];
}
