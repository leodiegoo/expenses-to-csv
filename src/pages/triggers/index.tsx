import { type NextPage } from "next";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";

type TriggerInput = {
  name: string;
  regularExpression?: string;
  description?: string;
  category: string;
  subCategory?: string;
};

const Triggers: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<TriggerInput>();
  const { getAll, create } = api.triggers;
  const { getAllWithSubcategories: getAllCategoriesWithSubcategories } =
    api.categories;

  const triggers = getAll.useQuery();
  const categories = getAllCategoriesWithSubcategories.useQuery();
  const createTrigger = create.useMutation();

  const [showContainer, setShowContainer] = useState(false);
  const categorySelected = watch("category");

  const onSubmit: SubmitHandler<TriggerInput> = async (data) => {
    const { name, category, description, regularExpression, subCategory } =
      data;
    await createTrigger.mutateAsync(
      { name, category, description, regularExpression, subCategory },
      {
        onSuccess: () => {
          void triggers.refetch();
        },
      }
    );
    reset();
  };

  return (
    <div className="container mx-auto">
      <h1>
        Triggers{" "}
        <button className="btn" onClick={() => setShowContainer(true)}>
          create new trigger
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
              <label className="label" htmlFor="regularExpression">
                Regular Expression
              </label>
              <input
                className={
                  "input" + (errors.regularExpression ? " input-error" : "")
                }
                id="regularExpression"
                type="text"
                placeholder="Regular Expression"
                {...register("regularExpression", { required: false })}
              />
              <label className="label" htmlFor="description">
                Description
              </label>
              <input
                className={"input" + (errors.description ? " input-error" : "")}
                id="description"
                type="text"
                placeholder="Description"
                {...register("description", { required: false })}
              />
              <div className="mt-4 flex flex-row">
                <div className="mr-2">
                  <label className="label" htmlFor="description">
                    Category
                  </label>
                  <select
                    className="select-bordered select"
                    {...register("category")}
                  >
                    {categories.data?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label" htmlFor="description">
                    Sub Category
                  </label>
                  <select
                    className="select-bordered select"
                    {...register("subCategory")}
                  >
                    {categories.data
                      ?.filter((category) => {
                        return category.id === categorySelected;
                      })
                      ?.map((category) => {
                        return category.Subcategory.map((subCategory) => (
                          <option key={subCategory.id} value={subCategory.id}>
                            {subCategory.name}
                          </option>
                        ));
                      })}
                  </select>
                </div>
              </div>
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
              <th>Description</th>
              <th>Regular expression</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {triggers.data?.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>
                  <span
                    className={
                      "badge" +
                      (category.status === "INACTIVE"
                        ? " badge-error"
                        : " badge-success")
                    }
                  >
                    {category.status}
                  </span>
                </td>
                <td>{category.description}</td>
                <td>{category.regularExpression || "-"}</td>
                <td>
                  <button className="btn-ghost btn-xs btn">
                    adicionar ---
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

export default Triggers;
