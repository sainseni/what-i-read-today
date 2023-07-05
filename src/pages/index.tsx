import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { useForm } from "react-hook-form";

import { Layout } from "~/src/components/Layout/Layout";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/src/components/ui/tooltip";
import { useToast } from "~/src/components/ui/use-toast";
import { api } from "~/src/utils/api";

export default function Page() {
  return (
    <Layout>
      <>
        <main>
          <header className=" flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
            <h1 className="text-base font-semibold leading-7 text-white">
              Dashboard
            </h1>

            {/* Sort dropdown */}
          </header>

          {/* Deployment list */}

          <div className="relative items-center px-4 py-4 sm:px-6 lg:px-8">
            <ButtonAddLink />
            <ReadList />
          </div>
        </main>
      </>
    </Layout>
  );
}

const ButtonAddLink = () => {
  const { register, handleSubmit, resetField } = useForm<{
    link: string;
  }>({});

  const createMutation = api.link.create.useMutation();
  const utils = api.useContext();

  const { toast } = useToast();

  const onSubmit = handleSubmit(async (data) => {
    const { link } = data;
    await createMutation
      .mutateAsync({
        link,
      })
      .then(() => {
        toast({
          title: "Success",
          description: "Link added",
        });
        resetField("link");
        utils.link.getAll.refetch();
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
        });
      });
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="py-4 w-full">
        <label
          htmlFor="link"
          className="block text-sm font-medium leading-6 text-white"
        >
          Add Link
        </label>
        <div className="mt-2 flex space-x-2">
          <input
            type="text"
            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            {...register("link")}
          />
          <button
            type="submit"
            disabled={createMutation.isLoading}
            className="disabled:opacity-50 disabled:cursor-not-allowed
            w-24 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

const ReadList = () => {
  const { data } = api.link.getAll.useQuery(
    {},
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  const deleteMutation = api.link.delete.useMutation();

  const utils = api.useContext();

  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    await deleteMutation
      .mutateAsync({ id })
      .then(() => {
        toast({
          title: "Success",
          description: "Link deleted",
        });
        utils.link.getAll.refetch();
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
        });
      });
  };

  return (
    <div className="mt-8 flow-root">
      <div className=" -my-2 overflow-x-auto ">
        <div className="inline-block min-w-full py-2 align-middle ">
          <table className="min-w-full divide-y divide-white/30">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-white lg:table-cell"
                >
                  URL
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-white sm:table-cell"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20 ">
              {data?.map((item) => (
                <tr key={item.id} className="text-white ">
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium sm:w-auto sm:max-w-none sm:pl-0 text-white">
                    {item.title}
                    <dl className="font-light lg:hidden">
                      <dt className="sr-only">URL</dt>
                      {/* MOBILE */}
                      <dd className="mt-1 truncate text-white/80 max-w-xs">
                        {item.url}
                      </dd>
                      <dt className="sr-only sm:hidden">Date</dt>
                      {/* MOBILE */}
                      <dd className="mt-1 truncate max-w-sm sm:hidden text-white/70 ">
                        {format(item.createdAt, "d MMMM yyyy")}
                      </dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm lg:table-cell max-w-xs truncate">
                    <a href={item.url}>{item.url}</a>
                  </td>
                  <td className="hidden px-3 py-4 text-sm sm:table-cell">
                    {format(item.createdAt, "d MMMM yyyy")}
                  </td>
                  <td className="px-3 py-4 text-sm ">
                    <div className="flex justify-center items-center space-x-3">
                      <PencilSquareIcon className="lg:w-4 lg:h-4 w-5 h-5 text-indigo-500" />

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <button
                              aria-label="Delete"
                              onClick={() => handleDelete(item.id)}
                            >
                              <TrashIcon className="lg:w-4 lg:h-4 w-5 h-5 text-red-500" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Remove link</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
