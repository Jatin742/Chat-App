import { getColor } from "@/app/lib/utils/colors";
import { HOST } from "@/app/lib/utils/constants";
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useAppStore } from "@/store";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"
import { FiEdit2 } from "react-icons/fi";

const ProfileInfo = () => {
  const { userInfo } = useAppStore();

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-12 h-12 relative overflow-hidden">
          <Avatar className='h-12 w-12 rounded-full overflow-hidden'>
            {
              userInfo?.image ?
                <AvatarImage
                  src={`${HOST}/${userInfo.image}`}
                  alt='profile'
                  className='object-cover w-full h-full bg-black' />
                :
                <div
                  className={`uppercase h-12 w-12 text-lg border flex items-center justify-center rounded-full ${getColor(userInfo?.color ?? 0)}`}
                >
                  {userInfo?.firstName ? userInfo.firstName.split("").shift() :
                    userInfo?.email.split("").shift()
                  }
                </div>
            }
          </Avatar>
        </div>
        <div>
          {
            userInfo?.firstName && userInfo?.lastName ?
              `${userInfo.firstName} ${userInfo.lastName}`
              :
              ""
          }
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <FiEdit2 className="text-purple-500 text-xl font-medium"/>
           </TooltipTrigger>

          <TooltipContent
            className="bg-[#1c1b1e] border-none text-white"
            showArrow={false}
          >
            Edit Profile
          </TooltipContent>
        </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
// "uploads/profiles/1770548002198Photo-white-bcg-min.jpg"
export default ProfileInfo