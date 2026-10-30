import React from "react";
import { useEffect, useState } from "react";
import {
  getData,
  getById,
  addData,
  updateData,
  deleteData
} from "../services/api";

function ResourceManager({ resource, title, fields }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({});
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setError("");
      const data = await getData(resource);
      setItems(data);
    } catch (err) {
      setError("Cannot connect to JSON Server. Start it with: npm run server");
    }
  };

  useEffect(() => {
    loadData();
  }, [resource]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setForm({});
    setEditId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const missing = fields.find(
      (field) => !String(form[field.name] ?? "").trim()
    );

    if (missing) {
      alert(`Please enter ${missing.label}.`);
      return;
    }

    const data = {};
    fields.forEach((field) => {
      data[field.name] =
        field.type === "number" ? Number(form[field.name]) : form[field.name];
    });

    try {
      setLoading(true);
      if (editId !== null) {
        await updateData(resource, editId, data);
        alert(`${title} updated successfully.`);
      } else {
        await addData(resource, data);
        alert(`${title} added successfully.`);
      }
      resetForm();
      await loadData();
    } catch (err) {
      alert(err.message || "Unable to save the record.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    try {
      const record = await getById(resource, id);
      setForm(record);
      setEditId(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      alert("Could not load this record.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      await deleteData(resource, id);
      await loadData();
      if (String(editId) === String(id)) resetForm();
      alert("Record deleted successfully.");
    } catch (err) {
      alert(err.message || "Unable to delete the record.");
    }
  };

  const filteredItems = items.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <section>
      <div className="page-heading-row">
        <div>
          <div className="eyebrow">MANAGEMENT</div>
          <h1 className="page-title">{title}</h1>
          <p className="page-subtitle">Create, view, update and manage records.</p>
        </div>
        <div className="record-count">{items.length} Records</div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="content-card mb-4">
        <div className="section-title">
          <span className="section-mark"></span>
          {editId !== null ? `Edit ${title}` : `Add New ${title}`}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            {fields.map((field) => (
              <div className="col-md-6 col-lg-4 mb-3" key={field.name}>
                <label className="form-label">{field.label}</label>
                <input
                  className="form-control"
                  type={field.type || "text"}
                  name={field.name}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  value={form[field.name] ?? ""}
                  onChange={handleChange}
                  min={field.type === "number" ? "0" : undefined}
                  required
                />
              </div>
            ))}
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <button className="btn btn-primary px-4" type="submit" disabled={loading}>
              {loading ? "Please wait..." : editId !== null ? "Update Record" : "Add Record"}
            </button>
            {editId !== null && (
              <button className="btn btn-outline-secondary px-4" type="button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="content-card">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div>
            <div className="section-title mb-1">
              <span className="section-mark"></span>
              All {title}
            </div>
            <div className="small text-muted">Search and manage saved records</div>
          </div>
          <input
            className="form-control search-input"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="table-responsive mt-3">
          <table className="table align-middle portal-table">
            <thead>
              <tr>
                <th>ID</th>
                {fields.map((field) => <th key={field.name}>{field.label}</th>)}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td className="text-muted">{item.id}</td>
                  {fields.map((field) => (
                    <td key={field.name}>{item[field.name]}</td>
                  ))}
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(item.id)}>
                        Edit
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={fields.length + 2} className="text-center text-muted py-4">
                    No records found. Add a new record using the form above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ResourceManager;