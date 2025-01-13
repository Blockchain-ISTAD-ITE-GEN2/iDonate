const authDescStyle:string = `text-[16px] text-gray-500`;
const labelStyle: string = `text-primaryColor text-[16px] flex items-center gap-x-[10px]`;
const errorMsgStyle: string = `text-[13px] text-red-700 italic`;
const fieldStyle: string = `h-[48px] rounded-full px-[20px] border border-[#DFE4EA] text-primaryColor`;
const formHeaderStyle: string = `flex flex-col gap-y-2.5 lg:gap-y-[22px] lg-[20px] mb-2.5 pt-2.5 lg:pt-0`;
const formTitleStyle:string = `text-primaryColor text-[34px] font-semibold`
const formInputControl:string = `flex flex-col gap-y-[5px]`;
const formbuttonStyle:string = `flex items-center text-[17px] w-full h-[45px] bg-primaryColor text-white rounded-full`;
const formImageStyle:string = `bg-auth-background h-auto bg-cover rounded-[20px] flex flex-row-reverse justify-between lg:flex-col gap-y-[50px] p-[10px] lg:py-[30px] lg:px-[30px]`;
const formXButtonStyle:string = `w-[20px] h-[20px] lg:w-[30px] lg:h-[30px] hover:bg-white hover:rotate-90 hover:rounded-lg hover:text-primaryColor transition-transform duration-300 ease-in-out`;
const formTextInImage:string = `lg:backdrop-blur-lg rounded-xl text-center block`;
const formTextInImageTitle:string = `text-[30px] text-primaryColor font-semibold hidden lg:block`;
const formTextInImageDesc:string = `text-primaryColor text-[15px] md:text-[20px] flex lg:h-auto h-full items-center justify-center`;
const formTextSpan:string = `backdrop-blur-lg p-2 rounded-full`;
const activeLinkStyle:string = `cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline ms-[5px]`;

export {
    authDescStyle,
    labelStyle,
    fieldStyle,
    errorMsgStyle,
    formHeaderStyle,
    formTitleStyle,
    formInputControl,
    formbuttonStyle,
    formImageStyle,
    formXButtonStyle,
    formTextInImage,
    formTextInImageTitle,
    formTextInImageDesc,
    formTextSpan,
    activeLinkStyle
};
