// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, ListGroup, Form, InputGroup } from "react-bootstrap";
// import { FiInbox, FiSend, FiFileText, FiTrash, FiSearch } from "react-icons/fi";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";



// function EmailInbox() {
//     const [searchQuery, setSearchQuery] = useState("");
//     const [showEmail, setShowEmail] = useState([]);
//     const [inbox, setInbox] = useState(true);
//     const recieveremail = useSelector((state) => state.Auth.email);

//     useEffect(() => {
//         const fetchemail = async () => {
//             if (inbox) {
//                 try {
//                     const fetchresponse = await fetch("https://movies-e-commerce-default-rtdb.firebaseio.com/emails.json");

//                     if (!fetchresponse.ok) {
//                         throw new Error(fetchresponse.error);
//                     }
//                     else {
//                         const responseJson = await fetchresponse.json();
                    
//                         const transformedEmail = Object.entries(responseJson)
//                             .map(([id, email]) => ({ id, ...email }))
//                             .filter((item) => item.receiver === recieveremail);
//                         setShowEmail(transformedEmail);
//                     }
//                 }
//                 catch (error) {
//                     console.log(error);
//                     alert(error)
//                 }
//             }
//             else if (!inbox) {
//                  try {
//                     const fetchresponse = await fetch("https://movies-e-commerce-default-rtdb.firebaseio.com/emails.json");

//                     if (!fetchresponse.ok) {
//                         throw new Error(fetchresponse.error);
//                     }
//                     else {
//                         const responseJson = await fetchresponse.json();
                    
//                         const transformedEmail = Object.entries(responseJson)
//                             .map(([id, email]) => ({ id, ...email }))
//                             .filter((item) => item.sender === recieveremail);
//                         setShowEmail(transformedEmail);
//                     }
//                 }
//                 catch (error) {
//                     console.log(error);
//                     alert(error)
//                 }
//             }
//         }
//         fetchemail();
//     }, [recieveremail,inbox]);

//     function inboxhandler(val) {
//         setInbox(val);
//     }
    
//     let filteredEmails;
//     if (inbox) {
//      filteredEmails = showEmail.filter((email) =>
//     email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     email.sender.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//     }
//     else if (!inbox) {
//          filteredEmails = showEmail.filter((email) =>
//     email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     email.receiver.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//     }
  

//   return (
//       <Container fluid>
          
//       <Row>
//         {/* Sidebar */}
//         <Col md={3} className="bg-light vh-100 p-3">
//           <h5 className="mb-4">Mail</h5>
//           <ListGroup variant="flush">
//             <ListGroup.Item action  onClick={() => inboxhandler(true)}>
//               <FiInbox className="me-2"/> Inbox
//             </ListGroup.Item>
//             <ListGroup.Item action onClick={() => inboxhandler(false)}>
//               <FiSend className="me-2" /> Sent
//             </ListGroup.Item>
//             <ListGroup.Item action>
//               <FiFileText className="me-2" /> Drafts
//             </ListGroup.Item>
//             <ListGroup.Item action>
//               <FiTrash className="me-2" /> Trash
//             </ListGroup.Item>
//           </ListGroup>
//         </Col>

//         {/* Main Email Section */}
//         <Col md={9} className="p-4">
//           {/* Search Bar */}
//           <InputGroup className="mb-3">
//             <InputGroup.Text>
//               <FiSearch />
//             </InputGroup.Text>
//             <Form.Control
//               type="text"
//               placeholder="Search emails..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </InputGroup>

//           {/* Email List */}
//           <ListGroup>
//             {filteredEmails.length > 0 ? (
//               filteredEmails.map((email) => (
                
//                   <ListGroup.Item key={email.id} action className="d-flex justify-content-between">
//          <Link 
//     to={`/Inbox/${email.id}`} 
//     className="text-decoration-none text-dark w-100 d-flex justify-content-between"
//   >
//   <div>
//     <div className={`fw-${email.unread ? "bold" : "normal"}`}>
//       {inbox ? email.sender : email.receiver}
//     </div>
//     <div>{email.subject}</div>
//     <small className="text-muted">{email.body.slice(0, 50)}...</small>
//   </div>
//   <small className="text-muted">{email.date}</small>
//   </Link>
// </ListGroup.Item>
//               ))
//             ) : (
//               <ListGroup.Item>No emails found</ListGroup.Item>
//             )}
//           </ListGroup>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default EmailInbox;



import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Form, InputGroup } from "react-bootstrap";
import { FiInbox, FiSend, FiFileText, FiTrash, FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './EmailBox.css'

function EmailInbox() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showEmail, setShowEmail] = useState([]);
    const [inbox, setInbox] = useState(true);
    const recieveremail = useSelector((state) => state.Auth.email);
    const [unReadInbox, setReadInbox] = useState(0);
    const [unReadSent, setReadSent] = useState(0);
    const [deletemail, setDeletemail] = useState(null);

    useEffect(() => {
        const fetchemail = async () => {
            if (inbox) {
                try {
            const fetchresponse = await fetch("https://movies-e-commerce-default-rtdb.firebaseio.com/emails.json");

            if (!fetchresponse.ok) {
                throw new Error(fetchresponse.error);
            } else {
                const responseJson = await fetchresponse.json();
                const transformedEmail = Object.entries(responseJson)
                    .map(([id, email]) => ({ id, ...email }));

                if (inbox) {
                    // Filter inbox emails and calculate unread emails
                    const inboxEmails = transformedEmail.filter((item) => item.receiver === recieveremail);
                    setShowEmail(inboxEmails);
                    const unreadInboxCount = inboxEmails.reduce((count, email) => {
                        if (email.read === false) {
                            count += 1;
                        }
                        return count;
                    }, 0);
                    setReadInbox(unreadInboxCount);
                } else {
                    // Filter sent emails and calculate unread emails
                    const sentEmails = transformedEmail.filter((item) => item.sender === recieveremail);
                    setShowEmail(sentEmails);
                    const unreadSentCount = sentEmails.reduce((count, email) => {
                        if (email.read === false) {
                            count += 1;
                        }
                        return count;
                    }, 0);
                    setReadSent(unreadSentCount);
                }
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }


                // try {
                //     const fetchresponse = await fetch("https://movies-e-commerce-default-rtdb.firebaseio.com/emails.json");

                //     if (!fetchresponse.ok) {
                //         throw new Error(fetchresponse.error);
                //     } else {
                //         const responseJson = await fetchresponse.json();
                //         const transformedEmail = Object.entries(responseJson)
                //             .map(([id, email]) => ({ id, ...email }))
                //             .filter((item) => item.receiver === recieveremail);
                //         setShowEmail(transformedEmail);
                //         const totalUnread = Object.values(responseJson).reduce((count, email) => {
                //                if (email.read === false) {
                //                     count += 1;
                //               }
                //                   return count;
                //         }, 0);
                //         setReadInbox(totalUnread);
                //     }
                // } catch (error) {
                //     console.log(error);
                //     alert(error)
                // }
            } else if (!inbox) {
                try {
                    const fetchresponse = await fetch("https://movies-e-commerce-default-rtdb.firebaseio.com/emails.json");

                    if (!fetchresponse.ok) {
                        throw new Error(fetchresponse.error);
                    } else {
                        const responseJson = await fetchresponse.json();
                        const transformedEmail = Object.entries(responseJson)
                            .map(([id, email]) => ({ id, ...email }))
                            .filter((item) => item.sender === recieveremail);
                        setShowEmail(transformedEmail);
                         const totalUnread = Object.values(responseJson).reduce((count, email) => {
                               if (email.read === false) {
                                    count += 1;
                              }
                                  return count;
                         }, 0);
                        setReadSent(totalUnread);
                    }
                } catch (error) {
                    console.log(error);
                    alert(error)
                }
            }
        }
        fetchemail();
    }, [recieveremail, inbox,deletemail]);

    const markAsRead = async (id) => {
    try {
        const emailToUpdate = showEmail.find(email => email.id === id);
        const updatedEmail = { ...emailToUpdate, read: true };

        // Update email in Firebase
        const response = await fetch(`https://movies-e-commerce-default-rtdb.firebaseio.com/emails/${id}.json`, {
            method: 'PUT',
            body: JSON.stringify(updatedEmail),
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Failed to update email");
        }

        // Update local state
        setShowEmail(prevEmails => 
            prevEmails.map(email => email.id === id ? updatedEmail : email)
        );
    } catch (error) {
        console.log(error);
    }
};

    function inboxhandler(val) {
        setInbox(val);
    }

    let filteredEmails;
if (inbox) {
    filteredEmails = showEmail.filter((email) => 
        (email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.sender.toLowerCase().includes(searchQuery.toLowerCase())) 
    );
} else if (!inbox) {
    filteredEmails = showEmail.filter((email) =>
        email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.receiver.toLowerCase().includes(searchQuery.toLowerCase())
    );
}
    
   async function deletemailHandler(id) {
         try {
            const deleteDataResponse = await fetch(`https://movies-e-commerce-default-rtdb.firebaseio.com/emails/${id}.json`, {
                method:'DELETE'
            })
            if (!deleteDataResponse.ok) {
                throw new Error(deleteDataResponse.error)
            }
            else {
                setDeletemail(Math.random());
            }
        }
        catch (error) {
            alert(error.message);
        }
    }

    return (
        <Container fluid>
            <Row>
                {/* Sidebar */}
                <Col md={3} className="bg-light vh-100 p-3">
                    <h5 className="mb-4">Mail</h5>
                    <ListGroup variant="flush">
                        <ListGroup.Item action onClick={() => inboxhandler(true)}>
                            <FiInbox className="me-2" /> Inbox {unReadInbox}
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={() => inboxhandler(false)}>
                            <FiSend className="me-2" /> Sent {unReadSent}
                        </ListGroup.Item>
                        <ListGroup.Item action>
                            <FiFileText className="me-2" /> Drafts
                        </ListGroup.Item>
                        <ListGroup.Item action>
                            <FiTrash className="me-2" /> Trash
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                {/* Main Email Section */}
                <Col md={9} className="p-4">
                    {/* Search Bar */}
                    <InputGroup className="mb-3">
                        <InputGroup.Text>
                            <FiSearch />
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Search emails..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </InputGroup>

                    {/* Email List */}
                    <ListGroup>
                        {filteredEmails.length > 0 ? (
                            filteredEmails.map((email) => (
                                <ListGroup.Item key={email.id} action className="d-flex justify-content-between">
                                    <Link 
                                        to={`/Inbox/${email.id}`} 
                                        className="text-decoration-none text-dark w-100 d-flex justify-content-between"
                                        onClick={() => markAsRead(email.id)}
                                    >
                                        <div>
                                            {/* Blue Dot for Unread emails */}
                                            {!email.read && (
                                                <span className="email-dot"></span>
                                            )}
                                            <div className={`fw-${email.unread ? "bold" : "normal"}`}>
                                                {inbox ? email.sender : email.receiver}
                                            </div>
                                            <div>{email.subject}</div>
                                            <small className="text-muted">{email.body.slice(0, 50)}...</small>
                                        </div>
                                        <small className="text-muted">{email.date}</small>
                                       
                                    </Link>
                                     <button onClick={()=>deletemailHandler(email.id)}>Delete</button>
                                </ListGroup.Item>
                            ))
                        ) : (
                            <ListGroup.Item>No emails found</ListGroup.Item>
                        )}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default EmailInbox;