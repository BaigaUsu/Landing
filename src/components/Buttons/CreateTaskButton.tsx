'use client';

import { useState } from "react";
import { TaskCreateForm } from "../Forms/TaskCreationForm";

export default function CreateTaskButton() {
  const [showForm, setShowForm] = useState(false);

  const handleToggle = () => {
    setShowForm(prev => !prev);
  };

  return (
    <div className="p-6">
      <button
        onClick={handleToggle}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        {showForm ? "Скрыть форму" : "Создать задачу"}
      </button>

      {showForm && (
        <div className="mt-4">
          <TaskCreateForm />
        </div>
      )}
    </div>
  );
}