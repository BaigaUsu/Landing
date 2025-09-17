import { ServerStageType, ServerStageUrlKind } from "../types/types";


export const convertStageTypeToServerKind = (kind: ServerStageType): ServerStageUrlKind => {
    const serverKinds: Record<ServerStageType, ServerStageUrlKind> = {
      "pre-project": "pre-projects",
      "conceptual design": "conceptual-designs",
      "detailed design": "detailed-designs",
      "material specification": "material-specifications",
      "author's supervisor": "authors-supervisors",
    };
    return serverKinds[kind];
  };