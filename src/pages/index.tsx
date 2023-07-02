import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronRightIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Layout } from "~/src/components/Layout/Layout";

const statuses = {
  offline: "text-gray-500 bg-gray-100/10",
  online: "text-green-400 bg-green-400/10",
  error: "text-rose-400 bg-rose-400/10",
};
const environments = {
  Preview: "text-gray-400 bg-gray-400/10 ring-gray-400/20",
  Production: "text-indigo-400 bg-indigo-400/10 ring-indigo-400/30",
};
const deployments = [
  {
    id: 1,
    href: "#",
    projectName: "ios-app",
    teamName: "Planetaria",
    status: "offline",
    statusText: "Initiated 1m 32s ago",
    description: "Deploys from GitHub",
    environment: "Preview",
  },
  // More deployments...
];
const activityItems = [
  {
    user: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    projectName: "ios-app",
    commit: "2d89f0c8",
    branch: "main",
    date: "1h",
    dateTime: "2023-01-23T11:00",
  },
  // More items...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <Layout>
      <>
        <main className="lg:pr-96">
          <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
            <h1 className="text-base font-semibold leading-7 text-white">
              Deployments
            </h1>

            {/* Sort dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center gap-x-1 text-sm font-medium leading-6 text-white">
                Sort by
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-50" : "",
                          "block px-3 py-1 text-sm leading-6 text-gray-900",
                        )}
                      >
                        Name
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-50" : "",
                          "block px-3 py-1 text-sm leading-6 text-gray-900",
                        )}
                      >
                        Date updated
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-50" : "",
                          "block px-3 py-1 text-sm leading-6 text-gray-900",
                        )}
                      >
                        Environment
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </header>

          {/* Deployment list */}
          <ul role="list" className="divide-y divide-white/5">
            {deployments.map((deployment) => (
              <li
                key={deployment.id}
                className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8"
              >
                <div className="min-w-0 flex-auto">
                  <div className="flex items-center gap-x-3">
                    <div
                      className={classNames(
                        statuses[deployment.status],
                        "flex-none rounded-full p-1",
                      )}
                    >
                      <div className="h-2 w-2 rounded-full bg-current" />
                    </div>
                    <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                      <a href={deployment.href} className="flex gap-x-2">
                        <span className="truncate">{deployment.teamName}</span>
                        <span className="text-gray-400">/</span>
                        <span className="whitespace-nowrap">
                          {deployment.projectName}
                        </span>
                        <span className="absolute inset-0" />
                      </a>
                    </h2>
                  </div>
                  <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                    <p className="truncate">{deployment.description}</p>
                    <svg
                      viewBox="0 0 2 2"
                      className="h-0.5 w-0.5 flex-none fill-gray-300"
                    >
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <p className="whitespace-nowrap">{deployment.statusText}</p>
                  </div>
                </div>
                <div
                  className={classNames(
                    environments[deployment.environment],
                    "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset",
                  )}
                >
                  {deployment.environment}
                </div>
                <ChevronRightIcon
                  className="h-5 w-5 flex-none text-gray-400"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>
        </main>

        {/* Activity feed */}
        <aside className="bg-black/10 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5">
          <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
            <h2 className="text-base font-semibold leading-7 text-white">
              Activity feed
            </h2>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-indigo-400"
            >
              View all
            </a>
          </header>
          <ul role="list" className="divide-y divide-white/5">
            {activityItems.map((item) => (
              <li key={item.commit} className="px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-x-3">
                  <img
                    src={item.user.imageUrl}
                    alt=""
                    className="h-6 w-6 flex-none rounded-full bg-gray-800"
                  />
                  <h3 className="flex-auto truncate text-sm font-semibold leading-6 text-white">
                    {item.user.name}
                  </h3>
                  <time
                    dateTime={item.dateTime}
                    className="flex-none text-xs text-gray-600"
                  >
                    {item.date}
                  </time>
                </div>
                <p className="mt-3 truncate text-sm text-gray-500">
                  Pushed to{" "}
                  <span className="text-gray-400">{item.projectName}</span> (
                  <span className="font-mono text-gray-400">{item.commit}</span>{" "}
                  on <span className="text-gray-400">{item.branch}</span>)
                </p>
              </li>
            ))}
          </ul>
        </aside>
      </>
    </Layout>
  );
}
