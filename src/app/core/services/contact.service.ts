/// <reference types="vite/client" />
import axios from "axios";


export const handleDownload = () => {
    const pdfUrl = "/AlexanderCastroCV.pdf"; // Path to your CV file in the public folder
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "AlexanderCastroCV.pdf"; // Set the downloaded file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const handleSubmit = async (
    e: { preventDefault: () => void; },
    name: string,
    setName: (value: string) => void,
    email: string,
    setEmail: (value: string) => void,
    message: string,
    setMessage: (value: string) => void
) => {

    e.preventDefault();


    const serviceID = import.meta.env["VITE_SERVICE_ID"];
    const templateID = import.meta.env["VITE_TEMPLATE_ID"];
    const publicKey = import.meta.env["VITE_PUBLIC_KEY"];

    const data = {
        service_id: serviceID,
        template_id: templateID,
        user_id: publicKey,
        template_params: {
            from_name: name,
            from_email: email,
            to_name: "Alexander Castro",
            message: message,
        }
    }

    try {
        const res = await axios.post("https://api.emailjs.com/api/v1.0/email/send", data);
        console.log(res.data);
        setName('');
        setEmail('');
        setMessage('');
    } catch (error) {
        console.error(error);
    }
};
