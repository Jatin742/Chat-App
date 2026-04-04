"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store";
import { apiClient } from "../lib/api-client";
import { GET_USER_INFO } from "../lib/utils/constants";
import { useRouter } from "next/navigation";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userInfo, setUserInfo } = useAppStore();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        const getUserData = async ()=>{
            try {
                const response = await apiClient.get(GET_USER_INFO, {
                    withCredentials: true,
                });
                
                if(response.status===200 && response.data._id){
                    setUserInfo(response.data);
                }
                else{
                    setUserInfo(undefined);
                    router.push('/auth');

                }
            } catch (error) {
                router.push('/auth');  
            }
            finally {
                setLoading(false);
            }
        }
        if(!userInfo){
            setLoading(true);
            getUserData();
        }
        else{
            setLoading(false);
        }
    }, []);
    if(loading){
        return <div>Loading...</div>
    }
    return <>{children}</>;
}