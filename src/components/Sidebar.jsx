
import { Languages } from "lucide-react";
import { SidebarData } from "../constants";

const Sidebar = () => {
    return (
  <aside class="fixed bottom-0 top-16 left-0 bg-neutral-900 shadow-md w-60 animate-slide rounded-r-xl">
    <div class="flex flex-col justify-between h-full">
      <div class="flex-grow">
        <div class="px-4 py-6 text-center border-b">
          <h1 class="text-xl font-bold leading-none text-b text-yellow-700">Task Manager</h1>
        </div>
        {/* Sidebar options  */}
        <div class="p-4">
          <ul class="space-y-1">
            {SidebarData.map((item, index) => (
            <li key={index}>
              <a href="" class="flex bg-gray-400 hover:bg-violet-400 rounded-xl font-bold text-sm text-gray-900 py-3 px-4">
                <span width="1em" height="1em" fill="currentColor" class="text-lg mr-4">
                    {item.icon}
                </span> 
                {item.title}
              </a>
            </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Logout Button  */}
      <div class="p-4">
        <button type="button" class="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-gray-900 text-violet-500
         hover:text-white  text-sm font-semibold transition">
            <Languages />
        </button> <span class="font-bold text-sm ml-2 text-black">Logout</span>
      </div>
    </div>
  </aside>
    )
}

export default Sidebar;