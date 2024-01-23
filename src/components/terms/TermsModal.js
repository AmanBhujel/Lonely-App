// -------------TermsModal with HardCoded Data--------------
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useTermModalContext } from "../../contexts/TermModelContext";

export default function TermsModal() {
    const { isTermModalOpen, setTermModalOpen } = useTermModalContext();
    return (
        <>
            <Modal backdrop="blur" size="5xl" isOpen={isTermModalOpen} onClose={() => setTermModalOpen(false)}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col items-center text-2xl gap-4  font-bold border-b-2 border-black"
                                style={{
                                    background: 'linear-gradient(#dfd5f6,#f7f4fa)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}>
                                Terms and Conditions
                            </ModalHeader>
                            <ModalBody className="space-y-4 max-h-[750px] overflow-y-auto text-justify"
                                style={{
                                    background: 'linear-gradient(#dfd5f6,#f7f4fa, white )',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                <p>
                                    <strong className="text-lg">1. Introduction:</strong>
                                    <br />

                                    {" "}
                                    These Terms of Service govern your use of the services provided by CheersAI, encompassing the AI therapist, analytics, scheduling, chatbot functionalities, and all else, collectively referred to as the "Services." By accessing or using the Services, you agree to be bound by these Terms. If there is a conflict between these Terms and any other agreement you have with us governing the use of the Services, these Terms will prevail.
                                </p>
                                <p>
                                    <strong className="text-lg">2. Beta Services:</strong>
                                    {" "}
                                    <br />
                                    This section governs your use of services or features that CheersAI offers on an alpha, preview, early access, or beta basis (“Beta Services”). Beta Services are offered “as-is” to allow testing and evaluation and are excluded from any indemnification obligations CheersAI may have to you.<br />
                                    CheersAI makes no representations or warranties for Beta Services, including any warranty that Beta Services will be generally available, uninterrupted, or error-free, or that Content will be secure or not lost or damaged. Except to the extent prohibited by law, CheersAI expressly disclaims all warranties for Beta Services, including any implied warranties of merchantability, satisfactory quality, fitness for a particular purpose, non-infringement, or quiet enjoyment, and any warranties arising out of any course of dealing or usage of trade.
                                </p>
                                <p>
                                    <strong className="text-lg">3. CheersAI Enterprise:</strong>
                                    <br />
                                    {" "}
                                    CheersAI Enterprise can be managed by end users with administrative privileges (“Administrators”). Administrators will provision and administer the CheersAI Enterprise Service only for end users within their organization (including affiliates), and may be able to: (a) add, remove and suspend end users’ access to CheersAI Enterprise; (b) access, share and remove Content; and (c) access logging and information about end users’ use of CheersAI Enterprise. CheersAI Enterprise customers are responsible for obtaining and maintaining all necessary consents from end users to take the actions above and to allow CheersAI to deliver the Services.
                                </p>
                                <p>
                                    <strong className="text-lg">4. Acceptable Use:</strong>
                                    <br />

                                    {" "}
                                    You must be at least 13 years old to use the Service. If you are under 18 you must have your parent’s or legal guardian’s permission to use the Service. You agree not to share, transfer, or sell your account. You are responsible for all activities on your account.<br />
                                    You agree not to use the Service in any way that causes, or may cause, damage to the Service or impairment of the availability or accessibility of the Service. You agree not to use the Service for unlawful, illegal, fraudulent or harmful activities, including but not limited to hate, harassment, violence, political manipulation, spam, or malware.
                                </p>
                                <div className="space-y-2">
                                    <p>
                                        <strong >a) Data Security Measures:</strong>
                                        <br />
                                        {" "}
                                        We prioritize the security of your data and employ industry-standard measures to protect it against unauthorized access, disclosure, alteration, and destruction. Our security protocols undergo continuous assessment and improvement to ensure they align with evolving best practices.
                                    </p>
                                    <p>
                                        <strong>b) Data Usage and Purpose:</strong>
                                        <br />
                                        {" "}
                                        •	CheersAI utilizes the data collected for specific purposes, including but not limited to:
                                        •	Providing and improving our services.
                                        •	Customizing user experiences.
                                        •	Sending important service-related notifications.
                                        •	Conducting analytics and research to enhance service quality.
                                    </p>
                                    <p>
                                        <strong>c) Data Transfer:</strong>
                                        <br />
                                        {" "}
                                        Your data may be transferred to, stored at, or processed in locations outside your country of residence. CheersAI ensures that appropriate safeguards are in place to maintain the security and confidentiality of your data during such transfers.
                                    </p>
                                    <p>
                                        <strong >d)  User Control and Consent:</strong>
                                        <br />
                                        {" "}
                                        CheersAI respects your right to control your personal information. You have the option to review, update, or delete your data at any time. By using our services, you grant explicit consent to the collection, processing, and storage of your data in accordance with this Privacy Section.
                                    </p>
                                    <p>
                                        <strong >e) Data Usage and Purpose:</strong>
                                        <br />
                                        {" "}
                                        CheersAI may engage with trusted third-party service providers to assist in data processing, storage, and analytics. These entities adhere to strict confidentiality and security standards, and your data is shared with them only to the extent necessary for the provision of our services.
                                    </p>
                                    <p>
                                        <strong >f) Third-Party Collaborations:</strong>
                                        <br />
                                        {" "}
                                        CheersAI's services are not intended for children under the age of 13. We do not knowingly collect or solicit personal information from individuals in this age group.
                                    </p>
                                    <p>
                                        <strong >g) Changes to Privacy Section: </strong>
                                        <br />
                                        {" "}
                                        CheersAI reserves the right to modify or update this Data Privacy Section at its discretion. Users will be notified of material changes, and continued use of the services implies acceptance of the revised terms.
                                    </p>
                                </div>
                                <p>
                                    <strong className="text-lg">5. Intellectual Property Rights:</strong>
                                    <br />

                                    {" "}
                                    CheersAI acknowledges and respects the intellectual property rights of all individuals and entities, and expects all users of the Service to do the same. As a user of the Service, you are granted access for your own personal, non-commercial use only. Any attempts to reverse engineer, copy, reproduce, or otherwise steal intellectual property from the Service will not be tolerated and may result in legal action. CheersAI takes all allegations of copyright infringement seriously and will respond promptly to any notices that comply with applicable laws and are properly provided to us.
                                </p>
                                <p>
                                    <strong className="text-lg">6. Disclaimer:</strong>
                                    <br />
                                    {" "}
                                    Your use of the Service is at your sole risk. The Service is provided on an “AS IS” and “AS AVAILABLE” basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.<br />
                                    CheersAI, its subsidiaries, affiliates, and its licensors do not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; nor d) the results of using the Service will meet your requirements.
                                </p>
                                <p>
                                    <strong className="text-lg">7. Indemnification:</strong>
                                    <br />

                                    {" "}
                                    You agree to defend, indemnify and hold harmless CheersAI and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney’s fees), resulting from or arising out of a) your use and access of the Service, by you or any person using your account and password; b) a breach of these Terms, or c) Content posted on the Service.
                                </p>
                                <p>
                                    <strong className="text-lg">8. Changes:</strong>
                                    <br />
                                    {" "}
                                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.<br />
                                    After modification, we will post the revised Terms and update the “Last updated” date above. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please cease using the Service.
                                </p>
                                <p>
                                    <strong className="text-lg">Contact Us:</strong>
                                    <br />
                                    If you have any questions or concerns regarding these Terms, please contact us at <span className="font-bold">dhruvreddy05@gmail.com</span>
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button className="bg-tertiaryHover text-white rounded-[5px]" radius="md" onPress={onClose}>
                                    I Understand
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
