import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const citiesNearBoulder = ['Niwot', 'Longmont', 'Lafayette', 'Boulder', 'Broomfield', 'Louisville', 'Frederick', 'Firestone', 'Erie'];
const citiesNearArvada = ['Arvada', 'Wheat Ridge', 'Westminster', 'Denver', 'Golden', 'Aurora', 'Lakewood', 'Littleton', 'Brighton'];

const excludedNames = [
    "Ron Happy",
    "Nick Barnes",
    "Khyentse George",
    "Kenny Keister",
    "Eva Princeton Cir",
    "Erika Cavallone",
    "Amanda Golden",
    "Erica Golden",
    "Matthew Bocklemann",
    "Khalil Shafie",
    "Geoff and Kay",
    "Bill Beans",
    "Ted Dankanyin",
    "John Doxsee",
    "Brandon Barnett"
];

function EmailSender() {
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [emailsSentCount, setEmailsSentCount] = useState(0);
    const [sentEmailsList, setSentEmailsList] = useState([]);

    
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const customerSnapshot = await getDocs(collection(db, 'InvoiceListContactInfo'));
                const customerList = customerSnapshot.docs.map(doc => doc.data());
                console.log("Fetched customers:", customerList); // <-- Add this line
                setCustomers(customerList);
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };
    
        fetchCustomers();
    }, []);
    

    const sendEmails = () => {
        let count = 0; 
        let sentEmails = [];
    
        const filteredCustomers = customers.filter(customer => {
            const isExcluded = excludedNames.includes(customer.name);
            if (isExcluded) {
                console.log(`Excluding ${customer.name} from email list.`);
            }
            return !isExcluded;
        });
        const emailPromises = filteredCustomers.map(user => {
            const emails = user.email.split(','); 

            return emails.map(email => {
                if (!email) return null;
        
                count++;
        
                let templateId = "template_0jbfmgr"; 
                const templateParams = {
                    to_email: email.trim(),
                    message: 'Please visit our link and tell us how we did on your project.'
                };
        
                if (user.city === 'Boulder' || citiesNearBoulder.includes(user.city)) {
                    templateId = "template_j40osx4"; // Boulder Location
                    console.log(`Sending Boulder email to ${user.name} (${email.trim()}) from city ${user.city}`);
               
               
                } else if (user.city === 'Arvada' || citiesNearArvada.includes(user.city)) {
                    templateId = "template_0jbfmgr"; // Arvada Location
                    templateParams.message = 'Your new message for Arvada and nearby cities.';
                    console.log(`Sending Arvada email to ${user.name} (${email.trim()}) from city ${user.city}`);
                }

                return emailjs
                    .send("service_ydn2pci", templateId, templateParams, "user_wPYeoaoebNsoGt3GhzLVu")
                    .then((response) => {
                        console.log(`Email successfully sent to ${email.trim()}!`, response);
                        sentEmails.push({ name: user.name, email: email.trim() });
                    })
                    .catch((err) => {
                        console.error(`Failed to send email to ${email.trim()}:`, err);
                        setError(err);
                        return err;
                    });
            });
        });

        Promise.all(emailPromises.flat()).then(() => {
            alert(`All emails have been sent! Total emails sent: ${count}`);
            setEmailSent(true);
            setEmailsSentCount(count);
            setSentEmailsList(sentEmails);
        });
    };

   
return (
    <div>
        <button onClick={sendEmails}>Send Emails</button>
        {emailSent && <p>Emails successfully sent! Total emails sent: {emailsSentCount}</p>}
        {emailSent && 
            <div>
                <h3>Emails Sent:</h3>
                {sentEmailsList.map(item => (
                    <div key={item.email}>
                        {item.name} - {item.email}
                    </div>
                ))}
                {console.log('Sent Emails : ', sentEmailsList)}
            </div>
        }
        {error && <p>Error sending emails: {error.toString()}</p>}
    </div>
);
}

export default EmailSender;
