'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTasks } from '@/hooks/useTasks';
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';
import { Task } from '@/types';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { user, loading: authLoading, logout } = useAuth();
  const { tasks, fetchTasks, loading: tasksLoading, createTask, updateTask, deleteTask, toggleTask, pagination } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (user) {
      const delayDebounceFn = setTimeout(() => {
        fetchTasks({ page, status: statusFilter || undefined, search: search || undefined });
      }, 300);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [user, page, statusFilter, search, fetchTasks]);

  if (authLoading) return <div className="loading">Loading session...</div>;
  if (!user) return null;

  const handleTaskSubmit = async (title: string, description?: string) => {
    if (editingTask) {
      await updateTask(editingTask.id, { title, description });
      setEditingTask(null);
    } else {
      await createTask(title, description);
    }
  };

  return (
    <div className="dashboard container animate-in">
      <header className="header">
        <div className="logo">
          <h1>TaskMaster</h1>
          <p className="text-muted">Welcome, {user.email}</p>
        </div>
        <button onClick={logout} className="btn btn-danger">Logout</button>
      </header>

      <main className="content">
        <div className="sidebar">
          <TaskForm 
            onSubmit={handleTaskSubmit} 
            initialData={editingTask} 
            onCancel={editingTask ? () => setEditingTask(null) : undefined}
          />
          
          <div className="card filters">
            <h3>Filters</h3>
            <div className="form-group">
              <label>Search</label>
              <input 
                className="input" 
                placeholder="Search tasks..." 
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select 
                className="input"
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              >
                <option value="">All Tasks</option>
                <option value="PENDING">Pending</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="tasks-list">
          <div className="list-header">
            <h2>Your Tasks</h2>
            {tasksLoading && <span className="loader-mini">Refreshing...</span>}
          </div>

          {tasks.length === 0 && !tasksLoading ? (
            <div className="empty-state card">
              <p>No tasks found. Start by creating one!</p>
            </div>
          ) : (
            <>
              {tasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  onEdit={setEditingTask}
                />
              ))}
              
              {pagination && pagination.pages > 1 && (
                <div className="pagination">
                  <button 
                    disabled={page === 1} 
                    onClick={() => setPage(p => p - 1)}
                    className="btn btn-secondary"
                  >
                    Previous
                  </button>
                  <span className="page-info">Page {page} of {pagination.pages}</span>
                  <button 
                    disabled={page === pagination.pages} 
                    onClick={() => setPage(p => p + 1)}
                    className="btn btn-secondary"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <style jsx>{`
        .dashboard { padding: 2rem 1rem; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; }
        .logo h1 { font-size: 1.5rem; margin-bottom: 0.25rem; }
        .content { display: grid; grid-template-columns: 350px 1fr; gap: 2.5rem; }
        .sidebar { display: flex; flex-direction: column; gap: 2rem; }
        .filters h3 { margin-bottom: 1.5rem; font-size: 1.125rem; }
        .form-group { margin-bottom: 1rem; }
        label { display: block; margin-bottom: 0.5rem; font-size: 0.875rem; color: var(--text-muted); }
        .list-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
        .loader-mini { font-size: 0.75rem; color: var(--primary); }
        .empty-state { text-align: center; padding: 4rem 2rem; color: var(--text-muted); }
        .pagination { display: flex; justify-content: center; align-items: center; gap: 1.5rem; margin-top: 2rem; padding: 1rem; }
        .page-info { font-size: 0.875rem; color: var(--text-muted); }
        
        @media (max-width: 900px) {
          .content { grid-template-columns: 1fr; }
          .sidebar { order: 2; }
          .tasks-list { order: 1; }
        }
      `}</style>
    </div>
  );
}
