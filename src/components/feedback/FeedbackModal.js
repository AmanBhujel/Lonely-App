
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';
import { useFeedbackModalContext } from '../../contexts/FeedbackContext';
import { expressions } from '../datas/expressions'
import axios from 'axios';
import ToastMessages from '../utills/ToastMessage'

// Feedback Modal 
const FeedbackModal = () => {
  const { isFeedbackModalOpen, setFeedbackModalOpen } = useFeedbackModalContext();
  const [activeExpression, setActiveExpression] = useState(null);
  const [feedback, setFeedback] = useState('')

  const handleExpressionClick = (label) => {
    setActiveExpression(label);
  };

  const handleSubmit = () => {
    try {
      const response = fetch('http://localhost:5000/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          expression: activeExpression,
          feedback: feedback,
        }),
      });

      setFeedback('');
      setFeedbackModalOpen(false);
      ToastMessages('success', 'Feedback Submitted!');
    } catch (error) {
      ToastMessages('error', 'Error Occurred!');
    }
  };


  return (
    <>
      <Modal backdrop="blur" size="xl" isOpen={isFeedbackModalOpen} onClose={() => setFeedbackModalOpen(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader
                className="flex flex-col items-center text-2xl gap-4  font-bold border-b border-black"
                style={{
                  background: 'linear-gradient(#dfd5f6,#f7f4fa)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                Feedback
              </ModalHeader>
              <ModalBody
                className="space-y-4 max-h-[750px] overflow-y-auto text-justify"
                style={{
                  background: 'linear-gradient(#dfd5f6,#f7f4fa, white )',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="flex flex-col w-full items-center justify-center text-sm">
                  <p>We would like your feedback to improve our website.</p>
                  <p>What is your opinion of this page?</p>
                  <div className="flex items-center justify-center gap-x-3 mt-7">
                    {expressions.map((expression, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <i
                          className={`text-5xl cursor-pointer hover:text-yellow-400 ${activeExpression === expression.label ? 'text-yellow-500' : ''
                            }`}
                          onClick={() => handleExpressionClick(expression.label)}
                        >
                          {expression.icon}
                        </i>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-lg font-semibold text-gray-700" htmlFor="feedbackInput">
                    Please leave your feedback below
                  </label>
                  <textarea
                    type="text"
                    id="feedbackInput"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Your feedback here..."
                    className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-primary h-[15rem]"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button className="bg-tertiaryHover text-white rounded-[5px]" radius="md" onClick={async () => { await handleSubmit(); onClose(); }}>
                  Send
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default FeedbackModal;
