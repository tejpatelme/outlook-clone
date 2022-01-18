import "../../styles/emailList.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import EmailCard from "../../components/EmailCard/EmailCard";
import { getAllEmails } from "./emailsSlice";
import EmailBody from "../../components/EmailBody/EmailBody";
import FilterBar from "../../components/FilterBar/FilterBar";

export default function EmailList() {
  const [showEmailBody, setShowEmailBody] = useState(false);
  const dispatch = useDispatch();
  const { loadingEmailsStatus, emails, activeTab } = useSelector(
    (state) => state.emails
  );

  const filterEmails = (emails) => {
    switch (true) {
      case activeTab === "All": {
        return emails;
      }

      case activeTab === "Unread": {
        return emails.filter((email) => (email.read ? false : true));
      }

      case activeTab === "Read": {
        return emails.filter((email) => (email.read ? true : false));
      }

      case activeTab === "Favorites": {
        return emails.filter((email) => (email.favorite ? true : false));
      }

      default: {
        return emails;
      }
    }
  };

  const filteredEmails = filterEmails(emails);

  useEffect(() => {
    if (loadingEmailsStatus === "idle") {
      dispatch(getAllEmails());
    }
  }, []);

  return (
    <div className="email-list-container">
      <div style={{ width: "100%" }}>
        <FilterBar />
        <ul className="email-list">
          {filteredEmails.length === 0 ? (
            <p>No emails </p>
          ) : (
            filteredEmails.map((email) => (
              <EmailCard
                key={email.id}
                email={email}
                setShowEmailBody={setShowEmailBody}
              />
            ))
          )}
        </ul>
      </div>
      {showEmailBody && <EmailBody />}
    </div>
  );
}
