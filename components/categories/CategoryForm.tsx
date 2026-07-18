"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

type Category = {
  name: string;
  slug: string;
  description: string;
  featured: boolean;
};

type Props = {
  initialData?: Category;
  categoryId?: string;
};

export default function CategoryForm({
  initialData,
  categoryId,
}: Props) {
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState<Category>(
    initialData ?? {
      name: "",
      slug: "",
      description: "",
      featured: false,
    }
  );

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const data = {
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      featured: formData.featured,
    };

    let error;

    if (categoryId) {
      ({ error } = await supabase
        .from("categories")
        .update(data)
        .eq("id", categoryId));
    } else {
      ({ error } = await supabase
        .from("categories")
        .insert([data]));
    }

    setLoading(false);

    if (error) {
      console.error(error);
      return;
    }

    router.push("/admin/categories");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl space-y-6"
    >
      <input
        placeholder="Category Name"
        value={formData.name}
        onChange={(e) =>
          setFormData({
            ...formData,
            name: e.target.value,
          })
        }
        className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 text-white"
      />

      <input
        placeholder="Slug"
        value={formData.slug}
        onChange={(e) =>
          setFormData({
            ...formData,
            slug: e.target.value,
          })
        }
        className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 text-white"
      />

      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({
            ...formData,
            description: e.target.value,
          })
        }
        className="h-40 w-full rounded-xl border border-slate-700 bg-slate-900 p-4 text-white"
      />

      <label className="flex items-center gap-3 text-white">
        <input
          type="checkbox"
          checked={formData.featured}
          onChange={(e) =>
            setFormData({
              ...formData,
              featured: e.target.checked,
            })
          }
        />

        Featured Category
      </label>

      <button
        className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-slate-950"
      >
        {loading ? "Saving..." : "Save Category"}
      </button>
    </form>
  );
}