import React, { useRef, useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { FiSend, FiPaperclip, FiTrash2 } from "react-icons/fi";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";
import { useSelector } from "react-redux";

// Lexical Editor Configuration
const editorConfig = {
  theme: {},
  onError(error) {
    console.error(error);
  },
};

// Custom Toolbar Component
function Toolbar() {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="d-flex gap-2 p-2 border-bottom bg-light">
      <Button
        variant="light"
        size="sm"
        onClick={() => editor.dispatchCommand("bold")}
      >
        <b>B</b>
      </Button>
      <Button
        variant="light"
        size="sm"
        onClick={() => editor.dispatchCommand("italic")}
      >
        <i>I</i>
      </Button>
      <Button
        variant="light"
        size="sm"
        onClick={() => editor.dispatchCommand("underline")}
      >
        <u>U</u>
      </Button>
    </div>
  );
}

// Custom Plugin to Extract Text Content
function EditorOnChange({ setEmailContent }) {
  const [editor] = useLexicalComposerContext();

  return (
    <OnChangePlugin
      onChange={(editorState) => {
        editorState.read(() => {
          const textContent = $getRoot().getTextContent();
          setEmailContent(textContent);
        });
      }}
    />
  );
}

function SendEmail() {
  const toEmailref = useRef();
  const subjectref = useRef();
  const [emailContent, setEmailContent] = useState(""); 
  const senderEmail=useSelector((state)=>state.Auth.email)

  async function sendEmailHandler(event) {
    event.preventDefault();

    const toEmail = toEmailref.current.value;
    const subject = subjectref.current.value;

    console.log("To:", toEmail);
    console.log("Subject:", subject);
    console.log("Content:", emailContent); // ✅ Now logs the correct content!

    if (!toEmail || !subject || !emailContent) {
      alert("Please fill in all fields before sending.");
      return;
    }

    // Firebase structure:
    const emailData = {
      sender: senderEmail,
      receiver: toEmail,
      subject: subject,
      body: emailContent,
      read:false,
      timestamp: new Date().toISOString(),
    };
      
      try {
          const emailResponse = await fetch("https://movies-e-commerce-default-rtdb.firebaseio.com/emails.json", {
              method: 'POST',
              body: JSON.stringify(emailData),
              headers: {
                  "Content-Type": "application/json",
              }
          })
          if (!emailResponse.ok) {
              throw new Error(emailResponse.error);
          }
          
      }
      catch (error) {
          console.log(error);
          alert(error);
      }

    
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="mb-3 text-center">Compose Email</h3>
              <Form onSubmit={sendEmailHandler}>
                <Form.Group className="mb-3">
                  <Form.Control ref={toEmailref} type="email" placeholder="To" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control ref={subjectref} type="text" placeholder="Subject" />
                </Form.Group>

                {/* Lexical Editor with Toolbar */}
                <Form.Group className="mb-3">
                  <LexicalComposer initialConfig={editorConfig}>
                    <Card className="border">
                      <Toolbar />
                      <RichTextPlugin
                        contentEditable={
                          <ContentEditable
                            className="form-control border-0 p-2"
                            style={{ minHeight: "200px" }}
                          />
                        }
                        placeholder={<div className="text-muted p-2">Write your email...</div>}
                      />
                      <HistoryPlugin />
                      <AutoFocusPlugin />
                      <EditorOnChange setEmailContent={setEmailContent} />
                    </Card>
                  </LexicalComposer>
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <FiPaperclip size={20} className="me-3 text-secondary" />
                  </div>
                  <div>
                    <Button variant="primary" type="submit" className="me-2">
                      <FiSend className="me-2" /> Send
                    </Button>
                    <Button variant="danger">
                      <FiTrash2 className="me-2" /> Discard
                    </Button>
                  </div>
                </div>

                <Button variant="secondary" className="mt-3 w-100">
                  Back
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SendEmail;