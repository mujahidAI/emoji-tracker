// frontend/src/App.jsx
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import AddMood from "./pages/AddMood.jsx";
import EditMood from "./pages/EditMood.jsx";

import {
  fetchMoods,
  createMood,
  updateMood,
  deleteMood,
} from "./api.js";

function App() {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    loadMoods();
  }, []);

  async function loadMoods() {
    const data = await fetchMoods();
    setMoods(data);
  }

  async function handleCreateMood(mood) {
    await createMood(mood);
    loadMoods();
  }

  async function handleUpdateMood(id, mood) {
    await updateMood(id, mood);
    loadMoods();
  }

  async function handleDeleteMood(id) {
    await deleteMood(id);
    loadMoods();
  }

  return (
    <Routes>
      <Route path="/" element={<Home moods={moods} />} />
      <Route path="/add" element={<AddMood createMood={handleCreateMood} />} />
      <Route
        path="/moods/:id"
        element={
          <EditMood
            moods={moods}
            updateMood={handleUpdateMood}
            deleteMood={handleDeleteMood}
          />
        }
      />
    </Routes>
  );
}

export default App;
