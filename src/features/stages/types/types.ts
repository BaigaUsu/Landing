// export type StageWithType = {
//     id: number;
//     type: string;
//     projectId: number;
// };

export type StageKind = {
    kind_name: string;
    slug: string;
    specializations: {
      id: number;
      specialization: string;
    }[];
  };