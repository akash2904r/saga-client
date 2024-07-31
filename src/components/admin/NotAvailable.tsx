const NotAvailable = ({ tabName }: { tabName: string }) => {
  return (
    <div className="flex items-center justify-center max-sm:flex-col">
        <img 
            src="https://res.cloudinary.com/mister-me-cloud/image/upload/v1720619386/not-available_nk5tmh.png" 
            alt="Not Available" 
            className="h-[500px] max-sm:h-[390px]"
        />
        <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-5xl font-bold dark:text-lite-1">NO {tabName.toUpperCase()}</p>
            <p className="text-3xl font-bold dark:text-lite-1">AVAILABLE</p>
        </div>
    </div>
  );
};

export default NotAvailable;
