import { NextPage } from "next";
import { useState } from "react";
import { api } from "~/utils/api";

const Categories: NextPage = () => {
  const { getAll, create } = api.categories;

  const categories = getAll.useQuery();
  const createCategory = create.useMutation();

  const [showContainer, setShowContainer] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = e.currentTarget.elements.namedItem("name") as HTMLInputElement;
    createCategory.mutate({ name: name.value });
    setShowContainer(false);
  };

  return (
    <div className="container mx-auto">
      <h1>
        Categories{" "}
        <button className="btn" onClick={() => setShowContainer(true)}>
          create new category
        </button>
      </h1>
      {showContainer && (
        <form
          className="container card mx-auto mt-2 mb-2 bg-base-300"
          onSubmit={handleSubmit}
        >
          <div className="card-body">
            <div className="mb-4">
              <label className="label">Name</label>
              <input
                className="input"
                id="name"
                type="text"
                placeholder="Name"
              />
            </div>
            <div className="flex">
              <button className="btn-primary btn mr-2" type="submit">
                Create
              </button>
              <button
                className="btn-error btn"
                type="button"
                onClick={() => setShowContainer(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
      <div className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Nome</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.data?.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <th>
                  <button className="btn-ghost btn-xs btn">
                    adicionar subcategoria
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
