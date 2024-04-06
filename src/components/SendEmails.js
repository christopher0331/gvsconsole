import React, { useState, useEffect, useRef } from 'react';
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
    "Brandon Barnett",
    "Sent to people below",
    "Zac Brown",
    "Robert Emmen",
    "Edward Wood Prince",
    "Drew Clark",
    "Rebecca MacNeil",
    "Ann Nelson",
    "Renae Hodge",
    "Joe Rodriguez",
    "George Carreon",
    'Amy A',
    "John Werth",
    "Julie Thorpe",
    'Gregg Fink',
    'Annie H',
    "Mikaela Mahoney",
    "Steve Seibold",
    "Westfield Village Homeowners Assoiciation, Inc",
    "Erica",
    "James Dillie"
];


function EmailSender() {
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [emailsSentCount, setEmailsSentCount] = useState(0);
    const [sentEmailsList, setSentEmailsList] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const sendProcessActive = useRef(true);
  
    useEffect(() => {
      const fetchCustomers = async () => {
        try {
          const customerSnapshot = await getDocs(collection(db, 'InvoiceListContactInfo'));
          const customerList = customerSnapshot.docs.map(doc => doc.data());
          console.log("Fetched customers:", customerList);
          setCustomers(customerList);
        } catch (error) {
          console.error("Error fetching customers:", error);
          setError(error);
        }
      };
  
      fetchCustomers();
    }, []);
  
    const sendEmailsToAll = async () => {
      setIsSending(true);
      sendProcessActive.current = true;
      let count = 0;
      let sentEmails = [];
  
      // Skip the first 20 customers
      const customersToEmail = customers.slice(20);
  
      for (let user of customersToEmail) {
        if (!sendProcessActive.current) {
          console.log("Stopped sending emails.");
          break;
        }
        if (excludedNames.includes(user.name)) {
          console.log(`Excluding ${user.name} from email list.`);
          continue;
        }
  
        const emails = user.email.split(',');
        for (let email of emails) {
          if (!email) continue;
  
          count++;
          let templateId = "template_0jbfmgr";
          const templateParams = {
            to_email: email.trim(),
            message: 'Please visit our link and tell us how we did on your project.'
          };
  
          if (citiesNearBoulder.includes(user.city)) {
            templateId = "template_j40osx4"; // Boulder Location
            console.log(`Sending Boulder email to ${user.name} (${email.trim()}) from city ${user.city}`);
          } else if (citiesNearArvada.includes(user.city)) {
            templateId = "template_0jbfmgr"; // Arvada Location
            templateParams.message = 'Your new message for Arvada and nearby cities.';
            console.log(`Sending Arvada email to ${user.name} (${email.trim()}) from city ${user.city}`);
          }
  
          try {
            const response = await emailjs.send("service_ydn2pci", templateId, templateParams, "user_wPYeoaoebNsoGt3GhzLVu");
            console.log(`Email successfully sent to ${email.trim()}!`, response);
            sentEmails.push({ name: user.name, email: email.trim() });
          } catch (err) {
            console.error(`Failed to send email to ${email.trim()}:`, err);
            setError(err);
            // If you want to stop sending emails on the first error, uncomment the line below
            break;
          }
        }
      }
  
      setIsSending(false);
      setEmailsSentCount(count);
      setSentEmailsList(sentEmails);
      setEmailSent(true);
    };
  
    const stopSendingEmails = () => {
      sendProcessActive.current = false;
      setIsSending(false);
    };
  
    return (
      <div>
        <button onClick={sendEmailsToAll} disabled={isSending}>
          {isSending ? 'Sending...' : 'Send Emails to All (Skipping First 20)'}
        </button>
        {isSending && (
          <button onClick={stopSendingEmails}>
            Stop Sending Emails
          </button>
        )}
        {emailSent && <p>Emails successfully sent! Total emails sent: {emailsSentCount}</p>}
        {emailSent && sentEmailsList.map(item => (
          <div key={item.email}>
            {item.name} - {item.email}
          </div>
        ))}
        {error && <p>Error sending emails: {error.toString()}</p>}
      </div>
    );
  }
  
  export default EmailSender;
