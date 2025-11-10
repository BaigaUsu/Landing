import React from "react";

interface BindCustomerModalProps {
  open: boolean;
  onYes: () => void;
  onNo: () => void;
}

export default function BindCustomerModal({ open, onYes, onNo }: BindCustomerModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm text-center">
        <p className="text-lg font-semibold mb-6">Хотите привязать нового заказчика?</p>

        <div className="flex gap-4 justify-center">
          <button
            className="px-6 py-2 rounded-xl shadow hover:scale-105 transition"
            onClick={onYes}
          >
            Да
          </button>
          <button
            className="px-6 py-2 rounded-xl shadow hover:scale-105 transition"
            onClick={onNo}
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  );
}