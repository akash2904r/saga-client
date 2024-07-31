export const FooterLinks = [
    {
        title: "ABOUT",
        links: [
            {
                name: "Blog Saga",
                to: "/"
            }
        ]
    },
    {
        title: "FOLLOW US",
        links: [
            {
                name: "Github",
                to: "https://github.com/akash2904r"
            },
            {
                name: "LinkedIn",
                to: "https://www.linkedin.com/in/akash-here"
            }
        ]
    },
    {
        title: "LEGAL",
        links: [
            {
                name: "Privacy Policy",
                to: "/"
            },
            {
                name: "Terms & Conditions",
                to: "/"
            }
        ]
    }
];

export const FooterIconLinks = [
    "/", 
    "/", 
    "/", 
    "https://www.linkedin.com/in/akash-here", 
    "https://github.com/akash2904r"
];

export const initialAuthForm = {
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    confirmPassword: ''
};

export const defaultImgSrc = "https://res.cloudinary.com/mister-me-cloud/image/upload/v1720619341/default-img_lmafrv.png";

export const SideBarData = [
    { primary: "dashboard", to: "/portal?tab=dashboard" }, 
    { primary: "profile", secondary: "Admin", to: "/portal?tab=profile" },
    { primary: "comments", to: "/portal?tab=comments" },
    { primary: "users", to: "/portal?tab=users" },
    { primary: "posts", to: "/portal?tab=posts" }
];

export const recentInfoData = {
    users: {
        firstH5: "USER IMAGE",
        secondH5: "USERNAME",
        size: "w-[340px] max-[350px]:w-full",
        firstTH: "w-[40%]",
        secondTH: "w-[60%]"
    },
    comments: {
        firstH5: "COMMENT CONTENT",
        secondH5: "LIKES",
        size: "w-[500px] max-[530px]:w-full",
        firstTH: "w-[85%]",
        secondTH: "w-[15%]"
    },
    posts: {
        firstH5: "POST IMAGE",
        secondH5: "POST DETAILS",
        size: "w-[700px] max-[790px]:w-full",
        firstTH: "w-[25%]",
        secondTH: "w-[75%]"
    }
};

export const UsersTH = [
    { id: 1, className: "w-[15%] py-2", data: "CREATED ON" },
    { id: 2, className: "md:w-[15%] sm:w-[10%] py-2", data: "USER IMAGE" },
    { id: 3, className: "w-[20%] py-2", data: "USERNAME" },
    { id: 4, className: "md:w-[30%] sm:w-[35%] py-2", data: "EMAIL" },
    { id: 5, className: "w-[10%] py-2", data: "ADMIN" },
    { id: 6, className: "w-[10%] py-2", data: "DELETE" },
];

export const PostsTH = [
    { id: 1, className: "w-[15%] py-2", data: "UPDATED ON" },
    { id: 2, className: "w-[20%] py-2", data: "POST IMAGE" },
    { id: 3, className: "w-[30%] py-2", data: "POST TITLE" },
    { id: 4, className: "w-[15%] py-2", data: "CATEGORY" },
    { id: 5, className: "w-[10%] py-2", data: "EDIT" },
    { id: 6, className: "w-[10%] py-2", data: "DELETE" },
];

export const CommentsTH = [
    { id: 1, className: "w-[13%] py-2", data: "UPDATED ON" },
    { id: 2, className: "w-[27%] py-2", data: "COMMENT" },
    { id: 3, className: "w-[20%] py-2", data: "POST ID" },
    { id: 4, className: "w-[20%] py-2", data: "USER ID" },
    { id: 5, className: "w-[10%] py-2", data: "LIKES" },
    { id: 6, className: "w-[10%] py-2", data: "DELETE" },
];
