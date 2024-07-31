import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUser, setUser } from "../features/userSlice";
import { getTheme } from "../features/themeSlice";
import { useSignOutMutation, useDeleteMutation } from "../features/authApiSlice";
import { useChangeProfileMutation } from "../features/userApiSlice";

import { Input, Loader } from "./";
import { defaultImgSrc } from "../constants";
import { errorType, IProfileForm } from "../constants/interfaces";
import { PlusCircleOutlined } from "@ant-design/icons";

const initialProfileForm: IProfileForm = { 
  id: '', username: '', email: '', password: '', avatar: undefined 
};

const Profile = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(getTheme);
  const user = useAppSelector(getUser);
  const [signOut] = useSignOutMutation();
  const [deleteUser] = useDeleteMutation();
  const [changeProfile, { isLoading }] = useChangeProfileMutation();

  const [imgSrc, setImgSrc] = useState<string | undefined>(user?.avatar);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<IProfileForm>(initialProfileForm);
  const navigate = useNavigate();

  const disableSaveChanges = formData.username === '' && formData.email === '' && formData.password === '' && formData.avatar === undefined;

  const signout = async (): Promise<void> => {
    await signOut();

    dispatch(setUser(null));

    navigate("/auth");
  };

  const deleteuser = async (): Promise<void> => {
    if (user) {
      const { error } = await deleteUser(user._id);
      const err = error as errorType | undefined;

      if (err?.originalStatus === 204) {
        dispatch(setUser(null));
        navigate("/auth");
      }
    }
  };

  const changeProfilePic = (e: ChangeEvent<HTMLInputElement>): void => {
    const image = e.target.files?.[0];
    setFormData({ ...formData, avatar: image });

    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result as string);
      };
      reader.readAsDataURL(image);
    }
  };

  const toggleFromOrToEditMode = () => {
    setIsEditing(prevState => !prevState)

    if (isEditing) {
      setFormData(initialProfileForm);
      setImgSrc(user?.avatar);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => isEditing && setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData();
    form.append("id", user?._id as string);
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("avatar", formData.avatar as File);

    const { data } = await changeProfile(form);
    dispatch(setUser({ ...user, ...data }));
    setFormData(initialProfileForm);
    setIsEditing(false);
  };

  if (isLoading) return (
    <main className="w-full h-96">
      <Loader />
    </main>
  );

  return (
    <main className="relative w-96 mx-auto mt-10">
      <div 
        className="absolute right-0 -top-1 p-0.5 rounded-full hover:bg-lite-1 dark:hover:bg-dark-2 cursor-pointer"
        onClick={toggleFromOrToEditMode}
      >
        <img 
          src={isEditing 
            ? theme === "light" ? "/svgs/close.svg" : "/svgs/close-lite.svg"
            : theme === "light" ? "/svgs/edit.svg" : "/svgs/edit-lite.svg"
          } 
          alt="Edit" 
          className="h-10 w-10 p-2"
        />
      </div>
      <h1 className="text-3xl text-dark-1 font-semibold text-center dark:text-lite-1">Profile</h1>
      <form className="flex flex-col gap-3 py-3 px-2.5" onSubmit={handleSubmit}>
        <input 
          id="profile-pic" 
          type="file" 
          accept="image/*" 
          hidden 
          onChange={changeProfilePic} 
        />
        <div 
          className={`w-fit h-fit bg-lite-1 p-0.5 rounded-full mx-auto dark:bg-dark-3 ${isEditing && "cursor-pointer"}`}
          onClick={() => isEditing && document.getElementById("profile-pic")?.click()}
        >
          <img 
            src={imgSrc || defaultImgSrc}
            alt={user?.avatar ? user.name : "Default Picture"} 
            className="h-32 w-32 rounded-full object-cover"
          />
        </div>

        <Input 
          name="username" 
          label="Username" 
          placeholder="Username" 
          type="text" 
          value={isEditing ? formData.username : user?.name!} 
          handleChange={handleChange} 
          focus={!isEditing ? false : true}
          readOnly={!isEditing && true}
          notRequired={isEditing}
        />
        {!isEditing 
          ? <Input 
              name="email" 
              label="Email Address" 
              placeholder="Email Address" 
              type="email" 
              value={isEditing ? formData.email : user?.email!} 
              handleChange={handleChange} 
              focus={false}
              readOnly
              notRequired={isEditing}
            />
          : !user?.isGoogleId && (
              <Input 
                name="email" 
                label="Email Address" 
                placeholder="Email Address" 
                type="email" 
                value={isEditing ? formData.email : user?.email!} 
                handleChange={handleChange} 
                notRequired={isEditing}
              />
          )
        }
        {isEditing && (
          <Input 
            name="password" 
            label="Password" 
            placeholder="Enter your new password" 
            type="password" 
            value={isEditing ? formData.password : ''} 
            handleChange={handleChange} 
            notRequired={isEditing}
          />)
        }

        {isEditing && 
          <button 
            type="submit" 
            className={`h-fit mt-3 bg-gradient-to-r ${(disableSaveChanges || isLoading) ?'disabled-google-login cursor-default' : 'group google-login hover:profile-save-hover'} rounded-[4px]`}
            disabled={disableSaveChanges || isLoading}
          >
            <div className="p-0.5 rounded-[4px]">
              <div className={`font-semibold p-2 rounded-[4px] md:px-2 md:py-1 bg-transparent ${(disableSaveChanges || isLoading) ? 'text-white/50' : 'text-white'} group-hover:tracking-tighter`}>SAVE CHANGES</div>
            </div>
          </button>
        }

        {!isEditing && 
          <div className="flex justify-between items-center pt-5 text-red-600">
            <button type="button" onClick={deleteuser}>Delete Account</button>
            {user?.isAdmin && (
              <button 
                type="button" 
                className="text-4xl text-lite-3/70 dark:text-lite-2"
                onClick={() => navigate("/portal/posts/create-post")}
              ><PlusCircleOutlined /></button>
            )}
            <button type="button" onClick={signout}>Sign Out</button>
          </div>
        }
      </form>
    </main>
  );
};

export default Profile;
