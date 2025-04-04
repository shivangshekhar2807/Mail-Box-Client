import { Mail, Clock, Reply, Trash } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ReadEmail() {
    const { id } = useParams();
    const [fetchedMail, setfetchedMail] = useState({});
    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchmail = async () => {
              try {
        const databaseMail = await fetch(
          `https://movies-e-commerce-default-rtdb.firebaseio.com/emails/${id}.json`
        );

        if (!databaseMail.ok) {
          throw new Error("Something Went Wrong");
        }

        const data = await databaseMail.json();
        setfetchedMail(data);
      } catch (error) {
        console.log(error.message);
      }
        }
        fetchmail();
    }, [id])
    
    async function GoBackHandler() {
    //     try {
    //     const databaseMail = await fetch(
    //         `https://movies-e-commerce-default-rtdb.firebaseio.com/emails/${id}.json`, {
    //             method: 'PUT',
    //              body: JSON.stringify({
    //                     read:true,
    //              }),
    //               headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //       }
    //     );

    //     if (!databaseMail.ok) {
    //       throw new Error("Something Went Wrong");
    //     }

    //     const data = await databaseMail.json();
    //     setfetchedMail(data);
    //   } catch (error) {
    //     console.log(error.message);
    //   }
        navigate('/Inbox', { replace: true });
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            
                            {/* Sender & Receiver */}
                            <div className="mb-3 border-bottom pb-2">
                                <h5 className="fw-bold mb-1">{fetchedMail.subject}</h5>
                                <p className="text-muted mb-1"><strong>From:</strong>{fetchedMail.sender}</p>
                                <p className="text-muted"><strong>To:</strong>{fetchedMail.receiver}</p>
                            </div>

                            {/* Timestamp */}
                            <div className="text-muted d-flex align-items-center mb-3">
                                <Clock size={16} className="me-2" />
                                <span>{fetchedMail.timestamp}</span>
                            </div>

                            {/* Email Content */}
                            <div className="email-content mb-4">
                                <p>Hello,</p>
                                <p>
                                    {fetchedMail.body}
                                </p>
                                <p>Regards, <br /> {fetchedMail.sender}</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="d-flex gap-2">
                                <button className="btn btn-primary">
                                    <Reply size={16} className="me-1" /> Reply
                                </button>
                                <button className="btn btn-secondary">
                                    <Mail size={16} className="me-1" /> Forward
                                </button>
                                <button className="btn btn-danger">
                                    <Trash size={16} className="me-1" /> Delete
                                </button>
                                <button className="btn btn-success" onClick={GoBackHandler}>
                                     Go Back
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReadEmail;