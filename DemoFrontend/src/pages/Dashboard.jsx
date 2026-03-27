import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

import { getLeads, createLead, updateLead, deleteLead } from "../api/leadsApi";
import { createTask, getTasks, updateTask, deleteTask } from "../api/taskApi";

export default function Dashboard() {
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);

  const [addingLead, setAddingLead] = useState(false);
  const [addingTask, setAddingTask] = useState(false);
  const [deletingLeadId, setDeletingLeadId] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  const [leads, setLeads] = useState([]);
  const [newLead, setNewLead] = useState({ name: "", status: "New" });
  const [editingLead, setEditingLead] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", status: "Pending" });
  const [editingTask, setEditingTask] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchLeads();
    fetchTasks();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoadingLeads(true);
      const data = await getLeads();
      setLeads(data);
    } catch (err) {
      toast.error("Failed to fetch leads");
    } finally {
      setLoadingLeads(false);
    }
  };

  const fetchTasks = async () => {
    try {
      setLoadingTasks(true);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoadingTasks(false);
    }
  };

  const handleAddLead = async () => {
    if (!newLead.name.trim()) return toast.error("Name required");

    try {
      setAddingLead(true);
      const lead = await createLead(newLead);
      setLeads([lead, ...leads]);
      setNewLead({ name: "", status: "New" });
      toast.success("Lead added");
    } catch (err) {
      toast.error("Failed to add lead");
    } finally {
      setAddingLead(false);
    }
  };

  const handleUpdateLead = async (id) => {
    if (!editingLead.name.trim()) return toast.error("Name required");

    try {
      const updated = await updateLead(id, editingLead);
      setLeads(leads.map((l) => (l._id === id ? updated : l)));
      setEditingLead(null);
      toast.success("Lead updated");
    } catch (err) {
      toast.error("Failed to update lead");
    }
  };

  const handleDeleteLead = async (id) => {
    try {
      setDeletingLeadId(id);
      await deleteLead(id);
      setLeads(leads.filter((l) => l._id !== id));
      toast.success("Lead deleted");
    } catch (err) {
      toast.error("Failed to delete lead");
    } finally {
      setDeletingLeadId(null);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.title.trim()) return toast.error("Title required");

    try {
      setAddingTask(true);
      const task = await createTask(newTask);
      setTasks([task, ...tasks]);
      setNewTask({ title: "", status: "Pending" });
      toast.success("Task added");
    } catch (err) {
      toast.error("Failed to add task");
    } finally {
      setAddingTask(false);
    }
  };

  const handleUpdateTask = async (id) => {
    if (!editingTask.title.trim()) return toast.error("Title required");

    try {
      const updated = await updateTask(id, editingTask);
      setTasks(tasks.map((t) => (t._id === id ? updated : t)));
      setEditingTask(null);
      toast.success("Task updated");
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      setDeletingTaskId(id);
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
      toast.success("Task deleted");
    } catch (err) {
      toast.error("Failed to delete task");
    } finally {
      setDeletingTaskId(null);
    }
  };

  // FULL PAGE LOADING
  if (loadingLeads || loadingTasks) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-2">
          Welcome, {user?.name || "User"} 👋
        </h1>
        <p className="text-gray-600 mb-6">Here is your dashboard overview</p>

        {/* LEADS */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-3">Leads</h2>

          <div className="flex gap-2 mb-4 flex-wrap">
            <input
              className="border p-2 flex-1 rounded"
              placeholder="New lead name"
              value={newLead.name}
              onChange={(e) =>
                setNewLead({ ...newLead, name: e.target.value })
              }
            />
            <select
              className="border p-2 rounded"
              value={newLead.status}
              onChange={(e) =>
                setNewLead({ ...newLead, status: e.target.value })
              }
            >
              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
            </select>

            <button
              onClick={handleAddLead}
              disabled={addingLead}
              className="bg-purple-600 text-white px-4 rounded disabled:opacity-50"
            >
              {addingLead ? "Adding..." : "Add"}
            </button>
          </div>

          {leads.length === 0 ? (
            <p>No leads yet</p>
          ) : (
            <div className="space-y-2">
              {leads.map((lead) => (
                <div
                  key={lead._id}
                  className="flex items-center justify-between border p-2 rounded flex-wrap"
                >
                  {editingLead?._id === lead._id ? (
                    <>
                      <input
                        className="border p-1 rounded flex-1"
                        value={editingLead.name}
                        onChange={(e) =>
                          setEditingLead({ ...editingLead, name: e.target.value })
                        }
                      />
                      <select
                        className="border p-1 rounded"
                        value={editingLead.status}
                        onChange={(e) =>
                          setEditingLead({
                            ...editingLead,
                            status: e.target.value,
                          })
                        }
                      >
                        <option>New</option>
                        <option>Contacted</option>
                        <option>Qualified</option>
                      </select>
                      <button
                        onClick={() => handleUpdateLead(lead._id)}
                        className="text-green-600 px-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingLead(null)}
                        className="text-red-600 px-2"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex-1">
                        <p className="font-medium">{lead.name}</p>
                        <p className="text-sm text-gray-500">{lead.status}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingLead(lead)}
                          className="text-blue-600 px-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteLead(lead._id)}
                          className="text-red-600 px-2"
                        >
                          {deletingLeadId === lead._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* TASKS */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-3">Tasks</h2>

          <div className="flex gap-2 mb-4 flex-wrap">
            <input
              className="border p-2 flex-1 rounded"
              placeholder="New task title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
            <select
              className="border p-2 rounded"
              value={newTask.status}
              onChange={(e) =>
                setNewTask({ ...newTask, status: e.target.value })
              }
            >
              <option>Pending</option>
              <option>Completed</option>
            </select>

            <button
              onClick={handleAddTask}
              disabled={addingTask}
              className="bg-green-600 text-white px-4 rounded disabled:opacity-50"
            >
              {addingTask ? "Adding..." : "Add"}
            </button>
          </div>

          {tasks.length === 0 ? (
            <p>No tasks yet</p>
          ) : (
            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="flex items-center justify-between border p-2 rounded flex-wrap"
                >
                  {editingTask?._id === task._id ? (
                    <>
                      <input
                        className="border p-1 rounded flex-1"
                        value={editingTask.title}
                        onChange={(e) =>
                          setEditingTask({
                            ...editingTask,
                            title: e.target.value,
                          })
                        }
                      />
                      <select
                        className="border p-1 rounded"
                        value={editingTask.status}
                        onChange={(e) =>
                          setEditingTask({
                            ...editingTask,
                            status: e.target.value,
                          })
                        }
                      >
                        <option>Pending</option>
                        <option>Completed</option>
                      </select>
                      <button
                        onClick={() => handleUpdateTask(task._id)}
                        className="text-green-600 px-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingTask(null)}
                        className="text-red-600 px-2"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex-1">
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-gray-500">{task.status}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingTask(task)}
                          className="text-blue-600 px-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task._id)}
                          className="text-red-600 px-2"
                        >
                          {deletingTaskId === task._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}