
import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://muju-api.vercel.app/api";


export default function AdminPage() {
  /* ================= AUTH ================= */
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");
  const [password, setPassword] = useState("");

  const login = () => {
    if (password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      setIsAdmin(true);
    } else alert("Wrong password");
  };
  const logout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow w-80">
          <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
          <input
            type="password"
            placeholder="Admin Password"
            className="border p-2 w-full mb-4"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={login} className="w-full bg-black text-white py-2 rounded">Login</button>
        </div>
      </div>
    );
  }

  /* ================= SIDEBAR ================= */
  const [section, setSection] = useState("profile");

  /* ================= PROFILE ================= */
  const [profile, setProfile] = useState({ name: "", title: "", bio: "" });
  const [photo, setPhoto] = useState(null);
  const saveProfile = async () => {
    const fd = new FormData();
    Object.entries(profile).forEach(([k, v]) => fd.append(k, v));
    if (photo) fd.append("photo", photo);
    await axios.post(`${API}/profile`, fd);
    alert("Profile updated");
  };

  /* ================= PROJECTS ================= */
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [project, setProject] = useState({ title: "", description: "", tech: "", github: "", live: "" });
  const [projectImage, setProjectImage] = useState(null);

  const fetchProjects = async () => setProjects((await axios.get(`${API}/projects`)).data);
  const saveProject = async () => {
    const fd = new FormData();
    Object.entries(project).forEach(([k, v]) => fd.append(k, v));
    if (projectImage) fd.append("image", projectImage);
    if (editingProject) await axios.put(`${API}/projects/${editingProject}`, fd);
    else await axios.post(`${API}/projects`, fd);
    setEditingProject(null);
    setProject({ title: "", description: "", tech: "", github: "", live: "" });
    fetchProjects();
  };
  const editProject = (p) => {
    setEditingProject(p._id);
    setProject({ ...p, tech: p.tech.join(",") });
  };
  const deleteProject = async (id) => { await axios.delete(`${API}/projects/${id}`); fetchProjects(); };

  /* ================= EXPERIENCE ================= */
  const [experiences, setExperiences] = useState([]);
  const [editingExp, setEditingExp] = useState(null);
  const [experience, setExperience] = useState({ company: "", role: "", startDate: "", endDate: "", description: "" });

  const fetchExperience = async () => setExperiences((await axios.get(`${API}/experience`)).data);
  const saveExperience = async () => {
    if (editingExp) await axios.put(`${API}/experience/${editingExp}`, experience);
    else await axios.post(`${API}/experience`, experience);
    setEditingExp(null);
    setExperience({ company: "", role: "", startDate: "", endDate: "", description: "" });
    fetchExperience();
  };
  const editExperience = (e) => { setEditingExp(e._id); setExperience(e); };
  const deleteExperience = async (id) => { await axios.delete(`${API}/experience/${id}`); fetchExperience(); };

  /* ================= CERTIFICATIONS ================= */
  const [certs, setCerts] = useState([]);
  const [cert, setCert] = useState({ name: "", issuer: "", year: "" });
  const [certImage, setCertImage] = useState(null);
  const fetchCerts = async () => setCerts((await axios.get(`${API}/certifications`)).data);
  const addCert = async () => {
    const fd = new FormData();
    Object.entries(cert).forEach(([k,v]) => fd.append(k,v));
    if (certImage) fd.append("image", certImage);
    await axios.post(`${API}/certifications`, fd);
    setCert({ name: "", issuer: "", year: "" }); setCertImage(null); fetchCerts();
  };
  const deleteCert = async (id) => { await axios.delete(`${API}/certifications/${id}`); fetchCerts(); };

  /* ================= CONTACTS ================= */
  const [contacts, setContacts] = useState([]);
  const fetchContacts = async () => setContacts((await axios.get(`${API}/contact`)).data);
  const deleteContact = async (id) => { await axios.delete(`${API}/contact/${id}`); fetchContacts(); };

  /* ================= TESTIMONIALS ================= */
  const [testimonials, setTestimonials] = useState([]);
  const [testimonial, setTestimonial] = useState({ name: "", role: "", company: "", message: "", rating: 5 });
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const fetchTestimonials = async () => setTestimonials((await axios.get(`${API}/testimonials`)).data);
  const saveTestimonial = async () => {
    if (editingTestimonial) await axios.put(`${API}/testimonials/${editingTestimonial}`, testimonial);
    else await axios.post(`${API}/testimonials`, testimonial);
    setEditingTestimonial(null); setTestimonial({ name: "", role: "", company: "", message: "", rating: 5 });
    fetchTestimonials();
  };
  const editTestimonial = (t) => { setEditingTestimonial(t._id); setTestimonial(t); };
  const deleteTestimonial = async (id) => { await axios.delete(`${API}/testimonials/${id}`); fetchTestimonials(); };

  /* ================= INITIAL FETCH ================= */
  useEffect(() => { fetchProjects(); fetchExperience(); fetchCerts(); fetchContacts(); fetchTestimonials(); }, []);

  /* ================= UI ================= */
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-black text-white p-6 space-y-4">
        <h2 className="text-xl font-bold">Admin</h2>
        {["profile","projects","experience","certifications","contacts","testimonials"].map(s => (
          <button key={s} onClick={()=>setSection(s)} className={`block w-full text-left px-3 py-2 rounded ${section===s?"bg-gray-700":""}`}>
            {s.toUpperCase()}
          </button>
        ))}
        <button onClick={logout} className="mt-10 w-full bg-red-600 py-2 rounded">Logout</button>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-8 space-y-10 overflow-y-auto">
        {/* PROFILE */}
        {section==="profile" && (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <input className="border p-2 w-full mb-2" placeholder="Name" onChange={e=>setProfile({...profile,name:e.target.value})} />
            <input className="border p-2 w-full mb-2" placeholder="Title" onChange={e=>setProfile({...profile,title:e.target.value})} />
            <textarea className="border p-2 w-full mb-2" placeholder="Bio" onChange={e=>setProfile({...profile,bio:e.target.value})} />
            <input type="file" onChange={e=>setPhoto(e.target.files[0])} />
            <button onClick={saveProfile} className="mt-4 bg-black text-white px-6 py-2 rounded">Save</button>
          </div>
        )}

        {/* PROJECTS */}
        {section==="projects" && (
          <div className="bg-white p-6 rounded shadow space-y-4">
            <h2 className="text-2xl font-bold">Projects</h2>
            <input className="border p-2 w-full mb-2" placeholder="Title" value={project.title} onChange={e=>setProject({...project,title:e.target.value})} />
            <textarea className="border p-2 w-full mb-2" placeholder="Description" value={project.description} onChange={e=>setProject({...project,description:e.target.value})} />
            <input className="border p-2 w-full mb-2" placeholder="Tech" value={project.tech} onChange={e=>setProject({...project,tech:e.target.value})} />
            <input type="file" onChange={e=>setProjectImage(e.target.files[0])} />
            <button onClick={saveProject} className="bg-black text-white px-6 py-2 rounded">{editingProject?"Update":"Add"}</button>
            {projects.map(p => (
              <div key={p._id} className="flex justify-between border p-2">
                <span>{p.title}</span>
                <div className="space-x-3">
                  <button onClick={()=>editProject(p)} className="text-blue-600">Edit</button>
                  <button onClick={()=>deleteProject(p._id)} className="text-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EXPERIENCE */}
        {section==="experience" && (
          <div className="bg-white p-6 rounded shadow space-y-4">
            <h2 className="text-2xl font-bold">Experience</h2>
            <input className="border p-2 w-full mb-2" placeholder="Company" value={experience.company} onChange={e=>setExperience({...experience,company:e.target.value})} />
            <input className="border p-2 w-full mb-2" placeholder="Role" value={experience.role} onChange={e=>setExperience({...experience,role:e.target.value})} />
            <textarea className="border p-2 w-full mb-2" placeholder="Description" value={experience.description} onChange={e=>setExperience({...experience,description:e.target.value})} />
            <button onClick={saveExperience} className="bg-black text-white px-6 py-2 rounded">{editingExp?"Update":"Add"}</button>
            {experiences.map(e => (
              <div key={e._id} className="flex justify-between border p-2">
                <span>{e.company}</span>
                <div className="space-x-3">
                  <button onClick={()=>editExperience(e)} className="text-blue-600">Edit</button>
                  <button onClick={()=>deleteExperience(e._id)} className="text-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CERTIFICATIONS */}
        {section==="certifications" && (
          <div className="bg-white p-6 rounded shadow space-y-4">
            <h2 className="text-2xl font-bold">Certifications</h2>
            <input className="border p-2 w-full mb-2" placeholder="Name" value={cert.name} onChange={e=>setCert({...cert,name:e.target.value})} />
            <input className="border p-2 w-full mb-2" placeholder="Issuer" value={cert.issuer} onChange={e=>setCert({...cert,issuer:e.target.value})} />
            <input className="border p-2 w-full mb-2" placeholder="Year" value={cert.year} onChange={e=>setCert({...cert,year:e.target.value})} />
            <input type="file" accept="image/*" onChange={e=>setCertImage(e.target.files[0])} />
            <button onClick={addCert} className="bg-black text-white px-6 py-2 rounded">Add Certification</button>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {certs.map(c=>(
                <div key={c._id} className="border p-3 rounded">
                  {c.image && <img src={c.image} alt={c.name} className="h-40 w-full object-cover rounded mb-2" />}
                  <h3 className="font-bold">{c.name}</h3>
                  <p className="text-sm text-gray-600">{c.issuer} • {c.year}</p>
                  <button onClick={()=>deleteCert(c._id)} className="text-red-600 text-sm mt-2">Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACTS */}
        {section==="contacts" && (
          <div className="bg-white p-6 rounded shadow space-y-4">
            <h2 className="text-2xl font-bold">Contacts</h2>
            <div className="space-y-2">
              {contacts.map(c=>(
                <div key={c._id} className="flex justify-between border p-2">
                  <div>
                    <p className="font-bold">{c.name}</p>
                    <p className="text-sm">{c.email} {c.phone && `• ${c.phone}`}</p>
                    <p>{c.message}</p>
                  </div>
                  <button onClick={()=>deleteContact(c._id)} className="text-red-600">Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TESTIMONIALS */}
        {section==="testimonials" && (
          <div className="bg-white p-6 rounded shadow space-y-4">
            <h2 className="text-2xl font-bold">Testimonials</h2>
            <input className="border p-2 w-full mb-2" placeholder="Name" value={testimonial.name} onChange={e=>setTestimonial({...testimonial,name:e.target.value})} />
            <input className="border p-2 w-full mb-2" placeholder="Role" value={testimonial.role} onChange={e=>setTestimonial({...testimonial,role:e.target.value})} />
            <input className="border p-2 w-full mb-2" placeholder="Company" value={testimonial.company} onChange={e=>setTestimonial({...testimonial,company:e.target.value})} />
            <textarea className="border p-2 w-full mb-2" placeholder="Message" value={testimonial.message} onChange={e=>setTestimonial({...testimonial,message:e.target.value})} />
            <input type="number" min="1" max="5" value={testimonial.rating} onChange={e=>setTestimonial({...testimonial,rating:e.target.value})} className="border p-2 w-20 mb-2" />
            <button onClick={saveTestimonial} className="bg-black text-white px-6 py-2 rounded">{editingTestimonial?"Update":"Add"}</button>
            <div className="space-y-2 mt-4">
              {testimonials.map(t=>(
                <div key={t._id} className="flex justify-between border p-2">
                  <div>
                    <p className="font-bold">{t.name} - {t.role} @ {t.company}</p>
                    <p>{t.message}</p>
                    <p>Rating: {'⭐'.repeat(t.rating)}</p>
                  </div>
                  <div className="space-x-2">
                    <button onClick={()=>editTestimonial(t)} className="text-blue-600">Edit</button>
                    <button onClick={()=>deleteTestimonial(t._id)} className="text-red-600">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
