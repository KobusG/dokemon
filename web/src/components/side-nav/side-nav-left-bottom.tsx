import {
  UserCircleIcon,
} from "@heroicons/react/24/outline"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useNavigate } from "react-router-dom"
import apiBaseUrl from "@/lib/api-base-url"
import axios from "axios"
import { cn, toastFailed } from "@/lib/utils"
import { DownloadIcon, FileTextIcon, Globe2Icon } from "lucide-react"

export function SideNavLeftBottom() {
  const navigate = useNavigate()

  async function handleSignout() {
    try {
      await axios(`${apiBaseUrl()}/users/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      navigate("/login")
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toastFailed(e.response?.data.errors?.body)
      }
    }
  }

  return (
    <ul role="list" className="-mx-2 space-y-1">
      <li>
        <a
          href={'http://'+window.location.hostname+':1984'}
          target="_blank"
          className={cn( "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-200 hover:bg-gray-800 hover:text-white" )}
        >
          <DownloadIcon
            className="h-6 w-6 shrink-0 text-red-500"
            aria-hidden="true"
          />
          Stream WebRTC
        </a>
      </li>
      <li>
        <a
          href={'http://'+window.location.hostname+':8080'}
          target="_blank"
          className={cn( "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-200 hover:bg-gray-800 hover:text-white" )}
        >
          <DownloadIcon
            className="h-6 w-6 shrink-0 text-red-500"
            aria-hidden="true"
          />
          UPDATE
        </a>
      </li>
      <li>
        <a
          href="https://videology-inc.atlassian.net/wiki/spaces/SUD/overview"
          target="_blank"
          className={cn( "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-200 hover:bg-gray-800 hover:text-white" )}
        >
          <FileTextIcon
            className="h-6 w-6 shrink-0 text-red-500"
            aria-hidden="true"
          />
          SCAiLX USER-GUIDE
        </a>
      </li>
      <li>
        <a
          href="https://www.videologyinc.com/"
          target="_blank"
          className={cn( "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white" )}
        >
          <Globe2Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
          VideologyInc
        </a>
      </li>
      <li>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <a
              href="#"
              className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:text-white focus:outline-none"
            >
              <UserCircleIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
              {localStorage.getItem("userName")}
            </a>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem
              onClick={() => {
                navigate("/changepassword")
              }}
            >
              Change Password
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignout}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </li>
    </ul>
  )
}
