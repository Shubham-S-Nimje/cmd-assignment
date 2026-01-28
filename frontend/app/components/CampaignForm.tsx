"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CampaignCreate, CampaignStatus } from "@/types/campaign";

interface CampaignFormProps {
  onSubmit: (data: CampaignCreate) => Promise<void>;
  loading: boolean;
  initialData: CampaignCreate;
  isEdit?: boolean;
}

export default function CampaignForm({
  onSubmit,
  loading,
  initialData,
  isEdit = false,
}: CampaignFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<CampaignCreate>(initialData);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "budget" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray mb-2">
          Campaign Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="text-black w-full px-4 py-2 border border-gray rounded-lg focus:ring-0 focus:border-transparent"
          placeholder="Enter campaign title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          rows={4}
          className="text-black  w-full px-4 py-2 border border-gray rounded-lg focus:ring-0 focus:border-transparent"
          placeholder="Enter campaign description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray mb-2">
          Status *
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="text-black  w-full px-4 py-2 border border-gray rounded-lg focus:ring-0 focus:border-transparent"
        >
          <option value={CampaignStatus.PENDING}>Pending</option>
          <option value={CampaignStatus.ACTIVE}>Active</option>
          <option value={CampaignStatus.COMPLETED}>Completed</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray mb-2">
          Budget (₹) *
        </label>
        <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="text-black  w-full px-4 py-2 border border-gray rounded-lg focus:ring-0 focus:border-transparent"
          placeholder="Enter budget amount"
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-primary hover:bg-trinary text-white px-6 py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : isEdit
              ? "Update Campaign"
              : "Create Campaign"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 bg-gray hover:bg-body text-white px-6 py-3 rounded-lg transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
