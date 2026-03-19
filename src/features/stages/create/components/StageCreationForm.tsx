"use client";

import { useMemo } from "react";
import { useStageCreationForm } from "../hooks/useStateCreationForm";
import { StageKind } from "../../types/types";
import { useGetWorkerLabelsQuery } from "@/share/api/specialization";

type Props = {
    projectId: number;
    stageKind: StageKind;
    onSuccess?: () => void;
};

export const StageCreateForm = ({ projectId, onSuccess, stageKind }: Props) => {
    const {
        register,
        handleSubmit,
        errors,
        onSubmit,
        submitError,
        submitSuccess,
        availableSpecializations,
        watch,
        isSubmitting,
    } = useStageCreationForm({stageKind, projectId, onSuccess});

    // Отслеживаем выбранную специализацию
    
    const selectedSpecialization = watch("specialization")
    
    const { data: workers = [], isLoading } = useGetWorkerLabelsQuery(
        selectedSpecialization, 
        { skip: !selectedSpecialization } // Не делать запрос, пока не выбрали роль
    );
    if (!stageKind || !stageKind.specializations) {
        return <p>Загрузка...</p>
      }

      console.log({
        selectedSpecialization,
        workers,
        workerSpecs: workers.map(w => w.specializations)
      })
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border p-4 rounded bg-gray-50 max-w-xl">
            <h3 className="text-lg font-semibold">Создание этапа: {stageKind.kind_name}</h3>

            <div>
                <label className="block text-sm mb-1">Задача</label>
                <input {...register("task")} className="input" />
                {errors.task && <p className="text-red-600 text-sm">{errors.task.message}</p>}
            </div>

            <div>
                <label className="block text-sm mb-1">Специализация</label>
                <select {...register("specialization")} className="input">
                    <option value="">Выберите</option>
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

            <div>
                {isLoading ? (
                    <p>Загрузка...</p>
                ) : (
                    <>
                        <label className="block text-sm mb-1">Работник</label>
                        <select {...register("worker", { setValueAs: v => (v === "" ? null : Number(v)) })}>
                            <option value="">Выберите</option>
                            {workers.map((spec) => (
                                <option key={spec.id} value={spec.id}>
                                    {spec.full_name}
                                </option>
                            ))}
                        </select>
                    </>
                )}
            </div>

            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block text-sm mb-1">Дата начала</label>
                    <input type="date" {...register("start_date")} className="input" />
                </div>
                <div className="flex-1">
                    <label className="block text-sm mb-1">Дата окончания</label>
                    <input type="date" {...register("end_date")} className="input" />
                </div>
            </div>

            <div>
                <label className="block text-sm mb-1">Сдельная оплата</label>
                <input {...register("piece_rate_pay")} className="input" />
            </div>

            {submitSuccess && <p className="text-green-600">✅ Этап успешно создан</p>}
            {submitError && <p className="text-red-600">{submitError}</p>}

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Создать этап
            </button>
        </form>
    );
};