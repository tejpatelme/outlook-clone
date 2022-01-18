import { useDispatch } from "react-redux";
import { addtoRead, getEmailBody } from "../../features/email/emailsSlice";
import { getDate } from "../../utils/getDate";
import Avatar from "../Avatar/Avatar";
import "./emailCard.css";

export default function EmailCard({ email, setShowEmailBody }) {
  const dispatch = useDispatch();

  const handleEmailClicked = (e) => {
    setShowEmailBody(true);
    dispatch(addtoRead({ id: email.id }));
    dispatch(getEmailBody(email.id));
  };

  return (
    <li
      onClick={handleEmailClicked}
      className={`email-card ${email.read && "read"}`}
    >
      <div>
        <Avatar name={email.from.name} />
      </div>

      <div className="email-info">
        <span className="email-address">From: {email.from.email}</span>
        <span className="email-address">Subject: {email.subject}</span>
        <span className="email-address">{email.short_description}</span>
        <span className="email-address">{getDate(email.date)}</span>
      </div>
    </li>
  );
}
