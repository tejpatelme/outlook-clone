import "./emailBody.css";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../Avatar/Avatar";
import { getDate } from "../../utils/getDate";
import { addToFavorite } from "../../features/email/emailsSlice";

export default function EmailBody() {
  const dispatch = useDispatch();
  const { currentEmailBody, loadingEmailBodyStatus, emails } = useSelector(
    (state) => state.emails
  );

  const currentEmail = emails?.find(
    (email) => email?.id === currentEmailBody?.id
  );

  const handleFavoriteButtonClicked = (id) => {
    dispatch(addToFavorite({ id }));
  };

  return (
    <>
      {loadingEmailBodyStatus === "pending" ? (
        <span>Loading...</span>
      ) : (
        <div className="email-body">
          <div className="email-head">
            <div
              style={{
                display: "flex",
              }}
            >
              <Avatar name={currentEmail?.from?.name} />
              <div className="email-details">
                <span className="email-subject">{currentEmail?.subject}</span>
                <span>{getDate(currentEmail?.date)}</span>
              </div>
            </div>
            <button
              onClick={() => handleFavoriteButtonClicked(currentEmail.id)}
              className="favorite-button"
            >
              Mark as Favorite
            </button>
          </div>

          {currentEmailBody.body}
        </div>
      )}
    </>
  );
}
