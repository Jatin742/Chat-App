import { ContactListProps } from '@/interface/ContactListProps';
import { useAppStore } from '@/store';
import { Avatar, AvatarImage } from './ui/avatar';
import { HOST } from '@/app/lib/utils/constants';
import { getColor } from '@/app/lib/utils/colors';
import { IBaseContact } from '@/interface/IBaseContact';
import { ContactStrategyFactory } from '@/factory/ContactStrategyFactory';

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
    const { selectedChatData, setSelectedChatData, setSelectedChatType, selectedChatType, setSelectedChatMessages } = useAppStore();
    
    const handleContactClick = (contact: IBaseContact) => {
        if (selectedChatData && selectedChatData._id !== contact._id) {
            setSelectedChatMessages([]);
        }
        setSelectedChatType(contact.contactType)
        setSelectedChatData(contact);    
    }
    return (
        <div className='mt-5'>
            {contacts.map((contact) => {
                const strategy = ContactStrategyFactory.getStrategy(contact);
                const details = strategy.getDetails(contact);
                
                return (
                <div key={contact._id} className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${selectedChatData?._id === contact._id ? 'bg-[#8417ff] hover:bg-[#8417ff]' : 'hover:bg-[#f1f1f111] '}`} onClick={() => handleContactClick(contact)}>
                    <div className="flex gap-5 items-center justify-start text-neutral-300">
                        {(details.image !== undefined || details.color !== undefined)  &&
                            <Avatar className='h-10 w-10 rounded-full overflow-hidden'>
                                {
                                    details.image ?
                                        <AvatarImage
                                            src={`${HOST}/${details.image}`}
                                            alt='profile'
                                            className='object-cover w-full h-full bg-black' />
                                        :
                                        <div
                                            className={`
                                                ${selectedChatData?._id === contact._id ? 'bg-[ffffff22] border border-white/70' : getColor(details?.color ?? 0)}
                                                uppercase h-10 w-10 text-lg border flex items-center justify-center rounded-full ${getColor(details.color ?? 0)}`}
                                        >
                                            {
                                                details.name.charAt(0)
                                            }
                                        </div>
                                }
                            </Avatar>
                        }
                        <span >
                            {details.name}
                        </span>
                    </div>
                </div>
                )
            })}
        </div>
    )
}

export default ContactList