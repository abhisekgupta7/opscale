import { COMPANY_CONFIG } from "@/app/config/company";
import { Share } from "lucide-react";
import Link from "next/link";
export default function Contact() {
  return (
    <div>
      <div>
        <h1>Contact Us</h1>
        <p>
          If you have any questions or inquiries, please feel free to reach out
          to us. We are here to help and provide you with the best service
          possible.
        </p>
        <div>
          We are here to assist you with any questions or concerns you may have.
          Please don't hesitate to contact us through the following channels:
        </div>
          </div>
          <div>
              <Link href={'/subscriptionPage'}>
                  Subscribe 
                  <Share/>
              </Link>
          </div>

      <p>Email:{COMPANY_CONFIG.email}</p>
      <p>Phone: {COMPANY_CONFIG.phone}</p>
      <p>Whatsapp:{COMPANY_CONFIG.whatsapp}</p>
    </div>
  );
}
