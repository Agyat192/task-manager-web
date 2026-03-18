import { Task } from '@/types';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export default function TaskCard({ task, onToggle, onDelete, onEdit }: TaskCardProps) {
  return (
    <div className={`card task-card animate-in ${task.status === 'COMPLETED' ? 'completed' : ''}`}>
      <div className="task-header">
        <input 
          type="checkbox" 
          checked={task.status === 'COMPLETED'} 
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
        />
        <div className="task-content">
          <h3 className="task-title">{task.title}</h3>
          {task.description && <p className="task-desc">{task.description}</p>}
        </div>
        <div className="task-actions">
          <button onClick={() => onEdit(task)} className="btn-icon">✏️</button>
          <button onClick={() => onDelete(task.id)} className="btn-icon delete">🗑️</button>
        </div>
      </div>
      <div className="task-footer">
        <span className="task-date">{new Date(task.createdAt).toLocaleDateString()}</span>
        <span className={`status-badge ${task.status.toLowerCase()}`}>{task.status}</span>
      </div>

      <style jsx>{`
        .task-card {
          margin-bottom: 1rem;
          transition: transform 0.2s, opacity 0.2s;
        }
        .task-card.completed {
          opacity: 0.7;
        }
        .task-card.completed .task-title {
          text-decoration: line-through;
          color: var(--text-muted);
        }
        .task-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        .task-checkbox {
          width: 1.25rem;
          height: 1.25rem;
          margin-top: 0.25rem;
          cursor: pointer;
        }
        .task-content { flex: 1; }
        .task-title { font-size: 1.125rem; margin-bottom: 0.25rem; }
        .task-desc { color: var(--text-muted); font-size: 0.875rem; margin-bottom: 1rem; }
        .task-actions { display: flex; gap: 0.5rem; }
        .btn-icon {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.125rem;
          padding: 0.25rem;
          border-radius: 0.25rem;
          transition: background 0.2s;
        }
        .btn-icon:hover { background: var(--border); }
        .btn-icon.delete:hover { border: 1px solid var(--danger); }
        .task-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
          font-size: 0.75rem;
        }
        .task-date { color: var(--text-muted); }
        .status-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .status-badge.pending { background: rgba(99, 102, 241, 0.1); color: var(--primary); }
        .status-badge.completed { background: rgba(34, 197, 94, 0.1); color: var(--success); }
      `}</style>
    </div>
  );
}
