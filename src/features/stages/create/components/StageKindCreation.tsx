// stageKindCreation.tsx
import { useForm } from "react-hook-form";
import { useStageKindCreation } from "../hooks/useStageKindCreationFrom";
import { useGetSpecializationsQuery } from "@/share/api/specialization";

export const StageKindCreationForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      kind_name: "",
      specializations: [] as number[] // Массив ID выбранных специализаций
    }
  });

  // Получаем список специализаций
  const { data: specializations = [], isLoading: isSpecsLoading } = useGetSpecializationsQuery();
  
  const { createStageKind, isLoading: isCreating } = useStageKindCreation(() => {
    reset();
    onSuccess?.(); 
  });

  const selectedSpecs = watch("specializations");

  const handleCheckboxChange = (id: number) => {
    const current = selectedSpecs;
    const next = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];
    setValue("specializations", next);
  };

  const onSubmit = (data: any) => {
    createStageKind({
      kind_name: data.kind_name,
      slug: data.kind_name.toLowerCase().replace(/\s+/g, '-'),
      // Бекенд ожидает массив объектов или ID? 
      // Судя по вашему описанию, нужны ID. 
      // Если API ждет [{id: 1}, {id: 2}], используйте map:
      specializations: data.specializations
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="font-bold text-lg">Новый тип этапа</h3>
      
      <div>
        <label className="block text-sm font-medium mb-1">Название типа</label>
        <input 
          {...register("kind_name", { required: true })} 
          placeholder="Название (напр. Дизайн)"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Специализации (кто может участвовать):</label>
        {isSpecsLoading ? (
          <p className="text-sm text-gray-500">Загрузка специализаций...</p>
        ) : (
          <div className="grid grid-cols-2 gap-2 border p-3 rounded bg-white max-h-40 overflow-y-auto">
            {specializations.map((spec) => (
              <label key={spec.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input
                  type="checkbox"
                  checked={selectedSpecs.includes(spec.id)}
                  onChange={() => handleCheckboxChange(spec.id)}
                  className="w-4 h-4 text-green-600"
                />
                <span className="text-sm">{spec.specialization}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button 
          type="submit" 
          disabled={isCreating || isSpecsLoading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 transition-colors"
        >
          {isCreating ? "Сохранение..." : "Сохранить тип"}
        </button>
      </div>
    </form>
  );
};