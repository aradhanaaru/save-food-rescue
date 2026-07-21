import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createListing } from "../services/listings";
import { geocodeAddress } from "../services/geocode";

function DonorPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    foodName: "",
    quantity: "",
    foodType: "",
    pickupLocation: "",
    availableUntil: "",
    details: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const coords = await geocodeAddress(formData.pickupLocation);
      await createListing({
        ...formData,
        lat: coords?.lat ?? null,
        lng: coords?.lng ?? null,
      });
      navigate("/recipient");
    } catch (err) {
      console.error("Failed to create listing:", err);
      alert("Couldn't create the listing. Check the console for details.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-white border border-ink/15 rounded-lg px-4 py-2.5 text-ink placeholder:text-ink/35 focus:outline-none focus:ring-2 focus:ring-marigold/40 focus:border-marigold transition-colors";
  const labelClass = "text-sm font-medium text-ink/70 mb-1.5 block";

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <p className="text-sm font-medium text-marigold-dark tracking-wide">DONOR</p>
      <h1 className="text-3xl font-medium mt-2">Save surplus food</h1>
      <p className="text-ink/60 mt-2">
        List available food so an NGO nearby can claim and collect it.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 bg-white rounded-card border border-ink/10 p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Food name</label>
            <input type="text" name="foodName" value={formData.foodName} onChange={handleChange} placeholder="Rice and vegetable curry" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Quantity (servings)</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="12" className={inputClass} required />
          </div>
        </div>

        <div>
          <label className={labelClass}>Food type</label>
          <select name="foodType" value={formData.foodType} onChange={handleChange} className={inputClass} required>
            <option value="">Select food type</option>
            <option value="Cooked Food">Cooked food</option>
            <option value="Packaged Food">Packaged food</option>
            <option value="Bakery Items">Bakery items</option>
            <option value="Fruits and Vegetables">Fruits and vegetables</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Pickup location</label>
          <input type="text" name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} placeholder="Gandhipuram, Coimbatore" className={inputClass} required />
          <p className="text-xs text-ink/40 mt-1">Use a real place name or area so it can be located on the map.</p>
        </div>

        <div>
          <label className={labelClass}>Available until</label>
          <input type="datetime-local" name="availableUntil" value={formData.availableUntil} onChange={handleChange} className={inputClass} required />
        </div>

        <div>
          <label className={labelClass}>Additional details</label>
          <textarea name="details" value={formData.details} onChange={handleChange} placeholder="Add details about the food..." rows="4" className={inputClass} />
        </div>

        <button type="submit" disabled={submitting} className="w-full bg-marigold hover:bg-marigold-dark text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-60">
          {submitting ? "Posting..." : "Create food listing"}
        </button>
      </form>
    </main>
  );
}

export default DonorPage;