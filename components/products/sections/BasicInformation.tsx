export default function BasicInformation() {
  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8">

      <h2 className="text-2xl font-semibold text-white mb-8">
        Basic Information
      </h2>

      <div className="grid grid-cols-2 gap-6">

        {/* Product Name */}
        <div className="col-span-2">
          <label className="block text-sm text-slate-300 mb-2">
            Product Name
          </label>

          <input
            type="text"
            placeholder="MacBook Pro M4"
            className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-emerald-400"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm text-slate-300 mb-2">
            Slug
          </label>

          <input
            type="text"
            placeholder="macbook-pro-m4"
            className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white outline-none focus:border-emerald-400"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm text-slate-300 mb-2">
            Category
          </label>

          <select
            className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white outline-none focus:border-emerald-400"
          >
            <option>Select Category</option>
          </select>
        </div>

        {/* Short Description */}
        <div className="col-span-2">
          <label className="block text-sm text-slate-300 mb-2">
            Short Description
          </label>

          <textarea
            rows={3}
            placeholder="Short summary..."
            className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white outline-none resize-none focus:border-emerald-400"
          />
        </div>

        {/* Full Description */}
        <div className="col-span-2">
          <label className="block text-sm text-slate-300 mb-2">
            Full Description
          </label>

          <textarea
            rows={8}
            placeholder="Detailed product description..."
            className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white outline-none resize-none focus:border-emerald-400"
          />
        </div>

      </div>

    </div>
  );
}

//chat gpt  generated, will be removed

//this is a server component, so we can use async/await to fetch data from the database and display it in the form fields.

//we can also use the useState hook to manage the form data and update it when the user types in the input fields.