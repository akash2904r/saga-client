/****************** ERROR TYPE ******************/

export interface errorType {
    status: string | number,
    originalStatus: number,
    data: any,
    error: string,
};


/****************** COMPONENT PROPS ******************/

import { ChangeEvent } from "react";

export interface IInputProps {
    name: string,
    type: string,
    label?: string,
    placeholder: string,
    value: string,
    focus?: boolean,
    readOnly?: boolean,
    notRequired?: boolean,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
};

export interface ILogoProps {
    size?: string,
    className?: string,
};

export interface ITotalInfoProps {
    title: string,
    totalCount: number,
    lastMonthCount: number
};

export interface IUserTableRowProps {
    _id: string,
    avatar?: {
        public_id: string,
        url: string
    },
    username: string,
    email: string,
    createdAt: Date,
    isAdmin: boolean
};

export interface IPostTableRowProps {
    _id: string,
    image: {
        public_id: string,
        url: string
    },
    title: string,
    category: string,
    updatedAt: Date,
};

export interface ILikeProps {
    length: number,
    isLiked: boolean,
};

export interface IPostProps {
    _id: string,
    title: string,
    content: string,
    category: string,
    image: string
};

export interface ISearchSidebarProps {
    searchTerm: string,
    sortOrder: string,
    category: string
};

import { QueryActionCreatorResult } from "@reduxjs/toolkit/query";

export interface ICommentBlockProps {
    comment: IFetchedComment,
    refetch: () => QueryActionCreatorResult<any>
}


/****************** REDUX ******************/

export interface IGoogleUser {
    sub: string,
    name: string,
    email: string,
    avatar: string,
    exp: number,
    isGoogleId: boolean,
    accessToken: string
};

export interface IAuthUserUnit {
    _id: string,
    username: string,
    email: string,
    isAdmin: boolean,
    avatar?: string,
    exp: number,
    accessToken: string
};

export interface IAuthUser {
    user: IAuthUserUnit, 
    accessToken: string
};

export interface IUser {
    user: {
        _id: string,
        name: string,
        email: string,
        avatar: string,
        exp: number,
        isGoogleId: boolean,
        isAdmin: boolean, 
        accessToken: string
    } | null
};

export interface IAuthForm {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
};

export interface IProfileForm {
    id: string,
    username: string,
    email: string,
    password: string,
    avatar: File | undefined
};

export type currActive = "dashboard" | "profile" | "comments" | "users" | "posts";

export interface ICurrActive {
    portal: currActive | null
};

export interface ICreatePostForm {
    title: string,
    category: string,
    content: string,
    imgId: string
};

export interface IUpdatePostForm {
    id: string,
    title: string,
    category: string,
    content: string,
    imgId: string
};

export interface IComment {
    comment: string,
    commentedBy: string,
    commentedOn: string
};

export interface ILikeComment {
    id: string,
    commentId: string
};

export interface IFetchComments {
    _id: string,
    comment: string,
    commentedBy: string,
    commentedOn: string,
    updatedAt: Date,
    likes: number
};

export interface IFetchedComment {
    _id: string,
    comment: string,
    commentedBy: {
        username: string,
        avatar: string
    },
    isCommentator: boolean,
    totalLikes: number,
    hasLiked: boolean,
    createdAt: Date
};

export interface ILatestUsers {
    _id: string,
    username: string,
    avatar?: string
};

export interface ILatestPosts {
    _id: string,
    image: string,
    title: string,
    content: string
};

export interface ILatestComments {
    _id: string,
    comment: string,
    likes: string
};

export interface IDashbordDetails {
    users: { 
        total: number, 
        last30days: number, 
        latest: ILatestUsers[]
    },
    posts: { 
        total: number, 
        last30days: number, 
        latest: ILatestPosts[]
    },
    comments: { 
        total: number, 
        last30days: number, 
        latest: ILatestComments[]
    }
};

export interface ISearchPost {
    term: string,
    sort: string,
    category: string
};

export interface IPostDetails {
    _id: string,
    title: string,
    category: string,
    content: string,
    image: string,
    updatedAt: Date,
};
