import { ContactListProps } from '@/interface/ContactListProps';
import { IUser } from '@/interface/IUser';
import { useAppStore } from '@/store';
import { Avatar, AvatarImage } from './ui/avatar';
import { HOST } from '@/app/lib/utils/constants';
import { getColor } from '@/app/lib/utils/colors';

const ContactList: React.FC<ContactListProps> = ({ contacts, isChannel = false }) => {
    const { selectedChatData, setSelectedChatData, setSelectedChatType, selectedChatType, setSelectedChatMessages } = useAppStore();
    const handleContactClick = (contact: IUser) => {
        if (isChannel) {
            setSelectedChatType('channel');
        }
        else {
            setSelectedChatType('contact');
        }
        setSelectedChatData(contact);
        if (selectedChatData && selectedChatData._id !== contact._id) {
            setSelectedChatMessages([]);
        }

    }
    return (
        <div className='mt-5'>
            {contacts.map((contact) => (
                <div key={contact._id} className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${selectedChatData?._id === contact._id ? 'bg-[#8417ff] hover:bg-[$8417ff]' : 'hover:bg-[#f1f1f111] '}`} onClick={() => handleContactClick(contact)}>
                    <div className="flex gap-5 items-center justify-start text-neutral-300">
                        {!isChannel &&
                            <Avatar className='h-10 w-10 rounded-full overflow-hidden'>
                                {
                                    contact?.image ?
                                        <AvatarImage
                                            src={`${HOST}/${contact.image}`}
                                            alt='profile'
                                            className='object-cover w-full h-full bg-black' />
                                        :
                                        <div
                                            className={`
                                                ${selectedChatData?._id === contact._id ? 'bg-[ffffff22] border border-white/70' : getColor(contact?.color ?? 0)}
                                                uppercase h-10 w-10 text-lg border flex items-center justify-center rounded-full ${getColor(contact?.color ?? 0)}`}
                                        >
                                            {contact?.firstName ? contact.firstName.split("").shift() :
                                                contact?.email.split("").shift()
                                            }
                                        </div>
                                }
                            </Avatar>
                        }
                        {
                            isChannel ? <span >
                                {contact.name}
                            </span>
                            :
                            <span>
                                {contact.firstName} {contact.lastName}
                            </span>
                        }
                    </div>

                </div>
            ))}
        </div>
    )
}

export default ContactList