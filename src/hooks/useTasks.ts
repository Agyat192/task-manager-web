import { useState, useCallback } from 'react';
import api from '../services/api';
import { Task, TaskResponse, Pagination } from '../types';
import toast from 'react-hot-toast';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTasks = useCallback(async (params?: { page?: number; limit?: number; status?: string; search?: string }) => {
    setLoading(true);
    try {
      const { data } = await api.get<TaskResponse>('/tasks', { params });
      setTasks(data.tasks);
      setPagination(data.pagination);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (title: string, description?: string) => {
    try {
      const { data } = await api.post<Task>('/tasks', { title, description });
      // Since it's a new task, we refresh the list to get proper pagination and sorting
      toast.success('Task created');
      fetchTasks();
      return data;
    } catch (error) {
      toast.error('Failed to create task');
      throw error;
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const { data } = await api.patch<Task>(`/tasks/${id}`, updates);
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
      toast.success('Task updated');
      fetchTasks();
    } catch (error) {
      toast.error('Failed to update task');
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success('Task deleted');
      fetchTasks();
    } catch (error) {
      toast.error('Failed to delete task');
      throw error;
    }
  };

  const toggleTask = async (id: string) => {
    try {
      const { data } = await api.patch<Task>(`/tasks/${id}/toggle`);
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
      fetchTasks();
    } catch (error) {
      toast.error('Failed to toggle task');
      throw error;
    }
  };

  return {
    tasks,
    pagination,
    loading,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
  };
};
