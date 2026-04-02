import { useForm } from "react-hook-form";
import { useCreateSpecializationMutation } from "../api/specialization";
// Убедитесь, что путь до specializationApi указан верно для вашего проекта

type SpecializationFormInputs = {
  specialization: string;
};

type Props = {
  onSuccess?: () => void;
  onCancel?: () => void; // Опциональный пропс, если захотите добавить кнопку отмены
};

export const SpecializationCreateForm = ({ onSuccess, onCancel }: Props) => {
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm<SpecializationFormInputs>();
  
  const [createSpecialization, { isLoading, error }] = useCreateSpecializationMutation();

  const onSubmit = async (data: SpecializationFormInputs) => {
    try {
      // Отправляем данные. В Partial<Worker> ожидается поле specialization
      await createSpecialization({ 
        specialization: data.specialization 
      }).unwrap();
      
      reset(); // Очищаем форму
      onSuccess?.(); // Вызываем callback (например, чтобы закрыть модалку)
    } catch (err) {
      console.error("Ошибка при создании специализации:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="font-bold text-lg text-gray-800">Новая специализация</h3>
      
      <div>
        <label htmlFor="specialization" className="block text-sm font-medium mb-1 text-gray-700">
          Название специализации
        </label>
        <input 
          id="specialization"
          {...register("specialization", { required: "Это поле обязательно" })} 
          placeholder="Напр. Архитектор, 3D Визуализатор..."
          className={`border p-2 rounded w-full outline-none focus:ring-2 focus:ring-blue-500 transition-shadow ${
            errors.specialization ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
          }`}
          disabled={isLoading}
        />
        {errors.specialization && (
          <p className="text-red-500 text-sm mt-1">{errors.specialization.message}</p>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm">
          Произошла ошибка при сохранении. Проверьте подключение или права доступа.
        </p>
      )}

      <div className="flex gap-2 pt-2">
        <button 
          type="submit" 
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {isLoading ? "Сохранение..." : "Создать"}
        </button>
        
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            disabled={isLoading}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
          >
            Отмена
          </button>
        )}
      </div>
    </form>
  );
};