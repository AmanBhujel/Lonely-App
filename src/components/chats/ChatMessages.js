import Lottie from 'lottie-react';
import Emma from '../../assets/Emma.png'
import TypingAnimation from '../../assets/chats/typing.json'
import React from 'react';

//Messages UI for chatbox
const ChatMessages = ({ messages, isTyping }) => {
    const ref = useChatScroll(messages);

    return (
        <div className="h-full overflow-y-auto no-scrollbar p-4" ref={ref} >
            {messages.map((msg, index) => (
                <div key={index} className={msg.fromUser === true ? 'text-right' : 'text-left'}>
                    {msg.fromUser === true ? (
                        <p className="py-1 px-3 bg-chatbox inline-block rounded-full mt-2">{msg.content}</p>
                    ) : (
                        <div className='flex'>
                            <img src={Emma} className="w-10 h-10 rounded-full object-cover mr-2" alt="Emma's profile" />
                            <div className="relative inline-block mt-2">
                                <p className="py-1 px-3 bg-tertiary inline-block rounded-2xl max-w-md">
                                    {msg.content}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            {isTyping ?
                <div style={{
                    width: '80px',
                    height: '40px'
                }}>
                    <Lottie
                        options={{
                            loop: true,
                            autoplay: true,
                        }}
                        animationData={TypingAnimation}
                        style={{ marginBottom: 15, marginLeft: 25 }}
                    />
                </div>
                : <></>}
            {messages.length === 0 &&
                <div className='flex justify-center items-center text-black'>
                    <p>Start chatting by sending messages...</p>
                </div>
            }
        </div>
    );
};

export default ChatMessages;

// -------To make chat scroll at bottom------
function useChatScroll(dep) {
    const ref = React.useRef();

    React.useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [dep]);

    return ref;
}

