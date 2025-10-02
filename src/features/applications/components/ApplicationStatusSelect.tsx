'use client';

import { usePatchApplicationMutation } from "@/features/applications/api/appApi";

type Props = {
    applicationId: number;
    currentStatus: string;
    onStatusUpdate: () => void;
};

export function ApplicationStatusSelect({
    applicationId,
    currentStatus,
    onStatusUpdate,
}: Props) {
    const [patchApplication, { isLoading }] = usePatchApplicationMutation();

    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        try {
            await patchApplication({
                id: applicationId,
                data: { status: e.target.value },
            }).unwrap();
            onStatusUpdate(); // Вызываем callback после успешного обновления
        } catch (err) {
            alert("Ошибка при обновлении статуса");
            console.error(err);
        }
    };

    return (
        <div className="mt-4">
            <label htmlFor="status-select" className="block mb-1 font-semibold">
                Статус заявки:
            </label>
            <select
                id="status-select"
                value={currentStatus}
                onChange={handleStatusChange}
                disabled={isLoading}
                className="border px-3 py-2 rounded disabled:opacity-50"
            >
                <option value="pending">pending</option>
                <option value="verified-positive">verified-positive</option>
                <option value="verified-negative">verified-negative</option>
                <option value="verified-waiting">verified-waiting</option>
            </select>
            {isLoading && <span className="ml-2">Обновление...</span>}
        </div>
    );
}