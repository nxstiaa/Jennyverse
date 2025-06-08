"use client";
import { useState } from 'react';

const AMOUNTS = ["", "1/4", "1/2", "3/4", "1", "1 1/4", "1 1/2", "2", "2 1/2", "3", "4"]; 
const UNITS = ["", "teaspoon", "tablespoon", "cup", "ml", "l", "g", "kg", "oz", "lb", "pinch", "dash", "piece", "clove", "slice"];

export default function SubmitRecipe() {
  const [password, setPassword] = useState('');
  const [access, setAccess] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([
    { amount: '', unit: '', name: '' }
  ]);
  const [steps, setSteps] = useState(['']);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [aiText, setAiText] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const correctPassword = 'jennyverse2024'; // Change this to your secret password

  function handlePassword(e: React.FormEvent) {
    e.preventDefault();
    if (password === correctPassword) {
      setAccess(true);
      setError('');
    } else {
      setError('Incorrect password.');
    }
  }

  function handleIngredientChange(idx: number, field: string, value: string) {
    setIngredients(ingredients => ingredients.map((ing, i) => i === idx ? { ...ing, [field]: value } : ing));
  }

  function addIngredient() {
    setIngredients([...ingredients, { amount: '', unit: '', name: '' }]);
  }

  function removeIngredient(idx: number) {
    setIngredients(ingredients => ingredients.filter((_, i) => i !== idx));
  }

  function handleStepChange(idx: number, value: string) {
    setSteps(steps => steps.map((step, i) => i === idx ? value : step));
  }

  function addStep() {
    setSteps([...steps, '']);
  }

  function removeStep(idx: number) {
    setSteps(steps => steps.filter((_, i) => i !== idx));
  }

  async function handleAiExtract(e: React.FormEvent) {
    e.preventDefault();
    if (!aiText.trim()) return;
    setAiLoading(true);
    setError('');
    try {
      const res = await fetch('/api/extract-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: aiText })
      });
      if (!res.ok) throw new Error('Failed to extract recipe');
      const data = await res.json();
      setTitle(data.title || '');
      setDescription(data.description || '');
      setIngredients(data.ingredients || [{ amount: '', unit: '', name: '' }]);
      setSteps(data.steps || ['']);
    } catch (err) {
      setError('AI extraction failed.');
    } finally {
      setAiLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Here you would send the recipe to your backend or a service
    setSubmitted(true);
  }

  if (submitted) {
    return <div className="max-w-lg mx-auto mt-16 text-center text-xl">Recipe submitted! Thank you.</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-16 p-6 bg-white rounded-xl shadow-md">
      {!access ? (
        <form onSubmit={handlePassword} className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Enter Password to Submit Recipe</h2>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="btn-primary w-full">Unlock</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Submit a New Recipe</h2>

          {/* AI Extraction Section */}
          <div>
            <label className="block font-semibold mb-2">Paste recipe text (optional, powered by AI)</label>
            <textarea
              value={aiText}
              onChange={e => setAiText(e.target.value)}
              placeholder="Paste a recipe here and click 'Auto-fill with AI'"
              className="w-full border rounded px-3 py-2 mb-2"
              rows={3}
            />
            <button type="button" className="btn-primary" onClick={handleAiExtract} disabled={aiLoading}>
              {aiLoading ? 'Extracting...' : 'Auto-fill with AI'}
            </button>
          </div>

          <input
            type="text"
            name="title"
            placeholder="Recipe Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          <textarea
            name="description"
            placeholder="Short Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          <div>
            <label className="block font-semibold mb-2">Ingredients</label>
            {ingredients.map((ing, idx) => (
              <div key={idx} className="flex space-x-2 mb-2">
                <select
                  value={ing.amount}
                  onChange={e => handleIngredientChange(idx, 'amount', e.target.value)}
                  className="border rounded px-2 py-1 w-20"
                >
                  <option value="">Amount</option>
                  {AMOUNTS.filter(a => a).map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                <select
                  value={ing.unit}
                  onChange={e => handleIngredientChange(idx, 'unit', e.target.value)}
                  className="border rounded px-2 py-1 w-28"
                >
                  <option value="">Unit</option>
                  {UNITS.filter(u => u).map(u => <option key={u} value={u}>{u}</option>)}
                </select>
                <input
                  type="text"
                  value={ing.name}
                  onChange={e => handleIngredientChange(idx, 'name', e.target.value)}
                  placeholder="Ingredient"
                  className="border rounded px-2 py-1 flex-1"
                  required
                />
                {ingredients.length > 1 && (
                  <button type="button" onClick={() => removeIngredient(idx)} className="text-red-500 px-2">&times;</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addIngredient} className="btn-primary mt-2">Add Ingredient</button>
            {/* Preview ingredient list */}
            <ul className="mt-2 text-sm text-gray-700">
              {ingredients.filter(ing => ing.name).map((ing, idx) => (
                <li key={idx}>
                  {ing.amount && ing.amount + ' '}{ing.unit && ing.unit + ' '}{ing.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <label className="block font-semibold mb-2">Steps</label>
            {steps.map((step, idx) => (
              <div key={idx} className="flex space-x-2 mb-2">
                <textarea
                  value={step}
                  onChange={e => handleStepChange(idx, e.target.value)}
                  placeholder={`Step ${idx + 1}`}
                  className="border rounded px-2 py-1 flex-1"
                  required
                />
                {steps.length > 1 && (
                  <button type="button" onClick={() => removeStep(idx)} className="text-red-500 px-2">&times;</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addStep} className="btn-primary mt-2">Add Step</button>
          </div>
          <button type="submit" className="btn-primary w-full">Submit Recipe</button>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </form>
      )}
    </div>
  );
} 