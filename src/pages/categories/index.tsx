import { type NextPage } from "next";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";

type CategoryInput = {
  name: string;
  type: "INCOME" | "EXPENSE";
};

const Categories: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryInput>();
  const { getAll, create } = api.categories;

  const categories = getAll.useQuery();
  const createCategory = create.useMutation();

  const [showContainer, setShowContainer] = useState(false);

  const onSubmit: SubmitHandler<CategoryInput> = async (data) => {
    const { name } = data;
    await createCategory.mutateAsync(
      { name },
      {
        onSuccess: () => {
          void categories.refetch();
        },
      }
    );
    reset();
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="card-body">
            <div className="mb-4">
              <label className="label" htmlFor="name">
                Name
              </label>
              <input
                className={"input" + (errors.name ? " input-error" : "")}
                id="name"
                type="text"
                placeholder="Name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    Field required
                  </span>
                </label>
              )}
            </div>
            <div className="flex">
              <button className="btn-primary btn mr-2" type="submit">
                Create
              </button>
              <button
                className="btn-error btn"
                type="reset"
                onClick={() => {
                  setShowContainer(false);
                  reset();
                }}
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
              <th>Name</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.data?.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>
                  <span
                    className={
                      "badge" +
                      (category.type === "EXPENSE"
                        ? " badge-error"
                        : " badge-success")
                    }
                  >
                    {category.type}
                  </span>
                </td>
                <td>
                  <button className="btn-ghost btn-xs btn">
                    adicionar subcategoria
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
