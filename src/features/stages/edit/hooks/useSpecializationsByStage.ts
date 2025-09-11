import {
  useGetArchitectLabelsQuery,
  useGetDesignerLabelsQuery,
  useGetVisualizerLabelsQuery,
  useGetComplectatorLabelsQuery,
  useGetManagerLabelsQuery,
} from "@/share/api/specialization";
import { Specialization } from "@/share/types/specializationTypes";
import { ServerStageType, SpecializationKey } from "../../types/types";
import { useMemo } from "react";


export const STAGE_SPECIALIZATIONS_CONFIG: Record<ServerStageType, SpecializationKey[]> = {
  "pre-project": ["designer", "manager"],
  "conceptual design": ["designer", "visualizer"],
  "detailed design": ["architect"],
  "material specification": ["complectator"],
  "author's supervisor": ["architect", "designer"],
};
// ДОБАВЛЯЕТСЯ НОВЫЙ КЛЮЧ СО ЗНАЧЕНИЕМ ТИП СПЕЦИАЛИЗАЦИИ ДЛЯ ФИЛЬТРАЦИИ РАБОТНИКОВ ПО СПЕЦИАЛИЗАЦИИ В UI
export type SpecializationWithType = Specialization & { type: SpecializationKey };

export function useSpecializationsByStage(stageType: ServerStageType) {
    const allowedSpecializations = STAGE_SPECIALIZATIONS_CONFIG[stageType] ?? [];
    
    const designerQuery = useGetDesignerLabelsQuery(undefined, {
      skip: !allowedSpecializations.includes("designer"),
    });
    const managerQuery = useGetManagerLabelsQuery(undefined, {
      skip: !allowedSpecializations.includes("manager"),
    });
    const visualizerQuery = useGetVisualizerLabelsQuery(undefined, {
      skip: !allowedSpecializations.includes("visualizer"),
    });
    const complectatorQuery = useGetComplectatorLabelsQuery(undefined, {
      skip: !allowedSpecializations.includes("complectator"),
    });
    const architectQuery = useGetArchitectLabelsQuery(undefined, {
      skip: !allowedSpecializations.includes("architect"),
    });
  
    // Строим быстрые булевые состояния (чисто для ясности и удобства deps)
    const loadingStates = {
      designer: designerQuery.isLoading || designerQuery.isFetching,
      manager: managerQuery.isLoading || managerQuery.isFetching,
      visualizer: visualizerQuery.isLoading || visualizerQuery.isFetching,
      complectator: complectatorQuery.isLoading || complectatorQuery.isFetching,
      architect: architectQuery.isLoading || architectQuery.isFetching,
    };
  
    const isLoading = allowedSpecializations.some(spec => loadingStates[spec]);
    const isError = allowedSpecializations.some(spec => {
      const q = {
        designer: designerQuery,
        manager: managerQuery,
        visualizer: visualizerQuery,
        complectator: complectatorQuery,
        architect: architectQuery,
      }[spec];
      return !!q?.isError;
    });
  
    // ВРЕМЕННО МЕМОИЗИРУЕМ СБОРКУ ДАННЫХ; УКАЗЫВАЕМ КОНКРЕТНЫЕ DATA В DEPS(ВОЗМОЖНО ИЗЛИШНЕ)
    const specializations = useMemo(() => {
      const result: SpecializationWithType[] = [];
  
      const queriesByKey = {
        designer: designerQuery,
        manager: managerQuery,
        visualizer: visualizerQuery,
        complectator: complectatorQuery,
        architect: architectQuery,
      };
  
      for (const specType of allowedSpecializations) {
        const data = queriesByKey[specType]?.data ?? [];
        for (const spec of data) {
          result.push({ ...spec, type: specType });
        }
      }
  
      // Убираем дубликаты, сохраняя первый встретившийся (если нужно сохранить последний — убери проверку)
      const unique = new Map<number, SpecializationWithType>();
      for (const item of result) {
        if (!unique.has(item.id)) unique.set(item.id, item);
      }
  
      return Array.from(unique.values());
    }, [    
      allowedSpecializations,
      designerQuery.data,
      managerQuery.data,
      visualizerQuery.data,
      complectatorQuery.data,
      architectQuery.data,
    ]);
  
    return { specializations, isLoading, isError };
}

export function getAvailableSpecializationNames(
  stageType: ServerStageType
): SpecializationKey[] {
  return STAGE_SPECIALIZATIONS_CONFIG[stageType] || [];
}


