"use client";
import Image from "next/image";
import React, { useState, useContext, useCallback, useEffect } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import style from "./edit.module.css";
import { AppContext } from "../../context/AppContext";
import {
  Button,
  FileUploader,
  ProfilePhoto,
  TextBox,
  TextInput,
} from "@/app/component/inputs";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase";
const EditProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const currentUser = auth.currentUser
  const { getUser, uploadImage, updateUserProfile } = useContext(AppContext);
  const router = useRouter()

  const fetchUser = useCallback(async (id) => {
    if (id) {
      const temp = await getUser(id);
      setUserDetails(temp);
    }
  }, []);
 useEffect(() => {
   if (!currentUser) {
     router.push("/login");
   }else{
    fetchUser(currentUser.uid);
   }
 }, [currentUser]);


  const handleProfileChange = (data) => {
    setUserDetails(() => ({
      ...userDetails,
      [data.name]: data.value,
    }));
  };
  const handleFileLoaded = async (file) => {
    const res = await uploadImage(file);
    if (res) {
      setUserDetails(() => ({
        ...userDetails,
        profilePic: res,
      }));
    }
  };
  const handleProfileUpdate = ()=>{
   updateUserProfile(currentUser.uid,userDetails);
   router.push("/profile")
  }
  return (
    <div className={style.editPageWrapper}>
      <h3>Edit Profile</h3>
      <div className={style.imgContainer}>
        <ProfilePhoto src={userDetails?.profilePic} alt={userDetails?.firstName} height="150" width="150" />
        <FileUploader
          onchange={handleFileLoaded}
          text="Upload Pic"
          icon={<AiOutlineCloudUpload />}
        />
      </div>
      <div className={style.formWrapper}>
        <TextInput
          label="First Name"
          type="text"
          name="firstName"
          value={userDetails?.firstName}
          onchange={handleProfileChange}
        />
        <TextInput
          label="Last Name"
          type="text"
          name="lastName"
          value={userDetails?.lastName}
          onchange={handleProfileChange}
        />
        <TextBox
          label="Bio"
          name="bio"
          placeholder="Brief bio"
          value={userDetails?.bio}
          onchange={handleProfileChange}
        />
        <div>
          <Button
            text="cancel"
            styleopt={{ flex: 1 }}
            onclick={() => router.push("/profile")}
          />
          <Button
            text="Save"
            styleopt={{ flex: 1 }}
            variant="primary"
            onclick={handleProfileUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
