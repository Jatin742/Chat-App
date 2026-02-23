import { useEffect } from 'react'
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import NewDM from '../new-dm/NewDM';
import { apiClient } from '@/app/lib/api-client';
import { GET_DM_CONTACTS_ROUTE } from '@/app/lib/utils/constants';
import { useAppStore } from '@/store';
import ContactList from '@/components/contact-list';
import { ContactType } from '@/enum/ContactType';
import { log } from 'console';
import { IBaseContact } from '@/interface/IBaseContact';

const ContactsContainer = () => {
  const { directMessagesContacts, setDirectMessagesContacts } = useAppStore();
  useEffect(() => {
    const getContacts = async () => {
      const response = await apiClient.get(GET_DM_CONTACTS_ROUTE, { withCredentials: true });
      if (response.data) {
        const normalizedContacts = response.data.map((user: IBaseContact) => ({
          ...user,
          contactType: ContactType.USER,
        }));
        setDirectMessagesContacts(normalizedContacts);
      }
    }
    getContacts();
  }, [])

  return (
    <div className='relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full'>
      <div className="pt-3">

      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text='Direct Messages' />
          <NewDM />
        </div>
        <div className="max-h-[38vh] overflow-auto no-scrollbar">
          <ContactList contacts={directMessagesContacts}/>
        </div>
      </div>

      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text='Channels' />
        </div>
      </div>
      <ProfileInfo />
    </div>
  )
}

export default ContactsContainer;

export const Title = ({ text }: { text: string }) => {
  return <h6 className='uppercase tracking-widest text-neutral-400 pl-10 font-light opacity-90 text-sm'>
    {text}
  </h6>;
}
