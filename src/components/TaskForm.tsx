import { useState, useEffect } from 'react';
import { Task } from '@/types';

interface TaskFormProps {
  onSubmit: (title: string, description?: string) => void;
  initialData?: Task | null;
  onCancel?: () => void;
}

export default function TaskForm({ onSubmit, initialData, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, description);
    if (!initialData) {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form card">
      <h2>{initialData ? 'Edit Task' : 'Create New Task'}</h2>
      <div className="form-group">
        <label>Title</label>
        <input 
          className="input" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="What needs to be done?"
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea 
          className="input" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Add some details..."
          rows={3}
        />
      </div>
      <div className="form-actions">
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Update Task' : 'Add Task'}
        </button>
      </div>

      <style jsx>{`
        .task-form { margin-bottom: 2rem; }
        h2 { margin-bottom: 1.5rem; font-size: 1.25rem; }
        .form-group { margin-bottom: 1rem; }
        label { display: block; margin-bottom: 0.5rem; font-size: 0.875rem; color: var(--text-muted); }
        .form-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem; }
        textarea { resize: vertical; }
        .btn-secondary { background: transparent; border: 1px solid var(--border); color: var(--text); }
        .btn-secondary:hover { background: var(--border); }
      `}</style>
    </form>
  );
}
