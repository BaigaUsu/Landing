'use client';

import { useStageForm } from "../hooks/useStageForm";
import { StageWithType } from "../../types/types";
import { getAvailableSpecializationNames } from "../hooks/useSpecializationsByStage";
import { useMemo } from "react";

type Props = {
    stage: StageWithType;
    onSuccess?: () => void;
};

export function StageEditForm({ stage, onSuccess }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        onSubmit,
        fullStage,
        isStageLoading,
        isLoadingSpec,
        errorMsg,
        success,
        isSubmitting,
        stageType: mappedStageType,
        watch,
        specializations,
    } = useStageForm({stage, onSuccess});

    // Отслеживаем выбранную специализацию
    const selectedSpecialization = watch("specialization");
            
    // Фильтруем работников по выбранной специализации
    const filteredWorkers = useMemo(() => {
        return selectedSpecialization
            ? specializations.filter(spec => spec.type === selectedSpecialization)
            : [];
    }, [selectedSpecialization, specializations]);

    // Получение доступных специализаций
    const availableSpecializations = getAvailableSpecializationNames(mappedStageType);
    
    // Состояние загрузки данных этапа
    if (isStageLoading || !fullStage) {
        return (
            <div className="flex items-center justify-center p-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Загрузка данных этапа...</span>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto p-6 border rounded shadow bg-white">
            <h2 className="text-xl font-bold">Редактировать этап #{stage.id}</h2>

            <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Задача</label>
                    <input {...register("task")} className="border px-3 py-2 rounded" />
                    {errors.task && <p className="text-red-600 text-sm mt-1">{errors.task.message}</p>}
            </div>

            <div className="flex flex-col">
                <label className="block text-sm mb-1">Специализация</label>
                <select {...register("specialization")} className="border px-3 py-2 rounded">
                    {availableSpecializations.map((spec) => (
                        <option key={spec} value={spec}>
                            {spec[0].toUpperCase() + spec.slice(1)} {/* Приводим к виду: Designer */}
                        </option>
                    ))}
                </select>
                {errors.specialization && (
                    <p className="text-red-600 text-sm">{errors.specialization.message}</p>
                )}
            </div>

            <div className="flex flex-col">
                {isLoadingSpec ? (
                    <p>Загрузка...</p>
                ) : (
                    <>
                        <label className="block text-sm mb-1">Работник</label>
                        <select 
                            {...register("worker", { setValueAs: v => (v === "" ? null : Number(v)) })} 
                            className="border px-3 py-2 rounded"
                        >
                            {filteredWorkers.map((spec) => (
                                <option key={`${spec.type}-${spec.id}`} value={spec.id}>
                                    {spec.label}
                                </option>
                            ))}
                        </select>
                    </>
                )}
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Дата начала</label>
                <input {...register("start_date")} type="date" className="border px-3 py-2 rounded" />
                {errors.start_date && <p className="text-red-600 text-sm mt-1">{errors.start_date.message}</p>}
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Дата окончания</label>
                <input {...register("end_date")} type="date" className="border px-3 py-2 rounded" />
                {errors.end_date && <p className="text-red-600 text-sm mt-1">{errors.end_date.message}</p>}
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Сдельная оплата</label>
                <input {...register("piece_rate_pay")} className="border px-3 py-2 rounded" />
                {errors.piece_rate_pay && <p className="text-red-600 text-sm mt-1">{errors.piece_rate_pay.message}</p>}
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Статус</label>
                <select {...register("status")} className="border px-3 py-2 rounded">
                    <option value="in progress">in progress</option>
                    <option value="completed">completed</option>
                    <option value="not completed">not completed</option>
                </select>
                {errors.status && <p className="text-red-600 text-sm mt-1">{errors.status.message}</p>}
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Комментарий</label>
                <textarea {...register("comment")} className="border px-3 py-2 rounded" rows={3} />
                {errors.comment && <p className="text-red-600 text-sm mt-1">{errors.comment.message}</p>}
            </div>

            {success && <p className="text-green-600">✅ Этап успешно обновлен</p>}
            {errorMsg && <p className="text-red-600">{errorMsg}</p>}

            <button 
                type="submit" 
                disabled={isSubmitting}
                className={`px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`
                }
            >
                {isSubmitting ? (
                    <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Сохранение...
                    </div>
                ) : (
                    'Сохранить изменения'
                )}
            </button>
        </form>
    );
}