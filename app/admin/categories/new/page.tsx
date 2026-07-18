import CategoryForm from "@/components/categories/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold text-white">
        Add Category
      </h1>

      <CategoryForm />
    </div>
  );
}