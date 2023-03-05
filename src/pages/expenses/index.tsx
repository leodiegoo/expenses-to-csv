import { type NextPage } from "next";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";

type ExpensesInput = {
  amount: number;
  date: string;
  description: string;
};

const Expenses: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ExpensesInput>();
  const { getAll, create } = api.expenses;

  const expenses = getAll.useQuery();
  const createExpense = create.useMutation();

  const [showContainer, setShowContainer] = useState(false);

  const onSubmit: SubmitHandler<ExpensesInput> = async (data) => {
    const { amount, date, description } = data;
    await createExpense.mutateAsync(
      { amount: Number(amount), date, description },
      {
        onSuccess: () => {
          void expenses.refetch();
        },
      }
    );
    reset();
  };

  return (
    <div className="container mx-auto">
      <h1>
        Expenses{" "}
        <button className="btn" onClick={() => setShowContainer(true)}>
          create new expense
        </button>
      </h1>
      {showContainer && (
        <form
          className="container card mx-auto mt-2 mb-2 bg-base-300"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="card-body">
            <div className="mb-4">
              <label className="label" htmlFor="description">
                Description
              </label>
              <input
                className={"input" + (errors.description ? " input-error" : "")}
                id="description"
                type="text"
                placeholder="Description"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    Field required
                  </span>
                </label>
              )}
            </div>
            <div className="mb-4">
              <label className="label" htmlFor="amount">
                Amount
              </label>
              <input
                className={"input" + (errors.amount ? " input-error" : "")}
                id="amount"
                type="number"
                min="1"
                step="any"
                placeholder="Amount"
                {...register("amount", { required: true })}
              />
              {errors.amount && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    Field required
                  </span>
                </label>
              )}
            </div>
            <div className="mb-4">
              <label className="label" htmlFor="date">
                Date
              </label>
              <input
                className={"input" + (errors.date ? " input-error" : "")}
                id="date"
                type="date"
                placeholder="Date"
                {...register("date", { required: true })}
              />
              {errors.date && (
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
              <th>Description</th>
              <th>Status</th>
              <th>Date</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {expenses.data?.map((category) => (
              <tr key={category.id}>
                <td>{category.description}</td>
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
                <td>{category.date.toLocaleDateString()}</td>
                <td>{category.amount}</td>
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

export default Expenses;
